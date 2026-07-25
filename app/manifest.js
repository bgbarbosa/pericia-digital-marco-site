import { profile } from "@/data/profile";

export default function manifest() {
  return {
    name: `${profile.name} — Perícia Digital`,
    short_name: "M.A.P.B",
    description: profile.introduction,
    start_url: "/",
    display: "standalone",
    background_color: "#020817",
    theme_color: "#020817",
    lang: "pt-BR",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32 48x48 256x256",
        type: "image/x-icon",
        purpose: "any",
      },
    ],
  };
}
