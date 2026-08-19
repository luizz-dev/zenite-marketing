"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/Home/Button";

export default function HomeDesktopHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax sutil: a ilustração do dashboard desce/reduz levemente ao rolar
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    // Fundo claro: segue o mesmo esquema do Home mobile (textos em
    // #201F1B / slate-600 só fazem sentido sobre fundo claro)
    <section ref={sectionRef} className="relative overflow-hidden bg-white px-12 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 items-center gap-16">
        {/* Texto — mesmo conteúdo do mobile */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5"
        >
          <h1 className="text-5xl font-extrabold text-[#201F1B] leading-tight">
            O <span className="text-[#F57C00]">equilíbrio</span> que o seu
            estoque precisa
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-md">
            Zênite é a plataforma que transforma o caos do seu inventário em
            controle total. Organizando seu estoque e emitindo as notas
            fiscais.
          </p>

          <div className="flex items-center gap-4 pt-3">
            <Button href="/cadastro" variant="textured">
              Começar agora
            </Button>

            <Link
              href="#como-funciona"
              className="flex items-center justify-center gap-1 rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
            >
              Como funciona <span className="text-lg">→</span>
            </Link>
          </div>
        </motion.div>

        {/* Ilustração — mesma imagem e mesmos orbes do mobile, com parallax de scroll */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ y, scale, opacity }}
          className="relative"
        >
          <div
            className="absolute -top-10 -left-10 w-[220px] h-[180px] rounded-full pointer-events-none -z-10"
            style={{ backgroundColor: "#4837E8", opacity: 0.9, filter: "blur(30px)" }}
          />
          <div
            className="absolute -bottom-10 -right-10 w-[200px] h-[150px] rounded-full pointer-events-none -z-10"
            style={{ backgroundColor: "#4837E8", opacity: 0.9, filter: "blur(30px)" }}
          />

          <Image
            src="/img/hero-illustration.png"
            alt="Dashboard Zênite"
            width={560}
            height={350}
            className="w-full h-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(0,0,0,0.25)]"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
