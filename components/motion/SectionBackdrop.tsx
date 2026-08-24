"use client";

/**
 * Tipografia gigante em contorno, atrás do conteúdo de uma seção.
 * O grid sutil agora vive só no GlobalBackdrop (renderizado uma vez
 * por página) — este componente ficou só com o texto-fantasma, pra
 * não duplicar o grid em cada seção.
 */
export function SectionBackdrop({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      <span
        className="font-extrabold uppercase tracking-tight whitespace-nowrap"
        style={{
          fontSize: "min(22vw, 320px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.06)",
        }}
      >
        {label}
      </span>
    </div>
  );
}