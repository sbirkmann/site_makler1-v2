import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "accent" | "inverse";
type Size = "sm" | "md" | "lg";

/**
 * Buttons v2: kantige Flaechen, Versalien mit Sperrung, keine Schatten.
 * `ghost` ist der Textlink der Referenz – Versalien mit kurzer Goldlinie.
 */
const base =
  "inline-flex items-center justify-center gap-2 font-normal uppercase tracking-[0.12em] " +
  "transition-[background-color,color,border-color] duration-200 ease-out select-none " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-500 text-white hover:bg-accent-600 focus-visible:outline-accent-600",
  secondary:
    "bg-primary-900 text-white hover:bg-primary-950 focus-visible:outline-primary-900",
  outline:
    "border border-accent-500 bg-transparent text-accent-600 hover:bg-accent-500 hover:text-white focus-visible:outline-accent-600",
  ghost: "link-caps !h-auto !px-0 !py-0 !text-[0.8125rem]",
  accent:
    "bg-accent-500 text-white hover:bg-accent-600 focus-visible:outline-accent-600",
  inverse:
    "bg-white text-primary-900 hover:bg-accent-100 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.6875rem]",
  md: "h-11 px-6 text-[0.75rem]",
  lg: "h-[3.25rem] px-9 text-[0.8125rem]",
};

export interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: ButtonBaseProps = {}) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
}

export function Button({
  variant,
  size,
  fullWidth,
  className,
  type = "button",
  ...props
}: ButtonBaseProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...props}
    />
  );
}

export function ButtonLink({
  variant,
  size,
  fullWidth,
  className,
  href,
  ...props
}: ButtonBaseProps & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      href={href}
      className={buttonClasses({ variant, size, fullWidth, className })}
      {...props}
    />
  );
}
