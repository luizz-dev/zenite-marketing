"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

const services = [
  {
    title: "Emissão Fiscal",
    description:
      "Simplifique a emissão de notas e documentos. Ganhe tempo com processos fiscais rápidos e seguros.",
    icon: "/img/doc.png",
    accent: "#F57C00",
  },
  {
    title: "Gestão Inteligente",
    description:
      "Automatize o controle de entradas e saídas. Mantenha seu inventário sincronizado com precisão absoluta.",
    icon: "/img/caixa.png",
    accent: "#00BCD4",
  },
  {
    title: "Organização do Financeiro",
    description:
      "Tome decisões baseadas em dados. Visualize o giro do seu estoque de forma simplificada.",
    icon: "/img/financeiro.png",
    accent: "#4837E8",
  },
];

/**
 * Card com tilt 3D real via CSS perspective — a rotação segue a posição
 * do mouse dentro do card. Não usa WebGL/Three.js, só transform 3D nativo.
 */
function TiltCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Suaviza o movimento para não ficar "nervoso"
  const springConfig = { stiffness: 150, damping: 18, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [10, -10]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
    springConfig
  );
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1000 }}
      className="relative"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-[#111C34] px-8 py-10 text-center overflow-hidden"
      >
        {/* Glow que segue o mouse — reforça a sensação de profundidade */}
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(280px circle at ${gx} ${gy}, ${service.accent}22, transparent 70%)`
            ) as MotionValue<string>,
          }}
        />

        <div
          style={{ transform: "translateZ(40px)" }}
          className="relative flex h-20 w-20 items-center justify-center rounded-2xl"
        >
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-40"
            style={{ backgroundColor: service.accent }}
          />
          <Image
            src={service.icon}
            alt={service.title}
            width={64}
            height={64}
            className="relative object-contain"
          />
        </div>

        <h3
          style={{ transform: "translateZ(30px)" }}
          className="relative text-xl font-bold text-white"
        >
          {service.title}
        </h3>

        <p
          style={{ transform: "translateZ(20px)" }}
          className="relative text-sm text-slate-300 leading-relaxed"
        >
          {service.description}
        </p>
      </motion.div>
    </motion.div>
  );
}

/** Seta SVG que "se desenha" (stroke animado) quando entra na viewport */
function ProgressArrow({ delay = 0 }: { delay?: number }) {
  return (
    <div className="flex items-center justify-center px-2">
      <svg width="72" height="24" viewBox="0 0 72 24" fill="none">
        <motion.path
          d="M2 12H62"
          stroke="#F57C00"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay, ease: "easeInOut" }}
        />
        <motion.path
          d="M54 4L64 12L54 20"
          stroke="#F57C00"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: delay + 0.4, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

export default function HomeDesktopServices() {
  return (
    <section id="home-servicos" className="relative px-12 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-2"
        >
          <span className="h-1 w-6 rounded-full bg-[#F57C00]" />
          <h2 className="text-3xl font-bold text-white">Serviços</h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-slate-400 mb-12 max-w-lg"
        >
          Do cadastro à conciliação financeira — um fluxo contínuo.
        </motion.p>

        {/* Grid com setas de progressão entre os 3 cards */}
        <div className="grid items-center gap-0" style={{ gridTemplateColumns: "1fr auto 1fr auto 1fr" }}>
          <TiltCard service={services[0]} index={0} />
          <ProgressArrow delay={0.3} />
          <TiltCard service={services[1]} index={1} />
          <ProgressArrow delay={0.5} />
          <TiltCard service={services[2]} index={2} />
        </div>
      </div>
    </section>
  );
}