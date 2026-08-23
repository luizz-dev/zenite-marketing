"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface PinnedSectionProps {
  children: React.ReactNode;
  className?: string;
  pinDistance?: string;
}

export function PinnedSection({
  children,
  className = "",
  pinDistance = "+=1200",
}: PinnedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: pinDistance,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        return () => trigger.kill();
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [pinDistance]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}