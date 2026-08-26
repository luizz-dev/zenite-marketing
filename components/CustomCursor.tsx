"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 16;

/**
 * Cursor customizado — círculo com lerp suave seguindo o mouse, mais
 * um rastro leve (pontinhos que "perseguem" o círculo principal, cada
 * um com um pouco mais de atraso e menos opacidade).
 *
 * Cursor nativo continua visível — este componente só adiciona o anel
 * e o rastro por cima. Só renderiza em dispositivos com mouse real
 * (pointer: fine), então mobile/touch nunca é afetado.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [enabled, setEnabled] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(hasFinePointer);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
    const trailPositions = Array.from({ length: TRAIL_LENGTH }, () => ({ ...pos }));
    let rafId: number;

    function handleMouseMove(e: MouseEvent) {
      target.x = e.clientX;
      target.y = e.clientY;

      const el = e.target as HTMLElement;
      setIsHoveringInteractive(!!el.closest("a, button, [role='button'], input, textarea"));
    }

    function loop() {
      // Lerp/easing leve — o círculo "persegue" o mouse em vez de grudar
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }

      // Rastro: cada ponto persegue o anterior (o primeiro persegue o
      // círculo principal), com lerp mais lento — cria o efeito de
      // "cauda" leve sem custar quase nada de performance.
      let leaderX = pos.x;
      let leaderY = pos.y;
      trailPositions.forEach((tp, i) => {
        tp.x += (leaderX - tp.x) * 0.28;
        tp.y += (leaderY - tp.y) * 0.28;
        leaderX = tp.x;
        leaderY = tp.y;

        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${tp.x}px, ${tp.y}px, 0) translate(-50%, -50%)`;
        }
      });

      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            trailRefs.current[i] = el;
          }}
          className="fixed left-0 top-0 z-[998] rounded-full pointer-events-none"
          style={{
            width: 5 - i * 0.5,
            height: 5 - i * 0.5,
            backgroundColor: "#00BCD4",
            opacity: 0.28 - i * 0.04,
          }}
        />
      ))}

      <div
        ref={dotRef}
        className="fixed left-0 top-0 z-[999] rounded-full border transition-[width,height,background-color] duration-200 ease-out"
        style={{
          width: isHoveringInteractive ? 60 : 40,
          height: isHoveringInteractive ? 60 : 40,
          borderColor: "rgba(0,188,212,0.8)",
          backgroundColor: isHoveringInteractive
            ? "rgba(0,188,212,0.12)"
            : "transparent",
          backdropFilter: "blur(1px)",
          boxShadow: "0 0 12px rgba(0,188,212,0.35)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}