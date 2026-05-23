import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/auth";

// --- Public queries ---

export const listImpactStats = query({
  args: {},
  handler: async (ctx) => {
    const stats = await ctx.db.query("impactStats").collect();
    return stats
      .filter((s) => s.visible && s.value.trim() !== "")
      .sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const listCrisisCards = query({
  args: {},
  handler: async (ctx) => {
    const cards = await ctx.db.query("crisisCards").collect();
    return cards.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const listProtectionPlans = query({
  args: {},
  handler: async (ctx) => {
    const plans = await ctx.db.query("protectionPlans").collect();
    return plans.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const listDonationTiers = query({
  args: {},
  handler: async (ctx) => {
    const tiers = await ctx.db.query("donationTiers").collect();
    return tiers.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const listPartners = query({
  args: {},
  handler: async (ctx) => {
    const partners = await ctx.db.query("partners").collect();
    return partners.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const listFooterLinks = query({
  args: {},
  handler: async (ctx) => {
    const links = await ctx.db.query("footerLinks").collect();
    return links.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});

export const listPages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("pages").collect();
  },
});

export const getPageBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
  },
});

export const getFirstPage = query({
  args: {},
  handler: async (ctx) => {
    const pages = await ctx.db.query("pages").collect();
    return pages[0] ?? null;
  },
});

// --- Admin mutations: impact stats ---

export const createImpactStat = mutation({
  args: {
    token: v.string(),
    label: v.string(),
    value: v.string(),
    unit: v.optional(v.string()),
    sortOrder: v.number(),
    visible: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, ...data } = args;
    return await ctx.db.insert("impactStats", data);
  },
});

export const updateImpactStat = mutation({
  args: {
    token: v.string(),
    id: v.id("impactStats"),
    label: v.string(),
    value: v.string(),
    unit: v.optional(v.string()),
    sortOrder: v.number(),
    visible: v.boolean(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deleteImpactStat = mutation({
  args: { token: v.string(), id: v.id("impactStats") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

// --- Crisis cards ---

export const createCrisisCard = mutation({
  args: {
    token: v.string(),
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, ...data } = args;
    return await ctx.db.insert("crisisCards", data);
  },
});

export const updateCrisisCard = mutation({
  args: {
    token: v.string(),
    id: v.id("crisisCards"),
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deleteCrisisCard = mutation({
  args: { token: v.string(), id: v.id("crisisCards") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

// --- Protection plans ---

export const createProtectionPlan = mutation({
  args: {
    token: v.string(),
    planId: v.string(),
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, ...data } = args;
    return await ctx.db.insert("protectionPlans", data);
  },
});

export const updateProtectionPlan = mutation({
  args: {
    token: v.string(),
    id: v.id("protectionPlans"),
    planId: v.string(),
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deleteProtectionPlan = mutation({
  args: { token: v.string(), id: v.id("protectionPlans") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

// --- Donation tiers ---

export const createDonationTier = mutation({
  args: {
    token: v.string(),
    amountCents: v.number(),
    label: v.string(),
    description: v.string(),
    popular: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, ...data } = args;
    return await ctx.db.insert("donationTiers", data);
  },
});

export const updateDonationTier = mutation({
  args: {
    token: v.string(),
    id: v.id("donationTiers"),
    amountCents: v.number(),
    label: v.string(),
    description: v.string(),
    popular: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deleteDonationTier = mutation({
  args: { token: v.string(), id: v.id("donationTiers") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

// --- Partners ---

export const createPartner = mutation({
  args: {
    token: v.string(),
    name: v.string(),
    url: v.optional(v.string()),
    logoStorageId: v.optional(v.id("_storage")),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, ...data } = args;
    return await ctx.db.insert("partners", data);
  },
});

export const updatePartner = mutation({
  args: {
    token: v.string(),
    id: v.id("partners"),
    name: v.string(),
    url: v.optional(v.string()),
    logoStorageId: v.optional(v.id("_storage")),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deletePartner = mutation({
  args: { token: v.string(), id: v.id("partners") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

// --- Footer links ---

export const createFooterLink = mutation({
  args: {
    token: v.string(),
    section: v.string(),
    label: v.string(),
    href: v.string(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, ...data } = args;
    return await ctx.db.insert("footerLinks", data);
  },
});

export const updateFooterLink = mutation({
  args: {
    token: v.string(),
    id: v.id("footerLinks"),
    section: v.string(),
    label: v.string(),
    href: v.string(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deleteFooterLink = mutation({
  args: { token: v.string(), id: v.id("footerLinks") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

// --- Pages ---

export const createPage = mutation({
  args: {
    token: v.string(),
    slug: v.string(),
    title: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, ...data } = args;
    return await ctx.db.insert("pages", data);
  },
});

export const updatePage = mutation({
  args: {
    token: v.string(),
    id: v.id("pages"),
    slug: v.string(),
    title: v.string(),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _, id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deletePage = mutation({
  args: { token: v.string(), id: v.id("pages") },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

// --- Admin list all (including hidden) ---

export const listAllImpactStats = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const stats = await ctx.db.query("impactStats").collect();
    return stats.sort((a, b) => a.sortOrder - b.sortOrder);
  },
});
