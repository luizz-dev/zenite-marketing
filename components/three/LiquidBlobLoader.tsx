"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { hasAdequateGpu } from "@/lib/webgl-support";

const LiquidBlob = dynamic(
  () => import("./LiquidBlob").then((mod) => mod.default),
  { ssr: false, loading: () => null }
);

/**
 * Mesma lógica de decisão do Hero: 3D real se o dispositivo aguentar,
 * senão cai para um fallback 100% CSS (gradiente radial com blur) que
 * mantém o mesmo espírito visual sem custar nada de performance.
 */
export function LiquidBlobLoader({ className = "" }: { className?: string }) {
  const [render3d, setRender3d] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setRender3d(!reducedMotion && hasAdequateGpu());
  }, []);

  if (!render3d) {
    return (
      <div
        className={`pointer-events-none ${className}`}
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #4837E8, transparent 60%), radial-gradient(circle at 70% 70%, #00BCD4, transparent 60%), radial-gradient(circle at 50% 50%, #F57C00, transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.5,
          borderRadius: "50%",
        }}
      />
    );
  }

  return (
    <div className={`pointer-events-none ${className}`}>
      <LiquidBlob />
    </div>
  );
}