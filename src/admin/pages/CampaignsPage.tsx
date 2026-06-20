import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { FormField, inputClass } from "../components/FormField";
import { ImageUpload } from "../components/ImageUpload";
import { useToast } from "../../lib/toast";
import type { Id } from "../../../convex/_generated/dataModel";

export function CampaignsPage() {
  const { token } = useAdminToken();
  const campaigns = useQuery(api.campaigns.listAll, token ? { token } : "skip");
  const create = useMutation(api.campaigns.create);
  const update = useMutation(api.campaigns.update);
  const remove = useMutation(api.campaigns.remove);
  const { showToast } = useToast();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    goalCents: 0,
    imageUrl: "",
    imageStorageId: null as Id<"_storage"> | null,
    imagePreviewUrl: null as string | null,
    deadline: "",
    active: true,
    sortOrder: 0,
  });
  const [editId, setEditId] = useState<Id<"campaigns"> | null>(null);

  const resetForm = () => {
    setForm({
      name: "",
      slug: "",
      description: "",
      goalCents: 0,
      imageUrl: "",
      imageStorageId: null,
      imagePreviewUrl: null,
      deadline: "",
      active: true,
      sortOrder: campaigns?.length ?? 0,
    });
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      goalCents: form.goalCents,
      imageUrl: form.imageUrl || undefined,
      imageStorageId: form.imageStorageId ?? undefined,
      deadline: form.deadline ? new Date(form.deadline).getTime() : undefined,
      active: form.active,
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
      <h1 className="text-3xl font-bold text-navy mb-6">Campaigns</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-border-theme p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Name">
            <input className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </FormField>
          <FormField label="Slug">
            <input className={inputClass} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="spring-rescue" required />
          </FormField>
          <FormField label="Goal ($)">
            <input
              type="number"
              className={inputClass}
              value={form.goalCents / 100}
              onChange={(e) => setForm({ ...form, goalCents: Math.round(parseFloat(e.target.value) * 100) || 0 })}
              required
            />
          </FormField>
          <FormField label="Deadline">
            <input type="date" className={inputClass} value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
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
          label="Campaign Image"
          onUpload={(storageId, url) => setForm({ ...form, imageStorageId: storageId, imagePreviewUrl: url })}
        />
        <FormField label="Description">
          <textarea className={inputClass} rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        </FormField>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
          Active
        </label>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm">
            {editId ? "Update" : "Add"} Campaign
          </button>
          {editId && (
            <button type="button" className="px-4 py-2 border border-border-theme rounded-lg font-bold text-sm text-muted" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3">
        {(campaigns ?? []).map((c) => (
          <li key={c._id} className="bg-white border border-border-theme rounded-xl p-4 flex justify-between items-start gap-4">
            <div>
              <p className="font-bold text-navy">{c.name}</p>
              <p className="text-sm text-terracotta">/{c.slug}</p>
              <p className="text-sm text-muted mt-1 line-clamp-2">{c.description}</p>
              <p className="text-xs text-muted mt-1">
                Goal: ${(c.goalCents / 100).toLocaleString()} · {c.active ? "Active" : "Inactive"}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                className="text-terracotta font-bold text-sm"
                onClick={() => {
                  setEditId(c._id);
                  setForm({
                    name: c.name,
                    slug: c.slug,
                    description: c.description,
                    goalCents: c.goalCents,
                    imageUrl: c.imageUrl ?? "",
                    imageStorageId: c.imageStorageId ?? null,
                    imagePreviewUrl: c.imageUrl ?? null,
                    deadline: c.deadline ? new Date(c.deadline).toISOString().slice(0, 10) : "",
                    active: c.active,
                    sortOrder: c.sortOrder,
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
                  await remove({ token, id: c._id });
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
