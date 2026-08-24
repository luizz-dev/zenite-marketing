"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const DESKTOP_QUERY = "(min-width: 1024px)";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let tickerFn: ((time: number) => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;

    function enable() {
      if (lenisRef.current || prefersReducedMotion) return;

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      lenis.on("scroll", ScrollTrigger.update);

      // Recalcula os limites de scroll sempre que a altura do <body>
      // mudar — o Next App Router troca só o conteúdo entre rotas
      // (não recarrega a página), então sem isso o Lenis continuava
      // usando a altura da página anterior e "prendia" o scroll antes
      // do fim real (o footer, por exemplo).
      resizeObserver = new ResizeObserver(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(document.body);
    }

    function disable() {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn);
        tickerFn = null;
      }
      resizeObserver?.disconnect();
      resizeObserver = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
    }

    function handleChange() {
      disable();
      if (mql.matches) enable();
    }

    handleChange();
    mql.addEventListener("change", handleChange);

    return () => {
      mql.removeEventListener("change", handleChange);
      disable();
    };
  }, []);

  // Rede de segurança extra: recalcula explicitamente a cada troca de
  // rota, depois que o novo conteúdo já renderizou, e rola até o hash
  // da URL se houver um (ex: /servicos#como-funciona vindo da Home)
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();

      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el as HTMLElement, { offset: -80 });
          } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        // Remove o hash da URL depois de usá-lo — sem isso, ele fica
        // "grudado" na barra de endereço e volta a disparar o scroll
        // em qualquer navegação futura pra mesma rota (ex: clicar em
        // "Serviços" no menu depois de ter vindo de "Como funciona")
        window.history.replaceState(null, "", window.location.pathname);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}