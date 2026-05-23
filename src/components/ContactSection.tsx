/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Mail, MapPin, Clock, Send } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-canvas relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl text-navy font-bold mb-6">Get in Touch</h2>
            <p className="text-lg text-muted mb-10 leading-relaxed">
              Have questions about our missions, how to volunteer, or corporate partnerships? We'd love to hear from you. Our team on the ground is ready to connect.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-terracotta shadow-sm border border-border-theme group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy">Email Us</h4>
                  <p className="text-muted">info@savecatafrica.org</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-terracotta shadow-sm border border-border-theme group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy">Regional Office</h4>
                  <p className="text-muted">Nairobi, Kenya</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-terracotta shadow-sm border border-border-theme group-hover:scale-110 group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy">Operation Hours</h4>
                  <p className="text-muted">Mon - Fri, 9am - 5pm EAT</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-border-theme"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-inter text-xs uppercase tracking-widest font-bold text-[#A89689]">First Name</label>
                  <input className="w-full bg-canvas border border-border-theme rounded-xl p-4 text-navy focus:ring-2 focus:ring-terracotta/20 outline-none transition-all" placeholder="Jane" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="font-inter text-xs uppercase tracking-widest font-bold text-[#A89689]">Last Name</label>
                  <input className="w-full bg-canvas border border-border-theme rounded-xl p-4 text-navy focus:ring-2 focus:ring-terracotta/20 outline-none transition-all" placeholder="Doe" type="text" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="font-inter text-xs uppercase tracking-widest font-bold text-[#A89689]">Email Address</label>
                <input className="w-full bg-canvas border border-border-theme rounded-xl p-4 text-navy focus:ring-2 focus:ring-terracotta/20 outline-none transition-all" placeholder="jane@example.com" type="email" />
              </div>
              
              <div className="space-y-2">
                <label className="font-inter text-xs uppercase tracking-widest font-bold text-[#A89689]">Message</label>
                <textarea className="w-full bg-canvas border border-border-theme rounded-xl p-4 text-navy focus:ring-2 focus:ring-terracotta/20 outline-none transition-all h-32 resize-none" placeholder="How can we help?"></textarea>
              </div>
              
              <button className="w-full bg-navy py-5 rounded-xl text-white font-bold shadow-lg hover:bg-terracotta transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                Send Message
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
