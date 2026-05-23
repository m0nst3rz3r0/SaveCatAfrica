import { useEffect } from "react";
import { ConvexSetup } from "../components/ConvexSetup";
import { Header } from "../components/Header";
import { useToast } from "../lib/toast";
import { Hero } from "../components/Hero";
import { CrisisSection } from "../components/CrisisSection";
import { ProtectionPlan } from "../components/ProtectionPlan";
import { DonationSection } from "../components/DonationSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export function LandingPage() {
  const { showToast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("donated") === "1") {
      showToast("Thank you for your donation!");
      window.history.replaceState({}, "", window.location.pathname + "#impact");
    }
  }, [showToast]);

  return (
    <div className="min-h-screen flex flex-col font-inter">
      <ConvexSetup />
      <Header />
      <main className="flex-grow">
        <Hero />
        <CrisisSection />
        <ProtectionPlan />
        <DonationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
