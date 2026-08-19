"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, BookOpen, Briefcase, Mail } from "lucide-react";
import { DividerLines } from "@/components/divider-lines";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Trava a rolagem da página quando o menu estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 flex lg:hidden transition-all duration-300 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {/* Overlay escuro: Fechamento ao clicar fora */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2.5px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer Lateral */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 flex h-full w-[55%] min-w-[240px] max-w-[290px] flex-col bg-[#1B263B] py-8 shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Topo com Logo */}
        <div className="flex w-full justify-center px-4 pt-6">
          <Image
            src="/img/logo_principal_branco_zenite.png"
            alt="Logo Zênite Menu"
            width={220}
            height={220}
            className="h-auto w-44 sm:w-48 opacity-90"
            priority
          />
        </div>

        {/* Divisores */}
        <DividerLines />

        {/* Contêiner de Links */}
        <div className="flex mt-[7%] flex-col justify-center px-6 pb-12">
          <nav className="flex flex-col gap-8">
            <Link
              href="/"
              onClick={onClose}
              className="flex w-full items-center gap-4 rounded-lg p-2.5 text-xl font-medium text-slate-100 transition-colors hover:bg-slate-800/40 hover:text-[#F57C00]"
            >
              <Home size={32} className="shrink-0" />
              <span>Home</span>
            </Link>

            <Link
              href="/sobre"
              onClick={onClose}
              className="flex w-full items-center gap-4 rounded-lg p-2.5 text-xl font-medium text-slate-100 transition-colors hover:bg-slate-800/40 hover:text-[#F57C00]"
            >
              <BookOpen size={33} className="shrink-0" />
              <span>Sobre</span>
            </Link>

            <Link
              href="/servicos"
              onClick={onClose}
              className="flex w-full items-center gap-4 rounded-lg p-2.5 text-xl font-medium text-slate-100 transition-colors hover:bg-slate-800/40 hover:text-[#F57C00]"
            >
              <Briefcase size={32} className="shrink-0" />
              <span>Serviços</span>
            </Link>

            <Link
              href="/contato"
              onClick={onClose}
              className="flex w-full items-center gap-4 rounded-lg p-2.5 text-xl font-medium text-slate-100 transition-colors hover:bg-slate-800/40 hover:text-[#F57C00]"
            >
              <Mail size={32} className="shrink-0" />
              <span>Contato</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}