import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full rounded-t-[32px] bg-[#193160] px-8 py-6 text-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <span className="text-lg font-medium tracking-wide">
          Redes sociais
        </span>

        <div className="flex items-center gap-5">
          <Link
            href="https://www.instagram.com/zenite.estoque"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
            aria-label="Instagram"
          >
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={26}
              height={26}
              className="h-6 w-6 brightness-0 invert" // Deixa o SVG branco
            />
          </Link>

          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
            aria-label="LinkedIn"
          >
            <Image
              src="/icons/linkedin.svg"
              alt="LinkedIn"
              width={26}
              height={26}
              className="h-6 w-6 brightness-0 invert"
            />
          </Link>

          <Link
            href="https://x.com/ZeniteEstoque"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
            aria-label="X (Twitter)"
          >
            <Image
              src="/icons/x.svg"
              alt="X (Twitter)"
              width={24}
              height={24}
              className="h-5 w-5 brightness-0 invert"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}