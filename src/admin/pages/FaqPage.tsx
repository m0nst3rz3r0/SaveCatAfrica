import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { useToast } from "../../lib/toast";
import type { Id } from "../../../convex/_generated/dataModel";

export function FaqPage() {
  const { token } = useAdminToken();
  const items = useQuery(api.faq.listAll, token ? { token } : "skip");
  const create = useMutation(api.faq.create);
  const update = useMutation(api.faq.update);
  const remove = useMutation(api.faq.remove);
  const { showToast } = useToast();

  const [form, setForm] = useState({
    question: "",
    answer: "",
    visible: true,
    sortOrder: 0,
  });
  const [editId, setEditId] = useState<Id<"faqItems"> | null>(null);

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
      setForm({ question: "", answer: "", visible: true, sortOrder: items?.length ?? 0 });
      setEditId(null);
    } catch {
      showToast("Failed", "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">FAQ</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border-theme p-6 mb-8 space-y-4">
        <FormField label="Question">
          <input className={inputClass} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
        </FormField>
        <FormField label="Answer">
          <textarea className={inputClass} rows={4} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
        </FormField>
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Sort Order">
            <input type="number" className={inputClass} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
          </FormField>
          <label className="flex items-center gap-2 text-sm self-end pb-3">
            <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
            Visible on site
          </label>
        </div>
        <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm">
          {editId ? "Update" : "Add"} FAQ Item
        </button>
      </form>

      <ul className="space-y-3">
        {(items ?? []).map((f) => (
          <li key={f._id} className="bg-white border border-border-theme rounded-xl p-4 flex justify-between items-start">
            <div>
              <p className="font-bold text-navy">{f.question}</p>
              <p className="text-sm text-muted mt-1">{f.answer}</p>
              <p className="text-xs text-muted mt-1">{f.visible ? "Visible" : "Hidden"}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                className="text-terracotta font-bold text-sm"
                onClick={() => {
                  setEditId(f._id);
                  setForm({ question: f.question, answer: f.answer, visible: f.visible, sortOrder: f.sortOrder });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-red-600 font-bold text-sm"
                onClick={async () => {
                  if (!token) return;
                  await remove({ token, id: f._id });
                  showToast("Deleted");
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
