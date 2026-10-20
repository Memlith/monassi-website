"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  Sparkles,
  Send,
  Check,
  MapPin,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { MDF_PATTERNS } from "@/lib/catalog-data";
import { saveLead } from "@/lib/analytics";

const CITIES = ["Indaiatuba", "Salto", "Itu"] as const;
type AllowedCity = (typeof CITIES)[number];

export default function LeadForm() {
  const [selectedRoom, setSelectedRoom] = useState("Cozinha & Gourmet");
  const [selectedTiming, setSelectedTiming] = useState("Em Obras / Imediato");
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userCity, setUserCity] = useState<AllowedCity>("Indaiatuba");
  const [selectedMdf, setSelectedMdf] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("mdf") || "";
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const rooms = [
    "Cozinha & Gourmet",
    "Dormitório & Closet",
    "Sala & Home Theater",
    "Banheiros & Lavanderia",
    "Apartamento / Casa Completa",
    "Comercial / Escritório",
  ];

  const timings = [
    "Em Obras / Imediato",
    "Próximos 30 a 60 dias",
    "Planejando para o futuro",
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Listen for custom event from WoodCatalogPreview
    const handleSelectMdf = (e: Event) => {
      const custom = e as CustomEvent<string>;
      if (custom.detail) {
        setSelectedMdf(custom.detail);
      }
    };
    window.addEventListener("monassi:select-mdf", handleSelectMdf);
    return () =>
      window.removeEventListener("monassi:select-mdf", handleSelectMdf);
  }, []);

  const handleWhatsAppRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = userName.trim();
    if (cleanName.length < 2) return;

    setIsSubmitting(true);

    // Build and open WhatsApp URL synchronously so iOS Safari never blocks the popup
    const cityPart = `Sou de *${userCity} - SP*. `;
    const mdfPart = selectedMdf
      ? `Padrão MDF de interesse: *${selectedMdf}*. `
      : "";
    const text = `Olá Monassi Móveis Planejados! Meu nome é *${cleanName}*. ${cityPart}Gostaria de solicitar um orçamento para: *${selectedRoom}*. ${mdfPart}Previsão do projeto: *${selectedTiming}*. Podemos conversar?`;
    const whatsappUrl = `https://wa.me/5519994432077?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Save lead to Firebase Cloud Firestore asynchronously
    try {
      await saveLead({
        name: cleanName,
        phone: userPhone.trim() || undefined,
        city: userCity,
        room: selectedRoom,
        mdfPattern: selectedMdf || undefined,
        timing: selectedTiming,
        source: "home_lead_simulator",
      });
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="orcamento" className="py-20 bg-[#FAF8F5] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C1917] text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C28839]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800 border border-[#C28839]/40 text-[#C28839] text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulação Rápida • Marcenaria 2.0</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F5] mb-3">
                Monte seu orçamento sob medida
              </h2>
              <p className="text-stone-300 text-sm sm:text-base font-light">
                Atendimento exclusivo em{" "}
                <strong className="text-white font-medium">
                  Indaiatuba, Salto e Itu
                </strong>
                . Selecione o ambiente, o padrão de MDF (opcional) e receba atendimento prioritário no WhatsApp.
              </p>
            </div>

            <form
              onSubmit={handleWhatsAppRedirect}
              className="space-y-8 max-w-3xl mx-auto"
            >
              {/* Step 1: Select Room */}
              <fieldset>
                <legend className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-3">
                  1. Qual ambiente você deseja planejar?
                </legend>
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
                      {selectedRoom === room && (
                        <Check className="w-4 h-4 shrink-0 ml-1" />
                      )}
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Step 2: City Selection (Exclusive to Indaiatuba, Salto, Itu) */}
              <fieldset>
                <legend className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-3">
                  2. Em qual cidade será a montagem? (Atendimento Exclusivo)
                </legend>
                <div className="grid grid-cols-3 gap-3">
                  {CITIES.map((city) => (
                    <label
                      key={city}
                      className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 border cursor-pointer ${
                        userCity === city
                          ? "bg-[#C28839] text-white border-[#C28839] font-semibold shadow-md"
                          : "bg-stone-900/90 text-stone-300 border-stone-700 hover:border-stone-500"
                      }`}
                    >
                      <input
                        type="radio"
                        name="city"
                        value={city}
                        checked={userCity === city}
                        onChange={() => setUserCity(city)}
                        className="sr-only"
                      />
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{city}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Step 3: Timing */}
              <fieldset>
                <legend className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-3">
                  3. Qual a sua previsão para início?
                </legend>
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
              </fieldset>

              {/* Step 4: Contact & Optional MDF Pattern */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="lead-name"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2"
                  >
                    Seu Nome *
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    autoComplete="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Ex: Ana Silva"
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#C28839] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lead-phone"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2"
                  >
                    Seu WhatsApp (opcional)
                  </label>
                  <input
                    id="lead-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="(19) 99999-9999"
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-4 py-3 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#C28839] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lead-mdf"
                    className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2 flex items-center gap-1"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#C28839]" />
                    <span>Padrão MDF (Catálogo)</span>
                  </label>
                  <select
                    id="lead-mdf"
                    name="mdfPattern"
                    value={selectedMdf}
                    onChange={(e) => setSelectedMdf(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-[#C28839] transition-colors"
                  >
                    <option value="">Definir na visita técnica</option>
                    {MDF_PATTERNS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.categoryLabel})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {savedNotice && (
                <div className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Sua simulação foi salva com segurança e o WhatsApp foi aberto!
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C28839] hover:bg-[#A77129] disabled:opacity-60 text-white text-base sm:text-lg font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:shadow-[#C28839]/30 transition-all duration-200 hover:scale-[1.01] cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>
                  {isSubmitting
                    ? "Salvando simulação e abrindo WhatsApp..."
                    : "Enviar Escolha e Receber Atendimento no WhatsApp"}
                </span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
