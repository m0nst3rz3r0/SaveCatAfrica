import type { Id } from "../../convex/_generated/dataModel";

export type SiteSettings = {
  _id: Id<"siteSettings">;
  orgName: string;
  tagline: string;
  contactEmail: string;
  contactAddress: string;
  contactHours: string;
  monthlyGoalCents: number;
  socialWebsite?: string;
  socialEmail?: string;
  socialShare?: string;
  foundedYear?: string;
  registrationNumber?: string;
  nationsCount?: number;
  impactIntro?: string;
  impactQuote?: string;
  donationSidebarNote?: string;
  crisisBadge?: string;
  crisisTitle?: string;
  crisisSubtitle?: string;
  protectionEyebrow?: string;
  protectionTitle?: string;
  heroBadge?: string;
  heroHeadline?: string;
  heroHeadlineAccent?: string;
  heroSubcopy?: string;
  heroImageUrl?: string;
  donationImageUrl?: string;
};

export type ImpactStat = {
  _id: Id<"impactStats">;
  label: string;
  value: string;
  unit?: string;
  sortOrder: number;
  visible: boolean;
};

export type CrisisCard = {
  _id: Id<"crisisCards">;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
};

export type ProtectionPlan = {
  _id: Id<"protectionPlans">;
  planId: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
};

export type DonationTier = {
  _id: Id<"donationTiers">;
  amountCents: number;
  label: string;
  description: string;
  popular: boolean;
  sortOrder: number;
};

export type Partner = {
  _id: Id<"partners">;
  name: string;
  url?: string;
  sortOrder: number;
};

export type FooterLink = {
  _id: Id<"footerLinks">;
  section: string;
  label: string;
  href: string;
  sortOrder: number;
};

export type Page = {
  _id: Id<"pages">;
  slug: string;
  title: string;
  body: string;
};

export type FundraisingStats = {
  raisedCents: number;
  monthlyGoalCents: number;
  supporterCount: number;
  progressPercent: number;
  hasGoal: boolean;
};

export type Donation = {
  _id: Id<"donations">;
  stripeSessionId: string;
  amountCents: number;
  status: "pending" | "completed" | "failed";
  donorEmail?: string;
  createdAt: number;
};

export type ContactSubmission = {
  _id: Id<"contactSubmissions">;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: number;
};

export type NewsletterSubscriber = {
  _id: Id<"newsletterSubscribers">;
  email: string;
  subscribedAt: number;
};

export type AdminDonationStats = {
  totalDonations: number;
  totalCents: number;
  pending: number;
};
