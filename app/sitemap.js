import { publicAbsoluteUrl, publicSiteUrl } from "@/lib/site-url";
import { articlePath, practiceArticles, practiceCollection } from "@/lib/practice-articles";
import { applicationTopics } from "@/data/applications";
import { guidePath } from "@/lib/forensics";

export default function sitemap() {
  if (!publicSiteUrl) {
    return [];
  }

  return [
    ...[
      "/aplicacoes",
      guidePath,
      ...applicationTopics.map(({ slug }) => `/aplicacoes/${slug}`),
      "/contato",
      "/perfil",
      "/formacao/deteccao-imagens-ia",
      practiceCollection.basePath,
      ...practiceArticles.map(({ slug }) => articlePath(slug)),
    ].map((path) => ({
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
