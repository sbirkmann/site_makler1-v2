"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconMinus, IconPlus } from "@/components/icons";

export interface AccordionItem {
  question: string;
  answer: string;
}

/**
 * Akkordeon v2: Serifen-Fragen, laufende Nummer in Gold, duenner Plus/Minus
 * in einem Hairline-Kreis. Trennung ausschliesslich ueber Linien.
 */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={cn("divide-y divide-line border-y border-line-strong", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const number = String(index + 1).padStart(2, "0");
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                className="group flex w-full items-start gap-5 py-6 text-left"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 w-7 shrink-0 font-[family-name:var(--font-display)] text-[0.9375rem] tabular-nums transition-colors",
                    isOpen ? "text-accent-500" : "text-ink-subtle group-hover:text-accent-500",
                  )}
                >
                  {number}
                </span>
                <span
                  className={cn(
                    "heading-4 flex-1 transition-colors",
                    isOpen ? "text-primary-900" : "text-ink group-hover:text-primary-800",
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isOpen
                      ? "border-primary-900 bg-primary-900 text-ink-inverse"
                      : "border-line-strong text-ink-muted group-hover:border-primary-900 group-hover:text-primary-900",
                  )}
                >
                  {isOpen ? (
                    <IconMinus size={14} strokeWidth={1.5} />
                  ) : (
                    <IconPlus size={14} strokeWidth={1.5} />
                  )}
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              hidden={!isOpen}
              className="pb-7 pl-12 pr-14 text-[0.9375rem] leading-relaxed text-ink-muted"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
