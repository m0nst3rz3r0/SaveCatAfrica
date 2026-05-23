import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { ICON_OPTIONS } from "../../lib/icons";
import { useToast } from "../../lib/toast";
import type { Id } from "../../../convex/_generated/dataModel";
import { useProtectionPlans } from "../../hooks/useSiteData";

export function ProtectionPlansPage() {
  const { token } = useAdminToken();
  const plans = useProtectionPlans();
  const create = useMutation(api.content.createProtectionPlan);
  const update = useMutation(api.content.updateProtectionPlan);
  const remove = useMutation(api.content.deleteProtectionPlan);
  const { showToast } = useToast();

  const [form, setForm] = useState({ planId: "", title: "", description: "", icon: "Truck", sortOrder: 0 });
  const [editId, setEditId] = useState<Id<"protectionPlans"> | null>(null);

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
      setForm({ planId: "", title: "", description: "", icon: "Truck", sortOrder: (plans?.length ?? 0) });
      setEditId(null);
    } catch {
      showToast("Failed", "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">Protection Plans</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Plan ID">
            <input className={inputClass} value={form.planId} onChange={(e) => setForm({ ...form, planId: e.target.value })} required />
          </FormField>
          <FormField label="Title">
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </FormField>
        </div>
        <FormField label="Description">
          <textarea className={inputClass} rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        </FormField>
        <FormField label="Icon">
          <select className={inputClass} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
            {ICON_OPTIONS.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </FormField>
        <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm">
          {editId ? "Update" : "Add"} Plan
        </button>
      </form>
      <ul className="space-y-3">
        {(plans ?? []).map((p) => (
          <li key={p._id} className="bg-white border rounded-xl p-4 flex justify-between">
            <div>
              <p className="font-bold text-navy">{p.title}</p>
              <p className="text-sm text-muted">{p.description}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-terracotta font-bold text-sm" onClick={() => { setEditId(p._id); setForm({ planId: p.planId, title: p.title, description: p.description, icon: p.icon, sortOrder: p.sortOrder }); }}>Edit</button>
              <button className="text-red-600 font-bold text-sm" onClick={async () => { if (token) { await remove({ token, id: p._id }); showToast("Deleted"); } }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
