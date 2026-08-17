"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Eye, Sparkles, X, ChevronRight, Images, ArrowRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  categoryLabel: string;
  image: string;
  description: string;
  highlight: string;
}

export default function Gallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 3 Destaques Principais para a Home Page
  const featuredProjects: Project[] = [
    {
      id: 1,
      title: "Cozinha Gourmet com Coifa Ripada & Churrasqueira",
      categoryLabel: "Cozinhas & Gourmet",
      image: "/img/cozinha-gourmet-churrasqueira.jpg",
      description:
        "Espaço gourmet planejado completo com nicho superior para geladeira, adega/colmeia de garrafas, torre quente e coifa decorativa com painel ripado sobre a churrasqueira.",
      highlight: "Área Gourmet Completa",
    },
    {
      id: 2,
      title: "Living & Painel de TV com Estante",
      categoryLabel: "Salas & Living",
      image: "/img/living-painel-tv-estante.jpg",
      description:
        "Painel de TV sob medida para sala de estar com estante lateral vertical para livros e decoração, prateleira superior para plantas, detalhe ripado e espelho integrado.",
      highlight: "Painel de TV & Estante",
    },
    {
      id: 3,
      title: "Recepção de Consultório Odontológico",
      categoryLabel: "Comercial & Clínicas",
      image: "/img/comercial-consultorio-recepcao.jpg",
      description:
        "Recepção planejada para clínica (Eccel Odontologia) com balcão de atendimento sob medida, painel com logotipo em relevo, parede verde e móvel auxiliar com portas de correr.",
      highlight: "Eccel Odontologia - Recepção",
    },
  ];

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
            Veja uma prévia dos nossos ambientes sob medida executados em Indaiatuba e região.
          </p>
        </div>

        {/* 3 Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-3xl overflow-hidden border border-[#E6DFD5] shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col cursor-pointer"
            >
              {/* Image Box */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                  <span className="text-white text-xs font-semibold flex items-center gap-1 bg-[#C28839]/90 px-3 py-1.5 rounded-full backdrop-blur-xs">
                    <Eye className="w-3.5 h-3.5" /> Ver Detalhes
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1C1917]/80 text-stone-200 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md">
                    {project.categoryLabel}
                  </span>
                </div>
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
                    Ver especificações
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#C28839] transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
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
              Navegue pela nossa nova galeria interativa no estilo do app Fotos do iPhone e Google Fotos, com zoom em alta resolução e detalhes de cada ambiente.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/galeria"
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative border border-stone-200">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black text-white p-2 rounded-full transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 sm:h-96 w-full bg-stone-900">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C28839]">
                  {selectedProject.highlight}
                </span>
                <span className="text-xs bg-stone-100 text-stone-600 px-3 py-1 rounded-full">
                  {selectedProject.categoryLabel}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] mb-3">
                {selectedProject.title}
              </h3>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 font-light">
                {selectedProject.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-stone-100">
                <a
                  href={`https://wa.me/5519994432077?text=Ol%C3%A1!%20Gostei%20muito%20do%20projeto%20"${encodeURIComponent(
                    selectedProject.title
                  )}"%20do%20site%20e%20gostaria%20de%20saber%20mais!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#C28839] hover:bg-[#A77129] text-white text-center py-3.5 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Quero um Projeto Como Esse</span>
                </a>
                <button
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
