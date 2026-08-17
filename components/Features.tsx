import { Sparkles, Layers, Box, Cpu, Clock, ShieldCheck, Award } from "lucide-react";

export default function Features() {
  const differentials = [
    {
      icon: <Layers className="w-6 h-6 text-[#C28839]" />,
      title: "100% MDF Premium",
      description:
        "Utilizamos apenas MDF de alta densidade das marcas líderes de mercado (Guararapes, Arauco, Duratex), com resistência superior e proteção contra umidade.",
    },
    {
      icon: <Box className="w-6 h-6 text-[#C28839]" />,
      title: "Projeto 3D Realista",
      description:
        "Visualize seu ambiente em renderização 3D antes da fabricação. Ajustamos cada detalhe de divisórias, cores e iluminação com você.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#C28839]" />,
      title: "Ferragens com Amortecimento",
      description:
        "Corrediças telescópicas invisíveis e dobradiças de alto ciclo com sistema de fechamento suave (slow-motion), evitando impactos e ruídos.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#C28839]" />,
      title: "Fabricação Própria",
      description:
        "Marceneiros especializados com máquinas de precisão. Acabamentos de borda milimétricos e controle de qualidade peça por peça.",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#C28839]" />,
      title: "Pontualidade em Contrato",
      description:
        "Respeitamos rigorosamente os prazos acordados. Do início da produção à montagem final, seu cronograma é nossa prioridade.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#C28839]" />,
      title: "Garantia e Pós-Venda",
      description:
        "Suporte direto de marcenaria local em Indaiatuba. Garantia de fabricação e assistência rápida para o que você precisar.",
    },
  ];

  return (
    <section id="diferenciais" className="py-24 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE2] border border-[#E6DFD5] text-[#C28839] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Por que a Monassi?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight mb-4">
            A união perfeita entre técnica artesanal e modernidade.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Não entregamos apenas móveis: entregamos durabilidade, sofisticação e a sensação indescritível de viver em um ambiente planejado nos mínimos detalhes.
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-[#E6DFD5] shadow-sm hover:shadow-xl hover:border-[#C28839]/50 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#F3ECE2] flex items-center justify-center mb-6 group-hover:bg-[#C28839] group-hover:text-white transition-colors duration-300">
                <span className="transition-colors duration-300 group-hover:brightness-200">
                  {item.icon}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1C1917] mb-3 group-hover:text-[#C28839] transition-colors">
                {item.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
