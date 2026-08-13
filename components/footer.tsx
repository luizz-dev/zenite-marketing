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
          {/* WhatsApp */}
          <Link
            href="https://wa.me/seunumero"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-all duration-300 hover:scale-110"
            aria-label="WhatsApp"
          >
            <Image
              src="/icons/whatsapp.svg"
              alt="WhatsApp"
              width={30}
              height={30}
              className="w-[30px] h-[30px] brightness-0 invert object-contain transition-all duration-300 hover:drop-shadow-[0_0_8px_#25D366]"
            />
          </Link>

          {/* Instagram */}
          <Link
            href="https://www.instagram.com/zenite.estoque"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-all duration-300 hover:scale-110"
            aria-label="Instagram"
          >
            <Image
              src="/icons/instagram.svg"
              alt="Instagram"
              width={30}
              height={30}
              className="w-[30px] h-[30px] brightness-0 invert object-contain transition-all duration-300 hover:drop-shadow-[0_0_8px_#E4405F]"
            />
          </Link>

          {/* X (Twitter) */}
          <Link
            href="https://x.com/ZeniteEstoque"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center transition-all duration-300 hover:scale-110"
            aria-label="X (Twitter)"
          >
            <Image
              src="/icons/x.svg"
              alt="X (Twitter)"
              width={30}
              height={30}
              className="w-[30px] h-[30px] brightness-0 invert object-contain transition-all duration-300 hover:drop-shadow-[0_0_8px_#1DA1F2]"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}