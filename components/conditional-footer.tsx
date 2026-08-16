"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";

export function ConditionalFooter() {
  const pathname = usePathname();

  // Verifica se a rota atual é /contato
  if (pathname === "/contato") {
    return null;
  }

  return <Footer />;
}