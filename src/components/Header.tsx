import { useState } from "react";
import { Cat, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useFooterLinks } from "../hooks/useSiteData";

const defaultNavLinks = [
  { href: "#mission", label: "Our Mission" },
  { href: "#campaigns", label: "Campaigns" },
  { href: "/p/team", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const footerLinks = useFooterLinks();
  const cmsLinks =
    footerLinks
      ?.filter((l) => l.section === "navigation")
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((l) => ({ href: l.href, label: l.label })) ?? [];
  const navLinks = cmsLinks.length > 0 ? cmsLinks : defaultNavLinks;

  return (
    <header className="sticky top-0 w-full z-50 bg-white/50 backdrop-blur-md border-b border-border-theme h-20">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-10 h-full">
        <Link to="/" className="flex items-center gap-3">
          <div className="bg-terracotta w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
            <Cat className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-navy">
            SaveCat<span className="text-terracotta">Africa</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                to={link.href}
                className="font-semibold uppercase tracking-widest text-[10px] text-muted hover:text-terracotta transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="font-semibold uppercase tracking-widest text-[10px] text-muted hover:text-terracotta transition-colors"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#impact"
            className="hidden sm:inline-flex px-6 py-2.5 bg-navy text-white text-xs font-bold uppercase tracking-widest rounded-full transition-transform hover:scale-105 shadow-md"
          >
            Donate Now
          </a>
          <button
            type="button"
            className="md:hidden p-2 text-navy"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden bg-white border-t border-border-theme px-4 py-4 space-y-1 shadow-lg">
          {navLinks.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-2 font-semibold uppercase tracking-widest text-xs text-navy hover:text-terracotta transition-colors border-b border-border-theme last:border-0"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3 px-2 font-semibold uppercase tracking-widest text-xs text-navy hover:text-terracotta transition-colors border-b border-border-theme last:border-0"
              >
                {link.label}
              </a>
            )
          )}
          <a
            href="#impact"
            onClick={() => setOpen(false)}
            className="block mt-3 py-3 text-center bg-terracotta text-white font-bold uppercase tracking-widest text-xs rounded-xl"
          >
            Donate Now
          </a>
        </nav>
      )}
    </header>
  );
}
