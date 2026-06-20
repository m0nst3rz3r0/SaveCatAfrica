import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteData";

export function TrustStrip() {
  const settings = useSiteSettings();

  if (settings?.showTrustStrip === false) return null;

  const text =
    settings?.trustStripText ??
    "Registered nonprofit · 100% goes to rescue operations · Secure Stripe payments";

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-navy text-white py-3 px-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
        <ShieldCheck className="h-4 w-4 text-terracotta shrink-0" />
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
          {text}
        </p>
      </div>
    </motion.div>
  );
}
