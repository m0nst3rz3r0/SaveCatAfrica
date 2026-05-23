import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAdminToken } from "../../lib/auth";
import { Cat } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAction(api.auth.login);
  const { setToken } = useAdminToken();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = await login({ email, password });
      setToken(token);
      navigate("/admin");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-border-theme p-8 w-full max-w-md">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-terracotta w-10 h-10 rounded-full flex items-center justify-center">
            <Cat className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-navy">Admin Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-muted tracking-widest">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 bg-canvas border border-border-theme rounded-xl p-3 text-navy outline-none focus:ring-2 focus:ring-terracotta/30"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-muted tracking-widest">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 bg-canvas border border-border-theme rounded-xl p-3 text-navy outline-none focus:ring-2 focus:ring-terracotta/30"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white py-3 rounded-xl font-bold hover:bg-terracotta transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-xs text-muted mt-6 text-center">
          Default: admin@savecatafrica.org / changeme (set ADMIN_EMAIL and
          ADMIN_PASSWORD in Convex dashboard)
        </p>
      </div>
    </div>
  );
}
