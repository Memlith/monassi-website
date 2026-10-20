import { Star, Quote, Sparkles, CheckCircle2 } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Mariana Costa",
      role: "Proprietária no Helvetia Park",
      location: "Indaiatuba - SP",
      image: "MC",
      text: "Fizemos toda a marcenaria da nossa cozinha e área gourmet com a Monassi. O acabamento do ripado e o alinhamento dos armários com amortecimento são impecáveis. E o melhor: cumpriram o prazo exatamente como combinado no contrato!",
      project: "Cozinha & Área Gourmet",
    },
    {
      name: "Roberto & Juliana Silveira",
      role: "Moradores no Jardim Pau Preto",
      location: "Indaiatuba - SP",
      image: "RJ",
      text: "O projeto em 3D fez toda a diferença para visualizarmos nosso closet e dormitório de casal. A equipe de montagem foi extremamente cuidadosa, limpa e educada. Ficou ainda mais bonito do que no 3D!",
      project: "Dormitório Casal & Closet",
    },
    {
      name: "Lucas Fernandes",
      role: "Arquiteto e Designer de Interiores",
      location: "Itu & Salto - SP",
      image: "LF",
      text: "Como arquiteto, prezo muito pelo rigor técnico e pelo acabamento fino das bordas e ferragens. Com o processo de Marcenaria 2.0, a Monassi executa meus projetos com fidelidade milimétrica. São parceiros de confiança.",
      project: "Parceria Corporativa & Residencial",
    },
    {
      name: "Beatriz Mendes",
      role: "Moradora próxima ao Parque Ecológico",
      location: "Indaiatuba - SP",
      image: "BM",
      text: "Atendimento exemplar desde o primeiro contato no WhatsApp. Me tiraram todas as dúvidas sobre as cores e ferragens. Minha sala de estar e o painel ripado transformaram a casa inteira.",
      project: "Living & Home Theater",
    },
  ];

  return (
    <section id="depoimentos" className="py-24 bg-[#F3ECE2]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E6DFD5] text-[#C28839] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Avaliações Reais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight mb-4">
            A satisfação de quem confiou na Monassi.
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Mais do que móveis, construímos relacionamentos duradouros através da entrega de ambientes impecáveis.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 border border-[#E6DFD5] shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#C28839]/15" />

              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C28839] text-[#C28839]" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-stone-700">5.0 / 5.0</span>
                </div>

                <p className="text-stone-700 text-sm sm:text-base font-light leading-relaxed italic mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#1C1917] text-[#C28839] font-serif font-bold text-sm flex items-center justify-center border border-[#C28839]/30">
                    {review.image}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-base">
                      {review.name}
                    </h4>
                    <span className="text-xs text-stone-500 block">
                      {review.role} • {review.location}
                    </span>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-[#C28839] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E6DFD5]">
                  <CheckCircle2 className="w-3 h-3" /> {review.project}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
