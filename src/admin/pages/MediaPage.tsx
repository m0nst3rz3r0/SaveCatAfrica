import { useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { useToast } from "../../lib/toast";
import type { Id } from "../../../convex/_generated/dataModel";

export function MediaPage() {
  const { token } = useAdminToken();
  const media = useQuery(api.media.list, token ? { token } : "skip");
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const save = useMutation(api.media.save);
  const remove = useMutation(api.media.remove);
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !token) return;

    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl({ token });
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = (await result.json()) as { storageId: Id<"_storage"> };
      await save({ token, storageId, name: file.name, contentType: file.type });
      showToast("Media uploaded");
    } catch {
      showToast("Upload failed", "error");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-navy mb-6">Media Library</h1>

      <div className="bg-white rounded-xl border border-border-theme p-6 mb-8">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
          disabled={!token || uploading}
        />
        <button
          type="button"
          className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm disabled:opacity-50"
          onClick={() => inputRef.current?.click()}
          disabled={!token || uploading}
        >
          {uploading ? "Uploading…" : "Upload Image"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(media ?? []).map((item) => (
          <div key={item._id} className="bg-white border border-border-theme rounded-xl overflow-hidden">
            {item.url && (
              <img src={item.url} alt={item.name} className="w-full h-32 object-cover" />
            )}
            <div className="p-3">
              <p className="text-sm font-bold text-navy truncate">{item.name}</p>
              <button
                type="button"
                className="text-red-600 font-bold text-sm mt-2"
                onClick={async () => {
                  if (!token) return;
                  try {
                    await remove({ token, id: item._id });
                    showToast("Deleted");
                  } catch {
                    showToast("Failed to delete", "error");
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
