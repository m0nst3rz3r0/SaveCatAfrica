/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ShieldCheck } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 h-[120%]"
      >
        <img 
          alt="Cinematic tabby cat portrait" 
          className="w-full h-full object-cover scale-110" 
          src="https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&q=80&w=2000" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#0D1B2A]/70" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 w-full grid grid-cols-12 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ opacity: opacityText }}
          className="col-span-12 md:col-span-10 flex flex-col gap-8"
        >
          <div className="inline-flex items-center gap-2 bg-terracotta/20 text-terracotta px-4 py-1.5 rounded-full w-fit">
            <ShieldCheck className="h-4 w-4" />
            <span className="font-inter text-[10px] uppercase tracking-widest font-bold">Emergency Response Active</span>
          </div>
          
          <h1 className="font-inter text-5xl sm:text-6xl md:text-8xl text-white font-bold leading-[1.1] tracking-tight">
            Protecting Domestic <br /> 
            <span className="text-terracotta">Cats Across Africa</span>
          </h1>
          
          <p className="font-inter text-lg sm:text-xl text-white/90 max-w-3xl leading-relaxed">
            Millions of domestic cats in Africa suffer from neglect, abuse, superstition, and lack of veterinary care. They face a unique and devastating set of challenges that most people in the Western world rarely consider — from being killed for use in black magic rituals to suffering from diseases with no access to vaccines.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <button className="w-full sm:w-auto bg-terracotta hover:bg-sunset text-white font-inter px-10 py-5 rounded-lg font-bold uppercase tracking-widest text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
              DONATE NOW
            </button>
            <button className="w-full sm:w-auto border-2 border-white/40 hover:border-white text-white font-inter px-10 py-5 rounded-lg font-bold transition-all backdrop-blur-sm hover:bg-white/10 active:scale-95">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="font-inter text-[10px] uppercase tracking-widest font-bold">Scroll Down</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
