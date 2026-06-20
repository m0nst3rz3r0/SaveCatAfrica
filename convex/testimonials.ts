import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

async function withImageUrl(
  ctx: { storage: { getUrl: (id: import("./_generated/dataModel").Id<"_storage">) => Promise<string | null> } },
  item: { imageStorageId?: import("./_generated/dataModel").Id<"_storage">; imageUrl?: string }
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
    const items = await ctx.db.query("testimonials").collect();
    return Promise.all(
      items.filter((t) => t.visible).sort((a, b) => a.sortOrder - b.sortOrder).map((t) => withImageUrl(ctx, t))
    );
  },
});

export const listAll = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const items = await ctx.db.query("testimonials").collect();
    return Promise.all(
      items.sort((a, b) => a.sortOrder - b.sortOrder).map((t) => withImageUrl(ctx, t))
    );
  },
});

export const create = mutation({
  args: {
    token: v.string(),
    name: v.string(),
    role: v.string(),
    quote: v.string(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    visible: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, ...data } = args;
    return await ctx.db.insert("testimonials", data);
  },
});

export const update = mutation({
  args: {
    token: v.string(),
    id: v.id("testimonials"),
    name: v.string(),
    role: v.string(),
    quote: v.string(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
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
  args: { token: v.string(), id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});
