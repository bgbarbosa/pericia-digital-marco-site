import { publicAbsoluteUrl, publicSiteUrl } from "@/lib/site-url";
import { contentPagePaths } from "@/lib/public-pages";

export default function sitemap() {
  if (!publicSiteUrl) {
    return [];
  }

  return [
    ...contentPagePaths.map((path) => ({
      url: publicAbsoluteUrl(path),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
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
