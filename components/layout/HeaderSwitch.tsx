"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";

/**
 * Die Startseite hat ein vollflaechiges Hero-Bild, ueber dem der Header
 * transparent liegt. Alle uebrigen Seiten bekommen die weisse Leiste.
 */
const overlayRoutes = new Set(["/"]);

export function HeaderSwitch() {
  const pathname = usePathname();
  return <Header overlay={overlayRoutes.has(pathname)} />;
}
