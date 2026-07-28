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
  "Treinamentos, cursos, palestras e mentorias em Inteligência Artificial e ChatGPT, com foco prático, responsável e estratégico para profissionais e equipes, além de soluções digitais personalizadas.";
const siteName = "Marco Aurélio - Inteligência Artificial e Capacitação";
const defaultTitle =
  "Marco Aurélio Pereira Barbosa - Inteligência Artificial e Capacitação";

export const metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: siteName,
  authors: [{ name: profile.name }],
  creator: profile.name,
  category: "Educação e tecnologia",
  alternates: hasPublicSiteUrl
    ? {
        canonical: publicAbsoluteUrl("/"),
      }
    : undefined,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName,
    title: defaultTitle,
    description,
    url: hasPublicSiteUrl ? publicAbsoluteUrl("/") : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
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
