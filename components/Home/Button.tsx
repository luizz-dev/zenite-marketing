import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "textured" | "default" | "outline";
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "textured",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-bold text-sm px-5 py-3.5 rounded-xl transition-all active:scale-95 disabled:opacity-50";

  const variants = {
    textured:
      "bg-[#F57C00] text-white shadow-[0_10px_25px_-5px_rgba(245,124,0,0.5)] hover:bg-[#e07000]",
    default:
      "bg-[#F57C00] text-white shadow-md shadow-[#F57C00]/20 hover:bg-[#e07000]",
    outline:
      "border border-slate-300 text-slate-800 hover:bg-slate-50",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
}