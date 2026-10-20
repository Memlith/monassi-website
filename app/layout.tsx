import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import FirebaseAnalyticsInit from "@/components/FirebaseAnalyticsInit";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://monassi.com.br"),
  title: "Monassi Móveis Planejados | Marcenaria 2.0 em Indaiatuba, Salto e Itu",
  description:
    "Móveis planejados sob medida com precisão de Marcenaria 2.0, 100% MDF, ferragens premium e projeto 3D realista. Atendimento exclusivo em Indaiatuba, Salto e Itu.",
  keywords: [
    "móveis planejados",
    "marcenaria indaiatuba",
    "marcenaria salto",
    "marcenaria itu",
    "móveis sob medida",
    "cozinha planejada",
    "closet planejado",
    "marcenaria 2.0",
    "monassi móveis planejados",
    "indaiatuba",
    "salto",
    "itu",
  ],
  authors: [{ name: "Monassi Móveis Planejados" }],
  creator: "Monassi Móveis Planejados",
  alternates: {
    canonical: "https://monassi.com.br",
  },
  openGraph: {
    title: "Monassi Móveis Planejados | Marcenaria 2.0 em Indaiatuba, Salto e Itu",
    description:
      "Transforme seu espaço com móveis sob medida em Indaiatuba, Salto e Itu. Projetos 3D, corte e fitagem industrial de precisão e montagem impecável.",
    url: "https://monassi.com.br",
    siteName: "Monassi Móveis Planejados",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/img/hero-bg-marcenaria.webp",
        width: 1200,
        height: 630,
        alt: "Monassi Móveis Planejados",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: "Monassi Móveis Planejados",
    url: "https://monassi.com.br",
    telephone: "+55-19-99443-2077",
    image: "https://monassi.com.br/img/logo-instagram-escura.webp",
    description:
      "Móveis planejados sob medida em 100% MDF com projeto 3D e precisão industrial de Marcenaria 2.0 em Indaiatuba, Salto e Itu.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Indaiatuba",
      addressRegion: "SP",
      addressCountry: "BR",
    },
    areaServed: [
      { "@type": "City", name: "Indaiatuba" },
      { "@type": "City", name: "Salto" },
      { "@type": "City", name: "Itu" },
    ],
    sameAs: ["https://www.instagram.com/monassiplanejados/"],
  };

  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans antialiased selection:bg-[#C28839]/20 selection:text-[#8C5814]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <FirebaseAnalyticsInit />
        {children}
      </body>
    </html>
  );
}
