import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCampaigns, useSiteSettings } from "../hooks/useSiteData";
import { formatCents } from "../lib/format";
import { SectionSkeleton } from "./SectionSkeleton";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800";

export function CampaignsSection() {
  const settings = useSiteSettings();
  const campaigns = useCampaigns();

  if (campaigns === undefined) {
    return (
      <section id="campaigns" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SectionSkeleton className="h-80" />
            <SectionSkeleton className="h-80" />
            <SectionSkeleton className="h-80" />
          </div>
        </div>
      </section>
    );
  }

  if (campaigns.length === 0) return null;

  return (
    <section id="campaigns" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#A89689] mb-4 block"
            >
              Active Campaigns
            </motion.h3>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl text-navy font-bold leading-tight"
            >
              {settings?.protectionTitle ??
                "Building Resilience for Africa's Felines"}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/p/roadmap"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-navy text-white text-xs font-bold uppercase tracking-widest rounded-full transition-transform hover:scale-105 shadow-md"
            >
              View All Campaigns
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.slice(0, 3).map((campaign, index) => (
            <motion.article
              key={campaign._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-canvas rounded-2xl overflow-hidden border border-border-theme shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-border-theme/30">
                <img
                  src={campaign.imageUrl ?? FALLBACK_IMAGE}
                  alt={campaign.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-xl font-bold text-navy">{campaign.name}</h3>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  {campaign.description}
                </p>
                {campaign.goalCents > 0 && (
                  <p className="text-sm font-bold text-terracotta pt-2 border-t border-border-theme">
                    Goal: {formatCents(campaign.goalCents)}
                  </p>
                )}
                <a
                  href="#impact"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-navy hover:text-terracotta transition-colors mt-2"
                >
                  Support this campaign
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
