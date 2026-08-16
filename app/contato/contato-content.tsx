"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Send, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/components/Contato/emailService";

export default function ContatoContent() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    nomeEmpresa: "",
    mensagem: "",
  });

  const [isSending, setIsSending] = useState(false);

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

  return (
    <main className="w-full min-h-[90vh] bg-[#1B263B] text-white overflow-x-hidden relative border-t border-[#00B4D8]">
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

      <FooterContatos />
    </main>
  );
}