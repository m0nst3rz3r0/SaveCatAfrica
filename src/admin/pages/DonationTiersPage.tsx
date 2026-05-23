import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { formatCents } from "../../lib/format";
import { useToast } from "../../lib/toast";
import type { Id } from "../../../convex/_generated/dataModel";
import { useDonationTiers } from "../../hooks/useSiteData";

export function DonationTiersPage() {
  const { token } = useAdminToken();
  const tiers = useDonationTiers();
  const create = useMutation(api.content.createDonationTier);
  const update = useMutation(api.content.updateDonationTier);
  const remove = useMutation(api.content.deleteDonationTier);
  const { showToast } = useToast();

  const [form, setForm] = useState({ amountDollars: 50, label: "", description: "", popular: false, sortOrder: 0 });
  const [editId, setEditId] = useState<Id<"donationTiers"> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const data = {
      amountCents: Math.round(form.amountDollars * 100),
      label: form.label,
      description: form.description,
      popular: form.popular,
      sortOrder: form.sortOrder,
    };
    try {
      if (editId) {
        await update({ token, id: editId, ...data });
      } else {
        await create({ token, ...data });
      }
      showToast("Saved");
      setEditId(null);
    } catch {
      showToast("Failed", "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">Donation Tiers</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Amount ($)">
            <input type="number" className={inputClass} value={form.amountDollars} onChange={(e) => setForm({ ...form, amountDollars: parseFloat(e.target.value) || 0 })} />
          </FormField>
          <FormField label="Label">
            <input className={inputClass} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
          </FormField>
        </div>
        <FormField label="Description">
          <textarea className={inputClass} rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        </FormField>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.popular} onChange={(e) => setForm({ ...form, popular: e.target.checked })} />
          Mark as popular (default selection)
        </label>
        <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm">
          {editId ? "Update" : "Add"} Tier
        </button>
      </form>
      <ul className="space-y-3">
        {(tiers ?? []).map((t) => (
          <li key={t._id} className="bg-white border rounded-xl p-4 flex justify-between">
            <div>
              <p className="font-bold text-navy">{t.label} — {formatCents(t.amountCents)}{t.popular ? " ★" : ""}</p>
              <p className="text-sm text-muted">{t.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-terracotta font-bold text-sm" onClick={() => { setEditId(t._id); setForm({ amountDollars: t.amountCents / 100, label: t.label, description: t.description, popular: t.popular, sortOrder: t.sortOrder }); }}>Edit</button>
              <button className="text-red-600 font-bold text-sm" onClick={async () => { if (token) { await remove({ token, id: t._id }); showToast("Deleted"); } }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
