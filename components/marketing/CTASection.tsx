import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { IconArrowRight } from "@/components/icons";

/**
 * CTA v2: dunkles Waldgruen mit Hairlines statt Radien.
 * Split-Variante: kantiges Bild links, goldene Vertikallinie als Trenner.
 */
export function CTASection({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  image,
  imageAlt,
  variant = "dark",
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  image?: string;
  imageAlt?: string;
  variant?: "dark" | "light" | "split";
  className?: string;
  children?: ReactNode;
}) {
  if (variant === "split" && image) {
    return (
      <section className={cn("border-t border-line bg-surface py-12 sm:py-16 lg:py-20", className)}>
        <Container size="wide">
          <div className="grid border border-primary-900 bg-primary-950 text-ink-inverse lg:grid-cols-2">
            <div className="relative min-h-72 lg:min-h-0">
              <Image
                src={image}
                alt={imageAlt ?? ""}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-16">
              {/* Goldene Vertikallinie an der Bildkante */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-8 bottom-8 hidden w-px bg-accent-400 lg:block"
              />
              <span
                aria-hidden="true"
                className="absolute left-8 right-8 top-0 h-px bg-accent-400 lg:hidden"
              />
              {eyebrow ? <span className="eyebrow !text-accent-300">{eyebrow}</span> : null}
              <h2 className="display-2 text-balance text-white">{title}</h2>
              <p className="max-w-lg text-[1.0625rem] leading-relaxed text-white/65">
                {description}
              </p>
              {children}
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={primaryHref} size="lg" variant="accent">
                  {primaryLabel}
                  <IconArrowRight size={18} />
                </ButtonLink>
                {secondaryLabel && secondaryHref ? (
                  <ButtonLink
                    href={secondaryHref}
                    size="lg"
                    variant="outline"
                    className="border-white/25 text-white hover:border-white hover:bg-white hover:text-primary-950"
                  >
                    {secondaryLabel}
                  </ButtonLink>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const dark = variant === "dark";

  return (
    <section
      className={cn(
        "border-t py-12 sm:py-16 lg:py-20",
        dark ? "border-primary-800 bg-primary-950 text-ink-inverse" : "border-line bg-surface-muted",
        className,
      )}
    >
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            {eyebrow ? (
              <span className={cn("eyebrow", dark && "!text-accent-300")}>{eyebrow}</span>
            ) : null}
            <h2
              className={cn(
                "display-2 max-w-3xl text-balance",
                dark ? "text-white" : "text-primary-950",
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                "max-w-2xl text-[1.0625rem] leading-relaxed text-pretty",
                dark ? "text-white/65" : "text-ink-muted",
              )}
            >
              {description}
            </p>
            {children}
          </div>
          <div
            className={cn(
              "flex flex-col gap-3 border-t pt-8 sm:flex-row",
              dark ? "border-white/15" : "border-line-strong",
            )}
          >
            <ButtonLink href={primaryHref} size="lg" variant={dark ? "accent" : "primary"}>
              {primaryLabel}
              <IconArrowRight size={18} />
            </ButtonLink>
            {secondaryLabel && secondaryHref ? (
              <ButtonLink
                href={secondaryHref}
                size="lg"
                variant="outline"
                className={
                  dark
                    ? "border-white/25 text-white hover:border-white hover:bg-white hover:text-primary-950"
                    : ""
                }
              >
                {secondaryLabel}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
