import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type {
  AdminDonationStats,
  ContactSubmission,
  CrisisCard,
  Donation,
  DonationTier,
  FaqItem,
  FooterLink,
  FundraisingStats,
  ImpactStat,
  NewsletterSubscriber,
  Page,
  Partner,
  ProtectionPlan,
  RecentDonor,
  RescueStory,
  SiteSettings,
  Testimonial,
  Campaign,
} from "../types/documents";

export function useSiteSettings() {
  return useQuery(api.siteSettings.get) as SiteSettings | null | undefined;
}

export function useImpactStats() {
  return useQuery(api.content.listImpactStats) as ImpactStat[] | undefined;
}

export function useAllImpactStats(token: string | null) {
  return useQuery(
    api.content.listAllImpactStats,
    token ? { token } : "skip"
  ) as ImpactStat[] | undefined;
}

export function useCrisisCards() {
  return useQuery(api.content.listCrisisCards) as CrisisCard[] | undefined;
}

export function useProtectionPlans() {
  return useQuery(api.content.listProtectionPlans) as ProtectionPlan[] | undefined;
}

export function useDonationTiers() {
  return useQuery(api.content.listDonationTiers) as DonationTier[] | undefined;
}

export function usePartners() {
  return useQuery(api.content.listPartners) as Partner[] | undefined;
}

export function useFooterLinks() {
  return useQuery(api.content.listFooterLinks) as FooterLink[] | undefined;
}

export function usePages() {
  return useQuery(api.content.listPages) as Page[] | undefined;
}

export function usePageBySlug(slug: string | undefined) {
  return useQuery(
    api.content.getPageBySlug,
    slug ? { slug } : "skip"
  ) as Page | null | undefined;
}

export function useFirstPage() {
  return useQuery(api.content.getFirstPage) as Page | null | undefined;
}

export function useFundraisingStats() {
  return useQuery(api.donations.getFundraisingStats) as
    | FundraisingStats
    | undefined;
}

export function useDonations(token: string | null) {
  return useQuery(
    api.donations.list,
    token ? { token } : "skip"
  ) as Donation[] | undefined;
}

export function useAdminDonationStats(token: string | null) {
  return useQuery(
    api.donations.adminStats,
    token ? { token } : "skip"
  ) as AdminDonationStats | undefined;
}

export function useContacts(token: string | null) {
  return useQuery(
    api.contacts.list,
    token ? { token } : "skip"
  ) as ContactSubmission[] | undefined;
}

export function useUnreadCount(token: string | null) {
  return useQuery(
    api.contacts.unreadCount,
    token ? { token } : "skip"
  ) as number | undefined;
}

export function useNewsletterSubscribers(token: string | null) {
  return useQuery(
    api.newsletter.list,
    token ? { token } : "skip"
  ) as NewsletterSubscriber[] | undefined;
}

export function useSubscriberCount() {
  return useQuery(api.newsletter.subscriberCount) as number | undefined;
}

export function useStories() {
  return useQuery(api.stories.list) as RescueStory[] | undefined;
}

export function useTestimonials() {
  return useQuery(api.testimonials.list) as Testimonial[] | undefined;
}

export function useFaq() {
  return useQuery(api.faq.list) as FaqItem[] | undefined;
}

export function useRecentDonors() {
  return useQuery(api.donations.recentPublic) as RecentDonor[] | undefined;
}

export function useCampaigns() {
  return useQuery(api.campaigns.list) as Campaign[] | undefined;
}
