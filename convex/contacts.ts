import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

export const submit = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contactSubmissions", {
      ...args,
      read: false,
      createdAt: Date.now(),
    });
  },
});

export const list = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const items = await ctx.db.query("contactSubmissions").collect();
    return items.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const markRead = mutation({
  args: { token: v.string(), id: v.id("contactSubmissions") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.patch(args.id, { read: true });
  },
});

export const unreadCount = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const items = await ctx.db.query("contactSubmissions").collect();
    return items.filter((i) => !i.read).length;
  },
});
