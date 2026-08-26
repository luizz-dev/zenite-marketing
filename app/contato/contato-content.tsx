"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Send, Loader2, MessageSquare, User, Building2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { sendContactEmail } from "@/components/Contato/emailService";
import { SectionBackdrop } from "@/components/motion/SectionBackdrop";
import { GlobalBackdrop } from "@/components/motion/GlobalBackdrop";

const fieldIcons = { nome: User, nomeEmpresa: Building2, email: Mail } as const;

function InputLabelLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <label className="text-[#00B4D8] font-semibold whitespace-nowrap">
        {children}
      </label>
      <div className="flex-1 h-px bg-gradient-to-r from-[#00B4D8] to-transparent" />
    </div>
  );
}

function Lines({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-slate-400" />
      <span className="text-slate-300 font-balow font-medium whitespace-nowrap text-sm">
        {children}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-slate-400 to-transparent" />
    </div>
  );
}

function FooterContatos() {
  return (
    <footer className="w-full bg-[#1B263B] py-8 text-[#E0E1DD] overflow-x-hidden">
      <div className="flex flex-col gap-5 items-center">
        <Lines> Redes Sociais </Lines>

        <div className="flex items-center gap-5">
          {/* WhatsApp */}
          <Link
            href="https://wa.me/seunumero"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-17 h-14 bg-[#1A2D43] rounded-xl border border-[#3D5A80] transition-all duration-300 hover:scale-110 hover:border-[#25D366]"
            aria-label="WhatsApp"
          >
            <Image
              src="/icons/whatsapp.svg"
              alt="WhatsApp"
              width={30}
              height={30}
              className="w-[30px] h-[30px] brightness-0 invert object-contain transition-all duration-300 hover:drop-shadow-[0_0_8px_#25D366]"
            />
          </Link>

          {/* Instagram */}
          <Link
            href="https://www.instagram.com/zenite.estoque"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-17 h-14 bg-[#1A2D43] rounded-xl border border-[#3D5A80] transition-all duration-300 hover:scale-110 hover:border-[#E4405F]"
            aria-label="Instagram"
          >
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={30}
              height={30}
              className="w-[30px] h-[30px] brightness-0 invert object-contain transition-all duration-300 hover:drop-shadow-[0_0_8px_#E4405F]"
            />
          </Link>

          {/* X (Twitter) */}
          <Link
            href="https://x.com/ZeniteEstoque"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-17 h-14 bg-[#1A2D43] rounded-xl border border-[#3D5A80] transition-all duration-300 hover:scale-110 hover:border-[#1DA1F2]"
            aria-label="X (Twitter)"
          >
            <Image
              src="/icons/x.svg"
              alt="X (Twitter)"
              width={30}
              height={30}
              className="w-[30px] h-[30px] brightness-0 invert object-contain transition-all duration-300 hover:drop-shadow-[0_0_8px_#1DA1F2]"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

function DesktopFooterBar() {
  return (
    <footer className="relative z-10 w-full mt-10 py-6 text-[#E0E1DD]">
      <div className="flex flex-col gap-5 items-center">
        <Lines> Redes Sociais </Lines>

        <div className="flex items-center gap-5">
          <Link
            href="https://wa.me/seunumero"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-17 h-14 bg-[#1A2D43] rounded-xl border border-[#3D5A80] transition-all duration-300 hover:scale-110 hover:border-[#25D366]"
            aria-label="WhatsApp"
          >
            <Image src="/icons/whatsapp.svg" alt="WhatsApp" width={30} height={30} className="w-[30px] h-[30px] brightness-0 invert object-contain transition-all duration-300 hover:drop-shadow-[0_0_8px_#25D366]" />
          </Link>
          <Link
            href="https://www.instagram.com/zenite.estoque"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-17 h-14 bg-[#1A2D43] rounded-xl border border-[#3D5A80] transition-all duration-300 hover:scale-110 hover:border-[#E4405F]"
            aria-label="Instagram"
          >
            <Image src="/icons/instagram.svg" alt="Instagram" width={30} height={30} className="w-[30px] h-[30px] brightness-0 invert object-contain transition-all duration-300 hover:drop-shadow-[0_0_8px_#E4405F]" />
          </Link>
          <Link
            href="https://x.com/ZeniteEstoque"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-17 h-14 bg-[#1A2D43] rounded-xl border border-[#3D5A80] transition-all duration-300 hover:scale-110 hover:border-[#1DA1F2]"
            aria-label="X (Twitter)"
          >
            <Image src="/icons/x.svg" alt="X (Twitter)" width={30} height={30} className="w-[30px] h-[30px] brightness-0 invert object-contain transition-all duration-300 hover:drop-shadow-[0_0_8px_#1DA1F2]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default function ContatoContent() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    nomeEmpresa: "",
    mensagem: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [desktopStatus, setDesktopStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleDesktopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDesktopStatus("sending");

    try {
      await sendContactEmail(formData);
      setDesktopStatus("success");
      setFormData({ nome: "", email: "", nomeEmpresa: "", mensagem: "" });
    } catch {
      setDesktopStatus("error");
    } finally {
      setTimeout(() => setDesktopStatus("idle"), 4000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await sendContactEmail(formData);
      alert("Mensagem enviada com sucesso para a Zênite!");
      setFormData({ nome: "", email: "", nomeEmpresa: "", mensagem: "" });
    } catch (error) {
      alert("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
    } finally {
      setIsSending(false);
    }
  };

  const inputStyle = `
    w-full
    rounded-xl 
    border border-[#717171]
    bg-[#233454]
    px-4 py-2 
    text-sm text-[#FFFFFF]
    placeholder:text-gray-400
    outline-none
    transition-all
    focus:border-[#00B4D8]
    focus:drop-shadow-[0_0_4px_#00B4D8]
    hover:border-[#00B4D8]
  `;

  // Mesmos campos do form mobile, reaproveitados na grade desktop
  const fields = [
    { id: "nome", label: "Nome Completo", type: "text", placeholder: "Seu nome completo" },
    { id: "nomeEmpresa", label: "Nome Empresa", type: "text", placeholder: "ex: IaIá Modas" },
    { id: "email", label: "E-mail", type: "email", placeholder: "seu@gmail.com" },
  ] as const;

  return (
    <main className="w-full min-h-[90vh] bg-[#1B263B] text-white overflow-x-hidden relative border-t border-[#00B4D8]">
      {/* ============================================================ */}
      {/* MOBILE — inalterado, apenas movido para dentro de lg:hidden   */}
      {/* ============================================================ */}
      <div className="lg:hidden">
        {/* SEÇÃO HERO: Contato */}
        <section className="w-full max-w-md mx-auto px-6 pt-10 pb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-3 rounded-full bg-[#00B4D8]" />
              <span className="font-barlow text-[18px] font-normal text-[#00B4D8] uppercase tracking-wider">
                Fale conosco
              </span>
            </div>

            <h1 className="font-rajdhani font-semibold text-4xl text-white leading-tight flex items-center gap-3">
              <span className="text-[#F97316]">—</span>
              Contato
              <span className="text-[#F97316]">—</span>
            </h1>
          </div>
        </section>

        {/* SEÇÃO FORMULÁRIO DE CONTATO */}
        <section className="w-full max-w-md mx-auto px-6 py-1">
          <form onSubmit={handleSubmit} className="w-full bg-[#1B263B] flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <InputLabelLine>Nome Completo</InputLabelLine>
              <input
                type="text"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <InputLabelLine>Nome Empresa</InputLabelLine>
              <input
                type="text"
                placeholder="ex: IaIá Modas"
                value={formData.nomeEmpresa}
                onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <InputLabelLine>E-mail</InputLabelLine>
              <input
                type="email"
                placeholder="seu@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputStyle}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <InputLabelLine>Mensagem</InputLabelLine>
              <textarea
                rows={4}
                placeholder="Gostaria de agendar uma reunião..."
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                className={inputStyle}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full mb-0 mx-auto mt-2 flex items-center justify-center gap-3 rounded-2xl bg-[#F58A00] px-6 py-2.5 font-rajdhani text-xl font-bold uppercase tracking-wide text-white shadow-[0_0_22px_rgba(245,138,0,0.65)] transition-all duration-200 hover:bg-[#e07d00] hover:shadow-[0_0_28px_rgba(245,138,0,0.8)] active:scale-[0.98] disabled:opacity-50"
            >
              {isSending ? (
                <>
                  ENVIANDO... <Loader2 className="animate-spin" size={20} />
                </>
              ) : (
                <>
                  ENVIANDO MENSAGEM <Send size={20} />
                </>
              )}
            </button>
          </form>
        </section>
      </div>

      {/* ============================================================ */}
      {/* DESKTOP — nova seção, mesma identidade e mesmos textos do     */}
      {/* mobile, em split layout com partículas e reveal animado       */}
      {/* ============================================================ */}
      <div className="hidden lg:block relative overflow-hidden bg-[#0A1628]">
        <GlobalBackdrop />
        <SectionBackdrop label="Contato" />

        <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-2 items-center gap-24 px-12 pt-16 pb-8 min-h-[62vh]">
          {/* Coluna esquerda — mesma mensagem do hero mobile */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-3 rounded-full bg-[#00B4D8]" />
              <span className="font-barlow text-[18px] font-normal text-[#00B4D8] uppercase tracking-wider">
                Fale conosco
              </span>
            </div>

            <h1 className="font-rajdhani font-semibold text-6xl text-white leading-tight flex items-center gap-4">
              <span className="text-[#F97316]">—</span>
              Contato
              <span className="text-[#F97316]">—</span>
            </h1>

            <p className="text-slate-300 leading-relaxed max-w-sm">
              Dúvidas, sugestões ou proposta de parceria? Preencha o formulário
              ao lado — nossa equipe responde em até 1 dia útil.
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 flex items-center gap-3 rounded-2xl border border-[#00BCD4]/30 bg-[#111C34]/70 px-5 py-4 w-fit"
            >
              <MessageSquare className="text-[#00BCD4]" size={22} />
              <span className="text-sm text-slate-200">
                Resposta média em <span className="text-[#00BCD4] font-semibold">24h úteis</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Coluna direita — formulário (mesmos campos, mesmos textos) */}
          <motion.form
            onSubmit={handleDesktopSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-white/10 bg-[#111C34]/80 backdrop-blur-xl p-10 shadow-2xl flex flex-col gap-6"
          >
            <AnimatePresence>
              {desktopStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 overflow-hidden"
                >
                  <CheckCircle2 size={18} /> Mensagem enviada! Retornaremos em breve.
                </motion.div>
              )}
              {desktopStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 overflow-hidden"
                >
                  <AlertCircle size={18} /> Algo deu errado. Tente novamente.
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-2 gap-6">
              {fields.map((field, i) => {
                const Icon = fieldIcons[field.id];
                return (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * i }}
                    className={`flex flex-col gap-1 ${field.id === "email" ? "col-span-2" : ""}`}
                  >
                    <InputLabelLine>{field.label}</InputLabelLine>
                    <div className="relative">
                      <Icon
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                      />
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.id]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.id]: e.target.value })
                        }
                        className={`${inputStyle} pl-10`}
                        required
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col gap-1"
            >
              <InputLabelLine>Mensagem</InputLabelLine>
              <textarea
                rows={5}
                placeholder="Gostaria de agendar uma reunião..."
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                className={inputStyle}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={desktopStatus === "sending"}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-2 flex items-center justify-center gap-3 rounded-2xl bg-[#F57C00] px-6 py-3.5 font-rajdhani text-xl font-bold uppercase tracking-wide text-white shadow-[0_0_22px_rgba(245,124,0,0.65)] transition-shadow duration-200 hover:shadow-[0_0_28px_rgba(245,124,0,0.8)] disabled:opacity-50"
            >
              {desktopStatus === "sending" ? (
                <>
                  ENVIANDO... <Loader2 className="animate-spin" size={20} />
                </>
              ) : (
                <>
                  ENVIAR MENSAGEM <Send size={20} />
                </>
              )}
            </motion.button>
          </motion.form>
        </section>

        {/* Barra de redes sociais desktop — dentro do wrapper com o
            backdrop/grid, então o fundo cobre a página inteira, sem
            "cortar" antes do fim como acontecia antes */}
        <DesktopFooterBar />
      </div>

      <div className="lg:hidden">
        <FooterContatos />
      </div>
    </main>
  );
}