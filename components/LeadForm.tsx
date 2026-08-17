"use client";

import { useState } from "react";
import { MessageCircle, Sparkles, Send, Check } from "lucide-react";

export default function LeadForm() {
  const [selectedRoom, setSelectedRoom] = useState("Cozinha & Gourmet");
  const [selectedTiming, setSelectedTiming] = useState("Em Obras / Imediato");
  const [userName, setUserName] = useState("");
  const [userCity, setUserCity] = useState("Indaiatuba");

  const rooms = [
    "Cozinha & Gourmet",
    "Dormitório & Closet",
    "Sala & Home Theater",
    "Banheiros",
    "Apartamento / Casa Completa",
    "Comercial / Escritório",
  ];

  const timings = [
    "Em Obras / Imediato",
    "Próximos 30 a 60 dias",
    "Planejando para o futuro",
  ];

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const namePart = userName ? `Meu nome é ${userName}. ` : "";
    const cityPart = userCity ? `Sou de ${userCity}. ` : "";
    const text = `Olá Monassi Móveis Planejados! ${namePart}${cityPart}Gostaria de solicitar um orçamento para: *${selectedRoom}*. Previsão do projeto: *${selectedTiming}*. Podemos conversar?`;
    
    const whatsappUrl = `https://wa.me/5519994432077?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1917] text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C28839]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800 border border-[#C28839]/40 text-[#C28839] text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulação Rápida</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F5] mb-3">
                Monte seu orçamento sob medida
              </h2>
              <p className="text-stone-300 text-sm sm:text-base font-light">
                Selecione os ambientes que deseja planejar e receba um atendimento prioritário direto no seu WhatsApp.
              </p>
            </div>

            <form onSubmit={handleWhatsAppRedirect} className="space-y-8 max-w-3xl mx-auto">
              {/* Step 1: Select Room */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-3">
                  1. Qual ambiente você deseja planejar?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {rooms.map((room) => (
                    <button
                      type="button"
                      key={room}
                      onClick={() => setSelectedRoom(room)}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all text-left flex items-center justify-between border cursor-pointer ${
                        selectedRoom === room
                          ? "bg-[#C28839] text-white border-[#C28839] shadow-md font-semibold"
                          : "bg-stone-900/90 text-stone-300 border-stone-700 hover:border-stone-500"
                      }`}
                    >
                      <span className="truncate">{room}</span>
                      {selectedRoom === room && <Check className="w-4 h-4 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Timing */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-3">
                  2. Qual a sua previsão para início?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {timings.map((timing) => (
                    <button
                      type="button"
                      key={timing}
                      onClick={() => setSelectedTiming(timing)}
                      className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all text-center border cursor-pointer ${
                        selectedTiming === timing
                          ? "bg-[#C28839] text-white border-[#C28839] font-semibold"
                          : "bg-stone-900/90 text-stone-300 border-stone-700 hover:border-stone-500"
                      }`}
                    >
                      {timing}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                    Seu Nome (opcional)
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Ex: Ana Silva"
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#C28839] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                    Cidade / Região
                  </label>
                  <input
                    type="text"
                    value={userCity}
                    onChange={(e) => setUserCity(e.target.value)}
                    placeholder="Ex: Indaiatuba - SP"
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#C28839] transition-colors"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#C28839] hover:bg-[#A77129] text-white text-base sm:text-lg font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-[#C28839]/30 transition-all duration-200 hover:scale-[1.01] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Enviar Escolha e Receber Atendimento no WhatsApp</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
