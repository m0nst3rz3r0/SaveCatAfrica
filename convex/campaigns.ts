import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("campaigns").collect();
    return items.filter((c) => c.active).sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const listAll = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    return (await ctx.db.query("campaigns").collect()).sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("campaigns")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const create = mutation({
  args: {
    token: v.string(),
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    goalCents: v.number(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    deadline: v.optional(v.number()),
    active: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, ...data } = args;
    return await ctx.db.insert("campaigns", data);
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("campaigns"),
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    goalCents: v.number(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    deadline: v.optional(v.number()),
    active: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("campaigns") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});
