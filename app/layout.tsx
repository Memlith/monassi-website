import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
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
  title: "Monassi Móveis Planejados | Marcenaria de Alto Padrão em Indaiatuba",
  description:
    "Móveis planejados sob medida com design sofisticado, 100% MDF, ferragens premium e projeto 3D realista. Marcenaria em Indaiatuba e região.",
  keywords: [
    "móveis planejados",
    "marcenaria indaiatuba",
    "móveis sob medida",
    "cozinha planejada",
    "closet planejado",
    "marcenaria de alto padrão",
    "monassi móveis planejados",
    "indaiatuba",
    "móveis campinas",
  ],
  authors: [{ name: "Monassi Móveis Planejados" }],
  creator: "Monassi Móveis Planejados",
  openGraph: {
    title: "Monassi Móveis Planejados | Design Sob Medida e Exclusividade",
    description:
      "Transforme seu espaço com a excelência da marcenaria sob medida em Indaiatuba. Projetos 3D, pontualidade e acabamento impecável.",
    url: "https://monassi.com.br",
    siteName: "Monassi Móveis Planejados",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/img/hero-bg-marcenaria.png",
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
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans antialiased selection:bg-[#C28839]/20 selection:text-[#8C5814]">
        {children}
      </body>
    </html>
  );
}
