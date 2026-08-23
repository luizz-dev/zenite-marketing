"use client";

/**
 * Mesmo backdrop do Hero (grid sutil + tipografia gigante em contorno)
 * reutilizável em qualquer seção desktop full-screen. Puramente visual,
 * pointer-events-none, para não atrapalhar interação.
 */
export function SectionBackdrop({ label }: { label: string }) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
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
    </>
  );
}