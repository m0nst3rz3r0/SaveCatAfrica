/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Cat, ChevronRight } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 w-full z-50 bg-white/50 backdrop-blur-md border-b border-border-theme h-20">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-10 h-full">
        <div className="flex items-center gap-3">
          <div className="bg-terracotta w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
            <Cat className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-navy">SaveCat<span className="text-terracotta">Africa</span></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#mission" className="font-semibold uppercase tracking-widest text-[10px] text-terracotta transition-colors">Mission</a>
          <a href="#protection" className="font-semibold uppercase tracking-widest text-[10px] text-muted hover:text-terracotta transition-colors">Protection Plan</a>
          <a href="#impact" className="font-semibold uppercase tracking-widest text-[10px] text-muted hover:text-terracotta transition-colors">Global Impact</a>
          <a href="#contact" className="font-semibold uppercase tracking-widest text-[10px] text-muted hover:text-terracotta transition-colors">Contact</a>
        </nav>

        <button className="px-6 py-2.5 bg-navy text-white text-xs font-bold uppercase tracking-widest rounded-full transition-transform hover:scale-105 shadow-md">
          Take Action
        </button>
      </div>
    </header>
  );
}
