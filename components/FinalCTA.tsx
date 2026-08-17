import { MessageCircle, ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from "lucide-react";

export default function FinalCTA() {
  const whatsappUrl =
    "https://wa.me/5519994432077?text=Ol%C3%A1!%20Quero%20iniciar%20meu%20projeto%20de%20m%C3%B3veis%20planejados%20com%20a%20Monassi!";

  return (
    <section className="py-24 bg-[#1C1917] text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C28839]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-800 border border-[#C28839]/40 text-[#C28839] text-xs sm:text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Dê o Primeiro Passo Hoje</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#FAF8F5] leading-tight mb-6 max-w-3xl mx-auto">
          Pronto para transformar sua casa com móveis sob medida?
        </h2>

        <p className="text-stone-300 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
          Envie uma mensagem sem compromisso e receba nossa consultoria especializada com projeto 3D para valorizar o seu imóvel.
        </p>

        {/* Big CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#C28839] hover:bg-[#A77129] text-white font-semibold text-lg py-5 px-8 rounded-full flex items-center justify-center gap-3 shadow-2xl hover:shadow-[#C28839]/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 group"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span>Falar com a Monassi no WhatsApp</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Benefits Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-stone-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C28839]" />
            <span>Orçamento 100% Gratuito</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C28839]" />
            <span>Projeto 3D Sem Custo</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C28839]" />
            <span>Garantia & Suporte Direto</span>
          </div>
        </div>
      </div>
    </section>
  );
}
