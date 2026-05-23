import { Navigate } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAdminToken } from "../lib/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAdminToken();
  const isAdmin = useQuery(api.auth.isAdmin, { token: token ?? undefined });

  if (isAdmin === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-canvas">
        <p className="text-muted">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
