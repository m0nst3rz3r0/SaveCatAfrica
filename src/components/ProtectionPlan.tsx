/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowRight, Truck, Microscope, Home, School, Flame, Globe } from "lucide-react";

const plans = [
  {
    id: "01",
    title: "Mobile Clinics",
    description: "Bringing emergency medical care and vaccinations directly to remote villages.",
    icon: Truck
  },
  {
    id: "02",
    title: "Sterilization (TNR)",
    description: "Humane population control through Trap-Neuter-Return programs in urban areas.",
    icon: Microscope
  },
  {
    id: "03",
    title: "Sanctuary Care",
    description: "Safe havens for cats that cannot be returned to the streets due to injury or illness.",
    icon: Home
  },
  {
    id: "04",
    title: "Community Education",
    description: "Workshops for local pet owners on nutrition and responsible stewardship.",
    icon: School
  },
  {
    id: "05",
    title: "Emergency Rescue",
    description: "24/7 hotline and dispatch for animals in life-threatening situations.",
    icon: Flame
  },
  {
    id: "06",
    title: "Wildlife Integration",
    description: "Protecting the ecological balance by managing feline interactions with local wildlife.",
    icon: Globe
  }
];

export function ProtectionPlan() {
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
              The Protection Plan
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl text-navy font-bold leading-tight"
            >
              Building Resilience for <br /> Africa's Felines
            </motion.h2>
          </div>
          <motion.button 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="px-6 py-2.5 bg-navy text-white text-xs font-bold uppercase tracking-widest rounded-full transition-transform hover:scale-105 shadow-md"
          >
            Full Roadmap
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="bg-white p-6 rounded-2xl border border-border-theme hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-terracotta/10 rounded-lg flex items-center justify-center text-terracotta mb-4 group-hover:scale-110 transition-transform">
                <plan.icon className="h-5 w-5" />
              </div>
              
              <h4 className="font-bold text-navy mb-1">{plan.title}</h4>
              <p className="text-xs text-muted leading-normal">
                {plan.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
