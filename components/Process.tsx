import { MessageSquareText, Compass, Hammer, CheckCheck, Sparkles } from "lucide-react";

export default function Process() {
  const steps = [
    {
      number: "01",
      icon: <MessageSquareText className="w-6 h-6 text-[#C28839]" />,
      title: "Atendimento & Briefing",
      description:
        "Envie uma mensagem pelo WhatsApp. Conversamos sobre suas necessidades, estilo preferido e as medidas ou planta do seu imóvel.",
    },
    {
      number: "02",
      icon: <Compass className="w-6 h-6 text-[#C28839]" />,
      title: "Medição & Projeto 3D",
      description:
        "Fazemos a visita técnica para medição precisa no local e desenvolvemos o projeto 3D para você visualizar tudo antes de produzir.",
    },
    {
      number: "03",
      icon: <Hammer className="w-6 h-6 text-[#C28839]" />,
      title: "Marcenaria 2.0 (Corte & Fitagem)",
      description:
        "Projetamos e enviamos as medidas de cada chapa, quantidade e fitas de borda pelo CorteCloud para empresas especializadas (CrieCorte, Gasômetro, Leo Madeiras, etc.), que executam o corte e a fitagem com máxima precisão.",
    },
    {
      number: "04",
      icon: <CheckCheck className="w-6 h-6 text-[#C28839]" />,
      title: "Retirada & Montagem",
      description:
        "Retiramos as peças prontas diretamente no fornecedor e realizamos a montagem dos seus móveis com acabamento impecável, limpeza e pontualidade.",
    },
  ];

  return (
    <section id="processo" className="py-24 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE2] border border-[#E6DFD5] text-[#C28839] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Passo a Passo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight mb-4">
            Como tiramos o seu projeto do papel.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Um processo transparente, sem dores de cabeça e focado na sua total satisfação do início ao fim.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-[#E6DFD5] shadow-sm relative group hover:shadow-xl hover:border-[#C28839]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#F3ECE2] flex items-center justify-center group-hover:bg-[#C28839] group-hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-serif font-bold text-stone-300 group-hover:text-[#C28839] transition-colors">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-[#1C1917] mb-3 group-hover:text-[#C28839] transition-colors">
                  {step.title}
                </h3>
                <p className="text-stone-600 text-sm font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center text-xs font-semibold text-[#C28839]">
                <span>Etapa {index + 1} de 4</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
