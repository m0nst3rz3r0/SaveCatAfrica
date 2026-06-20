import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FormField } from "./FormField";
import type { Id } from "../../../convex/_generated/dataModel";
import { useToast } from "../../lib/toast";

type ImageUploadProps = {
  token: string | null;
  value: Id<"_storage"> | null;
  previewUrl: string | null | undefined;
  onUpload: (storageId: Id<"_storage">, url: string) => void;
  label: string;
};

export function ImageUpload({ token, value, previewUrl, onUpload, label }: ImageUploadProps) {
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const save = useMutation(api.media.save);
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      onUpload(storageId, URL.createObjectURL(file));
      showToast("Image uploaded");
    } catch {
      showToast("Upload failed", "error");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const displayUrl = previewUrl ?? null;

  return (
    <FormField label={label}>
      <div className="space-y-3">
        {displayUrl && (
          <img
            src={displayUrl}
            alt=""
            className="w-full max-w-xs h-32 object-cover rounded-xl border border-border-theme"
          />
        )}
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="text-sm text-navy file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-canvas file:font-bold file:text-navy"
            onChange={handleFileChange}
            disabled={!token || uploading}
          />
          <button
            type="button"
            className="px-4 py-2 bg-navy text-white rounded-lg font-bold text-sm shrink-0 disabled:opacity-50"
            onClick={() => inputRef.current?.click()}
            disabled={!token || uploading}
          >
            {uploading ? "Uploading…" : value ? "Replace" : "Upload"}
          </button>
        </div>
      </div>
    </FormField>
  );
}
