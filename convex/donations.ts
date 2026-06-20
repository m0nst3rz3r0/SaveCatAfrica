import { v } from "convex/values";
import {
  action,
  internalMutation,
  query,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { requireAdmin } from "./lib/auth";
import Stripe from "stripe";

function getMonthStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).getTime();
}

export const getFundraisingStats = query({
  args: {},
  handler: async (ctx) => {
    const settings = await ctx.db.query("siteSettings").first();
    const monthlyGoalCents = settings?.monthlyGoalCents ?? 0;
    const monthStart = getMonthStart();

    const donations = await ctx.db
      .query("donations")
      .withIndex("by_status", (q) => q.eq("status", "completed"))
      .collect();

    const thisMonth = donations.filter((d) => d.createdAt >= monthStart);
    const raisedCents = thisMonth.reduce((sum, d) => sum + d.amountCents, 0);

    const emails = new Set(
      thisMonth.map((d) => d.donorEmail).filter(Boolean) as string[]
    );
    const supporterCount =
      emails.size > 0 ? emails.size : thisMonth.length;

    const progressPercent =
      monthlyGoalCents > 0
        ? Math.min(100, Math.round((raisedCents / monthlyGoalCents) * 100))
        : 0;

    return {
      raisedCents,
      monthlyGoalCents,
      supporterCount,
      progressPercent,
      hasGoal: monthlyGoalCents > 0,
    };
  },
});

export const recentPublic = query({
  args: {},
  handler: async (ctx) => {
    const donations = await ctx.db
      .query("donations")
      .withIndex("by_status", (q) => q.eq("status", "completed"))
      .collect();
    return donations
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5)
      .map((d) => ({
        amountCents: d.amountCents,
        donorName: d.donorName ?? (d.donorEmail ? d.donorEmail.split("@")[0] : "Anonymous"),
        createdAt: d.createdAt,
        isMonthly: d.isMonthly ?? false,
      }));
  },
});

export const list = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const items = await ctx.db.query("donations").collect();
    return items.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const createCheckoutSession = action({
  args: {
    amountCents: v.number(),
    tierId: v.optional(v.id("donationTiers")),
    isMonthly: v.optional(v.boolean()),
    successUrl: v.string(),
    cancelUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY in Convex.");
    }

    if (args.amountCents < 100) {
      throw new Error("Minimum donation is $1");
    }

    const stripe = new Stripe(stripeKey);
    const isMonthly = args.isMonthly ?? false;

    const lineItem = isMonthly
      ? {
          price_data: {
            currency: "usd",
            product_data: {
              name: "SaveCat Africa Monthly Support",
              description: "Recurring monthly donation for cat rescue",
            },
            unit_amount: args.amountCents,
            recurring: { interval: "month" as const },
          },
          quantity: 1,
        }
      : {
          price_data: {
            currency: "usd",
            product_data: {
              name: "SaveCat Africa Donation",
              description: "Support cat rescue across Africa",
            },
            unit_amount: args.amountCents,
          },
          quantity: 1,
        };

    const session = await stripe.checkout.sessions.create({
      mode: isMonthly ? "subscription" : "payment",
      line_items: [lineItem],
      success_url: args.successUrl,
      cancel_url: args.cancelUrl,
      metadata: {
        tierId: args.tierId ?? "",
        isMonthly: isMonthly ? "true" : "false",
      },
    });

    if (!session.url) {
      throw new Error("Failed to create checkout session");
    }

    await ctx.runMutation(internal.donations.createPendingDonation, {
      stripeSessionId: session.id,
      amountCents: args.amountCents,
      tierId: args.tierId,
      isMonthly,
    });

    return { url: session.url };
  },
});

export const createPendingDonation = internalMutation({
  args: {
    stripeSessionId: v.string(),
    amountCents: v.number(),
    tierId: v.optional(v.id("donationTiers")),
    isMonthly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("donations")
      .withIndex("by_session", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId)
      )
      .unique();
    if (existing) return existing._id;

    return await ctx.db.insert("donations", {
      stripeSessionId: args.stripeSessionId,
      amountCents: args.amountCents,
      status: "pending",
      tierId: args.tierId,
      isMonthly: args.isMonthly,
      createdAt: Date.now(),
    });
  },
});

export const completeDonation = internalMutation({
  args: {
    stripeSessionId: v.string(),
    donorEmail: v.optional(v.string()),
    donorName: v.optional(v.string()),
    amountCents: v.number(),
    isMonthly: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const donation = await ctx.db
      .query("donations")
      .withIndex("by_session", (q) =>
        q.eq("stripeSessionId", args.stripeSessionId)
      )
      .unique();

    if (donation) {
      await ctx.db.patch(donation._id, {
        status: "completed",
        donorEmail: args.donorEmail,
        donorName: args.donorName,
        amountCents: args.amountCents,
        isMonthly: args.isMonthly,
      });
      return donation._id;
    }

    return await ctx.db.insert("donations", {
      stripeSessionId: args.stripeSessionId,
      amountCents: args.amountCents,
      status: "completed",
      donorEmail: args.donorEmail,
      donorName: args.donorName,
      isMonthly: args.isMonthly,
      createdAt: Date.now(),
    });
  },
});

export const adminStats = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const donations = await ctx.db.query("donations").collect();
    const completed = donations.filter((d) => d.status === "completed");
    const totalCents = completed.reduce((s, d) => s + d.amountCents, 0);
    return {
      totalDonations: completed.length,
      totalCents,
      pending: donations.filter((d) => d.status === "pending").length,
    };
  },
});
