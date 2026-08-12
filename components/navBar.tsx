"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileMenu } from "@/components/ui/mobile-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex w-full items-center justify-between bg-[#1B263B] px-8 py-6">
        {/* Logo responsivo sem causar overflow/scroll */}
        <Link href="/">
          <Image
            src="/img/logo_branco_zenite.png"
            alt="Logo Zênite"
            width={200}
            height={50}
            className="h-auto w-46 sm:w-44 md:w-48"
            priority
          />
        </Link>

        {/* Links Desktop */}
        <div className="hidden gap-6 text-white md:flex">
          <Link href="/" className="transition-colors hover:text-amber-400">
            Home
          </Link>
          <Link href="/sobre" className="transition-colors hover:text-amber-400">
            Sobre
          </Link>
          <Link href="/servicos" className="transition-colors hover:text-amber-400">
            Serviços
          </Link>
          <Link href="/contato" className="transition-colors hover:text-amber-400">
            Contato
          </Link>
        </div>

        {/* Botão Menu Mobile (invert deixa o ícone menu.svg totalmente branco) */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-1 md:hidden"
          aria-label="Abrir Menu"
        >
          <Image
            src="/icons/menu.svg"
            alt="Ícone do Menu"
            width={32}
            height={32}
            className="h-8 w-8 brightness-0 invert"
          />
        </button>
      </nav>

      {/* Importação do Modal isolado */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}