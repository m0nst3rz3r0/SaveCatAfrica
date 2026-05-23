import { motion } from "motion/react";
import { getIcon } from "../lib/icons";
import { Link } from "react-router-dom";
import { useFirstPage, useProtectionPlans, useSiteSettings } from "../hooks/useSiteData";

export function ProtectionPlan() {
  const settings = useSiteSettings();
  const plans = useProtectionPlans();
  const firstPage = useFirstPage();

  const roadmapHref = firstPage ? `/p/${firstPage.slug}` : "#protection";

  return (
    <section id="protection" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#A89689] mb-4 block"
            >
              {settings?.protectionEyebrow ?? "The Protection Plan"}
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
              to={roadmapHref}
              className="inline-block px-6 py-2.5 bg-navy text-white text-xs font-bold uppercase tracking-widest rounded-full transition-transform hover:scale-105 shadow-md"
            >
              Full Roadmap
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(plans ?? []).map((plan, index) => {
            const Icon = getIcon(plan.icon);
            return (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="bg-white p-6 rounded-2xl border border-border-theme hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-terracotta/10 rounded-lg flex items-center justify-center text-terracotta mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="font-bold text-navy mb-1">{plan.title}</h4>
                <p className="text-xs text-muted leading-normal">
                  {plan.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
