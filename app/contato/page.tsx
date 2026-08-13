import type { Metadata } from "next";
import ContatoContent from "./contato-content";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com a equipe do Zênite",
};

export default function ContatoPage() {
  return <ContatoContent />;
}