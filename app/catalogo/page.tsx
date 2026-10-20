"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Layers,
  Sparkles,
  Droplets,
  Eye,
  X,
  MessageCircle,
  CheckCircle2,
  Images,
  SlidersHorizontal,
} from "lucide-react";
import {
  MDF_PATTERNS,
  CATALOG_CATEGORIES,
  filterPatternsByCategory,
  type MDFPattern,
} from "@/lib/catalog-data";
import { trackClick } from "@/lib/analytics";

function CatalogoContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [onlyLaunch2026, setOnlyLaunch2026] = useState<boolean>(false);
  const [onlyUltra, setOnlyUltra] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"swatch" | "ambient">("swatch");
  const [selectedPattern, setSelectedPattern] = useState<MDFPattern | null>(null);
  const [modalImageMode, setModalImageMode] = useState<"ambient" | "swatch">("ambient");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPattern) {
        setSelectedPattern(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPattern]);

  const filteredPatterns = useMemo(() => {
    const byCategory = filterPatternsByCategory(MDF_PATTERNS, activeCategory);
    return byCategory.filter((p) => {
      if (onlyLaunch2026 && !p.isLaunch2026) return false;
      if (onlyUltra && !p.isUltraPremium) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchLine = p.line.toLowerCase().includes(q);
        const matchTag = p.tagline.toLowerCase().includes(q);
        const matchCat = p.categoryLabel.toLowerCase().includes(q);
        return matchName || matchLine || matchTag || matchCat;
      }

      return true;
    });
  }, [activeCategory, searchQuery, onlyLaunch2026, onlyUltra]);

  const openPatternModal = (pattern: MDFPattern) => {
    setSelectedPattern(pattern);
    setModalImageMode("ambient");
    void trackClick({
      event: "catalog_pattern_open",
      label: pattern.name,
      section: "full_catalog_page",
      mdfPattern: pattern.name,
    });
  };

  const jumpToCombination = (comboName: string) => {
    const target = MDF_PATTERNS.find(
      (p) => p.name.toLowerCase() === comboName.toLowerCase()
    );
    if (target) {
      openPatternModal(target);
    } else {
      setSelectedPattern(null);
      setActiveCategory("todos");
      setSearchQuery(comboName);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-[#E6DFD5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-[#1C1917] bg-stone-100 hover:bg-stone-200/70 px-3.5 py-2 rounded-full transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar ao Início</span>
            </Link>
            <div className="h-6 w-[1px] bg-stone-200 hidden sm:block" />
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-32 h-9">
                <Image
                  src="/img/logo-monassi-v2-dark.webp"
                  alt="Monassi Móveis Planejados"
                  fill
                  unoptimized
                  className="object-contain object-left"
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/galeria"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E6DFD5] bg-[#FAF8F5] hover:bg-stone-100 text-xs font-semibold text-[#1C1917] transition-colors"
            >
              <Images className="w-3.5 h-3.5 text-[#C28839]" />
              <span>Galeria de Projetos</span>
            </Link>
            <Link
              href="/#orcamento"
              onClick={() =>
                void trackClick({
                  event: "cta_click",
                  label: "Simular Orçamento (Topo Catálogo)",
                  section: "full_catalog_header",
                })
              }
              className="bg-[#C28839] hover:bg-[#A77129] text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Simular Orçamento</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Banner */}
        <div className="bg-[#1C1917] text-white rounded-3xl p-8 sm:p-10 mb-8 relative overflow-hidden border border-stone-800">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C28839]/15 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Layers className="w-3.5 h-3.5" />
                <span>Portfólio Digital Duratex 2026 • Marcenaria 2.0</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight mb-3">
                Catálogo Interativo de Madeiras & MDF
              </h1>
              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                Explore os <strong className="text-white font-semibold">80 padrões oficiais</strong> de chapas MDF que utilizamos em nossos projetos via{" "}
                <span className="text-amber-400 font-medium">CorteCloud (CrieCorte, Gasômetro e Leo Madeiras)</span>. Veja a textura fiel de cada chapa, ambientes decorados em 3D e combinações harmônicas.
              </p>
            </div>

            {/* View Switcher */}
            <div className="flex items-center bg-stone-900 p-1.5 rounded-2xl border border-stone-800 self-start lg:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("swatch")}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "ambient"
                    ? "bg-[#C28839] text-white shadow-sm"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Ambiente 3D
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6DFD5] shadow-xs mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar padrão MDF (ex: Freijó, Carvalho, Noce, Acetinatta, Branco, Grafite...)"
              aria-label="Buscar padrão de MDF"
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E6DFD5] text-sm text-[#1C1917] placeholder:text-stone-400 focus:outline-none focus:border-[#C28839]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setOnlyLaunch2026((prev) => !prev)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                onlyLaunch2026
                  ? "bg-amber-500/15 border-[#C28839] text-[#A77129]"
                  : "bg-[#FAF8F5] border-[#E6DFD5] text-stone-600 hover:border-stone-300"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C28839]" />
              <span>Lançamentos 2026</span>
            </button>

            <button
              type="button"
              onClick={() => setOnlyUltra((prev) => !prev)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                onlyUltra
                  ? "bg-sky-50 border-sky-400 text-sky-800"
                  : "bg-[#FAF8F5] border-[#E6DFD5] text-stone-600 hover:border-stone-300"
              }`}
            >
              <Droplets className="w-3.5 h-3.5 text-sky-600" />
              <span>Resistente à Umidade (Ultra)</span>
            </button>

            {(searchQuery || onlyLaunch2026 || onlyUltra || activeCategory !== "todos") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setOnlyLaunch2026(false);
                  setOnlyUltra(false);
                  setActiveCategory("todos");
                }}
                className="px-3 py-2.5 rounded-xl text-xs font-semibold text-stone-500 hover:text-stone-900 cursor-pointer"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {CATALOG_CATEGORIES.map((cat) => {
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
                    section: "full_catalog_page",
                  });
                }}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#1C1917] text-white shadow-md"
                    : "bg-white text-stone-600 border border-[#E6DFD5] hover:border-[#C28839]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    activeCategory === cat.id
                      ? "bg-[#C28839] text-white"
                      : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Count & Category Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 text-xs sm:text-sm text-stone-600">
          <p>
            Exibindo <strong className="text-[#1C1917]">{filteredPatterns.length}</strong> padrões de MDF{" "}
            {
              CATALOG_CATEGORIES.find((c) => c.id === activeCategory)?.description
                ? `— ${CATALOG_CATEGORIES.find((c) => c.id === activeCategory)?.description}`
                : ""
            }
          </p>
        </div>

        {/* Patterns Grid */}
        {filteredPatterns.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E6DFD5]">
            <SlidersHorizontal className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-xl font-serif font-bold text-[#1C1917] mb-2">
              Nenhum padrão encontrado com esses filtros
            </h3>
            <p className="text-stone-500 text-sm mb-5">
              Tente buscar por outro termo ou limpar os filtros ativos.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setOnlyLaunch2026(false);
                setOnlyUltra(false);
                setActiveCategory("todos");
              }}
              className="bg-[#1C1917] text-white px-6 py-2.5 rounded-full text-xs font-semibold cursor-pointer"
            >
              Ver todos os 80 padrões
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredPatterns.map((pattern) => (
              <div
                key={pattern.id}
                role="button"
                tabIndex={0}
                onClick={() => openPatternModal(pattern)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openPatternModal(pattern);
                  }
                }}
                className="bg-white rounded-2xl overflow-hidden border border-[#E6DFD5] shadow-xs hover:shadow-xl hover:border-[#C28839] transition-all duration-300 group cursor-pointer flex flex-col focus:outline-none focus:ring-2 focus:ring-[#C28839]"
              >
                <div className="relative h-44 sm:h-52 w-full bg-stone-900 overflow-hidden">
                  <Image
                    src={
                      viewMode === "swatch"
                        ? pattern.swatchUrl
                        : pattern.ambientUrl
                    }
                    alt={`MDF ${pattern.name} - ${pattern.line}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                    {pattern.isLaunch2026 ? (
                      <span className="bg-amber-500 text-stone-950 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                        Lançamento 2026
                      </span>
                    ) : (
                      <span />
                    )}
                    {pattern.isUltraPremium && (
                      <span className="bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Droplets className="w-2.5 h-2.5" /> Ultra
                      </span>
                    )}
                  </div>

                  {/* Mini Corner Preview of Alternate View */}
                  <div className="absolute bottom-2.5 right-2.5 w-11 h-11 rounded-lg overflow-hidden border-2 border-white shadow-md">
                    <Image
                      src={
                        viewMode === "swatch"
                          ? pattern.ambientUrl
                          : pattern.swatchUrl
                      }
                      alt={pattern.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C28839]">
                        {pattern.line}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        Pág. {pattern.page}
                      </span>
                    </div>
                    <h2 className="text-base sm:text-lg font-serif font-bold text-[#1C1917] group-hover:text-[#C28839] transition-colors">
                      {pattern.name}
                    </h2>
                    <p className="text-stone-500 text-xs font-light line-clamp-1 mt-0.5">
                      {pattern.tagline}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-stone-600 group-hover:text-[#1C1917]">
                    <span>{pattern.categoryLabel}</span>
                    <span className="text-[#C28839] flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Detalhes
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Interactive Pattern Detail Modal */}
      {selectedPattern && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Detalhes do padrão MDF ${selectedPattern.name}`}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedPattern(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto grid grid-cols-1 lg:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Visual Showcase (7 cols) */}
            <div className="lg:col-span-7 bg-stone-950 flex flex-col justify-between relative">
              <div className="relative h-72 sm:h-[430px] w-full">
                <Image
                  src={
                    modalImageMode === "ambient"
                      ? selectedPattern.ambientUrl
                      : selectedPattern.swatchUrl
                  }
                  alt={`MDF ${selectedPattern.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />

                {/* Mode Switcher Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/75 p-1.5 rounded-full backdrop-blur-md border border-white/15">
                  <button
                    type="button"
                    onClick={() => setModalImageMode("ambient")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      modalImageMode === "ambient"
                        ? "bg-[#C28839] text-white"
                        : "text-stone-300 hover:text-white"
                    }`}
                  >
                    Ambiente Decorado
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalImageMode("swatch")}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      modalImageMode === "swatch"
                        ? "bg-[#C28839] text-white"
                        : "text-stone-300 hover:text-white"
                    }`}
                  >
                    Textura da Chapa
                  </button>
                </div>
              </div>

              {/* Bottom Bar with Both Previews */}
              <div className="bg-stone-900 p-4 flex items-center justify-between gap-4 border-t border-stone-800">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setModalImageMode("ambient")}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      modalImageMode === "ambient"
                        ? "border-[#C28839] scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={selectedPattern.ambientUrl}
                      alt="Ambiente"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalImageMode("swatch")}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      modalImageMode === "swatch"
                        ? "border-[#C28839] scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={selectedPattern.swatchUrl}
                      alt="Amostra da Chapa"
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                </div>

                <div className="text-right text-xs text-stone-400">
                  <span className="block text-white font-semibold">
                    {selectedPattern.name}
                  </span>
                  <span>Catálogo Oficial • Pág. {selectedPattern.page}</span>
                </div>
              </div>
            </div>

            {/* Right: Info, Combinations & Quote CTA (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white relative">
              <button
                type="button"
                onClick={() => setSelectedPattern(null)}
                aria-label="Fechar"
                className="absolute top-4 right-4 bg-stone-100 hover:bg-stone-200 text-stone-700 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C28839]">
                    {selectedPattern.categoryLabel}
                  </span>
                  <span>•</span>
                  <span className="text-xs font-semibold text-stone-600">
                    {selectedPattern.line}
                  </span>
                  {selectedPattern.isUltraPremium && (
                    <span className="bg-sky-50 text-sky-700 border border-sky-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Droplets className="w-3 h-3" /> Tripla Proteção Ultra
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] mb-1 pr-8">
                  {selectedPattern.name}
                </h2>
                <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-4">
                  {selectedPattern.tagline}
                </p>

                <p className="text-stone-600 text-sm leading-relaxed font-light mb-6">
                  {selectedPattern.description}
                </p>

                {selectedPattern.combinations.length > 0 && (
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6DFD5] mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2.5">
                      Combinações Recomendadas (Clique para ver):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedPattern.combinations.map((combo, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => jumpToCombination(combo)}
                          className="text-xs bg-white hover:bg-[#1C1917] text-[#1C1917] hover:text-white px-3 py-1.5 rounded-full border border-[#E6DFD5] font-medium transition-colors cursor-pointer"
                        >
                          {combo}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2.5 pt-4 border-t border-stone-100">
                <Link
                  href={`/?mdf=${encodeURIComponent(selectedPattern.name)}#orcamento`}
                  onClick={() =>
                    void trackClick({
                      event: "catalog_select_for_quote",
                      label: selectedPattern.name,
                      section: "full_catalog_modal",
                      mdfPattern: selectedPattern.name,
                    })
                  }
                  className="w-full bg-[#C28839] hover:bg-[#A77129] text-white py-3.5 px-5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md transition-all text-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simular Orçamento com este MDF</span>
                </Link>

                <a
                  href={`https://wa.me/5519994432077?text=Ol%C3%A1!%20Escolhi%20o%20padr%C3%A3o%20MDF%20*${encodeURIComponent(
                    selectedPattern.name
                  )}*%20(${encodeURIComponent(
                    selectedPattern.line
                  )})%20no%20cat%C3%A1logo%20interativo%20da%20Monassi%20e%20gostaria%20de%20um%20or%C3%A7amento!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    void trackClick({
                      event: "whatsapp_click",
                      label: `WhatsApp Direto MDF: ${selectedPattern.name}`,
                      section: "full_catalog_modal",
                      mdfPattern: selectedPattern.name,
                    })
                  }
                  className="w-full bg-[#1C1917] hover:bg-stone-800 text-white py-3 px-5 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors text-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#C28839]" />
                  <span>Falar Direto no WhatsApp sobre este Padrão</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-stone-500">
          Carregando Catálogo Interativo de Madeiras...
        </div>
      }
    >
      <CatalogoContent />
    </Suspense>
  );
}
