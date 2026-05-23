import { useAdminToken } from "../../lib/auth";
import { formatCents, formatDate } from "../../lib/format";
import { useDonations } from "../../hooks/useSiteData";

export function DonationsPage() {
  const { token } = useAdminToken();
  const donations = useDonations(token);

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">Donations</h1>
      <p className="text-sm text-muted mb-6">Read-only list from Stripe checkout completions.</p>
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-canvas">
            <tr>
              <th className="text-left p-3 font-bold">Date</th>
              <th className="text-left p-3 font-bold">Amount</th>
              <th className="text-left p-3 font-bold">Email</th>
              <th className="text-left p-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {(donations ?? []).map((d) => (
              <tr key={d._id} className="border-t border-border-theme">
                <td className="p-3">{formatDate(d.createdAt)}</td>
                <td className="p-3 font-bold">{formatCents(d.amountCents)}</td>
                <td className="p-3">{d.donorEmail ?? "—"}</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                    d.status === "completed" ? "bg-green-100 text-green-800" :
                    d.status === "pending" ? "bg-amber-100 text-amber-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
            {donations?.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted">
                  No donations yet. Complete a Stripe test checkout to see entries here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
