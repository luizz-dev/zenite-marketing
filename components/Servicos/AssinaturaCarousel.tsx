"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Plan {
  badge: string;
  badgeStyle: {
    background: string;
    borderColor: string;
  };
  title: string;
  monthlyPrice: number | null;
  features: string[];
  buttonText: string;
  link: string;
}

const plans: Plan[] = [
  {
    badge: "Mais popular",
    badgeStyle: {
      background: "linear-gradient(0deg, #1B263B 0%, #00B4D895 85%)",
      borderColor: "#00B4D8",
    },
    title: "Zênite Pro",
    monthlyPrice: 79.9,
    features: [
      "Até 500 produtos diferentes",
      "100 NFe por mês",
      "Contas fixas e variáveis",
      "Dashboard Completo",
    ],
    buttonText: "Assinar plano Pro ↗",
    link: "#", // COLOQUE O LINK DO PLANO PRO AQUI
  },
  {
    badge: "Plano Entrada",
    badgeStyle: {
      background: "linear-gradient(0deg, #1B263B70 0%, #2ECC7190 85%)",
      borderColor: "#2ECC71",
    },
    title: "Zênite Lite",
    monthlyPrice: 29.9,
    features: [
      "Até 50 produtos diferentes",
      "1 NFe por mês",
      "20 NFe teste por mês",
      "Dashboard simplificado",
    ],
    buttonText: "Assinar plano Entrada ↗",
    link: "#", // COLOQUE O LINK DO PLANO LITE AQUI
  },
  {
    badge: "Sob medida",
    badgeStyle: {
      background: "linear-gradient(0deg, #1B263B 0%, #F57C0095 85%)",
      borderColor: "#F57C00",
    },
    title: "Personalizado",
    monthlyPrice: null,
    features: [
      "Produtos sob sua demanda",
      "Emissão de NFes flexível",
      "Chatbot negociável",
      "Paleta de cores do site",
      "Valor negociável",
    ],
    buttonText: "Personalizado ↗",
    link: "https://ig.me/m/zenite.estoque",
  },
];

function getDisplayPrice(monthlyPrice: number | null, billingCycle: "mensal" | "anual") {
  if (monthlyPrice === null) return "??";

  if (billingCycle === "anual") {
    const annualTotal = monthlyPrice * 12 * 0.9; // 10% de desconto para pagamento anual
    return `R$ ${annualTotal.toFixed(2).replace(".", ",")}`;
  }

  return `R$ ${monthlyPrice.toFixed(2).replace(".", ",")}`;
}

function BillingToggle({
  billingCycle,
  setBillingCycle,
}: {
  billingCycle: "mensal" | "anual";
  setBillingCycle: (v: "mensal" | "anual") => void;
}) {
  return (
    <div className="bg-slate-200/80 p-1 rounded-full flex items-center gap-1 shadow-inner backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setBillingCycle("mensal")}
        className={`px-4 py-1 text-xs font-semibold rounded-full transition-all ${
          billingCycle === "mensal"
            ? "bg-white text-slate-800 shadow"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        Mensal
      </button>

      <button
        type="button"
        onClick={() => setBillingCycle("anual")}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all flex items-center gap-1 ${
          billingCycle === "anual"
            ? "bg-white text-slate-800 shadow"
            : "text-slate-500 hover:text-slate-800"
        }`}
      >
        Anual
        <span className="bg-[#2ECC71]/20 text-[#1b7e43] text-[9px] px-1.5 py-0.5 rounded-full font-bold">
          -10%
        </span>
      </button>
    </div>
  );
}

export function AssinaturaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [billingCycle, setBillingCycle] = useState<"mensal" | "anual">("mensal");

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? plans.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === plans.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* ============ MOBILE — carrossel original, intacto ============ */}
      <div className="lg:hidden flex flex-col items-center w-full max-w-sm mx-auto pt-4 pb-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
        </div>

        <div className="relative flex items-center justify-center w-full h-[360px]">
          {plans.map((plan, index) => {
            const isCurrent = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + plans.length) % plans.length;
            const isNext = index === (currentIndex + 1) % plans.length;

            let positionClass = "opacity-0 pointer-events-none scale-75 z-0";

            if (isCurrent) {
              positionClass = "opacity-100 z-20 scale-100 translate-x-0 shadow-2xl";
            } else if (isPrev) {
              positionClass =
                "opacity-50 z-10 scale-85 -translate-x-20 shadow-lg pointer-events-auto cursor-pointer filter brightness-90";
            } else if (isNext) {
              positionClass =
                "opacity-50 z-10 scale-85 translate-x-20 shadow-lg pointer-events-auto cursor-pointer filter brightness-90";
            }

            return (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{ background: "linear-gradient(180deg, #1B263B 0%, #193160 100%)" }}
                className={`absolute top-0 w-[260px] shadow-[0_0px_7px_rgba(0,0,0,.75)] rounded-xl p-5 pt-0 text-white transition-all duration-300 ease-in-out flex flex-col justify-between h-[340px] border border-white/10 overflow-hidden ${positionClass}`}
              >
                <div className="w-full flex justify-center mb-0">
                  <div
                    style={{
                      background: plan.badgeStyle.background,
                      borderWidth: "0.5px",
                      borderStyle: "solid",
                      borderColor: plan.badgeStyle.borderColor,
                    }}
                    className="w-[75%] h-6 rounded-b-xl flex items-center justify-center shadow-sm"
                  >
                    <span className="text-[10px] font-medium text-white italic tracking-wide leading-none">
                      {plan.badge}
                    </span>
                  </div>
                </div>

                <div className="text-center mt-0">
                  <h3 className="text-base font-semibold tracking-wide flex items-center text-lg justify-center gap-2">
                    <span className="text-[#F57C00] font-bold">—</span>
                    {plan.title}
                    <span className="text-[#F57C00] font-bold">—</span>
                  </h3>

                  <div className="mt-1.5 flex items-baseline justify-center gap-0.5">
                    <span className="text-2xl font-black tracking-tight">
                      {getDisplayPrice(plan.monthlyPrice, billingCycle)}
                    </span>
                    <span className="text-sm text-slate-300 font-light">
                      {plan.monthlyPrice === null ? "/mês" : billingCycle === "anual" ? "/ano" : "/mês"}
                    </span>
                  </div>
                </div>

                <ul className="my-0 mx-[10%] space-y-1.5 text-left text-[12px] text-slate-200">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <span className="h-1 w-1 shadow-[0_0_7px_rgba(245,124,0,1)] rounded-full bg-[#F57C00] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.link}
                  className="w-full mb-4 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/20 text-xs font-semibold text-white transition-all active:scale-95 shadow-sm text-center"
                >
                  {plan.buttonText}
                </a>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B263B] text-white hover:bg-[#2773FF] transition-all active:scale-90 shadow-md"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1.5">
            {plans.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Ir para o plano ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-[#F57C00]"
                    : "w-2.5 bg-slate-400/60 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B263B] text-white hover:bg-[#2773FF] transition-all active:scale-90 shadow-md"
            aria-label="Próximo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ============ DESKTOP — grid 3 colunas, sem carrossel ============ */}
      <div className="hidden lg:flex flex-col items-center w-full max-w-5xl mx-auto pt-4 pb-6">
        <div className="mb-10">
          <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
        </div>

        <div className="grid grid-cols-3 gap-0 w-full items-stretch gap-7">
          {plans.map((plan, index) => {
            const isEdgeLeft = index === 0;
            const isCenter = index === 1;
            const isEdgeRight = index === 2;

            return (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                style={{ background: "linear-gradient(180deg, #1B263B 0%, #193160 100%)" }}
                className={`w-full shadow-[0_0px_7px_rgba(0,0,0,.5)] p-6 pt-0 text-white flex flex-col justify-between border border-white/10 overflow-hidden
                  ${isCenter ? "min-h-[420px] scale-108 z-10 rounded-lg border-[#00BCD4]/40" : "min-h-[380px]"}
                  ${isEdgeLeft ? "rounded-l-4xl rounded-r-none pr-2 scale-98" : ""}
                  ${isEdgeRight ? "rounded-r-4xl rounded-l-none pl-2 scale-98" : ""}
                `}
              >
              <div className="w-full flex justify-center mb-0">
                <div
                  style={{
                    background: plan.badgeStyle.background,
                    borderWidth: "0.5px",
                    borderStyle: "solid",
                    borderColor: plan.badgeStyle.borderColor,
                  }}
                  className="w-[80%] h-7 py-3.5 rounded-b-xl flex items-center justify-center shadow-sm"
                >
                  <span className="text-xs font-medium text-white italic tracking-wide leading-none">
                    {plan.badge}
                  </span>
                </div>
              </div>

              <div className="text-center mt-2">
                <h3 className="text-xl font-semibold tracking-wide flex items-center justify-center gap-2">
                  <span className="text-[#F57C00] font-bold">—</span>
                  {plan.title}
                  <span className="text-[#F57C00] font-bold">—</span>
                </h3>

                <div className="mt-2 flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-black tracking-tight">
                    {getDisplayPrice(plan.monthlyPrice, billingCycle)}
                  </span>
                  <span className="text-sm text-slate-300 font-light">
                    {plan.monthlyPrice === null ? "/mês" : billingCycle === "anual" ? "/ano" : "/mês"}
                  </span>
                </div>
              </div>

              <ul className="my-4 space-y-2 text-left text-sm text-slate-200">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <span className="h-1 w-1 shadow-[0_0_7px_rgba(245,124,0,1)] rounded-full bg-[#F57C00] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.link}
                className="w-full mb-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/15 border border-white/20 text-sm font-semibold text-white transition-all active:scale-95 shadow-sm text-center"
              >
                {plan.buttonText}
              </a>
            </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}