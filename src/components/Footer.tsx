import { Cat, Globe, Mail, Share2, Send } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { useToast } from "../lib/toast";
import {
  useFooterLinks,
  useImpactStats,
  usePartners,
  useSiteSettings,
} from "../hooks/useSiteData";

function FooterLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith("/p/")) {
    return (
      <li>
        <Link
          to={href}
          className="text-sm font-semibold text-muted hover:text-terracotta transition-all"
        >
          {label}
        </Link>
      </li>
    );
  }
  return (
    <li>
      <a
        href={href}
        className="text-sm font-semibold text-muted hover:text-terracotta transition-all"
      >
        {label}
      </a>
    </li>
  );
}

export function Footer() {
  const settings = useSiteSettings();
  const stats = useImpactStats();
  const partners = usePartners();
  const footerLinks = useFooterLinks();
  const subscribe = useMutation(api.newsletter.subscribe);
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navLinks =
    footerLinks?.filter((l) => l.section === "navigation") ?? [];
  const transparencyLinks =
    footerLinks?.filter((l) => l.section === "transparency") ?? [];

  const tagline = settings?.foundedYear
    ? `${settings.tagline} since ${settings.foundedYear}.`
    : settings?.tagline;

  const copyrightParts = [
    `© ${new Date().getFullYear()} ${settings?.orgName ?? "SaveCat Africa"}`,
    settings?.registrationNumber
      ? `Registered NGO ${settings.registrationNumber}`
      : null,
    settings?.contactAddress ? `Based in ${settings.contactAddress}` : null,
  ].filter(Boolean);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await subscribe({ email: email.trim() });
      showToast("Subscribed to our newsletter!");
      setEmail("");
    } catch {
      showToast("Subscription failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const visibleStats = stats ?? [];
  const visiblePartners = partners ?? [];

  return (
    <footer className="bg-canvas border-t border-border-theme">
      {(visibleStats.length > 0 || visiblePartners.length > 0) && (
        <div className="bg-[#E8DCCF] border-b border-[#D9C8B8] flex flex-wrap items-center px-4 md:px-10 h-auto py-6 md:py-0 md:min-h-20 gap-x-12 gap-y-6">
          {visibleStats.map((stat) => (
            <div key={stat._id} className="flex items-center gap-2">
              <span className="text-3xl font-black text-navy tracking-tight">
                {stat.value}
                {stat.unit ?? ""}
              </span>
              <span className="text-[10px] font-bold text-muted uppercase leading-tight whitespace-pre-line">
                {stat.label}
              </span>
            </div>
          ))}
          {visiblePartners.length > 0 && (
            <div className="md:ml-auto flex items-center gap-4">
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">
                Recent Partners:
              </span>
              <div className="flex gap-3">
                {visiblePartners.map((partner) => (
                  <div
                    key={partner._id}
                    className="w-10 h-10 rounded bg-white/40 border border-white flex items-center justify-center text-[10px] font-bold text-navy/70 px-1"
                    title={partner.name}
                  >
                    {partner.name.slice(0, 4)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-terracotta w-10 h-10 rounded-full flex items-center justify-center">
                <Cat className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-navy">
                SaveCat<span className="text-terracotta">Africa</span>
              </span>
            </Link>
            <p className="font-serif text-muted leading-relaxed pr-6">
              {tagline ??
                "Protecting Africa's felines with compassion and community-driven solutions."}
            </p>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] text-[#A89689] mb-8">
              Navigation
            </h5>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <FooterLink key={link._id} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] text-[#A89689] mb-8">
              Transparency
            </h5>
            <ul className="flex flex-col gap-4">
              {transparencyLinks.map((link) => (
                <FooterLink key={link._id} href={link.href} label={link.label} />
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] text-[#A89689] mb-8">
              Newsletter
            </h5>
            <p className="text-sm text-muted mb-6">
              Stay updated on our latest rescue missions.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2 mb-8">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-border-theme rounded-lg px-4 py-3 w-full text-sm font-inter outline-none focus:ring-2 focus:ring-terracotta transition-all"
                placeholder="Email Address"
                type="email"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-navy text-white p-3 rounded-lg hover:bg-terracotta transition-colors shadow-lg disabled:opacity-60"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            <div className="flex gap-6">
              {settings?.socialWebsite && (
                <a
                  href={settings.socialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-terracotta transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
              {settings?.socialEmail && (
                <a
                  href={`mailto:${settings.socialEmail}`}
                  className="text-muted hover:text-terracotta transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              )}
              {settings?.socialShare && (
                <a
                  href={settings.socialShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-terracotta transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-border-theme text-center">
          <p className="text-muted text-xs font-semibold uppercase tracking-widest opacity-60">
            {copyrightParts.join(" • ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
