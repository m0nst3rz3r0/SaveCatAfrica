const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;

export function ConvexSetup() {
  if (convexUrl) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-center text-sm text-amber-900">
      <strong>Setup required:</strong> Run{" "}
      <code className="bg-amber-100 px-1 rounded">npx convex dev</code> and add{" "}
      <code className="bg-amber-100 px-1 rounded">VITE_CONVEX_URL</code> to your{" "}
      <code className="bg-amber-100 px-1 rounded">.env.local</code> file, then seed
      the database from the admin dashboard.
    </div>
  );
}
