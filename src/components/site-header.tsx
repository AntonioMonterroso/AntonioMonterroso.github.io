"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { LangToggle, PaletteSwitcher } from "@/components/palette-switcher";
import { useT } from "@/components/prefs";
import { T } from "@/components/t";
import { QuoteLink } from "@/components/quote-link";

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
        <g fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 21 11 32l11 11M42 21l11 11-11 11" stroke="var(--snow)" />
          <path d="M36 17 28 47" stroke="var(--brass)" />
        </g>
      </svg>
      <span className="font-heading flex flex-col leading-none font-medium tracking-tight sm:flex-row sm:items-baseline sm:gap-[0.3em]">
        <span className="text-[length:var(--step-0)]">Monterroso</span>
        <span className="mt-1 text-[0.625rem] tracking-[0.2em] text-[var(--mist)] uppercase sm:mt-0 sm:text-[length:var(--step-0)] sm:tracking-tight sm:normal-case">
          Dev Studio
        </span>
      </span>
    </a>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const t = useT();

  // Marca en el menú la sección que está en el centro de la pantalla
  useEffect(() => {
    const ids = [...links.map((l) => l.href.slice(1)), "contacto"];
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => io.observe(el));
    const hero = document.getElementById("inicio");
    const heroIo = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "-45% 0px -50% 0px" });
    if (hero) heroIo.observe(hero);
    return () => {
      io.disconnect();
      heroIo.disconnect();
    };
  }, []);

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
                <a className="nav-link" href={l.href} aria-current={active === l.href.slice(1) ? "true" : undefined}>
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
          <QuoteLink className="btn btn-solid ml-2 hidden !min-h-10 !px-5 sm:inline-flex">
            <T es="Cotizar" en="Get a quote" />
          </QuoteLink>
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
            <SheetContent
              side="right"
              showCloseButton={false}
              // Al abrir, el foco va al panel (no a la ✕): con teclado, Tab entra al menú; con el dedo no aparece un anillo suelto
              onOpenAutoFocus={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLElement).focus();
              }}
              className="border-[var(--line-strong)] bg-[var(--deep)] p-6 outline-none focus-visible:outline-none text-[var(--snow)] shadow-[-24px_0_48px_-12px_rgb(0_0_0/0.6)]"
            >
              <SheetClose asChild>
                <button
                  type="button"
                  className="absolute top-3.5 right-[calc(var(--gutter)+0.75rem)] grid size-11 place-items-center rounded-full border border-[var(--line-strong)] transition-transform duration-150 active:scale-[0.97]"
                  aria-label={t("Cerrar menú", "Close menu")}
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </SheetClose>
              <SheetTitle className="sr-only">{t("Menú", "Menu")}</SheetTitle>
              <nav aria-label={t("Móvil", "Mobile")} className="mt-12">
                <ul className="flex flex-col">
                  {[...links, { href: "#contacto", es: "Contacto", en: "Contact" }].map((l, i) => (
                    <li key={l.href} className="sheet-item" style={{ ["--i" as string]: i }}>
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
