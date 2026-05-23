/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CrisisSection } from "./components/CrisisSection";
import { ProtectionPlan } from "./components/ProtectionPlan";
import { DonationSection } from "./components/DonationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-inter">
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
