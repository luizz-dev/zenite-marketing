"use client";

import AnimatedParticles from "@/components/AnimatedParticles";

/**
 * Fundo único e contínuo pra página inteira (exceto navbar/footer):
 * grid sutil + partículas flutuantes + 2 blobs de glow com drift lento
 * (não são estáticos — se movem devagar em loop via CSS).
 *
 * Renderizar UMA VEZ por página, absoluto cobrindo toda a altura do
 * conteúdo — evita costura entre seções porque não há mais um fundo
 * por seção, é um só atrás de tudo.
 */
export function GlobalBackdrop() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Grid sutil */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Partículas flutuantes (já animadas por padrão) */}
      <AnimatedParticles count={140} />

      {/* Glows com drift lento — não estáticos */}
      <div
        className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full animate-backdrop-drift-a"
        style={{ backgroundColor: "#00BCD4", opacity: 0.12, filter: "blur(120px)" }}
      />
      <div
        className="absolute top-[45%] right-0 w-[380px] h-[380px] rounded-full animate-backdrop-drift-b"
        style={{ backgroundColor: "#F57C00", opacity: 0.1, filter: "blur(120px)" }}
      />
      <div
        className="absolute bottom-0 left-[30%] w-[320px] h-[320px] rounded-full animate-backdrop-drift-a"
        style={{ backgroundColor: "#4837E8", opacity: 0.1, filter: "blur(120px)", animationDelay: "-6s" }}
      />
    </div>
  );
}