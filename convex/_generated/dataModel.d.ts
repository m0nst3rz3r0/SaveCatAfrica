import type { GenericId } from "convex/values";

export type TableNames =
  | "siteSettings"
  | "impactStats"
  | "crisisCards"
  | "protectionPlans"
  | "donationTiers"
  | "partners"
  | "footerLinks"
  | "pages"
  | "donations"
  | "contactSubmissions"
  | "newsletterSubscribers"
  | "adminSessions"
  | "admins";

export type Id<TableName extends TableNames> = GenericId<TableName>;

export interface DataModel {
  siteSettings: { document: Record<string, unknown>; fieldPaths: string };
  impactStats: { document: Record<string, unknown>; fieldPaths: string };
  crisisCards: { document: Record<string, unknown>; fieldPaths: string };
  protectionPlans: { document: Record<string, unknown>; fieldPaths: string };
  donationTiers: { document: Record<string, unknown>; fieldPaths: string };
  partners: { document: Record<string, unknown>; fieldPaths: string };
  footerLinks: { document: Record<string, unknown>; fieldPaths: string };
  pages: { document: Record<string, unknown>; fieldPaths: string };
  donations: { document: Record<string, unknown>; fieldPaths: string };
  contactSubmissions: { document: Record<string, unknown>; fieldPaths: string };
  newsletterSubscribers: { document: Record<string, unknown>; fieldPaths: string };
  adminSessions: { document: Record<string, unknown>; fieldPaths: string };
  admins: { document: Record<string, unknown>; fieldPaths: string };
}
