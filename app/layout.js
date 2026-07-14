import { Geist, Geist_Mono } from "next/font/google";

import { profile } from "@/data/profile";
import {
  hasPublicSiteUrl,
  metadataBase,
  publicAbsoluteUrl,
} from "@/lib/site-url";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Página profissional de Marco Aurélio Pereira Barbosa, com atuação em perícia digital, computação forense, evidências digitais, análise técnica e cadeia de custódia.";

export const metadata = {
  metadataBase,
  title: {
    default: `${profile.name} — Perícia Digital e Computação Forense`,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: "Marco Aurélio — Perícia Digital",
  authors: [{ name: profile.name }],
  creator: profile.name,
  category: "Tecnologia e perícia digital",
  alternates: hasPublicSiteUrl
    ? {
        canonical: publicAbsoluteUrl("/"),
      }
    : undefined,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Marco Aurélio — Perícia Digital",
    title: `${profile.name} — Perícia Digital e Computação Forense`,
    description,
    url: hasPublicSiteUrl ? publicAbsoluteUrl("/") : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Perícia Digital e Computação Forense`,
    description,
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
