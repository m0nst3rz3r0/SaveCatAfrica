import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { ImageUpload } from "../components/ImageUpload";
import { useToast } from "../../lib/toast";
import type { Id } from "../../../convex/_generated/dataModel";

import type { Testimonial } from "../../types/documents";

export function TestimonialsPage() {
  const { token } = useAdminToken();
  const testimonials = useQuery(
    api.testimonials.listAll,
    token ? { token } : "skip"
  ) as Testimonial[] | undefined;
  const create = useMutation(api.testimonials.create);
  const update = useMutation(api.testimonials.update);
  const remove = useMutation(api.testimonials.remove);
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    role: "",
    quote: "",
    imageUrl: "",
    imageStorageId: null as Id<"_storage"> | null,
    imagePreviewUrl: null as string | null,
    visible: true,
    sortOrder: 0,
  });
  const [editId, setEditId] = useState<Id<"testimonials"> | null>(null);

  const resetForm = () => {
    setForm({
      name: "",
      role: "",
      quote: "",
      imageUrl: "",
      imageStorageId: null,
      imagePreviewUrl: null,
      visible: true,
      sortOrder: testimonials?.length ?? 0,
    });
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const payload = {
      name: form.name,
      role: form.role,
      quote: form.quote,
      imageUrl: form.imageUrl || undefined,
      imageStorageId: form.imageStorageId ?? undefined,
      visible: form.visible,
      sortOrder: form.sortOrder,
    };
    try {
      if (editId) {
        await update({ token, id: editId, ...payload });
      } else {
        await create({ token, ...payload });
      }
      showToast("Saved");
      resetForm();
    } catch {
      showToast("Failed", "error");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">Testimonials</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border-theme p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Name">
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </FormField>
          <FormField label="Role">
            <input className={inputClass} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          </FormField>
          <FormField label="Sort Order">
            <input type="number" className={inputClass} value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })} />
          </FormField>
          <FormField label="Image URL (fallback)">
            <input className={inputClass} value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          </FormField>
        </div>
        <ImageUpload
          token={token}
          value={form.imageStorageId}
          previewUrl={(form.imagePreviewUrl ?? form.imageUrl) || undefined}
          label="Photo"
          onUpload={(storageId, url) => setForm({ ...form, imageStorageId: storageId, imagePreviewUrl: url })}
        />
        <FormField label="Quote">
          <textarea className={inputClass} rows={4} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} required />
        </FormField>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
          Visible on site
        </label>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm">
            {editId ? "Update" : "Add"} Testimonial
          </button>
          {editId && (
            <button type="button" className="px-4 py-2 border border-border-theme rounded-lg font-bold text-sm text-muted" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3">
        {(testimonials ?? []).map((t) => (
          <li key={t._id} className="bg-white border border-border-theme rounded-xl p-4 flex justify-between items-start gap-4">
            <div className="flex gap-4">
              {t.imageUrl && <img src={t.imageUrl} alt="" className="w-12 h-12 object-cover rounded-full shrink-0" />}
              <div>
                <p className="font-bold text-navy">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
                <p className="text-sm text-muted mt-1 line-clamp-2">&ldquo;{t.quote}&rdquo;</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                className="text-terracotta font-bold text-sm"
                onClick={() => {
                  setEditId(t._id);
                  setForm({
                    name: t.name,
                    role: t.role,
                    quote: t.quote,
                    imageUrl: t.imageUrl ?? "",
                    imageStorageId: t.imageStorageId ?? null,
                    imagePreviewUrl: t.imageUrl ?? null,
                    visible: t.visible,
                    sortOrder: t.sortOrder,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="text-red-600 font-bold text-sm"
                onClick={async () => {
                  if (!token) return;
                  await remove({ token, id: t._id });
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
