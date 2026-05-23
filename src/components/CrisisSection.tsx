import { motion } from "motion/react";
import { getIcon } from "../lib/icons";
import { useCrisisCards, useSiteSettings } from "../hooks/useSiteData";

export function CrisisSection() {
  const settings = useSiteSettings();
  const cards = useCrisisCards();

  return (
    <section id="mission" className="py-24 bg-canvas overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-[10px] font-bold uppercase tracking-widest rounded mb-4">
            {settings?.crisisBadge ?? "Emergency Response Active"}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-navy leading-[1.1] mb-6">
            {settings?.crisisTitle ?? "The Silent Crisis"}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            {settings?.crisisSubtitle ??
              "Supporting local communities with veterinary care, education, and rescue infrastructure."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {(cards ?? []).map((threat, index) => {
            const Icon = getIcon(threat.icon);
            return (
              <motion.div
                key={threat._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-border-theme hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-navy/5 rounded-lg flex items-center justify-center text-navy mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl text-navy mb-3 font-bold tracking-tight">
                  {threat.title}
                </h3>
                <p className="text-sm text-muted leading-normal">
                  {threat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
