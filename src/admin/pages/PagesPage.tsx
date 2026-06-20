import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { useToast } from "../../lib/toast";
import type { Id } from "../../../convex/_generated/dataModel";
import { Link } from "react-router-dom";
import { usePages } from "../../hooks/useSiteData";

export function PagesPage() {
  const { token } = useAdminToken();
  const pages = usePages();
  const create = useMutation(api.content.createPage);
  const update = useMutation(api.content.updatePage);
  const remove = useMutation(api.content.deletePage);
  const { showToast } = useToast();

  const [form, setForm] = useState({ slug: "", title: "", body: "", coverImageUrl: "", videoUrl: "" });
  const [editId, setEditId] = useState<Id<"pages"> | null>(null);

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
      setForm({ slug: "", title: "", body: "", coverImageUrl: "", videoUrl: "" });
      setEditId(null);
    } catch {
      showToast("Failed", "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">CMS Pages</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 mb-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Slug">
            <input className={inputClass} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="team" required />
          </FormField>
          <FormField label="Title">
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </FormField>
        </div>
        <FormField label="Body (markdown)">
          <textarea className={inputClass} rows={8} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required />
        </FormField>
        <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm">
          {editId ? "Update" : "Add"} Page
        </button>
      </form>
      <ul className="space-y-3">
        {(pages ?? []).map((p) => (
          <li key={p._id} className="bg-white border rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-navy">{p.title}</p>
                <Link to={`/p/${p.slug}`} className="text-sm text-terracotta hover:underline">/p/{p.slug}</Link>
              </div>
              <div className="flex gap-2">
                <button className="text-terracotta font-bold text-sm" onClick={() => { setEditId(p._id); setForm({ slug: p.slug, title: p.title, body: p.body, coverImageUrl: p.coverImageUrl ?? "", videoUrl: p.videoUrl ?? "" }); }}>Edit</button>
                <button className="text-red-600 font-bold text-sm" onClick={async () => { if (token) { await remove({ token, id: p._id }); showToast("Deleted"); } }}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
