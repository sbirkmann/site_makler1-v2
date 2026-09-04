import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display-serif",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Immobilienmakler in Köln, Bonn und dem Rheinland`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} – Immobilienmakler im Rheinland`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} – Immobilienmakler im Rheinland`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#3f3f40",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${lato.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
