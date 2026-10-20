"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  ArrowRight,
  Eye,
  Droplets,
  CheckCircle2,
  X,
  MessageCircle,
} from "lucide-react";
import {
  MDF_PATTERNS,
  CATALOG_CATEGORIES,
  filterPatternsByCategory,
  type MDFPattern,
} from "@/lib/catalog-data";
import { trackClick } from "@/lib/analytics";

const PREVIEW_CATEGORIES = [
  { id: "madeiras-nobres", label: "Madeiras Nobres" },
  { id: "madeiras-contemporaneas", label: "Madeiras Contemporâneas" },
  { id: "madeiras-naturais", label: "Madeiras Naturais" },
  { id: "unicolores", label: "Unicolores & Cores" },
  { id: "alto-brilho", label: "Alto Brilho (Cristallo)" },
  { id: "super-matte", label: "Super Matte (Acetinatta)" },
  { id: "pedras-metalizados", label: "Pedras & Metalizados" },
  { id: "ultra-premium", label: "Resistente à Umidade (Ultra)" },
];

export default function WoodCatalogPreview() {
  const [activeCategory, setActiveCategory] = useState<string>("madeiras-nobres");
  const [viewMode, setViewMode] = useState<"swatch" | "ambient">("swatch");
  const [selectedPattern, setSelectedPattern] = useState<MDFPattern | null>(null);

  const visiblePatterns = filterPatternsByCategory(
    MDF_PATTERNS,
    activeCategory
  ).slice(0, 8);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPattern) {
        setSelectedPattern(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPattern]);

  const selectForQuote = (pattern: MDFPattern) => {
    void trackClick({
      event: "catalog_select_for_quote",
      label: pattern.name,
      section: "home_catalog_preview",
      mdfPattern: pattern.name,
    });
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("monassi:select-mdf", { detail: pattern.name })
      );
      setSelectedPattern(null);
      const el = document.getElementById("orcamento");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="catalogo-mdf" className="py-24 bg-[#1C1917] text-[#FAF8F5] relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute -top-32 right-0 w-96 h-96 rounded-full bg-[#C28839]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Catálogo Interativo de Madeiras & MDF 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
              Escolha o acabamento ideal para o seu projeto.
            </h2>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              Trabalhamos com o portfólio completo <strong className="text-white font-medium">Duratex 2026 (80 padrões)</strong> usinados via{" "}
              <span className="text-amber-400 font-medium">Marcenaria 2.0 (CorteCloud)</span>. Toque em qualquer madeira para ver a chapa de perto e o ambiente decorado em 3D.
            </p>
          </div>

          {/* Toggle View Mode: Chapa vs Ambiente */}
          <div className="flex items-center bg-stone-900 p-1.5 rounded-2xl border border-stone-800 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setViewMode("swatch")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "swatch"
                  ? "bg-[#C28839] text-white shadow-sm"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Textura da Chapa
            </button>
            <button
              type="button"
              onClick={() => setViewMode("ambient")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "ambient"
                  ? "bg-[#C28839] text-white shadow-sm"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Ambiente Decorado
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {PREVIEW_CATEGORIES.map((cat) => {
            const count = filterPatternsByCategory(MDF_PATTERNS, cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  void trackClick({
                    event: "catalog_category_filter",
                    label: cat.label,
                    section: "home_catalog_preview",
                  });
                }}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#C28839] text-white shadow-md"
                    : "bg-stone-900/90 text-stone-300 border border-stone-800 hover:border-amber-500/40"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    activeCategory === cat.id
                      ? "bg-black/30 text-white"
                      : "bg-stone-800 text-stone-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        <p className="text-stone-400 text-xs sm:text-sm mb-6 font-light">
          {
            CATALOG_CATEGORIES.find((c) => c.id === activeCategory)
              ?.description
          }
        </p>

        {/* Swatch Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {visiblePatterns.map((pattern) => (
            <div
              key={pattern.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                setSelectedPattern(pattern);
                void trackClick({
                  event: "catalog_pattern_open",
                  label: pattern.name,
                  section: "home_catalog_preview",
                  mdfPattern: pattern.name,
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedPattern(pattern);
                }
              }}
              className="group bg-stone-900/90 rounded-2xl overflow-hidden border border-stone-800 hover:border-[#C28839] transition-all duration-300 cursor-pointer flex flex-col focus:outline-none focus:ring-2 focus:ring-[#C28839]"
            >
              <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-stone-950">
                <Image
                  src={
                    viewMode === "swatch"
                      ? pattern.swatchUrl
                      : pattern.ambientUrl
                  }
                  alt={`MDF ${pattern.name} - ${pattern.line}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1">
                  {pattern.isLaunch2026 ? (
                    <span className="bg-amber-500 text-stone-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                      Lançamento 2026
                    </span>
                  ) : (
                    <span />
                  )}
                  {pattern.isUltraPremium && (
                    <span className="bg-sky-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Droplets className="w-2.5 h-2.5" /> Ultra
                    </span>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-[#C28839] text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5" /> Ver Ambiente & Textura
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                      {pattern.line}
                    </span>
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0"
                      style={{ backgroundColor: pattern.hexColor }}
                      title={`Tom base ${pattern.hexColor}`}
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                    {pattern.name}
                  </h3>
                  <p className="text-stone-400 text-xs font-light line-clamp-1 mt-0.5">
                    {pattern.tagline}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner to Full 80-Pattern Catalog */}
        <div className="mt-12 bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#C28839]/15 border border-[#C28839]/30 flex items-center justify-center text-[#C28839] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Catálogo Digital Completo • 80 Padrões de MDF
              </h3>
              <p className="text-stone-400 text-sm font-light mt-1">
                Pesquise por nome, veja combinações sugeridas de fábrica e envie seu padrão favorito direto para a simulação de orçamento.
              </p>
            </div>
          </div>

          <Link
            href="/catalogo"
            onClick={() =>
              void trackClick({
                event: "cta_click",
                label: "Abrir Catálogo Completo (80 Padrões)",
                section: "home_catalog_preview",
              })
            }
            className="w-full md:w-auto bg-[#C28839] hover:bg-[#A77129] text-white font-semibold px-7 py-4 rounded-full flex items-center justify-center gap-2.5 shadow-lg transition-all hover:scale-[1.02] shrink-0"
          >
            <span>Abrir Catálogo Completo (80 Padrões)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Pattern Detail Modal */}
      {selectedPattern && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Detalhes do padrão MDF ${selectedPattern.name}`}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedPattern(null)}
        >
          <div
            className="bg-[#1C1917] border border-stone-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl my-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Ambient + Swatch Preview */}
              <div className="md:col-span-7 relative bg-stone-950 min-h-[280px] sm:min-h-[380px]">
                <Image
                  src={selectedPattern.ambientUrl}
                  alt={`Ambiente com MDF ${selectedPattern.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover"
                />
                {/* Floating Swatch Inset */}
                <div className="absolute bottom-4 left-4 bg-stone-950/90 p-2 rounded-2xl border border-white/15 shadow-xl backdrop-blur-md flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/20 shrink-0">
                    <Image
                      src={selectedPattern.swatchUrl}
                      alt={`Textura ${selectedPattern.name}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="pr-2">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                      Amostra da Chapa
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {selectedPattern.name}
                    </span>
                    <span className="text-[11px] text-stone-400 block">
                      {selectedPattern.line}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between relative">
                <button
                  type="button"
                  onClick={() => setSelectedPattern(null)}
                  className="absolute top-4 right-4 bg-stone-800 hover:bg-stone-700 text-stone-300 p-2 rounded-full transition-colors cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-4 h-4" />
                </button>

                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
                    {selectedPattern.categoryLabel} • {selectedPattern.line}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-1">
                    {selectedPattern.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-medium mb-4">
                    {selectedPattern.tagline}
                  </p>
                  <p className="text-stone-300 text-sm font-light leading-relaxed mb-5">
                    {selectedPattern.description}
                  </p>

                  {selectedPattern.combinations.length > 0 && (
                    <div className="mb-5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-2">
                        Combinações Harmônicas Sugeridas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedPattern.combinations.map((combo, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-stone-800 text-stone-200 px-2.5 py-1 rounded-full border border-stone-700"
                          >
                            {combo}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2.5 pt-4 border-t border-stone-800">
                  <button
                    type="button"
                    onClick={() => selectForQuote(selectedPattern)}
                    className="w-full bg-[#C28839] hover:bg-[#A77129] text-white font-semibold py-3.5 px-5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Usar este MDF na Simulação de Orçamento</span>
                  </button>
                  <a
                    href={`https://wa.me/5519994432077?text=Ol%C3%A1!%20Gostei%20do%20padr%C3%A3o%20MDF%20*${encodeURIComponent(
                      selectedPattern.name
                    )}*%20(${encodeURIComponent(
                      selectedPattern.line
                    )})%20no%20cat%C3%A1logo%20interativo%20da%20Monassi%20e%20quero%20fazer%20um%20or%C3%A7amento!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      void trackClick({
                        event: "whatsapp_click",
                        label: `Orçar MDF ${selectedPattern.name}`,
                        section: "home_catalog_modal",
                        mdfPattern: selectedPattern.name,
                      })
                    }
                    className="w-full bg-stone-800 hover:bg-stone-700 text-white font-medium py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Perguntar sobre este MDF no WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
