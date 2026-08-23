"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { hasAdequateGpu } from "@/lib/webgl-support";

// Code-splitting: three/@react-three/fiber só entram no bundle se
// essa cena realmente for renderizada (nunca no mobile, por exemplo)
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

function SceneSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[#00BCD4]" />
    </div>
  );
}

/**
 * Decide, no client, se o dispositivo aguenta o Canvas 3D real
 * (react-three-fiber). Se não aguentar — ou o usuário pediu menos
 * movimento no SO — cai para a ilustração estática (a mesma imagem
 * que já era usada antes, com o glow ao redor).
 */
export function HeroSceneLoader() {
  const [mode, setMode] = useState<"checking" | "3d" | "fallback">(
    "checking"
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setMode(reducedMotion || !hasAdequateGpu() ? "fallback" : "3d");
  }, []);

  if (mode === "checking") {
    return (
      <div className="relative aspect-[4/3] w-full">
        <SceneSkeleton />
      </div>
    );
  }

  if (mode === "fallback") {
    return (
      <Image
        src="/img/hero-illustration.png"
        alt="Dashboard Zênite"
        width={560}
        height={350}
        className="w-full h-auto object-contain relative z-10 drop-shadow-[0_0_40px_rgba(0,188,212,0.15)]"
        priority
      />
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full">
      <HeroScene />
    </div>
  );
}