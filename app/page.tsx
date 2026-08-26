import Image from "next/image";
import Link from "next/link";
import { ServicesCarousel } from "@/components/Home/services-carousel";
import { Button } from "@/components/Home/Button";
import { User } from "lucide-react";
import HomeDesktopHero from "@/components/Home/HomeDesktopHero";
import HomeDesktopServices from "@/components/Home/HomeDesktopServices";
import HomeDesktopTestimonials from "@/components/Home/HomeDesktopTestimonials";
import { IntroLoader } from "@/components/IntroLoader";
import { GlobalBackdrop } from "@/components/motion/GlobalBackdrop";
import { SectionSnap } from "@/components/motion/SectionSnap";

const testimonials = [
  {
    name: "Emily",
    text: "Achei a ideia excelente para os MEIs.Indico para todos",
    stars: 5,
  },
  {
    name: "Vilma",
    text: "Facilitou demais o meu dia a dia. Agora controlo meu estoque sem complicação",
    stars: 5,
  },
  {
    name: "Iaciana",
    text: "Perfeito para organizar as notas fiscais e não perder prazos",
    stars: 5,
  },
];

export default function Home() {
  return (
    <>
      <IntroLoader />

      {/* ============================================================ */}
      {/* MOBILE — inalterado, apenas movido para dentro de lg:hidden   */}
      {/* ============================================================ */}
      <div className="lg:hidden flex flex-col gap-8 py-9 px-8 max-w-md mx-auto">
        {/* Seção Hero com os Orbes de Blur ajustados pelo Figma */}
        <section className="flex flex-col items-start gap-4">
          <div className="relative w-full flex justify-center items-center py-2">
            <div className="relative w-full max-w-[380px]">
              {/* Orbe (Figma: #4837E8 | 69% Opacidade | Blur 60px | W:182px H:134px) */}
              <div
                className="absolute -top-7 -left-8 w-[182px] h-[164px] rounded-full pointer-events-none -z-10"
                style={{
                  backgroundColor: "#4837E8",
                  opacity: 0.9,
                  filter: "blur(20px)",
                }}
              />

              <div
                className="absolute -bottom-7 -right-8 w-[160px] h-[120px] rounded-full pointer-events-none -z-10"
                style={{
                  backgroundColor: "#4837E8",
                  opacity: 0.9,
                  filter: "blur(20px)",
                }}
              />

              {/* Imagem do Dashboard */}
              <Image
                src="/img/hero-illustration.png"
                alt="Dashboard Zênite"
                width={400}
                height={250}
                className="w-full h-auto object-contain relative z-10  drop-shadow-[0_0_20px_rgba(0,0,0,0.45)]"
                
                priority
              />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold text-[#201F1B] leading-tight mt-2">
            O <span className="text-[#F57C00]">equilíbrio</span> que o seu estoque precisa
          </h1>

          <p className=" text-slate-600 leading-relaxed">
            Zênite é a plataforma que transforma o caos do seu inventário em controle total. Organizando seu estoque e emitindo as notas fiscais.
          </p>

          <div className="flex w-full items-center gap-3 pt-2">
            <Button href="/cadastro" variant="textured" className="flex-1">
               Começar agora
            </Button>

            <Link
              href="#como-funciona"
              className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
            >
              Como funciona <span className="text-lg ">→</span>
            </Link>
          </div>
        </section>

        {/* Seção de Serviços */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="h-1 w-4 rounded-full bg-[#F57C00]" />
            <h2 className="text-xl font-bold text-[#000000]">Serviços</h2>
          </div>

          <ServicesCarousel />
        </section>

        {/* Seção de Avaliações */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="h-1 w-4 rounded-full bg-[#F57C00]" />
            <h2 className="text-xl font-bold text-[#000000]">Avaliações</h2>
          </div>

          <div className="flex flex-col gap-4 mt-[15px]">
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-3xl bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.25)] border border-slate-100"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200/70 text-slate-400">
                  <User size={28} />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-lg font-bold text-[#201F1B]">
                    {item.name}
                  </span>
                  <div className="flex text-black text-xs gap-0.5">
                    {"★".repeat(item.stars)}
                  </div>
                  <p className="text-sm text-slate-600 leading-snug">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP — nova experiência, mesmos textos/imagens do mobile    */}
      {/* ============================================================ */}
      <div className="hidden lg:block relative bg-[#0A1628]">
        <GlobalBackdrop />
        <SectionSnap selectors={["#home-hero", "#home-servicos", "#home-avaliacoes"]} />
        <div className="relative z-10">
          <HomeDesktopHero />
          <HomeDesktopServices />
          <HomeDesktopTestimonials testimonials={testimonials} />
        </div>
      </div>
    </>
  );
}