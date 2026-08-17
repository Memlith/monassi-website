import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import BeforeAfter from "@/components/BeforeAfter";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import LeadForm from "@/components/LeadForm";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header (Logo, Nav, Quick Contact) */}
      <Header />

      <main className="flex-grow">
        {/* 2. Hero Section (H1, Subtitle, Stats, Primary CTA, Trust signals) */}
        <Hero />

        {/* 3. Core Differentials / Benefits */}
        <Features />

        {/* 4. Projects Portfolio Gallery */}
        <Gallery />

        {/* 5. Before & After Transformation */}
        <BeforeAfter />

        {/* 6. Step-by-Step Workflow Process */}
        <Process />

        {/* 7. Interactive WhatsApp Budget Estimator / Lead Form */}
        <LeadForm />

        {/* 8. Verified Customer Reviews & Testimonials */}
        <Testimonials />

        {/* 9. FAQ Accordion */}
        <FAQ />

        {/* 10. Final Hero Conversion CTA */}
        <FinalCTA />
      </main>

      {/* 11. Complete Footer with Map, Legal, and Contacts */}
      <Footer />

      {/* 12. Floating WhatsApp for Mobile and Desktop conversion */}
      <FloatingWhatsApp />
    </div>
  );
}
