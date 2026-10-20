"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Eye,
  Sparkles,
  X,
  ChevronRight,
  ChevronLeft,
  Images,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { PROJECTS_DATA, type ProjectItem } from "@/lib/projects-data";
import { trackClick } from "@/lib/analytics";

export default function Gallery() {
  const featuredProjects = PROJECTS_DATA.filter((p) => p.featuredOnHome);
  const [cardSlideIndex, setCardSlideIndex] = useState<Record<string, number>>({});
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalSlideIndex, setModalSlideIndex] = useState(0);

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
      section: "home_gallery",
    });
  };

  const openModal = (project: ProjectItem) => {
    const startIdx = getCardSlide(project.id);
    setSelectedProject(project);
    setModalSlideIndex(startIdx);
    void trackClick({
      event: "gallery_project_open",
      label: project.title,
      section: "home_gallery",
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

  return (
    <section id="projetos" className="py-24 bg-[#F3ECE2]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6DFD5] text-[#C28839] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfólio em Destaque</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight mb-4">
            Projetos reais, entregues com excelência.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Veja uma prévia dos nossos ambientes sob medida executados em{" "}
            <strong className="font-semibold text-[#1C1917]">
              Indaiatuba, Salto e Itu
            </strong>
            . Nos posts do Instagram, deslize pelas setas para ver todas as fotos do mesmo ambiente.
          </p>
        </div>

        {/* 6 Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => {
            const currentIdx = getCardSlide(project.id);
            const currentSlide = project.slides[currentIdx] || project.slides[0];
            const totalSlides = project.slides.length;
            const hasCarousel = totalSlides > 1;

            return (
              <div
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
                className="bg-white rounded-3xl overflow-hidden border border-[#E6DFD5] shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C28839]"
              >
                {/* Image Box */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
                  <Image
                    src={currentSlide.src}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="bg-[#1C1917]/80 text-stone-200 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md">
                      {project.category}
                    </span>
                    {hasCarousel && (
                      <span className="bg-[#C28839] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                        <Images className="w-3 h-3" />
                        {currentIdx + 1}/{totalSlides} fotos
                      </span>
                    )}
                  </div>

                  {/* Carousel Controls (ONLY for Instagram multi-photo posts) */}
                  {hasCarousel ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => stepCardSlide(e, project, -1)}
                        aria-label="Foto anterior do post"
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer shadow-md"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => stepCardSlide(e, project, 1)}
                        aria-label="Próxima foto do post"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/65 hover:bg-black text-white flex items-center justify-center transition-all opacity-90 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer shadow-md"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 pt-8 flex items-center justify-between">
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
                              aria-label={`Ir para foto ${idx + 1}`}
                              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                idx === currentIdx
                                  ? "w-5 bg-[#C28839]"
                                  : "w-1.5 bg-white/60 hover:bg-white"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[11px] font-semibold text-white flex items-center gap-1 bg-[#C28839]/90 px-2.5 py-1 rounded-full">
                          <Eye className="w-3 h-3" /> Ver Post
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                      <span className="text-white text-xs font-semibold flex items-center gap-1 bg-[#C28839]/90 px-3 py-1.5 rounded-full backdrop-blur-xs">
                        <Eye className="w-3.5 h-3.5" /> Ver Detalhes
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="text-xs text-[#C28839] font-bold uppercase tracking-wider mb-1">
                      {project.highlight}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#1C1917] mb-2 group-hover:text-[#C28839] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-stone-600 text-sm font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-500 group-hover:text-[#1C1917] transition-colors">
                      {hasCarousel
                        ? `Ver carrossel completo (${totalSlides} fotos)`
                        : "Ver especificações"}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#C28839] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Big Action Bar to Open Dedicated Gallery Page */}
        <div className="mt-16 bg-white p-8 sm:p-10 rounded-3xl border border-[#E6DFD5] shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C28839] uppercase tracking-wider mb-2">
              <Images className="w-4 h-4" />
              <span>Explorar Acervo Fotográfico</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] mb-2">
              Quer ver todos os nossos projetos e detalhes?
            </h3>
            <p className="text-stone-600 text-sm sm:text-base font-light">
              Navegue pela nossa galeria completa com carrosséis dos posts do Instagram e fotos de projetos entregues em Indaiatuba, Salto e Itu.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/galeria"
              onClick={() =>
                void trackClick({
                  event: "cta_click",
                  label: "Abrir Galeria Completa",
                  section: "home_gallery",
                })
              }
              className="w-full sm:w-auto bg-[#1C1917] hover:bg-stone-800 text-white font-semibold px-8 py-4 rounded-full flex items-center justify-center gap-3 shadow-md hover:shadow-xl transition-all duration-200 hover:scale-[1.03]"
            >
              <Images className="w-5 h-5 text-[#C28839]" />
              <span>Abrir Galeria Completa</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-stone-200 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-black text-white p-2.5 rounded-full transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Image / Carousel Viewport */}
            <div className="relative h-72 sm:h-[420px] w-full bg-stone-950">
              <Image
                src={
                  selectedProject.slides[modalSlideIndex]?.src ||
                  selectedProject.slides[0].src
                }
                alt={selectedProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
              />

              {selectedProject.slides.length > 1 && (
                <>
                  <div className="absolute top-4 left-4 bg-black/70 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md">
                    Foto {modalSlideIndex + 1} de {selectedProject.slides.length}
                  </div>
                  <button
                    type="button"
                    onClick={() => stepModalSlide(-1)}
                    aria-label="Foto anterior"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/70 hover:bg-[#C28839] text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepModalSlide(1)}
                    aria-label="Próxima foto"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-black/70 hover:bg-[#C28839] text-white flex items-center justify-center transition-colors cursor-pointer shadow-lg"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip (ONLY for Instagram Carousel posts) */}
            {selectedProject.slides.length > 1 && (
              <div className="bg-stone-900 px-6 py-3 flex items-center gap-2.5 overflow-x-auto border-b border-stone-800">
                {selectedProject.slides.map((slide, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setModalSlideIndex(idx)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      idx === modalSlideIndex
                        ? "border-[#C28839] scale-105 shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
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

            {/* Project Details & Conversion Action (No MDF catalog button) */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C28839] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {selectedProject.highlight}
                </span>
                <span className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
                  {selectedProject.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-5 font-light">
                {selectedProject.description}
              </p>

              {/* Technical Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6DFD5]">
                {selectedProject.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs sm:text-sm text-stone-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C28839] shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-100">
                <a
                  href={`https://wa.me/5519994432077?text=Ol%C3%A1!%20Gostei%20muito%20do%20projeto%20"${encodeURIComponent(
                    selectedProject.title
                  )}"%20do%20site%20e%20gostaria%20de%20saber%20mais!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    void trackClick({
                      event: "whatsapp_click",
                      label: `Orçar Projeto: ${selectedProject.title}`,
                      section: "home_gallery_modal",
                    })
                  }
                  className="flex-1 bg-[#C28839] hover:bg-[#A77129] text-white text-center py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Quero um Projeto Como Esse</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3.5 rounded-xl border border-stone-300 text-stone-700 font-medium hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
