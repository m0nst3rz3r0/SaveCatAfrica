import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { ImageUpload } from "../components/ImageUpload";
import { useToast } from "../../lib/toast";
import { useSiteSettings } from "../../hooks/useSiteData";
import type { Id } from "../../../convex/_generated/dataModel";

export function SettingsPage() {
  const { token } = useAdminToken();
  const settings = useSiteSettings();
  const upsert = useMutation(api.siteSettings.upsert);
  const { showToast } = useToast();
  const [form, setForm] = useState({
    orgName: "",
    tagline: "",
    contactEmail: "",
    contactAddress: "",
    contactHours: "",
    monthlyGoalCents: 2500000,
    socialWebsite: "",
    socialEmail: "",
    socialShare: "",
    foundedYear: "",
    registrationNumber: "",
    nationsCount: 14,
    impactIntro: "",
    impactQuote: "",
    donationSidebarNote: "",
    crisisBadge: "",
    crisisTitle: "",
    crisisSubtitle: "",
    protectionEyebrow: "",
    protectionTitle: "",
    heroBadge: "",
    heroHeadline: "",
    heroHeadlineAccent: "",
    heroSubcopy: "",
    heroImageUrl: "",
    heroImageStorageId: null as Id<"_storage"> | null,
    heroImagePreviewUrl: null as string | null,
    heroVideoUrl: "",
    donationImageUrl: "",
    donationImageStorageId: null as Id<"_storage"> | null,
    donationImagePreviewUrl: null as string | null,
    trustStripText: "",
    siteDescription: "",
    analyticsId: "",
  });

  useEffect(() => {
    if (settings) {
      setForm({
        orgName: settings.orgName,
        tagline: settings.tagline,
        contactEmail: settings.contactEmail,
        contactAddress: settings.contactAddress,
        contactHours: settings.contactHours,
        monthlyGoalCents: settings.monthlyGoalCents,
        socialWebsite: settings.socialWebsite ?? "",
        socialEmail: settings.socialEmail ?? "",
        socialShare: settings.socialShare ?? "",
        foundedYear: settings.foundedYear ?? "",
        registrationNumber: settings.registrationNumber ?? "",
        nationsCount: settings.nationsCount ?? 14,
        impactIntro: settings.impactIntro ?? "",
        impactQuote: settings.impactQuote ?? "",
        donationSidebarNote: settings.donationSidebarNote ?? "",
        crisisBadge: settings.crisisBadge ?? "",
        crisisTitle: settings.crisisTitle ?? "",
        crisisSubtitle: settings.crisisSubtitle ?? "",
        protectionEyebrow: settings.protectionEyebrow ?? "",
        protectionTitle: settings.protectionTitle ?? "",
        heroBadge: settings.heroBadge ?? "",
        heroHeadline: settings.heroHeadline ?? "",
        heroHeadlineAccent: settings.heroHeadlineAccent ?? "",
        heroSubcopy: settings.heroSubcopy ?? "",
        heroImageUrl: settings.heroImageUrl ?? "",
        heroImageStorageId: settings.heroImageStorageId ?? null,
        heroImagePreviewUrl: settings.heroImageUrl ?? null,
        heroVideoUrl: settings.heroVideoUrl ?? "",
        donationImageUrl: settings.donationImageUrl ?? "",
        donationImageStorageId: settings.donationImageStorageId ?? null,
        donationImagePreviewUrl: settings.donationImageUrl ?? null,
        trustStripText: settings.trustStripText ?? "",
        siteDescription: settings.siteDescription ?? "",
        analyticsId: settings.analyticsId ?? "",
      });
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await upsert({
        token,
        data: {
          orgName: form.orgName,
          tagline: form.tagline,
          contactEmail: form.contactEmail,
          contactAddress: form.contactAddress,
          contactHours: form.contactHours,
          monthlyGoalCents: form.monthlyGoalCents,
          socialWebsite: form.socialWebsite || undefined,
          socialEmail: form.socialEmail || undefined,
          socialShare: form.socialShare || undefined,
          foundedYear: form.foundedYear || undefined,
          registrationNumber: form.registrationNumber || undefined,
          nationsCount: form.nationsCount,
          impactIntro: form.impactIntro || undefined,
          impactQuote: form.impactQuote || undefined,
          donationSidebarNote: form.donationSidebarNote || undefined,
          crisisBadge: form.crisisBadge || undefined,
          crisisTitle: form.crisisTitle || undefined,
          crisisSubtitle: form.crisisSubtitle || undefined,
          protectionEyebrow: form.protectionEyebrow || undefined,
          protectionTitle: form.protectionTitle || undefined,
          heroBadge: form.heroBadge || undefined,
          heroHeadline: form.heroHeadline || undefined,
          heroHeadlineAccent: form.heroHeadlineAccent || undefined,
          heroSubcopy: form.heroSubcopy || undefined,
          heroImageUrl: form.heroImageUrl || undefined,
          heroImageStorageId: form.heroImageStorageId ?? undefined,
          heroVideoUrl: form.heroVideoUrl || undefined,
          donationImageUrl: form.donationImageUrl || undefined,
          donationImageStorageId: form.donationImageStorageId ?? undefined,
          trustStripText: form.trustStripText || undefined,
          siteDescription: form.siteDescription || undefined,
          analyticsId: form.analyticsId || undefined,
        },
      });
      showToast("Settings saved");
    } catch {
      showToast("Failed to save", "error");
    }
  };

  const set = (key: keyof typeof form, value: string | number | Id<"_storage"> | null) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">Site Settings</h1>
      <form onSubmit={handleSave} className="space-y-6 bg-white rounded-xl border border-border-theme p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Organization Name">
            <input className={inputClass} value={form.orgName} onChange={(e) => set("orgName", e.target.value)} />
          </FormField>
          <FormField label="Monthly Goal ($)">
            <input
              type="number"
              className={inputClass}
              value={form.monthlyGoalCents / 100}
              onChange={(e) => set("monthlyGoalCents", Math.round(parseFloat(e.target.value) * 100) || 0)}
            />
          </FormField>
          <FormField label="Tagline">
            <textarea className={inputClass} rows={2} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </FormField>
          <FormField label="Site Description">
            <textarea className={inputClass} rows={2} value={form.siteDescription} onChange={(e) => set("siteDescription", e.target.value)} />
          </FormField>
          <FormField label="Founded Year">
            <input className={inputClass} value={form.foundedYear} onChange={(e) => set("foundedYear", e.target.value)} />
          </FormField>
          <FormField label="Analytics ID">
            <input className={inputClass} value={form.analyticsId} onChange={(e) => set("analyticsId", e.target.value)} placeholder="G-XXXXXXXX" />
          </FormField>
          <FormField label="Contact Email">
            <input className={inputClass} value={form.contactEmail} onChange={(e) => set("contactEmail", e.target.value)} />
          </FormField>
          <FormField label="Contact Address">
            <input className={inputClass} value={form.contactAddress} onChange={(e) => set("contactAddress", e.target.value)} />
          </FormField>
          <FormField label="Hours">
            <input className={inputClass} value={form.contactHours} onChange={(e) => set("contactHours", e.target.value)} />
          </FormField>
          <FormField label="Registration Number">
            <input className={inputClass} value={form.registrationNumber} onChange={(e) => set("registrationNumber", e.target.value)} />
          </FormField>
          <FormField label="Trust Strip Text">
            <input className={inputClass} value={form.trustStripText} onChange={(e) => set("trustStripText", e.target.value)} />
          </FormField>
        </div>

        <h2 className="font-bold text-navy pt-4 border-t">Hero Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Badge">
            <input className={inputClass} value={form.heroBadge} onChange={(e) => set("heroBadge", e.target.value)} />
          </FormField>
          <FormField label="Headline">
            <input className={inputClass} value={form.heroHeadline} onChange={(e) => set("heroHeadline", e.target.value)} />
          </FormField>
          <FormField label="Headline Accent">
            <input className={inputClass} value={form.heroHeadlineAccent} onChange={(e) => set("heroHeadlineAccent", e.target.value)} />
          </FormField>
          <FormField label="Hero Video URL">
            <input className={inputClass} value={form.heroVideoUrl} onChange={(e) => set("heroVideoUrl", e.target.value)} />
          </FormField>
          <FormField label="Hero Image URL (fallback)">
            <input className={inputClass} value={form.heroImageUrl} onChange={(e) => set("heroImageUrl", e.target.value)} />
          </FormField>
          <FormField label="Subcopy">
            <textarea className={inputClass} rows={3} value={form.heroSubcopy} onChange={(e) => set("heroSubcopy", e.target.value)} />
          </FormField>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageUpload
            token={token}
            value={form.heroImageStorageId}
            previewUrl={(form.heroImagePreviewUrl ?? form.heroImageUrl) || undefined}
            label="Hero Image Upload"
            onUpload={(storageId, url) => setForm((f) => ({ ...f, heroImageStorageId: storageId, heroImagePreviewUrl: url }))}
          />
        </div>

        <h2 className="font-bold text-navy pt-4 border-t">Mission & Impact</h2>
        <div className="grid grid-cols-1 gap-4">
          <FormField label="Crisis Title">
            <input className={inputClass} value={form.crisisTitle} onChange={(e) => set("crisisTitle", e.target.value)} />
          </FormField>
          <FormField label="Crisis Subtitle">
            <textarea className={inputClass} rows={2} value={form.crisisSubtitle} onChange={(e) => set("crisisSubtitle", e.target.value)} />
          </FormField>
          <FormField label="Impact Intro">
            <textarea className={inputClass} rows={2} value={form.impactIntro} onChange={(e) => set("impactIntro", e.target.value)} />
          </FormField>
          <FormField label="Impact Quote">
            <textarea className={inputClass} rows={2} value={form.impactQuote} onChange={(e) => set("impactQuote", e.target.value)} />
          </FormField>
          <FormField label="Donation Image URL (fallback)">
            <input className={inputClass} value={form.donationImageUrl} onChange={(e) => set("donationImageUrl", e.target.value)} />
          </FormField>
          <ImageUpload
            token={token}
            value={form.donationImageStorageId}
            previewUrl={(form.donationImagePreviewUrl ?? form.donationImageUrl) || undefined}
            label="Donation Image Upload"
            onUpload={(storageId, url) => setForm((f) => ({ ...f, donationImageStorageId: storageId, donationImagePreviewUrl: url }))}
          />
        </div>

        <button type="submit" className="px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-terracotta">
          Save Settings
        </button>
      </form>
    </div>
  );
}
