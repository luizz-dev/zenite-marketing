import type { Metadata } from "next";
import { Navbar } from "@/components/navBar";
import { ConditionalFooter } from "@/components/conditional-footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
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
    <html lang="pt-br" className="h-full antialiased overflow-x-hidden">
      <body
        className={`${rajdhani.variable} ${barlow.variable} ${inter.variable} flex min-h-full w-full flex-col overflow-x-hidden bg-black text-white`}
      >
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <ConditionalFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}