import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("siteSettings").first();
  },
});

export const upsert = mutation({
  args: {
    token: v.string(),
    data: v.object({
      orgName: v.string(),
      tagline: v.string(),
      contactEmail: v.string(),
      contactAddress: v.string(),
      contactHours: v.string(),
      monthlyGoalCents: v.number(),
      socialWebsite: v.optional(v.string()),
      socialEmail: v.optional(v.string()),
      socialShare: v.optional(v.string()),
      foundedYear: v.optional(v.string()),
      registrationNumber: v.optional(v.string()),
      nationsCount: v.optional(v.number()),
      impactIntro: v.optional(v.string()),
      impactQuote: v.optional(v.string()),
      donationSidebarNote: v.optional(v.string()),
      crisisBadge: v.optional(v.string()),
      crisisTitle: v.optional(v.string()),
      crisisSubtitle: v.optional(v.string()),
      protectionEyebrow: v.optional(v.string()),
      protectionTitle: v.optional(v.string()),
      heroBadge: v.optional(v.string()),
      heroHeadline: v.optional(v.string()),
      heroHeadlineAccent: v.optional(v.string()),
      heroSubcopy: v.optional(v.string()),
      heroImageUrl: v.optional(v.string()),
      heroImageStorageId: v.optional(v.id("_storage")),
      donationImageUrl: v.optional(v.string()),
      donationImageStorageId: v.optional(v.id("_storage")),
    }),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const existing = await ctx.db.query("siteSettings").first();
    if (existing) {
      await ctx.db.patch(existing._id, args.data);
      return existing._id;
    }
    return await ctx.db.insert("siteSettings", args.data);
  },
});
