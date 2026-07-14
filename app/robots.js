import { publicAbsoluteUrl, publicSiteUrl } from "@/lib/site-url";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: publicSiteUrl?.origin,
    sitemap: publicSiteUrl ? publicAbsoluteUrl("/sitemap.xml") : undefined,
  };
}
