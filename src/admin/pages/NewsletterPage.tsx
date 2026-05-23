import { useAdminToken } from "../../lib/auth";
import { formatDate } from "../../lib/format";
import { useNewsletterSubscribers } from "../../hooks/useSiteData";

export function NewsletterPage() {
  const { token } = useAdminToken();
  const subscribers = useNewsletterSubscribers(token);

  const exportCsv = () => {
    if (!subscribers?.length) return;
    const csv = ["email,subscribedAt", ...subscribers.map((s) => `${s.email},${new Date(s.subscribedAt).toISOString()}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-navy">Newsletter</h1>
        <button
          onClick={exportCsv}
          disabled={!subscribers?.length}
          className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm disabled:opacity-50"
        >
          Export CSV
        </button>
      </div>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-canvas">
            <tr>
              <th className="text-left p-3 font-bold">Email</th>
              <th className="text-left p-3 font-bold">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {(subscribers ?? []).map((s) => (
              <tr key={s._id} className="border-t border-border-theme">
                <td className="p-3">{s.email}</td>
                <td className="p-3 text-muted">{formatDate(s.subscribedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
