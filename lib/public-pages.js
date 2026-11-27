import { applicationTopics } from "@/data/applications";
import { guidePath } from "@/lib/forensics";
import { articlePath, practiceArticles, practiceCollection } from "@/lib/practice-articles";

export const contentPagePaths = [
  "/aplicacoes",
  guidePath,
  ...applicationTopics.map(({ slug }) => `/aplicacoes/${slug}`),
  "/contato",
  "/perfil",
  "/formacao/deteccao-imagens-ia",
  practiceCollection.basePath,
  ...practiceArticles
    .filter(({ publicationStatus }) => publicationStatus === "publicado")
    .map(({ slug }) => articlePath(slug)),
];

export const publicPagePaths = ["/", "/cartao", ...contentPagePaths];
