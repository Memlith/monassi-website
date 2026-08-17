"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Grid,
  LayoutGrid,
  MapPin,
  Calendar,
  Share2,
  Check,
  Phone,
} from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: "cozinha" | "sala" | "comercial" | "transformacao";
  categoryLabel: string;
  image: string;
  location: string;
  year: string;
  materials: string;
  description: string;
  details: string[];
}

export default function GaleriaPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [gridSize, setGridSize] = useState<"compact" | "large">("large");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Espaço Gourmet com Coifa Ripada & Churrasqueira",
      category: "cozinha",
      categoryLabel: "Cozinhas & Gourmet",
      image: "/img/cozinha-gourmet-churrasqueira.jpg",
      location: "Indaiatuba - SP",
      year: "2025",
      materials: "100% MDF Fendi & Amadeirado, Ferragens com Amortecimento",
      description:
        "Projeto planejado completo para área gourmet com armários aéreos, torre para geladeira, adega/colmeia de garrafas e revestimento ripado integrado sobre a coifa da churrasqueira.",
      details: [
        "Torre para refrigerador com nicho superior",
        "Adega colmeia embutida",
        "Coifa decorativa com painel ripado sob medida",
        "Puxadores ocultos em perfil de alumínio",
      ],
    },
    {
      id: 2,
      title: "Living Integrado & Painel de TV com Estante",
      category: "sala",
      categoryLabel: "Salas & Living",
      image: "/img/living-painel-tv-estante.jpg",
      location: "Indaiatuba - SP",
      year: "2025",
      materials: "MDF Amadeirado Claro, Laca Branca e Espelho Bisotado",
      description:
        "Painel de TV sob medida para sala de estar com estante lateral vertical para livros e decoração, prateleira superior para plantas, nichos organizadores e detalhe ripado com espelho.",
      details: [
        "Estante vertical com 5 nichos decorativos",
        "Prateleira superior para plantas e iluminação",
        "Painel com passagem oculta para fios e cabos",
        "Espelho integrado e acabamento ripado fino",
      ],
    },
    {
      id: 3,
      title: "Recepção de Clínica Odontológica (Eccel Odonto)",
      category: "comercial",
      categoryLabel: "Comercial & Clínicas",
      image: "/img/comercial-consultorio-recepcao.jpg",
      location: "Indaiatuba - SP",
      year: "2024",
      materials: "MDF Cinza Claro, Granito Branco e Painel Cimento Queimado",
      description:
        "Recepção planejada para clínica odontológica com balcão de atendimento sob medida com tampo duplo, painel de fundo com logotipo e móvel auxiliar de apoio com portas de correr.",
      details: [
        "Balcão de atendimento ergonômico",
        "Móvel auxiliar para impressoras e arquivos",
        "Painel de recepção preparado para fixação de TV",
        "Fácil higienização e alta durabilidade",
      ],
    },
    {
      id: 4,
      title: "Painel Amadeirado Inteiriço com Porta Mimetizada & LED",
      category: "sala",
      categoryLabel: "Salas & Painéis",
      image: "/img/living-painel-porta-mimetizada-led.jpg",
      location: "Indaiatuba - SP",
      year: "2024",
      materials: "100% MDF Amadeirado Freijó com Perfil LED Embutido",
      description:
        "Revestimento de parede inteiriço em padrão amadeirado nobre com porta de passagem oculta (mimetizada) e rasgo com iluminação indireta em fita LED quente.",
      details: [
        "Porta de passagem invisível (mimetizada na madeira)",
        "Iluminação indireta suave em fita LED",
        "Acabamento contínuo sem emendas aparentes",
        "Sensação de amplitude e acolhimento",
      ],
    },
    {
      id: 5,
      title: "Cozinha & Buffet Suspenso com Nicho de Eletros",
      category: "cozinha",
      categoryLabel: "Cozinhas & Gourmet",
      image: "/img/cozinha-armario-aereo-bancada.jpg",
      location: "Indaiatuba - SP",
      year: "2024",
      materials: "MDF Amadeirado & Branco Tx, Corrediças Telescópicas",
      description:
        "Composição de armários aéreos em tom amadeirado com nicho para micro-ondas e bancada ampla com 4 gavetões brancos reforçados com amortecimento slow-motion.",
      details: [
        "Nicho integrado para micro-ondas",
        "Gavetões com corrediças telescópicas reforçadas",
        "Portas superiores com pistão a gás",
        "Tamponamento superior amadeirado",
      ],
    },
    {
      id: 6,
      title: "Gabinete de Cozinha Sob Medida com Puxadores Perfil",
      category: "transformacao",
      categoryLabel: "Antes & Depois / Cozinhas",
      image: "/img/transformacao-cozinha-depois.jpg",
      location: "Indaiatuba - SP",
      year: "2025",
      materials: "100% MDF Branco Ultra Resistente à Umidade",
      description:
        "Gabinete de cozinha sob medida instalado sob bancada de granito preto, com portas de armário, gaveteiros para talheres e panelas, e puxadores em perfil de alumínio anodizado.",
      details: [
        "Aproveitamento de 100% do vão inferior da pia",
        "Puxadores em perfil de alumínio embutido",
        "Pés com regulagem de nível e vedação",
        "Dobradiças com sistema de amortecimento",
      ],
    },
    {
      id: 7,
      title: "Ambiente Antes da Transformação (Medição Técnica)",
      category: "transformacao",
      categoryLabel: "Antes & Depois",
      image: "/img/transformacao-cozinha-antes.jpg",
      location: "Indaiatuba - SP",
      year: "2025",
      materials: "Visita Técnica e Medição a Laser",
      description:
        "Registro do ambiente original antes da execução dos móveis, com medição técnica para conferência milimétrica das instalações hidráulicas e elétricas.",
      details: [
        "Medição a laser no local",
        "Conferência de pontos de água, esgoto e gás",
        "Planejamento estrutural das divisórias",
        "Garantia de encaixe perfeito",
      ],
    },
  ];

  const categories = [
    { id: "all", label: "Todas as Fotos" },
    { id: "cozinha", label: "Cozinhas & Gourmet" },
    { id: "sala", label: "Salas & Painéis" },
    { id: "comercial", label: "Comercial & Clínicas" },
    { id: "transformacao", label: "Antes & Depois" },
  ];

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems.length]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const selectedItem =
    selectedIndex !== null ? filteredItems[selectedIndex] : null;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col selection:bg-[#C28839]/20 selection:text-[#8C5814]">
      {/* Apple/Google Photos Style Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#1C1917]/95 backdrop-blur-md border-b border-stone-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-stone-300 hover:text-white text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full bg-stone-800/80 hover:bg-stone-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Início</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg sm:text-xl text-[#FAF8F5]">
                Galeria de Fotos
              </span>
              <span className="hidden sm:inline-block text-[11px] bg-[#C28839] text-white font-semibold px-2.5 py-0.5 rounded-full">
                {filteredItems.length} Fotos
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Grid density toggle */}
            <div className="hidden sm:flex items-center bg-stone-800/80 rounded-full p-1 border border-stone-700">
              <button
                onClick={() => setGridSize("compact")}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  gridSize === "compact"
                    ? "bg-[#C28839] text-white"
                    : "text-stone-400 hover:text-white"
                }`}
                title="Visualização Compacta"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridSize("large")}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  gridSize === "large"
                    ? "bg-[#C28839] text-white"
                    : "text-stone-400 hover:text-white"
                }`}
                title="Visualização Ampla"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            <a
              href="https://wa.me/5519994432077?text=Ol%C3%A1!%20Estou%20vendo%20a%20galeria%20de%20fotos%20no%20site%20da%20Monassi%20e%20gostaria%20de%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C28839] hover:bg-[#A77129] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Orçamento WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div className="bg-[#141211] border-t border-stone-800/60 px-4 sm:px-6 lg:px-8 py-2.5 overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#C28839] text-white shadow-sm scale-105"
                    : "bg-stone-800/80 text-stone-300 hover:bg-stone-700 border border-stone-700/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        {/* Gallery Intro */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#E6DFD5]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C28839] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acervo de Ambientes Executados</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917]">
              Móveis Sob Medida em Indaiatuba
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm font-light mt-1">
              Clique em qualquer foto para abrir o visualizador de alta resolução, navegar com as setas do teclado e ver especificações.
            </p>
          </div>

          <button
            onClick={handleShare}
            className="text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-[#E6DFD5] px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-2xs hover:bg-stone-50 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartilhar Galeria</span>
              </>
            )}
          </button>
        </div>

        {/* Photos Grid - Apple / Google Photos Aesthetic */}
        <div
          className={`grid gap-4 sm:gap-6 ${
            gridSize === "compact"
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className="group relative bg-white rounded-2xl overflow-hidden border border-[#E6DFD5] shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
            >
              {/* Photo Box */}
              <div
                className={`relative w-full overflow-hidden bg-stone-200 ${
                  gridSize === "compact" ? "h-48 sm:h-56" : "h-64 sm:h-72"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Ambient dark gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-white text-xs font-semibold flex items-center gap-1 bg-[#C28839] px-2.5 py-1 rounded-full shadow-md">
                    <Maximize2 className="w-3 h-3" /> Ampliar
                  </span>
                </div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-[#1C1917]/80 text-stone-200 text-[11px] font-medium px-2.5 py-0.5 rounded-full backdrop-blur-md">
                    {item.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Photo Caption */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif font-bold text-[#1C1917] text-base group-hover:text-[#C28839] transition-colors leading-snug line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-xs font-light mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C28839]" /> {item.location}
                  </span>
                  <span className="font-medium text-[#C28839]">Ver detalhes →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Fullscreen Photos App Lightbox Modal */}
      {selectedItem && selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#0c0a09]/95 backdrop-blur-md flex flex-col justify-between text-white animate-fade-in select-none">
          {/* Lightbox Top Navigation Bar */}
          <div className="flex items-center justify-between px-4 sm:px-8 py-4 bg-[#141211]/80 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C28839] bg-stone-900 px-3 py-1 rounded-full border border-stone-800">
                {selectedIndex + 1} de {filteredItems.length}
              </span>
              <span className="text-stone-300 text-xs hidden sm:inline-block">
                {selectedItem.categoryLabel}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/5519994432077?text=Ol%C3%A1!%20Vi%20a%20foto%20"${encodeURIComponent(
                  selectedItem.title
                )}"%20na%20galeria%20e%20gostaria%20de%20um%20or%C3%A7amento.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#C28839] hover:bg-[#A77129] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-md transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Pedir Orçamento Desta Foto</span>
                <span className="sm:hidden">Orçamento</span>
              </a>

              <button
                onClick={() => setSelectedIndex(null)}
                className="bg-stone-800 hover:bg-stone-700 text-white p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Fechar visualizador"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Photo View with Side Arrows */}
          <div className="relative flex-grow flex items-center justify-center p-4 sm:p-8 overflow-hidden">
            {/* Previous Button */}
            <button
              onClick={() =>
                setSelectedIndex(
                  selectedIndex > 0 ? selectedIndex - 1 : filteredItems.length - 1
                )
              }
              className="absolute left-4 sm:left-8 z-20 bg-stone-900/80 hover:bg-[#C28839] text-white p-3 rounded-full border border-stone-700 shadow-xl transition-all hover:scale-110 cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={() =>
                setSelectedIndex(
                  selectedIndex < filteredItems.length - 1 ? selectedIndex + 1 : 0
                )
              }
              className="absolute right-4 sm:right-8 z-20 bg-stone-900/80 hover:bg-[#C28839] text-white p-3 rounded-full border border-stone-700 shadow-xl transition-all hover:scale-110 cursor-pointer"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Central Photo */}
            <div className="relative h-full w-full max-h-[60vh] sm:max-h-[68vh] max-w-5xl flex items-center justify-center">
              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Bottom Info & Details Tray (iOS Photos Info Sheet style) */}
          <div className="bg-[#141211] border-t border-stone-800 p-4 sm:p-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-xs text-[#C28839] mb-1 font-semibold">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {selectedItem.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {selectedItem.year}
                  </span>
                  <span>•</span>
                  <span className="text-stone-400 font-normal">{selectedItem.materials}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white leading-tight">
                  {selectedItem.title}
                </h2>
                <p className="text-stone-300 text-xs sm:text-sm font-light mt-1">
                  {selectedItem.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                <a
                  href={`https://wa.me/5519994432077?text=Ol%C3%A1!%20Gostei%20do%20projeto%20"${encodeURIComponent(
                    selectedItem.title
                  )}"%20e%20gostaria%20de%20saber%20valores.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto bg-[#C28839] hover:bg-[#A77129] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Solicitar Orçamento</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer for Gallery Page */}
      <footer className="bg-[#141211] text-stone-400 text-xs border-t border-stone-800 py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Monassi Móveis Planejados • Indaiatuba - SP</p>
          <div className="flex items-center gap-4 text-stone-300">
            <a href="tel:+5519994432077" className="hover:text-[#C28839] flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> (19) 99443-2077
            </a>
            <span>•</span>
            <Link href="/" className="hover:text-[#C28839]">
              Voltar ao Site Principal
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
