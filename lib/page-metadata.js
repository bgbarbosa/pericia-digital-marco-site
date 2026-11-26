import { publicAbsoluteUrl } from "@/lib/site-url";
export function pageMetadata(title, description, path, { images } = {}) {
  const url = publicAbsoluteUrl(path);
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      url: url || undefined,
      type: "website",
      locale: "pt_BR",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
