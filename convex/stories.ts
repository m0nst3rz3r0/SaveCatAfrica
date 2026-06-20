import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";
import type { Id } from "./_generated/dataModel";

async function withImageUrl(
  ctx: { storage: { getUrl: (id: Id<"_storage">) => Promise<string | null> } },
  item: { imageStorageId?: Id<"_storage">; imageUrl?: string }
) {
  if (item.imageStorageId) {
    const url = await ctx.storage.getUrl(item.imageStorageId);
    return { ...item, imageUrl: url ?? item.imageUrl };
  }
  return item;
}

export const list = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("rescueStories").collect();
    const visible = items.filter((s) => s.visible).sort((a, b) => a.sortOrder - b.sortOrder);
    return Promise.all(visible.map((s) => withImageUrl(ctx, s)));
  },
});

export const listAll = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const items = await ctx.db.query("rescueStories").collect();
    return Promise.all(
      items.sort((a, b) => a.sortOrder - b.sortOrder).map((s) => withImageUrl(ctx, s))
    );
  },
});

export const create = mutation({
  args: {
    token: v.string(),
    catName: v.string(),
    title: v.string(),
    story: v.string(),
    location: v.optional(v.string()),
    amountNeededCents: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    featured: v.boolean(),
    visible: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, ...data } = args;
    return await ctx.db.insert("rescueStories", data);
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("rescueStories"),
    catName: v.string(),
    title: v.string(),
    story: v.string(),
    location: v.optional(v.string()),
    amountNeededCents: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    featured: v.boolean(),
    visible: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { token: v.string(), id: v.id("rescueStories") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});
