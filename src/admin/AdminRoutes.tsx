import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminLayout } from "./AdminLayout";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ImpactStatsPage } from "./pages/ImpactStatsPage";
import { CrisisCardsPage } from "./pages/CrisisCardsPage";
import { ProtectionPlansPage } from "./pages/ProtectionPlansPage";
import { DonationTiersPage } from "./pages/DonationTiersPage";
import { PartnersPage } from "./pages/PartnersPage";
import { PagesPage } from "./pages/PagesPage";
import { DonationsPage } from "./pages/DonationsPage";
import { ContactsPage } from "./pages/ContactsPage";
import { NewsletterPage } from "./pages/NewsletterPage";

export function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="impact" element={<ImpactStatsPage />} />
        <Route path="mission" element={<CrisisCardsPage />} />
        <Route path="protection" element={<ProtectionPlansPage />} />
        <Route path="tiers" element={<DonationTiersPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="pages" element={<PagesPage />} />
        <Route path="donations" element={<DonationsPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="newsletter" element={<NewsletterPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}
