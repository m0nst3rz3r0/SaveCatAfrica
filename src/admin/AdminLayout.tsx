import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Cat, LogOut } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAdminToken } from "../lib/auth";

const navItems = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/settings", label: "Site Settings" },
  { to: "/admin/impact", label: "Impact Stats" },
  { to: "/admin/mission", label: "Mission Cards" },
  { to: "/admin/protection", label: "Protection Plans" },
  { to: "/admin/tiers", label: "Donation Tiers" },
  { to: "/admin/partners", label: "Partners" },
  { to: "/admin/pages", label: "Pages" },
  { to: "/admin/donations", label: "Donations" },
  { to: "/admin/contacts", label: "Contacts" },
  { to: "/admin/newsletter", label: "Newsletter" },
];

export function AdminLayout() {
  const { token, setToken } = useAdminToken();
  const logout = useMutation(api.auth.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (token) await logout({ token });
    setToken(null);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-canvas flex">
      <aside className="w-64 bg-navy text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <Cat className="h-6 w-6 text-terracotta" />
            <span className="font-bold">
              SaveCat <span className="text-terracotta text-sm">Admin</span>
            </span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-terracotta text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
