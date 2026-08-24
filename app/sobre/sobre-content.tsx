"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedParticles from "@/components/AnimatedParticles";
import TeamCarousel from "@/components/Sobre/TeamCarousel";
import FaqSection from "@/components/Sobre/FaqSection";
import { SectionBackdrop } from "@/components/motion/SectionBackdrop";
import { GlobalBackdrop } from "@/components/motion/GlobalBackdrop";

export default function SobreContent() {
  // Timeline desktop: o nó de luz acompanha o progresso do scroll dentro
  // da seção "Sobre" (hero + equipe)
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });
  const nodeTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="w-full min-h-screen bg-[#0F0C29] text-white overflow-x-hidden relative">
      {/* ============================================================ */}
      {/* MOBILE — inalterado, apenas movido para dentro de lg:hidden   */}
      {/* ============================================================ */}
      <div className="lg:hidden">
        {/* SEÇÃO HERO: Sobre Nós */}
        <section className="relative flex flex-col gap-6 px-6 pt-10 pb-2 max-w-md mx-auto overflow-hidden">
          <AnimatedParticles count={88} />
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
          <AnimatedParticles count={88} />
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
      </div>

      {/* ============================================================ */}
      {/* DESKTOP — mesma narrativa do mobile, com timeline animada     */}
      {/* ============================================================ */}
      <div className="hidden lg:block relative bg-[#0A1628]">
        <GlobalBackdrop />
        <div ref={timelineRef} className="relative z-10">
          {/* trilho + nó de luz que acompanha o scroll (hero → equipe) */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-white/10 z-0" />
          <motion.div
            style={{ top: nodeTop }}
            className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          >
            <div className="h-4 w-4 rounded-full bg-[#00B4D8] shadow-[0_0_20px_6px_rgba(0,180,216,0.6)]" />
          </motion.div>

          {/* HERO desktop */}
          <section className="relative min-h-screen flex items-center px-12 overflow-hidden">
            <SectionBackdrop label="Sobre" />

            <div className="relative z-10 grid grid-cols-2 items-center gap-16 w-full max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-4"
              >
                <div className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[#F57C00]" />
                  <span className="text-xs font-semibold text-[#F57C00] uppercase tracking-wider">
                    nossa ascensão
                  </span>
                </div>

                <h1 className="text-6xl font-black leading-none uppercase tracking-tight">
                  <span style={{ WebkitTextStroke: "2px #00B4D8" }} className="text-[#0F0C29]">
                    SOBRE
                  </span>
                  <br />
                  <span className="text-white">— NÓS</span>
                </h1>

                <p className="text-slate-300 leading-relaxed max-w-md mt-2">
                  <span className="text-[#F57C00] font-bold text-lg">A</span> ideia
                  teve o início pelo Dev Aquiles, sendo uma solução prática para
                  o <span className="text-[#F57C00] font-semibold">problema</span> de
                  sua mãe, ela perdia noites em claro por causa da falta de
                  integração entre o estoque e a emissão fiscal. Com isso em
                  mente, nós criamos a Zênite, para resolver o problema dela e
                  de milhões de MEIs no Brasil.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-[360px] rounded-[48px] overflow-hidden"
              >
                <Image src="/img/equipe.png" alt="Equipe Zênite" fill className="object-cover" />
              </motion.div>
            </div>
          </section>

          {/* DESENVOLVEDORES desktop */}
          <section className="relative min-h-screen flex flex-col justify-center px-12 py-20 overflow-hidden">
            <SectionBackdrop label="Equipe" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col gap-1 max-w-6xl mx-auto w-full mb-10"
            >
              <div className="flex items-center gap-2">
                <span className="h-1 w-3 rounded-full bg-[#F57C00]" />
                <span className="text-xs font-semibold text-[#F57C00] uppercase tracking-wider">
                  DESENVOLVEDORES
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white">A equipe por trás</h2>
            </motion.div>

            <div className="relative z-10">
              <TeamCarousel />
            </div>
          </section>

          {/* FAQS desktop (já lida com o próprio breakpoint internamente) */}
          <FaqSection />
        </div>
      </div>
    </main>
  );
}