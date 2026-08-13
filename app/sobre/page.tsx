import type { Metadata } from "next";
import SobreContent from "./sobre-content";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a história e equipe do Zênite",
};

export default function SobrePage() {
  return <SobreContent />;
}