"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Menu, X, Phone } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Diferenciais", href: "/#diferenciais" },
    { label: "Projetos", href: "/#projetos" },
    { label: "Galeria", href: "/galeria" },
    { label: "Depoimentos", href: "/#depoimentos" },
  ];

  const whatsappUrl =
    "https://wa.me/5519994432077?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20para%20m%C3%B3veis%20planejados.";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1C1917]/95 backdrop-blur-md py-3 shadow-lg border-b border-stone-800"
          : "bg-gradient-to-b from-[#1C1917]/90 via-[#1C1917]/50 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2 group">
          <div className="relative h-10 w-36 sm:h-12 sm:w-44 transition-transform duration-300 group-hover:scale-[1.02]">
            <Image
              src="/img/logo-monassi-white.png"
              alt="Monassi Móveis Planejados"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-stone-200 hover:text-[#C28839] text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+5519994432077"
            className="text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-700/60 hover:border-stone-500 transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#C28839]" />
            <span>(19) 99443-2077</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#C28839] hover:bg-[#A77129] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Pedir Orçamento</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden bg-[#C28839] text-white p-2 rounded-full"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-stone-200 hover:text-white p-2 rounded-lg focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1C1917] border-b border-stone-800 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-200 hover:text-[#C28839] text-base font-medium py-1 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
            <a
              href="tel:+5519994432077"
              className="text-stone-300 text-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C28839]" />
              <span>(19) 99443-2077</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#C28839] text-white text-center py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
