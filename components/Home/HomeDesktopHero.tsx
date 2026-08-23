"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/Home/Button";
import { HeroSceneLoader } from "@/components/three/HeroSceneLoader";
import { LiquidBlobLoader } from "@/components/three/LiquidBlobLoader";

const HEADLINE_WORDS = [
  "O",
  "equilíbrio",
  "que",
  "o",
  "seu",
  "estoque",
  "precisa",
];

// Orquestração do reveal: cada palavra entra com leve atraso em cascata
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function HomeDesktopHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-12 py-32"
      style={{
        background:
          "radial-gradient(120% 100% at 15% 0%, #142344 0%, #0A1628 55%, #0A1628 100%)",
      }}
    >
      {/* Grade sutil de fundo — mesmo espírito das linhas do neoconda.com */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Tipografia gigante de fundo, atrás da cena 3D — efeito "ZÊNITE" gigante,
          como o nome do produto atrás do device no neoconda.com */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
        <span
          className="font-extrabold uppercase tracking-tight whitespace-nowrap"
          style={{
            fontSize: "min(22vw, 320px)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.06)",
          }}
        >
          Zênite
        </span>
      </div>

      {/* Glow de marca — cyan à esquerda, laranja sutil ao fundo */}
      <div
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ backgroundColor: "#00BCD4", opacity: 0.14, filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ backgroundColor: "#F57C00", opacity: 0.12, filter: "blur(120px)" }}
      />

      {/* Blob líquido decorativo — acento visual atrás do texto, sem competir com o painel 3D do dashboard */}
      <div className="absolute -top-20 -left-16 w-[320px] h-[320px] opacity-70">
        <LiquidBlobLoader className="w-full h-full" />
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-2 items-center gap-16">
        {/* Texto */}
        <div className="flex flex-col gap-6">
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-6xl font-extrabold leading-[1.05] text-white"
          >
            {HEADLINE_WORDS.map((w, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                className={`inline-block mr-3 ${
                  w === "estoque" || w === "equilíbrio" ? "text-[#F57C00]" : ""
                }`}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-slate-300 leading-relaxed max-w-md"
          >
            Zênite é a plataforma que transforma o caos do seu inventário em
            controle total. Organizando seu estoque e emitindo as notas
            fiscais.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 pt-2"
          >
            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Button href="/cadastro" variant="textured">
                Começar agora
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#como-funciona"
                className="flex items-center justify-center gap-1 rounded-xl border border-white/15 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
              >
                Como funciona <span className="text-lg">→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Ilustração 3D (ou fallback) com parallax de scroll */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ y, scale, opacity }}
          className="relative"
        >
          <div
            className="absolute -top-10 -left-10 w-[240px] h-[200px] rounded-full pointer-events-none -z-10"
            style={{ backgroundColor: "#4837E8", opacity: 0.35, filter: "blur(50px)" }}
          />
          <div
            className="absolute -bottom-10 -right-10 w-[220px] h-[170px] rounded-full pointer-events-none -z-10"
            style={{ backgroundColor: "#00BCD4", opacity: 0.25, filter: "blur(50px)" }}
          />

          <HeroSceneLoader />
        </motion.div>
      </div>
    </section>
  );
}