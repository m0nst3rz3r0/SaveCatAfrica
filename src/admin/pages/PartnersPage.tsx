import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { inputClass } from "../components/FormField";
import { useToast } from "../../lib/toast";
import { usePartners } from "../../hooks/useSiteData";

export function PartnersPage() {
  const { token } = useAdminToken();
  const partners = usePartners();
  const create = useMutation(api.content.createPartner);
  const remove = useMutation(api.content.deletePartner);
  const { showToast } = useToast();
  const [name, setName] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !name.trim()) return;
    await create({ token, name: name.trim(), sortOrder: partners?.length ?? 0 });
    setName("");
    showToast("Partner added");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">Partners</h1>
      <form onSubmit={handleAdd} className="flex gap-2 mb-8">
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Partner name" />
        <button type="submit" className="px-4 py-2 bg-navy text-white rounded-lg font-bold shrink-0">Add</button>
      </form>
      <ul className="space-y-2">
        {(partners ?? []).map((p) => (
          <li key={p._id} className="bg-white border rounded-xl p-4 flex justify-between">
            <span className="font-bold text-navy">{p.name}</span>
            <button className="text-red-600 font-bold text-sm" onClick={async () => { if (token) { await remove({ token, id: p._id }); showToast("Deleted"); } }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
