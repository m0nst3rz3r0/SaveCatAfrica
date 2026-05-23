/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cat, Globe, Mail, Share2, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-canvas border-t border-border-theme">
      {/* Stats Bar */}
      <div className="bg-[#E8DCCF] border-b border-[#D9C8B8] flex flex-wrap items-center px-4 md:px-10 h-auto py-6 md:py-0 md:h-20 gap-x-12 gap-y-6">
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-navy tracking-tight">14k+</span>
          <span className="text-[10px] font-bold text-muted uppercase leading-tight">Cats<br />Saved</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-navy tracking-tight">82</span>
          <span className="text-[10px] font-bold text-muted uppercase leading-tight">Mobile<br />Clinics</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-3xl font-black text-navy tracking-tight">100%</span>
          <span className="text-[10px] font-bold text-muted uppercase leading-tight">Direct<br />Impact</span>
        </div>
        <div className="md:ml-auto flex items-center gap-4">
          <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Recent Partners:</span>
          <div className="flex gap-3">
            {['WWF', 'AU', 'PETA'].map(partner => (
              <div key={partner} className="w-10 h-10 rounded bg-white/40 border border-white flex items-center justify-center text-[10px] font-bold text-navy/50">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-terracotta w-10 h-10 rounded-full flex items-center justify-center">
                <Cat className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-navy">SaveCat<span className="text-terracotta">Africa</span></span>
            </div>
            <p className="font-serif text-muted leading-relaxed pr-6">
              Protecting Africa's felines with compassion, medical excellence, and community-driven solutions since 2012.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] text-[#A89689] mb-8">Navigation</h5>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-sm font-semibold text-muted hover:text-terracotta transition-all">Mission</a></li>
              <li><a href="#" className="text-sm font-semibold text-muted hover:text-terracotta transition-all">Impact</a></li>
              <li><a href="#" className="text-sm font-semibold text-muted hover:text-terracotta transition-all">Our Team</a></li>
              <li><a href="#" className="text-sm font-semibold text-muted hover:text-terracotta transition-all">Reports</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] text-[#A89689] mb-8">Transparency</h5>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-sm font-semibold text-muted hover:text-terracotta transition-all">Financials</a></li>
              <li><a href="#" className="text-sm font-semibold text-muted hover:text-terracotta transition-all">Governance</a></li>
              <li><a href="#" className="text-sm font-semibold text-muted hover:text-terracotta transition-all">Annual Report</a></li>
              <li><a href="#contact" className="text-sm font-semibold text-muted hover:text-terracotta transition-all">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-[0.2em] text-[#A89689] mb-8">Newsletter</h5>
            <p className="text-sm text-muted mb-6">Stay updated on our latest rescue missions.</p>
            <div className="flex gap-2 mb-8">
              <input 
                className="bg-white border border-border-theme rounded-lg px-4 py-3 w-full text-sm font-inter outline-none focus:ring-2 focus:ring-terracotta transition-all" 
                placeholder="Email Address" 
                type="email" 
              />
              <button className="bg-navy text-white p-3 rounded-lg hover:bg-terracotta transition-colors shadow-lg">
                <Send className="h-5 w-5" />
              </button>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-muted hover:text-terracotta transition-colors"><Globe className="h-5 w-5" /></a>
              <a href="#" className="text-muted hover:text-terracotta transition-colors"><Mail className="h-5 w-5" /></a>
              <a href="#" className="text-muted hover:text-terracotta transition-colors"><Share2 className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-border-theme text-center">
          <p className="text-muted text-xs font-semibold uppercase tracking-widest opacity-60">
            © 2024 SaveCat Africa • Registered NGO #4321 • Based in Nairobi
          </p>
        </div>
      </div>
    </footer>
  );
}
