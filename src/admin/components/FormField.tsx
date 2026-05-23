export function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase text-muted tracking-widest block mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputClass =
  "w-full bg-canvas border border-border-theme rounded-xl p-3 text-navy text-sm outline-none focus:ring-2 focus:ring-terracotta/30";
