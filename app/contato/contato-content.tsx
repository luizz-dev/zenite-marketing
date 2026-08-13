"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContatoContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para envio do formulário
    console.log("Formulário enviado:", formData);
  };

  return (
    <main className="w-full min-h-screen bg-[#193160] text-white overflow-x-hidden relative bg-noise">
      {/* SEÇÃO HERO: Contato */}
      <section className="flex flex-col gap-6 px-6 pt-10 pb-12 max-w-md mx-auto">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-1 w-3 rounded-full bg-[#F57C00]" />
            <span className="text-[11px] font-semibold text-[#F57C00] uppercase tracking-wider">
              fale conosco
            </span>
          </div>
          <h1 className="text-3xl font-black text-[#00B4D8] leading-none uppercase tracking-tight">
            ENTRE EM <br />
            <span className="text-white">—CONTATO</span>
          </h1>
          <p className="text-sm font-semibold text-slate-200 mt-1">
            Estamos prontos para tirar suas dúvidas e ajudar seu negócio.
          </p>
        </div>

        {/* Informações de Contato Rápidas */}
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center gap-3 bg-[#1C3D7D]/60 p-3 rounded-xl border border-white/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F57C00]">
              <Mail size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-slate-300 uppercase font-semibold">E-mail</p>
              <p className="text-xs font-bold text-white">contato@zenite.com.br</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1C3D7D]/60 p-3 rounded-xl border border-white/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00B4D8]">
              <Phone size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-slate-300 uppercase font-semibold">Suporte</p>
              <p className="text-xs font-bold text-white">(11) 99999-9999</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO FORMULÁRIO DE CONTATO */}
      <section className="flex flex-col gap-6 px-6 py-10 bg-[#0F0C29]/80 relative bg-noise">
        <div className="flex flex-col gap-1 max-w-md mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="h-1 w-3 rounded-full bg-[#F57C00]" />
            <span className="text-[11px] font-semibold text-[#F57C00] uppercase tracking-wider">
              MENSAGEM
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">Envie uma mensagem</h2>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-200">Nome</label>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1C3D7D] text-white text-xs border border-white/10 focus:outline-none focus:border-[#00B4D8]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-200">E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1C3D7D] text-white text-xs border border-white/10 focus:outline-none focus:border-[#00B4D8]"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-200">Mensagem</label>
            <textarea
              rows={4}
              placeholder="Como podemos te ajudar?"
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#1C3D7D] text-white text-xs border border-white/10 focus:outline-none focus:border-[#00B4D8] resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#F57C00] hover:bg-[#e07000] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 mt-2"
          >
            ENVIAR MENSAGEM <Send size={14} />
          </button>
        </form>
      </section>

      {/* SEÇÃO FAQS */}
      <section className="bg-white text-slate-900 px-6 py-10">
        <div className="max-w-md mx-auto flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1 w-4 rounded-full bg-[#F57C00]" />
            <h2 className="text-xl font-bold text-black">Perguntas sobre Suporte</h2>
          </div>

          {/* Accordion Item 1 */}
          <div className="rounded-xl overflow-hidden bg-[#1C3D7D] text-white">
            <button
              onClick={() => toggleFaq(0)}
              className="w-full p-4 text-left text-xs font-bold flex justify-between items-center"
            >
              Qual o tempo médio de resposta?
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  openFaq === 0 ? "rotate-180" : ""
                }`}
              />
            </button>
            {openFaq === 0 && (
              <div className="p-4 pt-0 text-[11px] text-slate-200 leading-relaxed border-t border-white/10 bg-[#1C3D7D]/90">
                Respondemos todas as solicitações enviadas pelo formulário em até 24 horas úteis.
              </div>
            )}
          </div>

          {/* Accordion Item 2 */}
          <div className="rounded-xl overflow-hidden bg-[#1C3D7D] text-white">
            <button
              onClick={() => toggleFaq(1)}
              className="w-full p-4 text-left text-xs font-bold flex justify-between items-center"
            >
              Vocês atendem aos finais de semana?
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  openFaq === 1 ? "rotate-180" : ""
                }`}
              />
            </button>
            {openFaq === 1 && (
              <div className="p-4 pt-0 text-[11px] text-slate-200 leading-relaxed border-t border-white/10 bg-[#1C3D7D]/90">
                Nosso suporte via e-mail funciona de segunda a sexta, das 08h às 18h.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}