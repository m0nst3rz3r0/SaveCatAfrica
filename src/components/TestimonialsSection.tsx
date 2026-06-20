import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { useTestimonials } from "../hooks/useSiteData";
import { SectionSkeleton } from "./SectionSkeleton";

export function TestimonialsSection() {
  const testimonials = useTestimonials();

  if (testimonials === undefined) {
    return (
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <SectionSkeleton />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-[10px] font-bold uppercase tracking-widest rounded mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl text-navy font-bold leading-tight">
            Voices of Support
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-canvas p-8 rounded-2xl border border-border-theme relative"
            >
              <Quote className="h-8 w-8 text-terracotta/30 absolute top-6 right-6" />
              <p className="text-muted leading-relaxed mb-6 italic">
                "{item.quote}"
              </p>
              <footer className="flex items-center gap-4">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div>
                  <cite className="not-italic font-bold text-navy block">
                    {item.name}
                  </cite>
                  <span className="text-xs text-muted uppercase tracking-widest">
                    {item.role}
                  </span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
