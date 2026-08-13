import type { Metadata } from "next";
import ServicosContent from "./servicos-content";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Conheça os serviços e soluções oferecidos pelo Zênite",
};

export default function ServicosPage() {
  return <ServicosContent />;
}