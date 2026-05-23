/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { HeartPulse, Utensils, Users } from "lucide-react";

const threats = [
  {
    title: "Rampant Disease",
    description: "Rabies and feline distemper decimate local populations, posing risks to both wildlife and human communities.",
    icon: HeartPulse,
    delay: 0.1
  },
  {
    title: "Severe Malnutrition",
    description: "Resource scarcity leads to chronic hunger, leaving thousands of cats vulnerable to secondary infections and premature death.",
    icon: Utensils,
    delay: 0.2
  },
  {
    title: "Lack of Stewardship",
    description: "A lack of veterinary infrastructure and education leads to overpopulation and cycles of abandonment in growing cities.",
    icon: Users,
    delay: 0.3
  }
];

export function CrisisSection() {
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
          <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-[10px] font-bold uppercase tracking-widest rounded mb-4">Emergency Response Active</span>
          <h2 className="text-4xl md:text-6xl font-bold text-navy leading-[1.1] mb-6">The Silent Crisis</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Supporting local communities with veterinary care, education, and rescue infrastructure to ensure the safety of feral and domestic felines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {threats.map((threat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: threat.delay }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-border-theme hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-navy/5 rounded-lg flex items-center justify-center text-navy mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                <threat.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl text-navy mb-3 font-bold tracking-tight">{threat.title}</h3>
              <p className="text-sm text-muted leading-normal">
                {threat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
