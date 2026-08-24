"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { MobileMenu } from "@/components/mobile-menu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre" },
  { href: "/servicos", label: "Serviços" },
  { href: "/contato", label: "Contato" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="flex w-full items-center justify-between bg-[#1B263B] px-34 py-6">
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

        {/* Links Desktop — mesmas rotas/textos, com sublinhado animado na rota ativa */}
        <div className="hidden gap-6 text-white lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 transition-colors hover:text-amber-400"
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#F57C00]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Botão Menu Mobile usando ícone do Lucide */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-1 text-white transition-colors hover:text-amber-400 lg:hidden"
          aria-label="Abrir Menu"
        >
          <Menu size={36} />
        </button>
      </nav>

      {/* Importação do Modal isolado */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}