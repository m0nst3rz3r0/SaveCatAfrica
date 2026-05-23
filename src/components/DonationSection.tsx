/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { CheckCircle2, Heart, ArrowRight, Shield, Cat } from "lucide-react";
import { useState } from "react";

const donationTiers = [
  {
    amount: 15,
    label: "Basic Care Supporter",
    description: "Feeds 3 rescued cats for an entire month.",
    popular: false
  },
  {
    amount: 50,
    label: "Medical Hero",
    description: "Funds 5 life-saving surgeries for injured stray cats every month.",
    popular: true
  },
  {
    amount: 100,
    label: "Sanctuary Patron",
    description: "Sustains a local community educator's salary for 2 weeks.",
    popular: false
  },
  {
    amount: 500,
    label: "Guardian Circle",
    description: "Sponsors a full week of Mobile Vet Clinic operations.",
    popular: false
  }
];

export function DonationSection() {
  const [selectedTier, setSelectedTier] = useState<number | null>(50);

  return (
    <section id="impact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-12 gap-12 items-start">
          {/* Left: Impact Text */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl text-navy font-bold mb-8">Global Impact</h2>
              <div className="prose prose-xl text-muted leading-relaxed">
                <p className="text-lg md:text-xl mb-6">
                  In Africa, every contribution is monumental. Because of our localized operation model across 14 nations, small gifts from abroad create dramatic shifts in animal welfare infrastructure.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-10">
                  <div className="border-l-4 border-terracotta pl-6 py-2">
                    <h5 className="text-3xl text-navy font-bold mb-2">$15</h5>
                    <p className="italic text-muted">Full course of vaccinations for one rescued kitten.</p>
                  </div>
                  <div className="border-l-4 border-terracotta pl-6 py-2">
                    <h5 className="text-3xl text-navy font-bold mb-2">$50</h5>
                    <p className="italic text-muted">Covers a life-saving surgery for an injured stray.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group overflow-hidden rounded-2xl shadow-2xl"
            >
              <img 
                alt="Volunteer with rescued cat" 
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000" 
                src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=2000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-10">
                <p className="text-white font-serif italic text-lg max-w-lg">
                  "Our mission is simple: to ensure no cat suffers in silence. Every contribution brings us closer to a continent where animal welfare is a standard, not a luxury."
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: Donation Sidebar Widget */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-navy p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Cat className="w-40 h-40 text-white" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-white text-3xl font-bold mb-2 tracking-tight">Choose Your Impact</h3>
                <p className="text-[#A89689] text-sm mb-8 leading-relaxed">Every dollar provides 2 days of food and clean water to our rescue centers across 14 nations.</p>

                <div className="space-y-4 mb-8">
                  {donationTiers.map((tier) => (
                    <button
                      key={tier.amount}
                      onClick={() => setSelectedTier(tier.amount)}
                      className={`w-full p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${
                        selectedTier === tier.amount 
                          ? 'bg-terracotta border-terracotta shadow-lg shadow-terracotta/20' 
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${selectedTier === tier.amount ? 'bg-white' : 'bg-terracotta'}`}></div>
                        <span className={`font-bold ${selectedTier === tier.amount ? 'text-white' : 'text-white'}`}>{tier.label}</span>
                      </div>
                      <span className={`font-black ${selectedTier === tier.amount ? 'text-white' : 'text-terracotta'}`}>${tier.amount}</span>
                    </button>
                  ))}
                </div>

                <div className="relative mb-6">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">$</span>
                  <input 
                    type="number" 
                    className="w-full bg-white border-0 rounded-xl p-4 pl-10 font-bold text-navy focus:ring-2 focus:ring-terracotta outline-none transition-all" 
                    placeholder="Custom Amount" 
                  />
                </div>

                <button className="w-full py-4 bg-white text-navy font-black rounded-xl text-center mb-8 hover:bg-canvas transition-colors uppercase tracking-widest text-sm">
                  DONATE NOW
                </button>

                <div className="pt-8 border-t border-white/10">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#A89689] mb-1">Monthly Goal</p>
                      <p className="text-white text-xl font-bold">$12,480 / $25k</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-[#A89689] mb-1">Supporters</p>
                      <p className="text-white font-bold">842</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '48%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-terracotta"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
