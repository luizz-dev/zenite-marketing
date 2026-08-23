"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

type Testimonial = {
  name: string;
  text: string;
  stars: number;
};

export default function HomeDesktopTestimonials({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <section
      className="px-12 py-20"
      style={{
        background: "linear-gradient(180deg, #0D1B33 0%, #0A1628 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="h-1 w-6 rounded-full bg-[#F57C00]" />
          <h2 className="text-3xl font-bold text-white">Avaliações</h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, borderColor: "rgba(0,188,212,0.4)" }}
              className="flex items-start gap-4 rounded-3xl bg-[#111C34] p-5 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-300">
                <User size={28} />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-lg font-bold text-white">{item.name}</span>
                <div className="flex text-[#F57C00] text-xs gap-0.5">
                  {"★".repeat(item.stars)}
                </div>
                <p className="text-sm text-slate-300 leading-snug">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}