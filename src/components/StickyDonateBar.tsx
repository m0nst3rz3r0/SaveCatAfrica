import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function StickyDonateBar() {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-navy border-t border-white/10 px-4 py-3 shadow-2xl"
    >
      <a
        href="#impact"
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-terracotta text-white font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-sunset transition-colors"
      >
        <Heart className="h-4 w-4" />
        Donate Now
      </a>
    </motion.div>
  );
}
