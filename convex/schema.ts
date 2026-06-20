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
    heroVideoUrl: v.optional(v.string()),
    donationImageUrl: v.optional(v.string()),
    donationImageStorageId: v.optional(v.id("_storage")),
    trustStripText: v.optional(v.string()),
    siteDescription: v.optional(v.string()),
    analyticsId: v.optional(v.string()),
    monthlyGivingEnabled: v.optional(v.boolean()),
    showTrustStrip: v.optional(v.boolean()),
    showStories: v.optional(v.boolean()),
    showTestimonials: v.optional(v.boolean()),
    showFaq: v.optional(v.boolean()),
    showGallery: v.optional(v.boolean()),
    showRecentDonors: v.optional(v.boolean()),
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
    logoUrl: v.optional(v.string()),
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
    coverImageUrl: v.optional(v.string()),
    coverImageStorageId: v.optional(v.id("_storage")),
    videoUrl: v.optional(v.string()),
  }).index("by_slug", ["slug"]),

  rescueStories: defineTable({
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
  }).index("by_sort", ["sortOrder"]),

  testimonials: defineTable({
    name: v.string(),
    role: v.string(),
    quote: v.string(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    visible: v.boolean(),
    sortOrder: v.number(),
  }).index("by_sort", ["sortOrder"]),

  faqItems: defineTable({
    question: v.string(),
    answer: v.string(),
    visible: v.boolean(),
    sortOrder: v.number(),
  }).index("by_sort", ["sortOrder"]),

  campaigns: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    goalCents: v.number(),
    imageUrl: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
    deadline: v.optional(v.number()),
    active: v.boolean(),
    sortOrder: v.number(),
  }).index("by_slug", ["slug"]),

  mediaAssets: defineTable({
    name: v.string(),
    storageId: v.id("_storage"),
    contentType: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_created", ["createdAt"]),

  donations: defineTable({
    stripeSessionId: v.string(),
    amountCents: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
      v.literal("failed")
    ),
    donorEmail: v.optional(v.string()),
    donorName: v.optional(v.string()),
    tierId: v.optional(v.id("donationTiers")),
    isMonthly: v.optional(v.boolean()),
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
