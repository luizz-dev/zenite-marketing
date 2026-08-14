"use client";

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

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900 pb-12">
      {/* Título da Seção: Assinaturas */}
      <section className="pt-8 px-4 text-center">
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto mb-2">
          <div className="h-[3px] w-12 bg-[#F57C00] rounded-full" />

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Assinaturas
          </h1>

          <div className="h-[3px] w-12 bg-[#F57C00] rounded-full" />
        </div>

        {/* Carrossel de Planos */}
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
            {/* Passo 1 */}
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F57C00] text-xs font-bold text-white">
                1
              </span>

              <div>
                <h3 className="text-2sm font-bold">
                  Cadastre seus produtos
                </h3>

                <p className="text-xs text-slate-300 italic">
                  Organize em categorias, variantes e unidades de medida
                  personalizáveis.
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F57C00] text-xs font-bold text-white">
                2
              </span>

              <div>
                <h3 className="text-2sm font-bold">
                  Registre movimentações
                </h3>

                <p className="text-xs text-slate-300 italic">
                  Entradas, saídas, transferências e ajustes. Cada operação
                  documentada com rastreabilidade completa.
                </p>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F57C00] text-xs font-bold text-white">
                3
              </span>

              <div>
                <h3 className="text-2sm font-bold">
                  Acompanhe em tempo real
                </h3>

                <p className="text-xs text-slate-300 italic">
                  Veja seu estoque atualizado instantaneamente. Alertas,
                  relatórios e histórico sempre disponíveis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção: Por que escolher a Zênite? */}
      <section className="px-5 mt-10">
        <div className="flex items-start justify-center gap-3 max-w-xs mx-auto mb-8">
          <div className="h-[5px] w-10 bg-[#F57C00] rounded-full mt-3.5" />

          <h2 className="text-center text-2xl font-bold text-slate-700">
            Por que escolher a{" "}
            <span className="text-[#F57C00]">Zênite?</span>
          </h2>

          <div className="h-[5px] w-10 bg-[#F57C00] rounded-full mt-3.5" />
        </div>

        <div className="max-w-md mx-auto space-y-4">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl bg-[#1B263B] p-5 text-white border border-white/10 shadow-[0_0_8px_#00000075]"
            >
              {/* Partículas flutuantes de fundo no card */}
              <AnimatedParticles count={40} />

              {/* Conteúdo sobreposto */}
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  {/* Ícone */}
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg overflow-hidden"
                    style={{
                      backgroundColor: item.iconBackground,
                      border: `0.2px solid ${item.iconBorder}`,
                    }}
                  >
                    {item.iconImage ? (
                      <img
                        src={item.iconImage}
                        alt=""
                        className="h-7 w-7 object-contain"
                      />
                    ) : (
                      item.icon
                    )}
                  </span>

                  {/* Título */}
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Descrição */}
                <p className="text-xs text-slate-300 font-light leading-relaxed italic">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}