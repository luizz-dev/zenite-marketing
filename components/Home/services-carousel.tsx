"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    title: "Emissão Fiscal",
    description:
      "Simplifique a emissão de notas e documentos. Ganhe tempo com processos fiscais rápidos e seguros.",
    icon: "/img/doc.png",
  },
  {
    title: "Gestão Inteligente",
    description:
      "Automatize o controle de entradas e saídas. Mantenha seu inventário sincronizado com precisão absoluta.",
    icon: "/img/caixa.png",
  },
  {
    title: "Organização do Financeiro",
    description:
      "Tome decisões baseadas em dados. Visualize o giro do seu estoque de forma simplificada.",
    icon: "/img/financeiro.png",
  },
];

export function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* ============ MOBILE — carrossel original, intacto ============ */}
      <div className="lg:hidden flex flex-col items-center w-full max-w-sm mx-auto pt-10 pb-4">
        {/* Contêiner de Cards */}
        <div className="relative flex items-center justify-center w-full h-[250px]">
          {services.map((service, index) => {
            const isCurrent = index === currentIndex;
            const isPrev =
              index === (currentIndex - 1 + services.length) % services.length;
            const isNext = index === (currentIndex + 1) % services.length;

            let positionClass = "opacity-0 pointer-events-none scale-75 z-0";

            if (isCurrent) {
              positionClass = "opacity-100 z-20 scale-100 translate-x-0 shadow-2xl";
            } else if (isPrev) {
              positionClass =
                "opacity-60 z-10 scale-85 -translate-x-24 shadow-lg pointer-events-auto cursor-pointer";
            } else if (isNext) {
              positionClass =
                "opacity-60 z-10 scale-85 translate-x-24 shadow-lg pointer-events-auto cursor-pointer";
            }

            return (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`absolute top-4 w-[240px] rounded-2xl bg-[#1B263B] p-5 pt-10 text-center text-white transition-all duration-300 ease-in-out flex flex-col items-center justify-between min-h-[220px] ${positionClass}`}
                 style={{
                   background: "linear-gradient(180deg, #1C2F52 30%, #1B263B 100%)",
                  }}
              >
                {/* Ícone posicionado com absolute no topo do card para não sumir com o scale */}
                <div className="absolute -top-15 left-1/2 -translate-x-1/2 z-30">
                  <Image
                    src={service.icon} 
                    alt={service.title}
                    width={150}
                    height={150}
                    className="object-contain drop-shadow-md"
                  />
                </div>

                <div className="mt-2">
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[14px] text-slate-300 font-light italic leading-snug pt-3">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navegação e Bolinhas */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            onClick={handlePrev}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B263B] text-white transition-transform active:scale-90"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-[#F57C00]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1B263B] text-white transition-transform active:scale-90"
            aria-label="Próximo"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ============ DESKTOP — grid animada, sem carrossel ============ */}
      <div className="hidden lg:grid grid-cols-3 gap-8 w-full max-w-5xl mx-auto pt-10 pb-4">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative rounded-2xl p-8 pt-16 text-center text-white flex flex-col items-center justify-between min-h-[280px] shadow-xl cursor-default"
            style={{ background: "linear-gradient(180deg, #1C2F52 30%, #1B263B 100%)" }}
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <Image
                src={service.icon}
                alt={service.title}
                width={110}
                height={110}
                className="object-contain drop-shadow-md"
              />
            </div>

            <div className="mt-4">
              <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                {service.title}
              </h3>
              <p className="text-sm text-slate-300 font-light italic leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#00B4D8]/40 to-transparent" />
          </motion.div>
        ))}
      </div>
    </>
  );
}
