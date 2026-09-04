import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "accent" | "inverse";
type Size = "sm" | "md" | "lg";

/**
 * Buttons v2: Pillenform, ruhige Grotesk, keine Schatten.
 * Der Kontrast entsteht ueber Flaeche (Gruen / Gold) statt ueber Tiefe.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.005em] " +
  "transition-[background-color,color,border-color,transform] duration-200 ease-out select-none " +
  "disabled:opacity-50 disabled:pointer-events-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-900 text-ink-inverse hover:bg-primary-700 active:translate-y-px focus-visible:outline-primary-800",
  secondary:
    "bg-secondary-100 text-primary-900 hover:bg-secondary-200 active:translate-y-px focus-visible:outline-primary-600",
  outline:
    "border border-line-strong bg-transparent text-primary-900 hover:border-primary-900 hover:bg-primary-900 hover:text-ink-inverse active:translate-y-px focus-visible:outline-primary-600",
  ghost:
    "bg-transparent text-primary-900 underline decoration-accent-500 decoration-1 underline-offset-[6px] hover:decoration-2 focus-visible:outline-primary-600",
  accent:
    "bg-accent-400 text-ink hover:bg-accent-300 active:translate-y-px focus-visible:outline-accent-600",
  inverse:
    "bg-surface text-primary-900 hover:bg-accent-200 active:translate-y-px focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-6 text-[0.9375rem]",
  lg: "h-[3.25rem] px-8 text-base",
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
