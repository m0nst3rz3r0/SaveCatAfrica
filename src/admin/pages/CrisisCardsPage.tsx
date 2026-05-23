import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { ICON_OPTIONS } from "../../lib/icons";
import { useToast } from "../../lib/toast";
import type { Id } from "../../../convex/_generated/dataModel";
import { useCrisisCards } from "../../hooks/useSiteData";

export function CrisisCardsPage() {
  const { token } = useAdminToken();
  const cards = useCrisisCards();
  const create = useMutation(api.content.createCrisisCard);
  const update = useMutation(api.content.updateCrisisCard);
  const remove = useMutation(api.content.deleteCrisisCard);
  const { showToast } = useToast();

  const [form, setForm] = useState({ title: "", description: "", icon: "HeartPulse", sortOrder: 0 });
  const [editId, setEditId] = useState<Id<"crisisCards"> | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      if (editId) {
        await update({ token, id: editId, ...form });
      } else {
        await create({ token, ...form });
      }
      showToast("Saved");
      setForm({ title: "", description: "", icon: "HeartPulse", sortOrder: (cards?.length ?? 0) });
      setEditId(null);
    } catch {
      showToast("Failed", "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">Mission Cards</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 mb-8 space-y-4">
        <FormField label="Title">
          <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </FormField>
        <FormField label="Description">
          <textarea className={inputClass} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        </FormField>
        <FormField label="Icon">
          <select className={inputClass} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
            {ICON_OPTIONS.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </FormField>
        <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm">
          {editId ? "Update" : "Add"} Card
        </button>
      </form>
      <ul className="space-y-3">
        {(cards ?? []).map((c) => (
          <li key={c._id} className="bg-white border rounded-xl p-4 flex justify-between items-start">
            <div>
              <p className="font-bold text-navy">{c.title}</p>
              <p className="text-sm text-muted">{c.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="text-terracotta font-bold text-sm" onClick={() => { setEditId(c._id); setForm({ title: c.title, description: c.description, icon: c.icon, sortOrder: c.sortOrder }); }}>Edit</button>
              <button className="text-red-600 font-bold text-sm" onClick={async () => { if (token) { await remove({ token, id: c._id }); showToast("Deleted"); } }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
