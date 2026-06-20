import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { formatCents } from "../lib/format";
import { useRecentDonors } from "../hooks/useSiteData";

export function RecentDonors() {
  const donors = useRecentDonors();

  if (!donors || donors.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-[10px] uppercase tracking-widest text-[#A89689] mb-3 flex items-center gap-1.5">
        <Heart className="h-3 w-3" />
        Recent Supporters
      </p>
      {donors.map((donor, index) => (
        <motion.p
          key={`${donor.donorName}-${donor.createdAt}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="text-sm text-white/80"
        >
          <span className="font-semibold text-white">{donor.donorName}</span>{" "}
          donated {formatCents(donor.amountCents)}
          {donor.isMonthly ? " / month" : ""}
        </motion.p>
      ))}
    </div>
  );
}
