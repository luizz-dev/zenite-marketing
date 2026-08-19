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
    <section className="bg-white px-12 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <span className="h-1 w-6 rounded-full bg-[#F57C00]" />
          <h2 className="text-3xl font-bold text-[#201F1B]">Avaliações</h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="flex items-start gap-4 rounded-3xl bg-white p-5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] border border-slate-100"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-200/70 text-slate-400">
                <User size={28} />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-lg font-bold text-[#201F1B]">{item.name}</span>
                <div className="flex text-black text-xs gap-0.5">
                  {"★".repeat(item.stars)}
                </div>
                <p className="text-sm text-slate-600 leading-snug">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
