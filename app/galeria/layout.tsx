import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeria de Projetos e Ambientes Planejados | Monassi Móveis Planejados",
  description:
    "Confira fotos reais de móveis sob medida entregues pela Monassi em Indaiatuba, Salto e Itu: cozinhas planejadas, áreas gourmet, dormitórios, closets, painéis de TV, banheiros e escritórios.",
  alternates: {
    canonical: "https://monassi.com.br/galeria",
  },
};

export default function GaleriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
