import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useFaq } from "../hooks/useSiteData";
import { SectionSkeleton } from "./SectionSkeleton";

export function FaqSection() {
  const faqItems = useFaq();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (faqItems === undefined) {
    return (
      <section id="faq" className="py-24 bg-canvas">
        <div className="max-w-3xl mx-auto px-4 md:px-10">
          <SectionSkeleton />
        </div>
      </section>
    );
  }

  if (faqItems.length === 0) return null;

  return (
    <section id="faq" className="py-24 bg-canvas">
      <div className="max-w-3xl mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-[10px] font-bold uppercase tracking-widest rounded mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl text-navy font-bold leading-tight">
            Common Questions
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-border-theme overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-canvas/50 transition-colors"
                >
                  <span className="font-bold text-navy">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-terracotta shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
