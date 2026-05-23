import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { useToast } from "../../lib/toast";
import { useSiteSettings } from "../../hooks/useSiteData";

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
    donationImageUrl: "",
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
        donationImageUrl: settings.donationImageUrl ?? "",
      });
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      await upsert({ token, data: form });
      showToast("Settings saved");
    } catch {
      showToast("Failed to save", "error");
    }
  };

  const set = (key: keyof typeof form, value: string | number) =>
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
          <FormField label="Founded Year">
            <input className={inputClass} value={form.foundedYear} onChange={(e) => set("foundedYear", e.target.value)} />
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
          <FormField label="Hero Image URL">
            <input className={inputClass} value={form.heroImageUrl} onChange={(e) => set("heroImageUrl", e.target.value)} />
          </FormField>
          <FormField label="Subcopy">
            <textarea className={inputClass} rows={3} value={form.heroSubcopy} onChange={(e) => set("heroSubcopy", e.target.value)} />
          </FormField>
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
          <FormField label="Donation Image URL">
            <input className={inputClass} value={form.donationImageUrl} onChange={(e) => set("donationImageUrl", e.target.value)} />
          </FormField>
        </div>

        <button type="submit" className="px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-terracotta">
          Save Settings
        </button>
      </form>
    </div>
  );
}
