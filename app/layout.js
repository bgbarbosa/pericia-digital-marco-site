import { Geist, Geist_Mono } from "next/font/google";

import SiteMetrics from "@/components/SiteMetrics";
import { profile } from "@/data/profile";
import { publicPagePaths } from "@/lib/public-pages";
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
  "Treinamentos, cursos, palestras e mentorias em Inteligência Artificial e ChatGPT, com foco prático e responsável para profissionais e equipes, além de soluções digitais e experiência em investigação, perícia digital e computação forense.";
const applicationName = "Marco Barbosa - Inteligência Artificial e Capacitação";
const defaultTitle =
  "Marco Aurélio Pereira Barbosa - Inteligência Artificial e Capacitação";

export const metadata = {
  metadataBase,
  title: {
    default: defaultTitle,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName,
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
    siteName: profile.displayName,
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
  verification: {
    google: "I55K4X8A4565Rjvpmq8Zfs_tl2t_38YGRsFvyYF-cfk",
    other: { "msvalidate.01": "49A6DAE93186FEC17D4BEB690DDF7B14" },
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100">
        {children}
        <SiteMetrics paths={publicPagePaths} />
      </body>
    </html>
  );
}
