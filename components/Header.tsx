"use client";
import Link from "next/link";
import { SITE, NAV_LINKS } from "@/config/site";
import { useEffect, useState } from "react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b ${
        scrolled ? "border-white/10" : "border-transparent"
      }`}
      aria-label="Site header"
    >
      <div className="container-max flex items-center justify-between py-3">
        <Link href="#" className="flex items-center gap-3 font-semibold tracking-tight text-white">
          <img 
            src="/gallery/logo.png" 
            alt="PNT Customz Logo" 
            className="w-10 h-10 object-contain"
          />
          <span>{SITE.company}</span>
        </Link>
        <nav className="hidden md:flex gap-6" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/80 hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center rounded-full bg-[#E02727] text-white px-4 py-2 text-sm"
          >
            Call
          </a>
        </div>
      </div>
    </header>
  );
}


