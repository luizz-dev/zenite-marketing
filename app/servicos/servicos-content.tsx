"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AssinaturaCarousel } from "@/components/Servicos/AssinaturaCarousel";
import AnimatedParticles from "@/components/AnimatedParticles";

const features = [
  {
    icon: "⚡",
    title: "Alta Performance e Estabilidade",
    description:
      "Um sistema rápido, leve e que não te deixa na mão. Desenvolvido com foco em eficiência para garantir que o registro e a consulta do seu estoque seja extremamente veloz.",
    iconBackground: "#F57C0025",
    iconBorder: "#F57C00",
  },
  {
    icon: "🔒",
    title: "Segurança Rígida para Seus Dados",
    description:
      "Suas informações comerciais e histórico de movimentações são totalmente protegidos. O sistema conta com criptografia de ponta e armazenamento seguro para total tranquilidade.",
    iconBackground: "#F57C0025",
    iconBorder: "#F57C00",
  },
  {
    icon: "🤖",
    title: "Inteligência de Negócios (Dashboards)",
    description:
      "Chega de tomar decisões no escuro ou perder tempo com planilhas confusas. O Zênite transforma os dados do seu estoque em gráficos e relatórios visuais e intuitivos.",
    iconBackground: "#545C6050",
    iconBorder: "#00BCD4",
  },
  {
    icon: "",
    iconImage: "/img/financeiro.png",
    title: "Automação e Praticidade com Chatbot",
    description:
      "Ganhe um aliado inteligente na gestão. Com a integração de um assistente virtual, consulte o status do seu estoque e receba alertas vitais de forma totalmente automatizada.",
    iconBackground: "#6EB5FA25",
    iconBorder: "#6EB5FA",
  },
];

const steps = [
  {
    n: 1,
    title: "Cadastre seus produtos",
    description: "Organize em categorias, variantes e unidades de medida personalizáveis.",
  },
  {
    n: 2,
    title: "Registre movimentações",
    description: "Entradas, saídas, transferências e ajustes. Cada operação documentada com rastreabilidade completa.",
  },
  {
    n: 3,
    title: "Acompanhe em tempo real",
    description: "Veja seu estoque atualizado instantaneamente. Alertas, relatórios e histórico sempre disponíveis.",
  },
];

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900 pb-12">
      {/* ============================================================ */}
      {/* MOBILE — inalterado, apenas movido para dentro de lg:hidden   */}
      {/* ============================================================ */}
      <div className="lg:hidden">
        {/* Título da Seção: Assinaturas */}
        <section className="pt-8 px-4 text-center">
          <div className="flex items-center justify-center gap-3 max-w-xs mx-auto mb-2">
            <div className="h-[3px] w-12 bg-[#F57C00] rounded-full" />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Assinaturas
            </h1>
            <div className="h-[3px] w-12 bg-[#F57C00] rounded-full" />
          </div>

          <AssinaturaCarousel />
        </section>

        {/* Bloco: Como funciona */}
        <section className="my-8">
          <div className="max-w-md mx-auto rounded-2xl bg-[#1B263B] px-6 py-8 text-white shadow-[0_0_8px_#000000]">
            <span className="text-xs font-semibold text-[#F57C00] underline decoration-[#F57C00] underline-offset-4">
              Como funciona
            </span>

            <h2 className="text-xl font-bold mt-2 leading-tight">
              Sua operação na base <br />
              Seu controle no Zênite.
            </h2>

            <div className="mt-6 space-y-4">
              {steps.map((step) => (
                <div key={step.n} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F57C00] text-xs font-bold text-white">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-2sm font-bold">{step.title}</h3>
                    <p className="text-xs text-slate-300 italic">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seção: Por que escolher a Zênite? */}
        <section className="px-5 mt-10">
          <div className="flex items-start justify-center gap-3 max-w-xs mx-auto mb-8">
            <div className="h-[5px] w-10 bg-[#F57C00] rounded-full mt-3.5" />
            <h2 className="text-center text-2xl font-bold text-slate-700">
              Por que escolher a <span className="text-[#F57C00]">Zênite?</span>
            </h2>
            <div className="h-[5px] w-10 bg-[#F57C00] rounded-full mt-3.5" />
          </div>

          <div className="max-w-md mx-auto space-y-4">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-xl bg-[#1B263B] p-5 text-white border border-white/10 shadow-[0_0_8px_#00000075]"
              >
                <AnimatedParticles count={40} />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg overflow-hidden"
                      style={{
                        backgroundColor: item.iconBackground,
                        border: `0.2px solid ${item.iconBorder}`,
                      }}
                    >
                      {item.iconImage ? (
                        <img src={item.iconImage} alt="" className="h-7 w-7 object-contain" />
                      ) : (
                        item.icon
                      )}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-tight">{item.title}</h3>
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed italic">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP — mesma narrativa e mesmos textos do mobile, animada  */}
      {/* ============================================================ */}
      <div className="hidden lg:block">
        {/* Assinaturas */}
        <section className="pt-16 px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-2"
          >
            <div className="h-[3px] w-16 bg-[#F57C00] rounded-full" />
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Assinaturas
            </h1>
            <div className="h-[3px] w-16 bg-[#F57C00] rounded-full" />
          </motion.div>

          <AssinaturaCarousel />
        </section>

        {/* Como funciona — passos em linha horizontal */}
        <section className="my-16 px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl mx-auto rounded-3xl bg-[#1B263B] px-12 py-12 text-white shadow-[0_0_20px_rgba(0,0,0,0.35)]"
          >
            <span className="text-sm font-semibold text-[#F57C00] underline decoration-[#F57C00] underline-offset-4">
              Como funciona
            </span>

            <h2 className="text-3xl font-bold mt-2 leading-tight max-w-lg">
              Sua operação na base. Seu controle no Zênite.
            </h2>

            <div className="mt-10 grid grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                  className="flex flex-col gap-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F57C00] text-sm font-bold text-white">
                    {step.n}
                  </span>
                  <h3 className="text-base font-bold">{step.title}</h3>
                  <p className="text-sm text-slate-300 italic leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Por que escolher a Zênite? — grid 2x2 */}
        <section className="px-12 mt-10 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 max-w-xl mx-auto mb-12"
          >
            <div className="h-[5px] w-14 bg-[#F57C00] rounded-full" />
            <h2 className="text-center text-3xl font-bold text-slate-700">
              Por que escolher a <span className="text-[#F57C00]">Zênite?</span>
            </h2>
            <div className="h-[5px] w-14 bg-[#F57C00] rounded-full" />
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-2 gap-6">
            {features.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-2xl bg-[#1B263B] p-7 text-white border border-white/10 shadow-[0_0_8px_#00000075]"
              >
                <AnimatedParticles count={40} />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl overflow-hidden"
                      style={{
                        backgroundColor: item.iconBackground,
                        border: `0.2px solid ${item.iconBorder}`,
                      }}
                    >
                      {item.iconImage ? (
                        <Image src={item.iconImage} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
                      ) : (
                        item.icon
                      )}
                    </span>
                    <h3 className="text-base font-bold text-white leading-tight">{item.title}</h3>
                  </div>

                  <p className="text-sm text-slate-300 font-light leading-relaxed italic">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
