"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cursor customizado — círculo com lerp suave seguindo o mouse.
 * Só renderiza em dispositivos com mouse real (pointer: fine), então
 * mobile/touch nunca é afetado (nem sequer monta o componente).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    setEnabled(hasFinePointer);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-active");
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: pos.x, y: pos.y };
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
  );
}