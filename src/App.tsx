import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { PublicPage } from "./pages/PublicPage";
import { ThankYouPage } from "./pages/ThankYouPage";
import { AdminRoutes } from "./admin/AdminRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/p/:slug" element={<PublicPage />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}
