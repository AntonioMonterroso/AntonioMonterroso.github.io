"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { LangToggle, PaletteSwitcher } from "@/components/palette-switcher";
import { useT } from "@/components/prefs";
import { T } from "@/components/t";

const links = [
  { href: "#servicios", es: "Servicios", en: "Services" },
  { href: "#proceso", es: "Proceso", en: "Process" },
  { href: "#planes", es: "Planes", en: "Plans" },
  { href: "#trabajos", es: "Trabajos", en: "Work" },
  { href: "#estudio", es: "El estudio", en: "Studio" },
];

export function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2.5" aria-label="Monterroso Dev Studio">
      <svg viewBox="0 0 64 64" className="size-8" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill="var(--navy-2)" />
        <path d="M14 46V20l18 17 18-17v26" fill="none" stroke="var(--snow)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="50" cy="48" r="3.5" fill="var(--brass)" />
      </svg>
      <span className="font-heading text-[length:var(--step-0)] leading-none font-medium tracking-tight">
        Monterroso <span className="text-[var(--mist)]">Dev Studio</span>
      </span>
    </a>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const t = useT();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="shell flex h-18 items-center justify-between gap-6 !px-[calc(var(--gutter)+0.75rem)]">
        <Logo />
        <nav aria-label={t("Principal", "Main")} className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {links.map((l) => (
              <li key={l.href}>
                <a className="nav-link" href={l.href}>
                  <T es={l.es} en={l.en} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 md:flex">
            <PaletteSwitcher />
            <span aria-hidden="true" className="mx-1 h-5 w-px bg-[var(--line-strong)]" />
            <LangToggle />
          </div>
          <a href="#contacto" className="btn btn-solid ml-2 hidden !min-h-10 !px-5 sm:inline-flex">
            <T es="Cotizar" en="Get a quote" />
          </a>
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="grid size-11 place-items-center rounded-full border border-[var(--line-strong)] transition-transform duration-150 active:scale-[0.97] lg:hidden"
                aria-label={t("Abrir menú", "Open menu")}
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="border-[var(--line)] bg-[var(--deep)] p-6 text-[var(--snow)]">
              <SheetTitle className="sr-only">{t("Menú", "Menu")}</SheetTitle>
              <nav aria-label={t("Móvil", "Mobile")} className="mt-12">
                <ul className="flex flex-col">
                  {[...links, { href: "#contacto", es: "Contacto", en: "Contact" }].map((l) => (
                    <li key={l.href}>
                      <SheetClose asChild>
                        <a
                          href={l.href}
                          className="font-heading block border-b border-[var(--line)] py-4 text-[length:var(--step-2)] tracking-tight"
                        >
                          <T es={l.es} en={l.en} />
                        </a>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-4">
                <p className="text-[length:var(--step--1)] text-[var(--mist)]">
                  <T es="Colores de la página" en="Page colors" />
                </p>
                <PaletteSwitcher className="-ml-2" />
                <LangToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
