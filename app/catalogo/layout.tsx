import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Madeiras & MDF Duratex 2026 | Monassi Móveis Planejados",
  description:
    "Explore os 80 padrões oficiais de MDF Duratex 2026 com texturas reais, ambientes decorados em 3D, linha Ultra resistente à umidade e combinações para seus móveis planejados em Indaiatuba, Salto e Itu.",
  alternates: {
    canonical: "https://monassi.com.br/catalogo",
  },
};

export default function CatalogoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
