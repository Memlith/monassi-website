import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, MessageCircle, ArrowUp } from "lucide-react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#141211] text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="relative h-12 w-44">
              <Image
                src="/img/logo-monassi-v2-white.webp"
                alt="Monassi Móveis Planejados"
                fill
                unoptimized
                className="object-contain"
              />
            </div>
            <p className="text-stone-400 text-sm leading-relaxed font-light">
              Marcenaria 2.0 de alto padrão sob medida. Transformamos cada ambiente em um espaço único, sofisticado e repleto de personalidade em Indaiatuba, Salto e Itu.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/monassiplanejados/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-[#C28839] text-stone-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/5519994432077"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-[#C28839] text-stone-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-serif font-bold text-white text-base uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li>
                <Link href="#" className="hover:text-[#C28839] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="#diferenciais" className="hover:text-[#C28839] transition-colors">
                  Nossos Diferenciais
                </Link>
              </li>
              <li>
                <Link href="/#projetos" className="hover:text-[#C28839] transition-colors">
                  Portfólio de Projetos
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="hover:text-[#C28839] transition-colors">
                  Galeria de Fotos
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-[#C28839] transition-colors">
                  Catálogo de Madeiras MDF (2026)
                </Link>
              </li>
              <li>
                <Link href="/#antes-depois" className="hover:text-[#C28839] transition-colors">
                  Antes & Depois
                </Link>
              </li>
              <li>
                <Link href="#processo" className="hover:text-[#C28839] transition-colors">
                  Como Funciona o Processo
                </Link>
              </li>
              <li>
                <Link href="#depoimentos" className="hover:text-[#C28839] transition-colors">
                  Depoimentos de Clientes
                </Link>
              </li>
              <li>
                <Link href="#duvidas" className="hover:text-[#C28839] transition-colors">
                  Perguntas Frequentes (FAQ)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="font-serif font-bold text-white text-base uppercase tracking-wider mb-4">
              Contato & Localização
            </h4>
            <ul className="space-y-3.5 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C28839] shrink-0 mt-0.5" />
                <a
                  href="https://g.co/kgs/zN52t2z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C28839] transition-colors"
                >
                  Indaiatuba, São Paulo - SP
                  <span className="block text-xs text-stone-500">Atendemos Indaiatuba, Salto e Itu</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#C28839] shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/5519994432077"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C28839] transition-colors"
                >
                  (19) 99443-2077
                  <span className="block text-xs text-stone-500">WhatsApp & Chamadas</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#C28839] shrink-0 mt-0.5" />
                <div>
                  <span className="block">Seg a Sex: 08:00 às 18:00</span>
                  <span className="block text-xs text-stone-500">Sábados: 08:00 às 12:00</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Ambientes Atendidos */}
          <div>
            <h4 className="font-serif font-bold text-white text-base uppercase tracking-wider mb-4">
              Ambientes Planejados
            </h4>
            <p className="text-xs text-stone-400 font-light mb-4">
              Projetos sob medida completos para residências e empresas:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Cozinhas",
                "Dormitórios",
                "Closets",
                "Área Gourmet",
                "Home Theater",
                "Banheiros",
                "Lavabos",
                "Home Office",
                "Corporativo",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-stone-900 border border-stone-800 text-stone-300 px-2.5 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {currentYear} Monassi Móveis Planejados. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Indaiatuba, Salto e Itu / SP</span>
            <Link
              href="#"
              className="hover:text-stone-300 flex items-center gap-1 transition-colors"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
