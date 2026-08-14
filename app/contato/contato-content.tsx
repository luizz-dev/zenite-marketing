"use client";

import { useState } from "react";
import Image from "next/image";
import { Send } from "lucide-react";

export default function ContatoContent() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    nomeEmpresa: "",
    mensagem: "",
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para envio do formulário
    console.log("Formulário enviado:", formData);
  };

  function InputLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2">
      <label className="text-[#00B4D8] font-semibold whitespace-nowrap">
        {children}
      </label>
      <div className="flex-1 h-px bg-gradient-to-r from-[#00B4D8] to-transparent" />
    </div>
  );
}

  return (
    <main className="w-full
      min-h-screen
      bg-[#1B263B]
      text-white
      overflow-x-hidden
      relative
      border-t
      border-[#00B4D8]">

      {/* SEÇÃO HERO: Contato */}
      <section className="w-full
       max-w-md
       mx-auto
       px-6
       pt-10
       pb-4">

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-3 rounded-full bg-[#00B4D8]" />
            <span className=" font-barlow text-[18px] font-normal text-[#00B4D8] uppercase tracking-wider">
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
      <section className=" w-full
       max-w-md
       mx-auto
       px-6
       py-1">

        <form onSubmit={handleSubmit} className="w-full bg-[#1B263B] flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <InputLabel>Nome Completo</InputLabel>
            <input
              type="text"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full
               rounded-xl 
               border border-[#00CFFF]
               bg-[#233454]
               px-4 py-2 
               text-sm text-white
               placeholder:text-gray-400
               outline-none
               transition-all duration-200 
               focus:border-[#00E0FF] 
               focus:ring-1 
               focus:ring-[#00CFFF]/20"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <InputLabel>Nome Empresa</InputLabel>
            <input
              type="text"
              placeholder="ex: IaIá Modas"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nomeEmpresa: e.target.value })}
              className="w-full
               rounded-xl 
               border border-[#00CFFF]
               bg-[#233454]
               px-4 py-2 
               text-sm text-white
               placeholder:text-gray-400
               outline-none
               transition-all duration-200 
               focus:border-[#00E0FF] 
               focus:ring-1 
               focus:ring-[#00CFFF]/20"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
          <InputLabel>E-mail</InputLabel>
            <input
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full
               rounded-xl 
               border border-[#00CFFF]
               bg-[#233454]
               px-4 py-2 
               text-sm text-white
               placeholder:text-gray-400
               outline-none
               transition-all duration-200 
               focus:border-[#00E0FF] 
               focus:ring-1 
               focus:ring-[#00CFFF]/20"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
          <InputLabel>Mensagem</InputLabel>
            <textarea
              rows={4}
              placeholder="Como podemos te ajudar?"
              value={formData.mensagem}
              onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
             className="w-full
               rounded-xl 
               border border-[#00CFFF]
               bg-[#233454]
               px-4 py-2 
               text-sm text-white
               placeholder:text-gray-400
               outline-none
               transition-all duration-200 
               focus:border-[#00E0FF] 
               focus:ring-1 
               focus:ring-[#00CFFF]/20"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full
            mb-20
            mx-auto
            mt-2
            flex items-center justify-center gap-3
            rounded-2xl
            bg-[#F58A00]
            px-6 py-2
            font-rajdhani
            text-2xl
            font-bold
            uppercase
            tracking-wide
            text-white
            shadow-[0_0_22px_rgba(245,138,0,0.65)]
            transition-all duration-200
            hover:bg-[#e07d00]
            hover:shadow-[0_0_28px_rgba(245,138,0,0.8)]
            active:scale-[0.98]"> ENVIAR MENSAGEM <Send size={14} />
          </button>
        </form>
      </section>

  
    </main>
  );
}