"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";

/**
 * "Travada" leve entre seções: depois que o usuário para de rolar
 * (debounce), se a seção mais próxima estiver razoavelmente perto do
 * topo, encaixa suavemente nela. Não força nada no meio de uma leitura
 * longa — só ajuda a "arredondar" o scroll quando já está quase lá.
 */
export function SectionSnap({ selectors }: { selectors: string[] }) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleScroll() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        const elements = selectors
          .map((sel) => document.querySelector(sel))
          .filter((el): el is HTMLElement => !!el);

        if (elements.length === 0) return;

        let closest = elements[0];
        let closestDist = Infinity;
        for (const el of elements) {
          const dist = Math.abs(el.getBoundingClientRect().top);
          if (dist < closestDist) {
            closestDist = dist;
            closest = el;
          }
        }

        // Só encaixa se estiver a menos de 60% da tela de distância —
        // evita "puxar" o usuário de volta no meio de uma seção longa
        if (closestDist > 6 && closestDist < window.innerHeight * 0.6) {
          const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
          if (lenis) {
            lenis.scrollTo(closest, { duration: 0.7 });
          } else {
            closest.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, 140);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [selectors]);

  return null;
}