"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl =
    "https://wa.me/5519994432077?text=Ol%C3%A1!%20Estou%20no%20site%20da%20Monassi%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20m%C3%B3veis%20planejados.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-none">
      {/* Tooltip Notification */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-stone-900 px-4 py-2.5 rounded-2xl shadow-2xl border border-[#E6DFD5] text-xs font-medium pointer-events-auto animate-fade-in mb-2">
          <span>Olá! Posso te ajudar com um orçamento?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-stone-600 ml-1 p-0.5"
            aria-label="Fechar dica"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 active:scale-95 pointer-events-auto group relative animate-pulse-glow"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="sr-only">Falar no WhatsApp</span>
      </a>
    </div>
  );
}
