"use client";

import { useMemo } from "react";

// Marcas orgânicas pequenas e variadas (viewBox 0 0 24 24): elipse fina,
// feijão, pétala, gancho, vírgula com pontinho solto, anel fino, arco.
// Todas em contorno (sem preenchimento) — só o "dot" opcional é sólido.
const SHAPES: { d: string; dot?: { cx: number; cy: number; r: number } }[] = [
  // elipse/olho aberto
  { d: "M2 12c0-2.2 4.5-4 10-4s10 1.8 10 4-4.5 4-10 4-10-1.8-10-4z" },
  // feijão / rim
  { d: "M5 9c2-3 7-4 10-1 3 3 2 8-2 9-4 1-8-1-9-4-1-2 0-3 1-4z" },
  // pétala
  { d: "M12 3c4 2 6 6 4 10-2 3-6 4-9 1-2-2-2-6 1-9 1-1 3-2 4-2z" },
  // gancho/arco aberto
  { d: "M7 5c-4 4-3 10 1 13" },
  // anel fino irregular
  {
    d: "M12 4c4 0 7 3 7 7.5S16 19 12 19s-7-3.5-7-7.5S8 4 12 4zm0 3c-2.2 0-4 2-4 4.5s1.8 4.5 4 4.5 4-2 4-4.5-1.8-4.5-4-4.5z",
  },
  // vírgula com pontinho solto (tipo "g")
  {
    d: "M14 4c-3 0-6 2.2-6 5.8 0 2.6 1.8 4.5 4.4 4.5 1 0 1.9-0.3 2.6-0.8-0.6 2.4-2.8 4.5-5.6 4.7",
    dot: { cx: 18.5, cy: 16.5, r: 1.2 },
  },
  // traço/arco pequeno
  { d: "M4 13c2-4.5 6.5-6.5 11-5.5" },
  // blob assimétrico
  { d: "M4 12c0-3.5 4-6.5 8.5-6 4 0.4 7 3.5 6.5 7-0.4 3-3.5 5.5-7.5 5S4 15 4 12z" },
  // vírgula simples com pontinho (tipo "a")
  {
    d: "M13 6a5 5 0 1 0 3.2 8.8",
    dot: { cx: 17.5, cy: 6.5, r: 1.1 },
  },
];

type Particle = {
  id: number;
  isCircle: boolean;
  shape: { d: string; dot?: { cx: number; cy: number; r: number } };
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
    // só ~12% viram círculo simples — o resto usa as formas variadas
    const isCircle = Math.random() < 0.12;
    return {
      id: i,
      isCircle,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      size: 5 + Math.random() * 16, // 5px a 21px — marcas pequenas
      top: Math.random() * 100,
      left: Math.random() * 100,
      rotation: Math.random() * 360,
      duration: 6 + Math.random() * 20, // 6s a 26s
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
 * Fundo animado leve (SVG + CSS puro, sem canvas/JS por frame) com marcas
 * orgânicas pequenas (elipses, feijões, pétalas, ganchos, vírgulas com
 * pontinho) que flutuam e giram devagar. Substitui texturas de "noise"
 * estáticas. Use dentro de um container com position: relative.
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
                filter: `drop-shadow(0 0 ${p.size * 0.2}px ${p.color})`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                ["--drift-x" as string]: `${p.driftX}px`,
                ["--drift-y" as string]: `${p.driftY}px`,
                ["--spin" as string]: `${p.spin}deg`,
              } as React.CSSProperties
            }
          >
            {p.isCircle ? (
              <circle cx="12" cy="12" r="3" fill={p.color} stroke="none" />
            ) : (
              <>
                <path
                  d={p.shape.d}
                  fill="none"
                  stroke={p.color}
                  strokeWidth={1.2}
                  strokeLinecap="round"
                />
                {p.shape.dot && (
                  <circle
                    cx={p.shape.dot.cx}
                    cy={p.shape.dot.cy}
                    r={p.shape.dot.r}
                    fill={p.color}
                    stroke="none"
                  />
                )}
              </>
            )}
          </svg>
        </div>
      ))}
    </div>
  );
}