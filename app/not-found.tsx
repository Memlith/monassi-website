import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Images, Layers, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1C1917] text-white flex flex-col items-center justify-center px-4 text-center">
      <div className="relative w-48 h-14 mb-8">
        <Image
          src="/img/logo-monassi-v2-white.webp"
          alt="Monassi Móveis Planejados"
          fill
          unoptimized
          className="object-contain"
        />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-[#C28839] mb-2">
        Erro 404 • Página não encontrada
      </span>
      <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF8F5] mb-4">
        Este ambiente ainda não foi projetado.
      </h1>
      <p className="text-stone-400 text-sm sm:text-base max-w-md font-light mb-8">
        O endereço que você tentou acessar não existe ou foi movido. Explore nosso acervo de projetos ou fale conosco no WhatsApp.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="bg-[#C28839] hover:bg-[#A77129] text-white text-sm font-semibold px-6 py-3.5 rounded-full flex items-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Início</span>
        </Link>
        <Link
          href="/galeria"
          className="bg-stone-800 hover:bg-stone-700 text-white text-sm font-semibold px-6 py-3.5 rounded-full flex items-center gap-2 transition-colors"
        >
          <Images className="w-4 h-4 text-[#C28839]" />
          <span>Galeria de Móveis</span>
        </Link>
        <Link
          href="/catalogo"
          className="bg-stone-800 hover:bg-stone-700 text-white text-sm font-semibold px-6 py-3.5 rounded-full flex items-center gap-2 transition-colors"
        >
          <Layers className="w-4 h-4 text-[#C28839]" />
          <span>Catálogo MDF</span>
        </Link>
        <a
          href="https://wa.me/5519994432077"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-stone-700 hover:border-[#C28839] text-stone-200 text-sm font-semibold px-6 py-3.5 rounded-full flex items-center gap-2 transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-[#C28839]" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
