"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    handleSliderMove(e.touches[0].clientX, rect);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect();
      handleSliderMove(e.clientX, rect);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <section id="antes-depois" className="py-24 bg-[#1C1917] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800 border border-[#C28839]/40 text-[#C28839] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>A Transformação Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight mb-4">
            O poder de transformar qualquer ambiente.
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Arraste a linha central para comparar o ambiente vazio com o resultado final da nossa marcenaria sob medida.
          </p>
        </div>

        {/* Comparison Wrapper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Interactive Slider */}
          <div className="lg:col-span-7">
            <div
              role="slider"
              tabIndex={0}
              aria-label="Comparador antes e depois da marcenaria"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(sliderPosition)}
              className="relative h-[380px] sm:h-[460px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-stone-700 cursor-ew-resize select-none focus:outline-none focus:ring-2 focus:ring-[#C28839]"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onKeyDown={handleKeyDown}
            >
              {/* After Image (Full background) */}
              <div className="absolute inset-0">
                <Image
                  src="/img/transformacao-cozinha-depois.webp"
                  alt="Depois: Gabinete de Cozinha Planejado Monassi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#C28839] text-white text-xs font-bold uppercase px-3 py-1.5 rounded-full shadow-lg">
                  Depois (Monassi)
                </div>
              </div>

              {/* Before Image (Clipped with clip-path so aspect ratio matches 100% on any screen) */}
              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src="/img/transformacao-cozinha-antes.webp"
                  alt="Antes da transformação"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-stone-900/90 text-stone-200 text-xs font-bold uppercase px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg">
                  Antes
                </div>
              </div>

              {/* Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-20 flex items-center justify-center -translate-x-1/2"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-10 h-10 rounded-full bg-white text-[#1C1917] flex items-center justify-center shadow-xl font-bold text-xs border-2 border-[#C28839]">
                  ↔
                </div>
              </div>
            </div>

            <p className="text-center text-xs text-stone-400 mt-3 flex items-center justify-center gap-1">
              <span>Arraste para os lados para ver a diferença</span>
            </p>
          </div>

          {/* Transformation Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900/60 p-6 sm:p-8 rounded-3xl border border-stone-800 backdrop-blur-xs space-y-5">
              <h3 className="text-2xl font-serif font-bold text-[#FAF8F5]">
                O que muda com a Monassi?
              </h3>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C28839] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-100 font-semibold block text-sm sm:text-base">
                      100% de Aproveitamento de Espaço
                    </strong>
                    <span className="text-xs sm:text-sm text-stone-400 font-light">
                      Nenhum centímetro perdido. Armários até o teto e soluções para cantos difíceis.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C28839] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-100 font-semibold block text-sm sm:text-base">
                      Valorização Imediata do Imóvel
                    </strong>
                    <span className="text-xs sm:text-sm text-stone-400 font-light">
                      Móveis planejados de alto padrão aumentam significativamente o valor de mercado e a estética da sua propriedade.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#C28839] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-100 font-semibold block text-sm sm:text-base">
                      Harmonia, Iluminação e Conforto
                    </strong>
                    <span className="text-xs sm:text-sm text-stone-400 font-light">
                      Cores pensadas para o seu ambiente, integração com iluminação em LED e sensação de amplitude.
                    </span>
                  </div>
                </li>
              </ul>

              <div className="pt-4 border-t border-stone-800">
                <a
                  href="https://wa.me/5519994432077?text=Ol%C3%A1!%20Vi%20a%20se%C3%A7%C3%A3o%20de%20Antes%20e%20Depois%20no%20site%20e%20gostaria%20de%20fazer%20uma%20transforma%C3%A7%C3%A3o%20no%20meu%20espa%C3%A7o."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#C28839] hover:bg-[#A77129] text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Quero Transformar Meu Espaço</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
