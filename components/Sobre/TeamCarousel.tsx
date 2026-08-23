"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

function MemberCardBody({ member }: { member: (typeof teamMembers)[number] }) {
  return (
    <div className="w-[95%] h-[95%] rounded-[15px] bg-white/[0.03] shadow-[0px_0px_10px_#00000050] backdrop-blur-md p-4 py-4.5 flex flex-col justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-16 items-center justify-center rounded-xl bg-slate-200 text-slate-900 font-bold text-sm shrink-0 shadow-sm">
          {member.initials}
        </div>
        <div className="truncate">
          <h3 className="text-sm font-bold text-white leading-tight truncate">
            {member.name}
          </h3>
          <p className="text-[11px] text-slate-300">{member.role}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 my-2">
        {member.tags.map((tag, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-medium text-center ${tag.color}`}
          >
            {tag.name}
          </span>
        ))}
      </div>

      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-1.5 rounded-xl bg-[#F57C00] hover:bg-[#e07000] text-white text-[11px] font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
      >
        SAIBA MAIS <span>→</span>
      </a>
    </div>
  );
}

function DesktopMemberCard({
  member,
  index,
}: {
  member: (typeof teamMembers)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, borderColor: "rgba(0,188,212,0.4)" }}
      className="relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#111C34] px-6 py-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
    >
      {/* Avatar com anel gradiente laranja/cyan */}
      <div className="relative flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#F57C00] to-[#00BCD4] opacity-80" />
        <div className="absolute inset-[3px] rounded-full bg-[#111C34] flex items-center justify-center">
          <span className="text-lg font-bold text-white">{member.initials}</span>
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-white">{member.name}</h3>
        <p className="text-xs text-slate-400">{member.role}</p>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {member.tags.map((tag, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[10px] font-medium ${tag.color}`}
          >
            {tag.name}
          </span>
        ))}
      </div>

      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 w-full py-2 rounded-xl bg-[#F57C00] hover:bg-[#e07000] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
      >
        SAIBA MAIS <span>→</span>
      </a>
    </motion.div>
  );
}

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
      {/* ============ MOBILE — carrossel original, intacto ============ */}
      <div className="lg:hidden">
        <div className="relative z-10 w- max-w-xs mx-auto flex items-center justify-center py-4">
          <div className="absolute top-[-8px] right-[-25px] w-[30%] h-[40%] rounded-full bg-[#5739C4]/100 blur-10 -z-0 pointer-events-none" />
          <div className="absolute bottom-[-10px] left-[-25px] w-[30%] h-[40%] rounded-full bg-[#5739C4]/100 blur-10 -z-0 pointer-events-none" />

          <div className="relative z-10 w-[70vw] h-[20vh] rounded-[20px] shadow-[0px_0px_5px_#4113CA] bg-gradient-to-b from-[#5739C4] to-[#1C3D7D] p-3 shadow-2xl flex items-center justify-center border border-white/10">
            <MemberCardBody member={currentMember} />
          </div>
        </div>

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
      </div>

      {/* ============ DESKTOP — grid 4 colunas, tema navy/laranja/cyan ============ */}
      <div className="hidden lg:grid grid-cols-4 gap-6 max-w-5xl mx-auto py-4">
        {teamMembers.map((member, index) => (
          <DesktopMemberCard key={member.name} member={member} index={index} />
        ))}
      </div>
    </>
  );
}