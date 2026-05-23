import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { useToast } from "../../lib/toast";
import type { Id } from "../../../convex/_generated/dataModel";
import { useAllImpactStats } from "../../hooks/useSiteData";

export function ImpactStatsPage() {
  const { token } = useAdminToken();
  const stats = useAllImpactStats(token);
  const create = useMutation(api.content.createImpactStat);
  const update = useMutation(api.content.updateImpactStat);
  const remove = useMutation(api.content.deleteImpactStat);
  const { showToast } = useToast();

  const [form, setForm] = useState({
    label: "Cats Saved",
    value: "",
    unit: "",
    sortOrder: 0,
    visible: true,
  });
  const [editId, setEditId] = useState<Id<"impactStats"> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      if (editId) {
        await update({ token, id: editId, ...form });
        showToast("Stat updated");
      } else {
        await create({ token, ...form });
        showToast("Stat created");
      }
      setForm({ label: "", value: "", unit: "", sortOrder: (stats?.length ?? 0), visible: true });
      setEditId(null);
    } catch {
      showToast("Failed to save", "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-2">Impact Stats</h1>
      <p className="text-muted mb-6 text-sm">
        Only stats with a value and visible=true appear on the site. Leave empty to hide fake numbers.
      </p>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border-theme p-6 mb-8 space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormField label="Label (use line break in display via short text)">
            <input className={inputClass} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
          </FormField>
          <FormField label="Value">
            <input className={inputClass} value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} placeholder="e.g. 500" />
          </FormField>
          <FormField label="Unit (optional, e.g. +)">
            <input className={inputClass} value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
          </FormField>
          <FormField label="Sort Order">
            <input type="number" className={inputClass} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
          </FormField>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
          Visible on site
        </label>
        <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm">
          {editId ? "Update" : "Add"} Stat
        </button>
      </form>

      <div className="bg-white rounded-xl border border-border-theme overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-canvas">
            <tr>
              <th className="text-left p-3 font-bold">Value</th>
              <th className="text-left p-3 font-bold">Label</th>
              <th className="text-left p-3 font-bold">Visible</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {(stats ?? []).map((s) => (
              <tr key={s._id} className="border-t border-border-theme">
                <td className="p-3 font-bold">{s.value}{s.unit}</td>
                <td className="p-3">{s.label}</td>
                <td className="p-3">{s.visible ? "Yes" : "No"}</td>
                <td className="p-3 text-right space-x-2">
                  <button
                    type="button"
                    className="text-terracotta font-bold"
                    onClick={() => {
                      setEditId(s._id);
                      setForm({ label: s.label, value: s.value, unit: s.unit ?? "", sortOrder: s.sortOrder, visible: s.visible });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-red-600 font-bold"
                    onClick={async () => {
                      if (!token) return;
                      await remove({ token, id: s._id });
                      showToast("Deleted");
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
