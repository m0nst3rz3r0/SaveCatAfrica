import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { ImageUpload } from "../components/ImageUpload";
import { useToast } from "../../lib/toast";
import type { Id } from "../../../convex/_generated/dataModel";

import type { RescueStory } from "../../types/documents";

export function StoriesPage() {
  const { token } = useAdminToken();
  const stories = useQuery(
    api.stories.listAll,
    token ? { token } : "skip"
  ) as RescueStory[] | undefined;
  const create = useMutation(api.stories.create);
  const update = useMutation(api.stories.update);
  const remove = useMutation(api.stories.remove);
  const { showToast } = useToast();

  const [form, setForm] = useState({
    catName: "",
    title: "",
    story: "",
    location: "",
    amountNeededCents: 0,
    imageUrl: "",
    imageStorageId: null as Id<"_storage"> | null,
    imagePreviewUrl: null as string | null,
    featured: false,
    visible: true,
    sortOrder: 0,
  });
  const [editId, setEditId] = useState<Id<"rescueStories"> | null>(null);

  const resetForm = () => {
    setForm({
      catName: "",
      title: "",
      story: "",
      location: "",
      amountNeededCents: 0,
      imageUrl: "",
      imageStorageId: null,
      imagePreviewUrl: null,
      featured: false,
      visible: true,
      sortOrder: stories?.length ?? 0,
    });
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const payload = {
      catName: form.catName,
      title: form.title,
      story: form.story,
      location: form.location || undefined,
      amountNeededCents: form.amountNeededCents || undefined,
      imageUrl: form.imageUrl || undefined,
      imageStorageId: form.imageStorageId ?? undefined,
      featured: form.featured,
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
      <h1 className="text-3xl font-bold text-navy mb-6">Rescue Stories</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border-theme p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Cat Name">
            <input className={inputClass} value={form.catName} onChange={(e) => setForm({ ...form, catName: e.target.value })} required />
          </FormField>
          <FormField label="Title">
            <input className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </FormField>
          <FormField label="Location">
            <input className={inputClass} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </FormField>
          <FormField label="Amount Needed ($)">
            <input
              type="number"
              className={inputClass}
              value={form.amountNeededCents / 100}
              onChange={(e) => setForm({ ...form, amountNeededCents: Math.round(parseFloat(e.target.value) * 100) || 0 })}
            />
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
          label="Story Image"
          onUpload={(storageId, url) => setForm({ ...form, imageStorageId: storageId, imagePreviewUrl: url })}
        />
        <FormField label="Story">
          <textarea className={inputClass} rows={5} value={form.story} onChange={(e) => setForm({ ...form, story: e.target.value })} required />
        </FormField>
        <div className="flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
            Visible
          </label>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm">
            {editId ? "Update" : "Add"} Story
          </button>
          {editId && (
            <button type="button" className="px-4 py-2 border border-border-theme rounded-lg font-bold text-sm text-muted" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3">
        {(stories ?? []).map((s) => (
          <li key={s._id} className="bg-white border border-border-theme rounded-xl p-4 flex justify-between items-start gap-4">
            <div className="flex gap-4">
              {s.imageUrl && <img src={s.imageUrl} alt="" className="w-16 h-16 object-cover rounded-lg shrink-0" />}
              <div>
                <p className="font-bold text-navy">{s.catName} — {s.title}</p>
                <p className="text-sm text-muted line-clamp-2">{s.story}</p>
                <p className="text-xs text-muted mt-1">{s.visible ? "Visible" : "Hidden"}{s.featured ? " · Featured" : ""}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                className="text-terracotta font-bold text-sm"
                onClick={() => {
                  setEditId(s._id);
                  setForm({
                    catName: s.catName,
                    title: s.title,
                    story: s.story,
                    location: s.location ?? "",
                    amountNeededCents: s.amountNeededCents ?? 0,
                    imageUrl: s.imageUrl ?? "",
                    imageStorageId: s.imageStorageId ?? null,
                    imagePreviewUrl: s.imageUrl ?? null,
                    featured: s.featured,
                    visible: s.visible,
                    sortOrder: s.sortOrder,
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
                  await remove({ token, id: s._id });
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
