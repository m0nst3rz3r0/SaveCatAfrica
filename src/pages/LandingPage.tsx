import { ConvexSetup } from "../components/ConvexSetup";
import { Header } from "../components/Header";
import { SeoHead } from "../components/SeoHead";
import { TrustStrip } from "../components/TrustStrip";
import { Hero } from "../components/Hero";
import { CrisisSection } from "../components/CrisisSection";
import { ProtectionPlan } from "../components/ProtectionPlan";
import { RescueStoriesSection } from "../components/RescueStoriesSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { FaqSection } from "../components/FaqSection";
import { DonationSection } from "../components/DonationSection";
import { ContactSection } from "../components/ContactSection";
import { StickyDonateBar } from "../components/StickyDonateBar";
import { Footer } from "../components/Footer";
import { useSiteSettings } from "../hooks/useSiteData";

export function LandingPage() {
  const settings = useSiteSettings();

  return (
    <div className="min-h-screen flex flex-col font-inter">
      <SeoHead />
      <ConvexSetup />
      <TrustStrip />
      <Header />
      <main className="flex-grow pb-20 md:pb-0">
        <Hero />
        <CrisisSection />
        <ProtectionPlan />
        {settings?.showStories !== false && <RescueStoriesSection />}
        {settings?.showTestimonials !== false && <TestimonialsSection />}
        {settings?.showFaq !== false && <FaqSection />}
        <DonationSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyDonateBar />
    </div>
  );
}
