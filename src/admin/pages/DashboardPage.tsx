import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { formatCents } from "../../lib/format";
import { useState } from "react";
import { useToast } from "../../lib/toast";
import {
  useAdminDonationStats,
  useSubscriberCount,
  useUnreadCount,
} from "../../hooks/useSiteData";

export function DashboardPage() {
  const { token } = useAdminToken();
  const donationStats = useAdminDonationStats(token);
  const unread = useUnreadCount(token);
  const subscribers = useSubscriberCount();
  const seedDatabase = useAction(api.admin.seedDatabase);
  const { showToast } = useToast();
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedDatabase({});
      showToast("Database seeded successfully!");
    } catch {
      showToast("Seed failed", "error");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-2">Dashboard</h1>
      <p className="text-muted mb-8">Overview of SaveCat Africa activity</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-border-theme p-6">
          <p className="text-xs uppercase tracking-widest text-muted font-bold mb-2">
            Total Raised
          </p>
          <p className="text-3xl font-black text-navy">
            {formatCents(donationStats?.totalCents ?? 0)}
          </p>
          <p className="text-sm text-muted mt-1">
            {donationStats?.totalDonations ?? 0} completed donations
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border-theme p-6">
          <p className="text-xs uppercase tracking-widest text-muted font-bold mb-2">
            Unread Messages
          </p>
          <p className="text-3xl font-black text-terracotta">{unread ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-border-theme p-6">
          <p className="text-xs uppercase tracking-widest text-muted font-bold mb-2">
            Newsletter Subscribers
          </p>
          <p className="text-3xl font-black text-navy">{subscribers ?? 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border-theme p-6">
        <h2 className="font-bold text-navy mb-2">First-time setup</h2>
        <p className="text-sm text-muted mb-4">
          Seed the database with default content from the original site. Impact
          stats are left empty so no fake numbers appear.
        </p>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="px-4 py-2 bg-terracotta text-white rounded-lg font-bold text-sm hover:bg-sunset disabled:opacity-60"
        >
          {seeding ? "Seeding..." : "Seed Database"}
        </button>
      </div>
    </div>
  );
}
