"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Dados dos desenvolvedores da equipe
const teamMembers = [
  {
    initials: "LE",
    name: "Luiz Eduardo",
    role: "Dev Full-Stack",
    linkedin: "https://www.linkedin.com/in/luiz-alves-leite/",
    tags: [
      { name: "Gerente", color: "bg-orange-600/30 text-orange-300 border border-orange-500/30" },
      { name: "PHP", color: "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30" },
      { name: "MySQL", color: "bg-cyan-600/30 text-cyan-300 border border-cyan-500/30" },
      { name: "TS", color: "bg-blue-600/30 text-blue-300 border border-blue-500/30" },
    ],
  },
  {
    initials: "GL",
    name: "Gabriel Lacerda",
    role: "Dev Back-End",
    linkedin: "https://www.linkedin.com/in/perfil-gabriel",
    tags: [
      { name: "PHP", color: "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30" },
      { name: "MySQL", color: "bg-cyan-600/30 text-cyan-300 border border-cyan-500/30" },
      { name: "NFe/PHP", color: "bg-orange-600/30 text-orange-300 border border-orange-500/30" },
      { name: "Node.js", color: "bg-emerald-600/30 text-emerald-300 border border-emerald-500/30" },
    ],
  },
  {
    initials: "LS",
    name: "Luisa Sales",
    role: "Dev Front-End",
    linkedin: "https://www.linkedin.com/in/perfil-luisa",
    tags: [
      { name: "TS", color: "bg-blue-600/30 text-blue-300 border border-blue-500/30" },
      { name: "Marketing", color: "bg-purple-600/30 text-purple-300 border border-purple-500/30" },
      { name: "Designer", color: "bg-pink-600/30 text-pink-300 border border-pink-500/30" },
      { name: "Figma", color: "bg-rose-600/30 text-rose-300 border border-rose-500/30" },
    ],
  },
  {
    initials: "AV",
    name: "Aquiles Vinicius",
    role: "Dev Back-End",
    linkedin: "https://www.linkedin.com/in/perfil-aquiles",
    tags: [
      { name: "PHP", color: "bg-indigo-600/30 text-indigo-300 border border-indigo-500/30" },
      { name: "MySQL", color: "bg-cyan-600/30 text-cyan-300 border border-cyan-500/30" },
      { name: "Docs", color: "bg-amber-600/30 text-amber-300 border border-amber-500/30" },
      { name: "Node.js", color: "bg-emerald-600/30 text-emerald-300 border border-emerald-500/30" },
    ],
  },
];

export default function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? teamMembers.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === teamMembers.length - 1 ? 0 : prev + 1));
  };

  const currentMember = teamMembers[currentIndex];

  return (
    <>
      {/* CONTAINER DO CARD FIEL AO FIGMA */}
      <div className="relative z-10 w- max-w-xs mx-auto flex items-center justify-center py-4">
        {/* Círculo do topo/direita (Fundo) */}
        <div className="absolute top-[-8px] right-[-25px] w-[30%] h-[40%] rounded-full bg-[#5739C4]/100 blur-10 -z-0 pointer-events-none" />
        
        {/* Círculo da base/esquerda (Fundo) */}
        <div className="absolute bottom-[-10px] left-[-25px] w-[30%] h-[40%] rounded-full bg-[#5739C4]/100 blur-10 -z-0 pointer-events-none" />

        {/* CARD EXTERNO (-> Gradiente #5739C4 para #1C3D7D) */}
        <div className="relative z-10 w-[70vw] h-[20vh] rounded-[20px] shadow-[0px_0px_5px_#4113CA] bg-gradient-to-b from-[#5739C4] to-[#1C3D7D] p-3 shadow-2xl flex items-center justify-center border border-white/10">
          
          {/* CARD INTERNO (-> Transparente com box-shadow) */}
          <div className="w-[95%] h-[95%] rounded-[15px] bg-white/[0.03] shadow-[0px_0px_10px_#00000050] backdrop-blur-md p-4 py-4.5 flex flex-col justify-between">
            
            {/* Header: Inicial + Nome e Função */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-16 items-center justify-center rounded-xl bg-slate-200 text-slate-900 font-bold text-sm shrink-0 shadow-sm">
                {currentMember.initials}
              </div>
              <div className="truncate">
                <h3 className="text-sm font-bold text-white leading-tight truncate">
                  {currentMember.name}
                </h3>
                <p className="text-[11px] text-slate-300">{currentMember.role}</p>
              </div>
            </div>

            {/* Badges de Tecnologias */}
            <div className="flex flex-wrap gap-1.5 my-2">
            {currentMember.tags.map((tag, idx) => (
                <span
                key={idx}
                className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-medium text-center ${tag.color}`}
                >
                {tag.name}
                </span>
            ))}
            </div>

            {/* Botão Saiba Mais (Redireciona para o LinkedIn do integrante atual) */}
            <a
              href={currentMember.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-1.5 rounded-xl bg-[#F57C00] hover:bg-[#e07000] text-white text-[11px] font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              SAIBA MAIS <span>→</span>
            </a>
          </div>

        </div>
      </div>

      {/* Navegação da Equipe (Carrossel Interativo) */}
      <div className="relative z-10 flex items-center justify-center gap-4 mt-2">
        <button
          onClick={prevSlide}
          aria-label="Anterior"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1C3D7D] text-white hover:bg-[#2773FF] transition-all active:scale-90"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-1.5 items-center">
          {teamMembers.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer transition-all duration-300 ${
                currentIndex === index
                  ? "h-2 w-5 rounded-full bg-[#00B4D8]"
                  : "h-2 w-2 rounded-full bg-slate-500 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Próximo"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1C3D7D] text-white hover:bg-[#2773FF] transition-all active:scale-90"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </>
  );
}