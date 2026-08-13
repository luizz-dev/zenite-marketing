"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    question: "O que vocês fazem?",
    answer:
      "Nós da Zênite, fazemos a integração entre o estoque e emissão de nota fiscal dos nossos clientes.",
  },
  {
    question: "Como vocês surgiram?",
    answer:
      "Surgimos para simplificar a rotina fiscal e de controle de inventário para pequenos empreendedores.",
  },
  {
    question: "Como entro em contato?",
    answer:
      "Você pode entrar em contato através do formulário de suporte ou pelas nossas redes sociais no rodapé.",
  },
];

interface FaqSectionProps {
  className?: string;
}

export default function FaqSection({ className = "" }: FaqSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className={`bg-white text-slate-900 px-6 py-10 ${className}`}>
      <div className="max-w-md mx-auto flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-1 w-4  bg-[#F57C00]" />
          <h2 className="text-xl font-bold text-black">FAQs</h2>
        </div>

        {faqItems.map((item, index) => {
          const isOpen = openFaq === index;

          return (
            <div
              key={index}
              className="rounded-[10px] overflow-hidden bg-[#1C3D7D] text-white"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-4 text-left text-sm font-bold flex justify-between items-center transition-colors hover:bg-[#234b99]"
              >
                {item.question}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 text-[14px] text-slate-200 leading-relaxed border-t border-white/100 bg-[#1C3D7D]/90">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}