import { motion } from "motion/react";
import { Cat } from "lucide-react";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { formatCents } from "../lib/format";
import { useToast } from "../lib/toast";
import type { Id } from "../../convex/_generated/dataModel";
import {
  useDonationTiers,
  useFundraisingStats,
  useSiteSettings,
} from "../hooks/useSiteData";
import { RecentDonors } from "./RecentDonors";

export function DonationSection() {
  const settings = useSiteSettings();
  const tiers = useDonationTiers();
  const stats = useFundraisingStats();
  const createCheckout = useAction(api.donations.createCheckoutSession);
  const { showToast } = useToast();

  const defaultTier = tiers?.find((t) => t.popular) ?? tiers?.[0];
  const [selectedTierId, setSelectedTierId] = useState<Id<"donationTiers"> | null>(
    null
  );
  const [customAmount, setCustomAmount] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [loading, setLoading] = useState(false);

  const monthlyEnabled = settings?.monthlyGivingEnabled !== false;
  const showRecentDonors = settings?.showRecentDonors !== false;

  const selectedTier =
    tiers?.find((t) => t._id === selectedTierId) ?? defaultTier ?? null;

  const amountCents = customAmount
    ? Math.round(parseFloat(customAmount) * 100)
    : selectedTier?.amountCents ?? 0;

  const handleDonate = async () => {
    if (!amountCents || amountCents < 100) {
      showToast("Please enter an amount of at least $1", "error");
      return;
    }
    setLoading(true);
    try {
      const base = window.location.origin;
      const result = await createCheckout({
        amountCents,
        tierId: selectedTier?._id,
        isMonthly: monthlyEnabled && isMonthly,
        successUrl: `${base}/thank-you`,
        cancelUrl: `${base}/#impact`,
      });
      window.location.href = result.url;
    } catch (e) {
      showToast(
        e instanceof Error ? e.message : "Could not start checkout",
        "error"
      );
      setLoading(false);
    }
  };

  const imageUrl =
    settings?.donationImageUrl ??
    "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=2000";

  const showProgress = stats?.hasGoal;

  return (
    <section id="impact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-12 gap-12 items-start">
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl text-navy font-bold mb-8">
                Global Impact
              </h2>
              <div className="prose prose-xl text-muted leading-relaxed">
                <p className="text-lg md:text-xl mb-6">
                  {settings?.impactIntro ??
                    "In Africa, every contribution is monumental."}
                  {settings?.nationsCount
                    ? ` Our localized operation model spans ${settings.nationsCount} nations.`
                    : ""}
                </p>

                {(tiers ?? []).slice(0, 2).map((tier) => (
                  <div
                    key={tier._id}
                    className="border-l-4 border-terracotta pl-6 py-2 mb-6"
                  >
                    <h5 className="text-3xl text-navy font-bold mb-2">
                      {formatCents(tier.amountCents)}
                    </h5>
                    <p className="italic text-muted">{tier.description}</p>
                  </div>
                ))}
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
                src={imageUrl}
              />
              {settings?.impactQuote && (
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex items-end p-10">
                  <p className="text-white font-serif italic text-lg max-w-lg">
                    "{settings.impactQuote}"
                  </p>
                </div>
              )}
            </motion.div>
          </div>

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
                <h3 className="text-white text-3xl font-bold mb-2 tracking-tight">
                  Choose Your Impact
                </h3>
                <p className="text-[#A89689] text-sm mb-8 leading-relaxed">
                  {settings?.donationSidebarNote ??
                    "Every dollar supports rescue centers across Africa."}
                </p>

                <div className="space-y-4 mb-8">
                  {(tiers ?? []).map((tier) => (
                    <button
                      key={tier._id}
                      type="button"
                      onClick={() => {
                        setSelectedTierId(tier._id);
                        setCustomAmount("");
                      }}
                      className={`w-full p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${
                        (selectedTierId ?? defaultTier?._id) === tier._id
                          ? "bg-terracotta border-terracotta shadow-lg shadow-terracotta/20"
                          : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            (selectedTierId ?? defaultTier?._id) === tier._id
                              ? "bg-white"
                              : "bg-terracotta"
                          }`}
                        />
                        <span className="font-bold text-white">{tier.label}</span>
                      </div>
                      <span className="font-black text-white">
                        {formatCents(tier.amountCents)}
                        {monthlyEnabled && isMonthly ? "/mo" : ""}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="relative mb-6">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedTierId(null);
                    }}
                    className="w-full bg-white border-0 rounded-xl p-4 pl-10 font-bold text-navy focus:ring-2 focus:ring-terracotta outline-none transition-all"
                    placeholder="Custom Amount"
                  />
                </div>

                {monthlyEnabled && (
                  <label className="flex items-center gap-3 mb-6 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isMonthly}
                      onChange={(e) => setIsMonthly(e.target.checked)}
                      className="w-4 h-4 rounded accent-terracotta"
                    />
                    <span className="text-sm text-white/90 font-semibold">
                      Give monthly — sustain rescue operations year-round
                    </span>
                  </label>
                )}

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleDonate}
                  className="w-full py-4 bg-white text-navy font-black rounded-xl text-center mb-8 hover:bg-canvas transition-colors uppercase tracking-widest text-sm disabled:opacity-60"
                >
                  {loading
                    ? "Redirecting..."
                    : isMonthly && monthlyEnabled
                      ? "DONATE MONTHLY"
                      : "DONATE NOW"}
                </button>

                {showRecentDonors && <RecentDonors />}

                {showProgress && stats && (
                  <div className="pt-8 border-t border-white/10 mt-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#A89689] mb-1">
                          Monthly Goal
                        </p>
                        <p className="text-white text-xl font-bold">
                          {formatCents(stats.raisedCents)} /{" "}
                          {formatCents(stats.monthlyGoalCents)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-[#A89689] mb-1">
                          Supporters
                        </p>
                        <p className="text-white font-bold">
                          {stats.supporterCount}
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${stats.progressPercent}%`,
                        }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-terracotta"
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
