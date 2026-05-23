import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();
    const existing = await ctx.db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();
    if (existing) return existing._id;
    return await ctx.db.insert("newsletterSubscribers", {
      email,
      subscribedAt: Date.now(),
    });
  },
});

export const list = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const items = await ctx.db.query("newsletterSubscribers").collect();
    return items.sort((a, b) => b.subscribedAt - a.subscribedAt);
  },
});

export const subscriberCount = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("newsletterSubscribers").collect();
    return items.length;
  },
});
