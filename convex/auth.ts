import { v } from "convex/values";
import {
  action,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";
import { internal } from "./_generated/api";
import { requireAdmin } from "./lib/auth";

const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

export const login = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const adminEmail = process.env.ADMIN_EMAIL ?? "admin@savecatafrica.org";
    const adminPassword = process.env.ADMIN_PASSWORD ?? "changeme";

    if (
      args.email.toLowerCase() !== adminEmail.toLowerCase() ||
      args.password !== adminPassword
    ) {
      throw new Error("Invalid email or password");
    }

    const token = crypto.randomUUID();
    await ctx.runMutation(internal.auth.createSession, {
      email: args.email.toLowerCase(),
      token,
    });
    return token;
  },
});

export const createSession = internalMutation({
  args: { email: v.string(), token: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("adminSessions", {
      token: args.token,
      email: args.email,
      expiresAt: Date.now() + SESSION_MS,
    });
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});

export const getSession = query({
  args: { token: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.token) return null;
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    if (!session || session.expiresAt < Date.now()) return null;
    return { email: session.email };
  },
});

export const isAdmin = query({
  args: { token: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.token) return false;
    const session = await ctx.db
      .query("adminSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .unique();
    return !!session && session.expiresAt > Date.now();
  },
});

export const requireAdminQuery = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    return await requireAdmin(ctx, args.token);
  },
});
