import { useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { useToast } from "../../lib/toast";
import { useSiteSettings } from "../../hooks/useSiteData";
import type { SiteSettings } from "../../types/documents";

const toggles = [
  { key: "showTrustStrip" as const, label: "Show Trust Strip" },
  { key: "showStories" as const, label: "Show Rescue Stories" },
  { key: "showTestimonials" as const, label: "Show Testimonials" },
  { key: "showFaq" as const, label: "Show FAQ" },
  { key: "showGallery" as const, label: "Show Gallery" },
  { key: "showRecentDonors" as const, label: "Show Recent Donors" },
  { key: "monthlyGivingEnabled" as const, label: "Enable Monthly Giving" },
];

type ToggleState = {
  showTrustStrip: boolean;
  showStories: boolean;
  showTestimonials: boolean;
  showFaq: boolean;
  showGallery: boolean;
  showRecentDonors: boolean;
  monthlyGivingEnabled: boolean;
};

export function HomepagePage() {
  const { token } = useAdminToken();
  const settings = useSiteSettings();
  const upsert = useMutation(api.siteSettings.upsert);
  const { showToast } = useToast();

  const [form, setForm] = useState<ToggleState>({
    showTrustStrip: true,
    showStories: true,
    showTestimonials: true,
    showFaq: true,
    showGallery: true,
    showRecentDonors: true,
    monthlyGivingEnabled: true,
  });

  useEffect(() => {
    if (settings) {
      setForm({
        showTrustStrip: settings.showTrustStrip ?? true,
        showStories: settings.showStories ?? true,
        showTestimonials: settings.showTestimonials ?? true,
        showFaq: settings.showFaq ?? true,
        showGallery: settings.showGallery ?? true,
        showRecentDonors: settings.showRecentDonors ?? true,
        monthlyGivingEnabled: settings.monthlyGivingEnabled ?? true,
      });
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !settings) return;
    const { _id, ...rest } = settings as SiteSettings & { _creationTime?: number };
    const { _creationTime: _, ...base } = rest;
    try {
      await upsert({ token, data: { ...base, ...form } });
      showToast("Homepage settings saved");
    } catch {
      showToast("Failed to save", "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-2">Homepage Sections</h1>
      <p className="text-muted mb-6 text-sm">Toggle which sections appear on the public homepage.</p>

      <form onSubmit={handleSave} className="bg-white rounded-xl border border-border-theme p-6 space-y-4">
        {toggles.map(({ key, label }) => (
          <label key={key} className="flex items-center justify-between py-2 border-b border-border-theme last:border-0">
            <span className="font-semibold text-navy text-sm">{label}</span>
            <input
              type="checkbox"
              checked={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
            />
          </label>
        ))}
        <button type="submit" className="px-6 py-3 bg-navy text-white rounded-xl font-bold hover:bg-terracotta mt-4">
          Save Homepage Settings
        </button>
      </form>
    </div>
  );
}
