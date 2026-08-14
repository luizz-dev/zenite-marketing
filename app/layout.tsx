import type { Metadata } from "next";
import { Navbar } from "@/components/navBar";
import { Footer } from "@/components/footer";
import "./globals.css";
import { Rajdhani, Barlow, Inter } from "next/font/google";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

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

      <body className={`${rajdhani.variable} ${barlow.variable} ${barlow.variable} flex min-h-full w-[100vw] flex-col bg-black text-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>

    </html>
  );
}