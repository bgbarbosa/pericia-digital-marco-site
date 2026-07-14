import { publicAbsoluteUrl, publicSiteUrl } from "@/lib/site-url";

export default function sitemap() {
  if (!publicSiteUrl) {
    return [];
  }

  return [
    {
      url: publicAbsoluteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: publicAbsoluteUrl("/cartao"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
