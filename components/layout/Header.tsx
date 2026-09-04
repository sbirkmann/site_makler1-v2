"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { mainNav } from "@/components/layout/nav";
import { Logo } from "@/components/layout/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { IconMenu, IconPhone } from "@/components/icons";

/**
 * Header nach Referenz: Logo mittig, Navigation links und rechts davon
 * aufgeteilt, oben rechts eine schmale Servicezeile. Auf der Startseite
 * liegt er transparent ueber dem Bild und wird beim Scrollen zur weissen
 * Leiste.
 */
export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onImage = overlay && !scrolled;
  const split = Math.ceil(mainNav.length / 2);
  const left = mainNav.slice(0, split);
  const right = mainNav.slice(split);

  const renderItem = (item: (typeof mainNav)[number]) => {
    const active =
      pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
    if (item.groups?.length) {
      return <NavDropdown key={item.href} item={item} active={active} onImage={onImage} />;
    }
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "relative px-5 py-3 text-[0.9375rem] font-light tracking-[0.03em] transition-colors",
          onImage
            ? active
              ? "text-white"
              : "text-white/85 hover:text-white"
            : active
              ? "text-accent-600"
              : "text-ink hover:text-accent-600",
        )}
      >
        {item.label}
        <span
          className={cn(
            "absolute inset-x-5 bottom-1.5 h-px origin-center transition-transform duration-300",
            onImage ? "bg-white" : "bg-accent-500",
            active ? "scale-x-100" : "scale-x-0",
          )}
        />
      </Link>
    );
  };

  return (
    <>
      <a
        href="#hauptinhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-200 focus:bg-primary-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Zum Hauptinhalt springen
      </a>

      <header
        className={cn(
          "z-90 transition-[background-color,box-shadow] duration-300",
          onImage && "absolute inset-x-0 top-0 bg-gradient-to-b from-black/45 to-transparent",
          !overlay && !scrolled && "sticky top-0 bg-surface",
          scrolled && "fixed inset-x-0 top-0 bg-surface/96 shadow-[var(--shadow-subtle)] backdrop-blur-md",
        )}
      >
        {/* Servicezeile oben rechts */}
        <div className="mx-auto hidden w-full max-w-[1630px] items-center justify-end gap-6 px-5 pt-3 text-[0.75rem] tracking-[0.08em] sm:px-8 lg:flex lg:px-10">
          <a
            href={site.contact.phoneHref}
            className={cn(
              "flex items-center gap-2 transition-colors",
              onImage ? "text-white/85 hover:text-white" : "text-ink-muted hover:text-accent-600",
            )}
          >
            <IconPhone size={13} />
            {site.contact.phone}
          </a>
          <Link
            href="/kontakt"
            className={cn(
              "uppercase transition-colors",
              onImage ? "text-white/85 hover:text-white" : "text-ink-muted hover:text-accent-600",
            )}
          >
            Kontakt
          </Link>
        </div>

        <div
          className={cn(
            "mx-auto flex w-full max-w-[1630px] items-center justify-between gap-3 px-5 sm:px-8 lg:px-10",
            scrolled ? "h-[4.5rem]" : "h-[var(--header-height)] lg:h-auto lg:pb-5 lg:pt-1",
          )}
        >
          {/* Mobil / Tablet: Logo links, Menue rechts */}
          <div className="flex min-w-0 flex-1 items-center xl:hidden">
            <Logo tone={onImage ? "light" : "dark"} />
          </div>

          {/* Desktop: Navigation links – Logo mittig – Navigation rechts */}
          <nav
            aria-label="Hauptnavigation"
            className="hidden flex-1 items-center justify-end xl:flex"
          >
            {left.map(renderItem)}
          </nav>

          <div className="hidden shrink-0 px-10 xl:block">
            <Logo tone={onImage ? "light" : "dark"} stacked={!scrolled} />
          </div>

          <nav aria-label="Hauptnavigation rechts" className="hidden flex-1 items-center xl:flex">
            {right.map(renderItem)}
            <Link
              href="/immobilienbewertung"
              className={cn(
                "ml-4 border px-5 py-2.5 text-[0.75rem] uppercase tracking-[0.12em] transition-colors",
                onImage
                  ? "border-white/70 text-white hover:bg-white hover:text-primary-900"
                  : "border-accent-500 text-accent-600 hover:bg-accent-500 hover:text-white",
              )}
            >
              Bewertung
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Menü öffnen"
            aria-expanded={menuOpen}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center border transition-colors xl:hidden",
              onImage
                ? "border-white/60 text-white hover:bg-white/10"
                : "border-line-strong text-primary-900 hover:border-accent-500 hover:text-accent-600",
            )}
          >
            <IconMenu size={22} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
