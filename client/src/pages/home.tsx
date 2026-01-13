import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { IsThisForYouSection } from "@/components/is-this-for-you-section";
import { WhatYouGetSection } from "@/components/what-you-get-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <IsThisForYouSection />
        <WhatYouGetSection />
        
        <ContactSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
