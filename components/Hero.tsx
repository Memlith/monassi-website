"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Star, Layers } from "lucide-react";
import { trackClick } from "@/lib/analytics";

export default function Hero() {
  const whatsappUrl =
    "https://wa.me/5519994432077?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20m%C3%B3veis%20planejados.";

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-[#1C1917] text-white pt-28 pb-16 overflow-hidden">
      {/* Background Image with Ambient Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero-bg-marcenaria.webp"
          alt="Monassi Móveis Planejados Hero Background"
          fill
          className="object-cover object-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-[#1C1917]/70 to-[#1C1917]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(194,136,57,0.15),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-800/80 border border-[#C28839]/40 text-[#F3ECE2] text-xs sm:text-sm font-medium mb-6 backdrop-blur-md animate-fade-in shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-[#C28839]" />
          <span>Marcenaria 2.0 de Alto Padrão em Indaiatuba, Salto e Itu</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#FAF8F5] leading-[1.12] max-w-4xl mb-6">
          Móveis planejados que <span className="italic font-normal text-[#C28839]">transformam</span> o seu espaço em arte.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10">
          Unimos projeto 3D personalizado, precisão industrial da Marcenaria 2.0 (CorteCloud) e montagem especializada para criar ambientes sob medida em Indaiatuba, Salto e Itu.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              void trackClick({
                event: "whatsapp_click",
                label: "Solicitar Orçamento Grátis (Hero)",
                section: "hero",
              })
            }
            className="w-full sm:w-auto bg-[#C28839] hover:bg-[#A77129] text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-full flex items-center justify-center gap-3 shadow-xl hover:shadow-[#C28839]/25 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group animate-pulse-glow"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>Solicitar Orçamento Grátis</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <Link
            href="/catalogo"
            onClick={() =>
              void trackClick({
                event: "cta_click",
                label: "Catálogo de Madeiras MDF (Hero)",
                section: "hero",
              })
            }
            className="w-full sm:w-auto bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white font-medium text-base px-7 py-4 rounded-full border border-stone-700/80 hover:border-[#C28839] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-[#C28839]" />
            <span>Catálogo de Madeiras MDF</span>
          </Link>
        </div>

        {/* Trust Badges Minimal List */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-stone-400 mb-12">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#C28839]" /> 100% MDF de Alta Densidade
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#C28839]" /> Projeto 3D Personalizado
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C28839]" /> Montagem Própria & Garantia
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl pt-8 border-t border-stone-800/80">
          <div className="bg-stone-900/40 p-4 rounded-2xl border border-stone-800/60 backdrop-blur-xs">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C28839] mb-1">+10 Anos</div>
            <div className="text-xs text-stone-400 font-medium">De Experiência & Tradição</div>
          </div>
          <div className="bg-stone-900/40 p-4 rounded-2xl border border-stone-800/60 backdrop-blur-xs">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C28839] mb-1">+500</div>
            <div className="text-xs text-stone-400 font-medium">Ambientes Entregues</div>
          </div>
          <div className="bg-stone-900/40 p-4 rounded-2xl border border-stone-800/60 backdrop-blur-xs">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C28839] mb-1">100%</div>
            <div className="text-xs text-stone-400 font-medium">Projetos Sob Medida</div>
          </div>
          <div className="bg-stone-900/40 p-4 rounded-2xl border border-stone-800/60 backdrop-blur-xs">
            <div className="flex items-center justify-center gap-1 text-2xl sm:text-3xl font-serif font-bold text-[#C28839] mb-1">
              5.0 <Star className="w-5 h-5 fill-[#C28839] text-[#C28839] inline" />
            </div>
            <div className="text-xs text-stone-400 font-medium">Satisfação dos Clientes</div>
          </div>
        </div>
      </div>
    </section>
  );
}
