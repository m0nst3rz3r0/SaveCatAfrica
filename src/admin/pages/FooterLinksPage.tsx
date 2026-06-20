import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { useToast } from "../../lib/toast";
import type { Id } from "../../../convex/_generated/dataModel";
import { useFooterLinks } from "../../hooks/useSiteData";

export function FooterLinksPage() {
  const { token } = useAdminToken();
  const links = useFooterLinks();
  const create = useMutation(api.content.createFooterLink);
  const update = useMutation(api.content.updateFooterLink);
  const remove = useMutation(api.content.deleteFooterLink);
  const { showToast } = useToast();

  const [form, setForm] = useState({
    section: "About",
    label: "",
    href: "",
    sortOrder: 0,
  });
  const [editId, setEditId] = useState<Id<"footerLinks"> | null>(null);

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
      setForm({ section: "About", label: "", href: "", sortOrder: links?.length ?? 0 });
      setEditId(null);
    } catch {
      showToast("Failed", "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">Footer Links</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border-theme p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Section">
            <input className={inputClass} value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} required />
          </FormField>
          <FormField label="Label">
            <input className={inputClass} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
          </FormField>
          <FormField label="Href">
            <input className={inputClass} value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} placeholder="/about" required />
          </FormField>
          <FormField label="Sort Order">
            <input type="number" className={inputClass} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
          </FormField>
        </div>
        <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm">
          {editId ? "Update" : "Add"} Link
        </button>
      </form>

      <ul className="space-y-3">
        {(links ?? []).map((l) => (
          <li key={l._id} className="bg-white border border-border-theme rounded-xl p-4 flex justify-between items-start">
            <div>
              <p className="text-xs font-bold uppercase text-muted tracking-widest">{l.section}</p>
              <p className="font-bold text-navy">{l.label}</p>
              <p className="text-sm text-terracotta">{l.href}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                className="text-terracotta font-bold text-sm"
                onClick={() => {
                  setEditId(l._id);
                  setForm({ section: l.section, label: l.label, href: l.href, sortOrder: l.sortOrder });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-red-600 font-bold text-sm"
                onClick={async () => {
                  if (!token) return;
                  await remove({ token, id: l._id });
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
