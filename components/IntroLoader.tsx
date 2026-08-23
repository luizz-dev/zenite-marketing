"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const SESSION_KEY = "zenite-intro-seen";

/**
 * Tela de entrada estilo Neoconda: logo grande centralizado sobre fundo
 * navy, com leve zoom/fade de saída revelando o Hero por trás.
 *
 * Só aparece uma vez por sessão (sessionStorage) — não fica repetindo
 * a cada navegação entre /sobre, /servicos, /contato. Desktop-only,
 * o mobile nunca vê essa tela.
 */
export function IntroLoader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(SESSION_KEY);
    if (alreadySeen) return;

    setVisible(true);
    sessionStorage.setItem(SESSION_KEY, "1");

    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] hidden lg:flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#0A1628" }}
        >
          {/* Linhas de grade sutis, mesmo espírito do fundo do Hero */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.15, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-40"
              style={{ backgroundColor: "#00BCD4" }}
            />
            <Image
              src="/icons/logo_zenite.svg"
              alt="Zênite"
              width={96}
              height={96}
              className="relative"
              priority
            />
          </motion.div>

          {/* Barra de progresso simples — reforça a sensação de "carregando" */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.3, ease: "linear" }}
            className="absolute bottom-16 left-1/2 h-[2px] max-w-[160px] w-full -translate-x-1/2"
            style={{ backgroundColor: "#F57C00" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}