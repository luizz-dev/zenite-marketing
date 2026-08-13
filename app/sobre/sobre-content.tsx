"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import AnimatedParticles from "@/components/Sobre/AnimatedParticles";
import TeamCarousel from "@/components/Sobre/TeamCarousel";
import FaqSection from "@/components/Sobre/FaqSection";

export default function SobreContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="w-full min-h-screen bg-[#0F0C29] text-white overflow-x-hidden relative">
      {/* SEÇÃO HERO: Sobre Nós */}
      <section className="relative flex flex-col gap-6 px-6 pt-10 pb-2 max-w-md mx-auto overflow-hidden">
        <AnimatedParticles count={38} />
      <div className="relative z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-[#F57C00]" />
          <span className="text-[11px] font-semibold text-[#F57C00] uppercase tracking-wider">
            nossa ascensão
          </span>
        </div>
        
        <h1 className="text-3xl font-black leading-none uppercase tracking-tight">
          {/* Texto vazado (apenas contorno) */}
          <span className="text-[#0F0C29] " style={{ WebkitTextStroke: "1.5px #00B4D8" }}>
            
            SOBRE
          </span>
          <br />
          <span className="text-white">— NÓS</span>
        </h1>
        

      </div>
        {/* Imagem Principal */}
        <div className="relative z-10 w-full h-[210px] rounded-[100px] ">
          <Image
            src="/img/equipe.png"
            alt="Equipe Zênite"
            fill
            className="object-cover"
          />
        </div>

        {/* Texto Explicativo */}
        <p className="relative z-10 text-sm text-slate-300 leading-relaxed">
          <span className="text-[#F57C00] font-bold text-base">A</span> ideia
          teve o início pelo Dev Aquiles, sendo uma solução prática para o{" "}
          <span className="text-[#F57C00] font-semibold">problema</span> de sua mãe,
          ela perdia noites em claro por causa da falta de integração entre o estoque e a emissão fiscal. Com isso em mente, nós
          criamos a Zênite, para resolver o problema dela e de
          milhões de MEIs no Brasil.
        </p>

        <div className="relative w-[75vw] h-[2px] bg-gradient-to-r from-transparent via-[#F57C00] to-transparent flex items-center justify-center my-4 mx-auto">
          {/* Ponto central com brilho */}
          <div className="absolute w-2.5 h-2.5 rounded-full bg-[#F57C00] shadow-[0_0_12px_4px_rgba(245,124,0,0.8)] shrink-0" />
        </div>

      </section>


      {/* SEÇÃO DESENVOLVEDORES */}
      <section className="relative flex flex-col gap-6 px-6 pt-8 pb-10  bg-gradient-to-t from-[#170D4A] to-[#0F0C29] overflow-hidden">
        <AnimatedParticles count={40} />
        <div className="relative z-10 flex flex-col gap-1 max-w-md mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="h-1 w-3 rounded-full bg-[#F57C00]" />
            <span className="text-[11px] font-semibold text-[#F57C00] uppercase tracking-wider">
              DESENVOLVEDORES
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">A equipe por trás</h2>
        </div>

        {/* Componente isolado do Carrossel da Equipe */}
        <TeamCarousel />

      </section>

      {/* SEÇÃO FAQS */}
      <FaqSection />

    </main>
  );
}