import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  siteSettings: defineTable({
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

  impactStats: defineTable({
    label: v.string(),
    value: v.string(),
    unit: v.optional(v.string()),
    sortOrder: v.number(),
    visible: v.boolean(),
  }).index("by_sort", ["sortOrder"]),

  crisisCards: defineTable({
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    sortOrder: v.number(),
  }).index("by_sort", ["sortOrder"]),

  protectionPlans: defineTable({
    planId: v.string(),
    title: v.string(),
    description: v.string(),
    icon: v.string(),
    sortOrder: v.number(),
  }).index("by_sort", ["sortOrder"]),

  donationTiers: defineTable({
    amountCents: v.number(),
    label: v.string(),
    description: v.string(),
    popular: v.boolean(),
    sortOrder: v.number(),
  }).index("by_sort", ["sortOrder"]),

  partners: defineTable({
    name: v.string(),
    url: v.optional(v.string()),
    logoStorageId: v.optional(v.id("_storage")),
    sortOrder: v.number(),
  }).index("by_sort", ["sortOrder"]),

  footerLinks: defineTable({
    section: v.string(),
    label: v.string(),
    href: v.string(),
    sortOrder: v.number(),
  }).index("by_section", ["section", "sortOrder"]),

  pages: defineTable({
    slug: v.string(),
    title: v.string(),
    body: v.string(),
  }).index("by_slug", ["slug"]),

  donations: defineTable({
    stripeSessionId: v.string(),
    amountCents: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
    donorEmail: v.optional(v.string()),
    tierId: v.optional(v.id("donationTiers")),
    createdAt: v.number(),
  })
    .index("by_session", ["stripeSessionId"])
    .index("by_status", ["status", "createdAt"]),

  contactSubmissions: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    message: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
  }).index("by_created", ["createdAt"]),

  newsletterSubscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
  }).index("by_email", ["email"]),

  adminSessions: defineTable({
    token: v.string(),
    email: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),

  admins: defineTable({
    email: v.string(),
  }).index("by_email", ["email"]),
});
