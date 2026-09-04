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
import { ButtonLink } from "@/components/ui/Button";
import { IconMenu, IconPhone } from "@/components/icons";

/**
 * Header v2: feste Elfenbein-Leiste mit Hairline. Darueber eine schmale
 * Infozeile mit Telefon und Oeffnungszeit, die beim Scrollen einklappt.
 * `overlay` wird aus Kompatibilitaet akzeptiert, aendert aber nichts.
 */
export function Header({ overlay: _overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#hauptinhalt"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-200 focus:rounded-full focus:bg-primary-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Zum Hauptinhalt springen
      </a>

      <header className="sticky top-0 z-90 bg-surface/95 backdrop-blur-md">
        {/* Infozeile */}
        <div
          className={cn(
            "hidden overflow-hidden border-b border-line bg-primary-950 text-ink-inverse transition-[height] duration-300 md:block",
            scrolled ? "h-0 border-transparent" : "h-9",
          )}
        >
          <div className="mx-auto flex h-9 w-full max-w-[1600px] items-center justify-between px-5 text-[0.75rem] tracking-[0.02em] sm:px-8 lg:px-12">
            <p className="text-white/70">
              {site.address.city} · {site.regions.slice(1, 3).join(" · ")} · Rheinland
            </p>
            <div className="flex items-center gap-6">
              <span className="text-white/60">
                {site.openingHours[0].days} {site.openingHours[0].hours}
              </span>
              <a
                href={site.contact.phoneHref}
                className="flex items-center gap-2 font-semibold text-accent-300 transition-colors hover:text-accent-200"
              >
                <IconPhone size={13} />
                {site.contact.phone}
              </a>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "border-b transition-colors duration-300",
            scrolled ? "border-line-strong" : "border-line",
          )}
        >
          <div className="mx-auto flex h-[var(--header-height)] w-full max-w-[1600px] items-center justify-between gap-3 px-5 sm:px-8 lg:px-12">
            <Logo className="min-w-0 flex-1 overflow-hidden xl:flex-none" />

            <nav aria-label="Hauptnavigation" className="hidden items-center gap-0.5 xl:flex">
              {mainNav.map((item) => {
                const active =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));

                if (item.groups?.length) {
                  return (
                    <NavDropdown key={item.href} item={item} active={active} onImage={false} />
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-3 text-[0.9375rem] font-medium transition-colors",
                      active ? "text-primary-900" : "text-ink-muted hover:text-primary-900",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-4 bottom-1 h-px origin-left bg-accent-500 transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <ButtonLink
                href="/immobilienbewertung"
                size="md"
                variant="outline"
                className="hidden lg:inline-flex"
              >
                Immobilie bewerten
              </ButtonLink>

              <ButtonLink href="/kontakt" size="md" variant="primary" className="shrink-0">
                Kontakt
              </ButtonLink>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Menü öffnen"
                aria-expanded={menuOpen}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-primary-900 transition-colors hover:border-primary-900 xl:hidden"
              >
                <IconMenu size={22} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
