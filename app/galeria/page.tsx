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
  Share2,
  Check,
  Images,
  CheckCircle2,
} from "lucide-react";
import {
  PROJECTS_DATA,
  PROJECT_CATEGORIES,
  type ProjectItem,
} from "@/lib/projects-data";
import { trackClick } from "@/lib/analytics";

export default function GaleriaPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");
  const [gridSize, setGridSize] = useState<"compact" | "large">("large");
  const [cardSlideIndex, setCardSlideIndex] = useState<Record<string, number>>({});
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(() => {
    if (typeof window === "undefined") return null;
    const pid = new URLSearchParams(window.location.search).get("projeto");
    return pid ? PROJECTS_DATA.find((p) => p.id === pid) || null : null;
  });
  const [modalSlideIndex, setModalSlideIndex] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  const filteredProjects =
    activeCategory === "Todos"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((item) => item.category === activeCategory);

  const getCardSlide = (projectId: string) => cardSlideIndex[projectId] ?? 0;

  const stepCardSlide = (
    e: React.MouseEvent,
    project: ProjectItem,
    delta: number
  ) => {
    e.stopPropagation();
    const total = project.slides.length;
    const current = getCardSlide(project.id);
    const next = (current + delta + total) % total;
    setCardSlideIndex((prev) => ({ ...prev, [project.id]: next }));
    void trackClick({
      event: "gallery_carousel_step",
      label: `${project.title} (${next + 1}/${total})`,
      section: "full_gallery",
    });
  };

  const openModal = (project: ProjectItem) => {
    const startSlide = getCardSlide(project.id);
    setSelectedProject(project);
    setModalSlideIndex(startSlide);
    void trackClick({
      event: "gallery_project_open",
      label: project.title,
      section: "full_gallery",
    });
  };

  const stepModalSlide = (delta: number) => {
    if (!selectedProject) return;
    const total = selectedProject.slides.length;
    setModalSlideIndex((prev) => (prev + delta + total) % total);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === "Escape") setSelectedProject(null);
      if (selectedProject.slides.length > 1) {
        if (e.key === "ArrowRight") {
          setModalSlideIndex((prev) => (prev + 1) % selectedProject.slides.length);
        }
        if (e.key === "ArrowLeft") {
          setModalSlideIndex(
            (prev) =>
              (prev - 1 + selectedProject.slides.length) %
              selectedProject.slides.length
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = selectedProject
        ? `${window.location.origin}/galeria?projeto=${encodeURIComponent(selectedProject.id)}`
        : window.location.href;
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] flex flex-col">
      {/* Sticky Top App Bar (No MDF catalog button) */}
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
            <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-full border border-stone-200">
              <button
                type="button"
                onClick={() => setGridSize("large")}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  gridSize === "large"
                    ? "bg-white text-[#1C1917] shadow-xs"
                    : "text-stone-500 hover:text-stone-800"
                }`}
                title="Grade Ampla"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridSize("compact")}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  gridSize === "compact"
                    ? "bg-white text-[#1C1917] shadow-xs"
                    : "text-stone-500 hover:text-stone-800"
                }`}
                title="Grade Compacta"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            <a
              href="https://wa.me/5519994432077?text=Ol%C3%A1!%20Estou%20vendo%20a%20galeria%20de%20projetos%20da%20Monassi%20e%20gostaria%20de%20um%20or%C3%A7amento."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                void trackClick({
                  event: "whatsapp_click",
                  label: "Orçar Projeto (Topo Galeria)",
                  section: "full_gallery_header",
                })
              }
              className="bg-[#C28839] hover:bg-[#A77129] text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Orçar Projeto</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Banner */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#C28839] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acervo Oficial Monassi • Indaiatuba, Salto e Itu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight">
              Galeria de Ambientes Planejados
            </h1>
            <p className="text-stone-600 text-sm sm:text-base font-light mt-2 max-w-2xl">
              Confira nossos projetos entregues. Nos posts vindos do{" "}
              <strong className="font-semibold text-[#1C1917]">
                Instagram (@monassiplanejados)
              </strong>
              , navegue pelo carrossel para ver todas as fotos do mesmo móvel.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {PROJECT_CATEGORIES.map((category) => {
            const count =
              category === "Todos"
                ? PROJECTS_DATA.length
                : PROJECTS_DATA.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  setActiveCategory(category);
                  void trackClick({
                    event: "gallery_filter",
                    label: category,
                    section: "full_gallery",
                  });
                }}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  activeCategory === category
                    ? "bg-[#1C1917] text-white shadow-md"
                    : "bg-white text-stone-600 border border-[#E6DFD5] hover:border-[#C28839]"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    activeCategory === category
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

        {/* Projects Grid */}
        <div
          className={`grid gap-7 ${
            gridSize === "large"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {filteredProjects.map((project) => {
            const currentIdx = getCardSlide(project.id);
            const currentSlide = project.slides[currentIdx] || project.slides[0];
            const totalSlides = project.slides.length;
            const hasCarousel = totalSlides > 1;

            return (
              <article
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => openModal(project)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openModal(project);
                  }
                }}
                className="bg-white rounded-3xl overflow-hidden border border-[#E6DFD5] shadow-xs hover:shadow-2xl transition-all duration-500 group flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C28839]"
              >
                {/* Image / Instagram Carousel Viewport */}
                <div className="relative h-64 sm:h-72 w-full bg-stone-900 overflow-hidden">
                  <Image
                    src={currentSlide.src}
                    alt={`${project.title} - Foto ${currentIdx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="bg-black/75 text-white text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-md">
                      {project.category}
                    </span>
                    {hasCarousel && (
                      <span className="bg-[#C28839] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Images className="w-3 h-3" />
                        {currentIdx + 1}/{totalSlides} fotos
                      </span>
                    )}
                  </div>

                  {/* Prev / Next Arrows ONLY for Instagram Carousels */}
                  {hasCarousel && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => stepCardSlide(e, project, -1)}
                        aria-label="Foto anterior"
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => stepCardSlide(e, project, 1)}
                        aria-label="Próxima foto"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Bottom Bar */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 pt-8 flex items-center justify-between">
                    {hasCarousel ? (
                      <div className="flex items-center gap-1.5">
                        {project.slides.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardSlideIndex((prev) => ({
                                ...prev,
                                [project.id]: idx,
                              }));
                            }}
                            aria-label={`Ver foto ${idx + 1}`}
                            className={`h-1.5 rounded-full transition-all cursor-pointer ${
                              idx === currentIdx
                                ? "w-5 bg-[#C28839]"
                                : "w-1.5 bg-white/55 hover:bg-white"
                            }`}
                          />
                        ))}
                      </div>
                    ) : (
                      <span className="text-white/90 text-xs font-light truncate pr-2">
                        {project.location}
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-amber-300 flex items-center gap-1 shrink-0">
                      <Maximize2 className="w-3 h-3" /> Ampliar
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-xs text-[#C28839] font-bold uppercase tracking-wider mb-1">
                      {project.highlight}
                    </div>
                    <h2 className="text-lg sm:text-xl font-serif font-bold text-[#1C1917] mb-2 group-hover:text-[#C28839] transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-stone-600 text-sm font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Mini Thumbnail Strip ONLY for Instagram Carousels */}
                  {hasCarousel ? (
                    <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                        {project.slides.map((s, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardSlideIndex((prev) => ({
                                ...prev,
                                [project.id]: idx,
                              }));
                            }}
                            className={`relative w-9 h-7 rounded-md overflow-hidden border transition-all shrink-0 cursor-pointer ${
                              idx === currentIdx
                                ? "border-[#C28839] scale-105"
                                : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          >
                            <Image
                              src={s.src}
                              alt={s.caption}
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-[#C28839] shrink-0">
                        {totalSlides} fotos
                      </span>
                    </div>
                  ) : (
                    <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-500 group-hover:text-[#1C1917] transition-colors">
                        Ver especificações
                      </span>
                      <ChevronRight className="w-4 h-4 text-[#C28839] transition-transform group-hover:translate-x-1" />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Lightbox Modal (No MDF catalog button) */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-stone-200 my-auto grid grid-cols-1 lg:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left/Top: Photo Viewer (7 cols) */}
            <div className="lg:col-span-7 bg-stone-950 flex flex-col justify-between relative">
              <div className="relative h-80 sm:h-[460px] w-full">
                <Image
                  src={
                    selectedProject.slides[modalSlideIndex]?.src ||
                    selectedProject.slides[0].src
                  }
                  alt={`${selectedProject.title} - Foto ${modalSlideIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-contain"
                />

                {selectedProject.slides.length > 1 && (
                  <>
                    <div className="absolute top-4 left-4 bg-black/75 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md">
                      Foto {modalSlideIndex + 1} de {selectedProject.slides.length}
                    </div>
                    <button
                      type="button"
                      onClick={() => stepModalSlide(-1)}
                      aria-label="Foto anterior"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/70 hover:bg-[#C28839] text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => stepModalSlide(1)}
                      aria-label="Próxima foto"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/70 hover:bg-[#C28839] text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-5 py-3.5">
                  <p className="text-white text-xs sm:text-sm font-medium">
                    {selectedProject.slides[modalSlideIndex]?.caption}
                  </p>
                </div>
              </div>

              {/* Thumbnails ONLY for Instagram Carousel posts */}
              {selectedProject.slides.length > 1 && (
                <div className="bg-stone-900 p-3.5 flex items-center gap-2.5 overflow-x-auto border-t border-stone-800">
                  {selectedProject.slides.map((slide, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setModalSlideIndex(idx)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        idx === modalSlideIndex
                          ? "border-[#C28839] scale-105"
                          : "border-transparent opacity-55 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.caption}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right/Bottom: Project Specs & Conversion (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white relative">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Fechar"
                className="absolute top-4 right-4 bg-stone-100 hover:bg-stone-200 text-stone-700 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C28839] mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedProject.location}</span>
                  <span>•</span>
                  <span>{selectedProject.category}</span>
                </div>

                <h2 className="text-2xl font-serif font-bold text-[#1C1917] mb-3 pr-8">
                  {selectedProject.title}
                </h2>

                <p className="text-stone-600 text-sm leading-relaxed font-light mb-5">
                  {selectedProject.description}
                </p>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6DFD5] mb-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                    Especificações do Projeto
                  </div>
                  <ul className="space-y-2">
                    {selectedProject.specs.map((spec, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-stone-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C28839] shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-100">
                <a
                  href={`https://wa.me/5519994432077?text=Ol%C3%A1!%20Vi%20o%20projeto%20"${encodeURIComponent(
                    selectedProject.title
                  )}"%20na%20galeria%20da%20Monassi%20e%20quero%20solicitar%20um%20or%C3%A7amento!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    void trackClick({
                      event: "whatsapp_click",
                      label: `Orçar da Galeria: ${selectedProject.title}`,
                      section: "full_gallery_modal",
                    })
                  }
                  className="w-full bg-[#C28839] hover:bg-[#A77129] text-white py-3.5 px-5 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md transition-all text-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Orçar Projeto Semelhante no WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full py-2.5 px-4 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-600 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Link Copiado</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Compartilhar Projeto</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
