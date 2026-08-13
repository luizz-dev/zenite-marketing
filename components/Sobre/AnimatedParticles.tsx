"use client";

import { useMemo } from "react";

// Formas orgânicas tipo "respingo de tinta" (viewBox 0 0 24 24).
// Todas renderizadas só com contorno (sem preenchimento).
const SHAPES = [
  // blob irregular preenchido
  "M12 2c3 0 5.5 1.8 6.6 4.4 1 2.4 0.2 5-1.4 7-1.6 2-3.8 3.6-6.4 3.4-2.6-0.2-5-2-6.2-4.4C3.4 10 3.6 7 5.6 4.8 7.2 3 9.4 2 12 2z",
  // gota/comma
  "M12 2c4 3 7 7 7 11a7 7 0 1 1-14 0c0-4 3-8 7-11z",
  // anel irregular (contorno)
  "M12 3c4.5 0 8 3.2 8 7.5S16.5 18 12 18s-8-3.2-8-7.5S7.5 3 12 3zm0 3.2c-2.7 0-4.8 2-4.8 4.3s2.1 4.3 4.8 4.3 4.8-2 4.8-4.3-2.1-4.3-4.8-4.3z",
  // blob pequeno alongado
  "M4 12c0-3 3.6-6 8-6s8 2.5 8 5.5-3.4 6.5-8 6.5S4 15 4 12z",
];

type Particle = {
  id: number;
  shape: string;
  size: number;
  top: number;
  left: number;
  rotation: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
  driftX: number;
  driftY: number;
  spin: number;
};

// Paleta oficial do Zênite — predominância de azuis, com toques de laranja
const COLORS = [
  "#2773FF",
  "#0D6AD8",
  "#00B4D8",
  "#5739C4",
  "#2773FF",
  "#0D6AD8",
  "#F57C00",
];

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    return {
      id: i,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      size: 10 + Math.random() * 22, // 10px a 32px
      top: Math.random() * 100,
      left: Math.random() * 100,
      rotation: Math.random() * 360,
      duration: 6 + Math.random() * 20, // 16s a 36s
      delay: -Math.random() * 30,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.18 + Math.random() * 0.35,
      driftX: (Math.random() - 0.5) * 60,
      driftY: (Math.random() - 0.5) * 80,
      spin: (Math.random() - 0.5) * 50, // graus de rotação extra no ciclo
    };
  });
}

interface AnimatedParticlesProps {
  /** Quantidade de formas no desktop. No mobile é reduzido automaticamente via CSS. */
  count?: number;
  className?: string;
}

/**
 * Fundo animado leve (SVG + CSS puro, sem canvas/JS por frame) com formas
 * orgânicas tipo respingo/anel, que flutuam e giram devagar. Substitui
 * texturas de "noise" estáticas. Use dentro de um container com position: relative.
 *
 * <section className="relative ...">
 *   <AnimatedParticles />
 *   <div className="relative z-10">...conteúdo...</div>
 * </section>
 */
export default function AnimatedParticles({
  count = 34,
  className = "",
}: AnimatedParticlesProps) {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {particles.map((p, i) => (
        // wrapper: guarda a rotação inicial estática (não pode ficar na
        // mesma tag que anima "transform", ou uma sobrescreve a outra)
        <div
          key={p.id}
          className={`absolute ${i >= count / 2 ? "hidden sm:block" : "block"}`}
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full animate-particle-float"
            style={
              {
                opacity: p.opacity,
                filter: `drop-shadow(0 0 ${p.size * 0.25}px ${p.color})`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                ["--drift-x" as string]: `${p.driftX}px`,
                ["--drift-y" as string]: `${p.driftY}px`,
                ["--spin" as string]: `${p.spin}deg`,
              } as React.CSSProperties
            }
          >
            <path
              d={p.shape}
              fill="none"
              stroke={p.color}
              strokeWidth={1.4}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}