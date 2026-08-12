import type { Metadata } from "next";
import { Navbar } from "@/components/navBar";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Home | Zênite ",
    template: "%s | Zênite",
  },
  description: "Soluções para o seu negócio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-black text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}