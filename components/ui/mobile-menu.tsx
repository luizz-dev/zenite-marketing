"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, BookOpen, Briefcase, Mail, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* Fundo escurecido fora do menu (clicar nele fecha o menu) */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Painel Lateral do Menu (Drawer Esquerdo) */}
      <div className="relative z-10 flex h-full w-[75%] max-w-[300px] flex-col bg-[#1B263B] p-6 shadow-2xl">
        
        {/* Topo: Logo e botão fechar */}
        <div className="flex items-center justify-between border-b border-slate-700/50 pb-6">
          <Image
            src="/img/logo_branco_zenite.png"
            alt="Logo Zênite"
            width={120}
            height={40}
            className="h-auto w-28"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-300 hover:bg-slate-800 hover:text-white"
            aria-label="Fechar menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Links com Ícones */}
        <nav className="mt-8 flex flex-col gap-6">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-4 text-base font-medium text-slate-200 transition-colors hover:text-amber-400"
          >
            <Home size={20} />
            <span>Home</span>
          </Link>

          <Link
            href="/sobre"
            onClick={onClose}
            className="flex items-center gap-4 text-base font-medium text-slate-200 transition-colors hover:text-amber-400"
          >
            <BookOpen size={20} />
            <span>Sobre</span>
          </Link>

          <Link
            href="/servicos"
            onClick={onClose}
            className="flex items-center gap-4 text-base font-medium text-slate-200 transition-colors hover:text-amber-400"
          >
            <Briefcase size={20} />
            <span>Serviços</span>
          </Link>

          <Link
            href="/contato"
            onClick={onClose}
            className="flex items-center gap-4 text-base font-medium text-slate-200 transition-colors hover:text-amber-400"
          >
            <Mail size={20} />
            <span>Contato</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}