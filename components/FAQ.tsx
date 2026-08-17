"use client";

import { useState } from "react";
import { ChevronDown, Sparkles, MessageCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Qual região a Monassi Móveis Planejados atende?",
      answer:
        "Atendemos prioritariamente toda a cidade de Indaiatuba, além de Salto, Itu, Campinas, Valinhos, Vinhedo e demais municípios da região metropolitana de Campinas e interior de SP.",
    },
    {
      question: "O orçamento e o projeto 3D têm algum custo?",
      answer:
        "Não! O orçamento inicial e a consultoria para o seu espaço são 100% gratuitos e sem compromisso. Você pode nos enviar a planta baixa pelo WhatsApp ou agendar uma medição técnica no seu imóvel.",
    },
    {
      question: "Quais materiais e ferragens são utilizados?",
      answer:
        "Trabalhamos exclusivamente com chapas de 100% MDF de alta densidade das melhores marcas do mercado (Guararapes, Duratex, Arauco) e ferragens de alta durabilidade com amortecimento (sistema slow-motion) que evitam pancadas em portas e gavetas.",
    },
    {
      question: "Qual é o prazo de entrega e montagem dos móveis?",
      answer:
        "Nosso prazo de entrega médio varia entre 30 e 45 dias úteis após a aprovação final do projeto 3D e medição de conferência. Todas as datas são formalizadas em contrato com total garantia de pontualidade.",
    },
    {
      question: "Vocês realizam projetos corporativos e comerciais além de residenciais?",
      answer:
        "Sim! Além de cozinhas, dormitórios, banheiros e closets residenciais, realizamos projetos sob medida para clínicas, escritórios, consultórios, recepções e espaços comerciais.",
    },
    {
      question: "Quais são as condições e formas de pagamento?",
      answer:
        "Oferecemos condições flexíveis que se adaptam ao seu planejamento financeiro, incluindo parcelamento no cartão de crédito, entrada facilitada e descontos especiais para pagamento à vista.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="duvidas" className="py-24 bg-[#FAF8F5] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3ECE2] border border-[#E6DFD5] text-[#C28839] text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C1917] tracking-tight mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Reunimos as respostas para as principais dúvidas dos nossos clientes.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E6DFD5] overflow-hidden shadow-xs transition-all duration-200 hover:border-[#C28839]/40"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-serif font-bold text-stone-900 text-lg hover:text-[#C28839] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#C28839] text-white" : "text-stone-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-stone-600 text-sm sm:text-base font-light leading-relaxed border-t border-stone-100 pt-4 animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-12 text-center bg-[#F3ECE2] p-8 rounded-3xl border border-[#E6DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif font-bold text-stone-900 text-lg">Ainda tem alguma dúvida específica?</h4>
            <p className="text-stone-600 text-sm font-light">Nossa equipe técnica está disponível para te atender agora.</p>
          </div>
          <a
            href="https://wa.me/5519994432077?text=Ol%C3%A1!%20Estou%20com%20uma%20d%C3%BAvida%20sobre%20os%20m%C3%B3veis%20planejados."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C28839] hover:bg-[#A77129] text-white text-sm font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Falar com Marceneiro</span>
          </a>
        </div>
      </div>
    </section>
  );
}
