import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import WoodCatalogPreview from "@/components/WoodCatalogPreview";
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

        {/* 3. Core Differentials / Benefits (Marcenaria 2.0) */}
        <Features />

        {/* 4. Projects Portfolio Gallery with Multi-Photo Carousels */}
        <Gallery />

        {/* 5. Interactive Wood & MDF Catalog Preview (80 Duratex 2026 Patterns) */}
        <WoodCatalogPreview />

        {/* 6. Before & After Transformation */}
        <BeforeAfter />

        {/* 7. Step-by-Step Workflow Process (Marcenaria 2.0) */}
        <Process />

        {/* 8. Interactive WhatsApp Budget Estimator / Lead Form (Firebase Firestore) */}
        <LeadForm />

        {/* 9. Verified Customer Reviews & Testimonials */}
        <Testimonials />

        {/* 10. FAQ Accordion */}
        <FAQ />

        {/* 11. Final Hero Conversion CTA */}
        <FinalCTA />
      </main>

      {/* 12. Complete Footer with Map, Legal, and Contacts */}
      <Footer />

      {/* 13. Floating WhatsApp for Mobile and Desktop conversion */}
      <FloatingWhatsApp />
    </div>
  );
}
