import content from "@/data/practice-articles.json";
import { pageMetadata } from "@/lib/page-metadata";
import { publicAbsoluteUrl } from "@/lib/site-url";

export const practiceCollection = content.collection;
export const practiceArticles = [...content.articles].sort((a, b) => a.order - b.order);

export function articlePath(slug) {
  return `${practiceCollection.basePath}/${slug}`;
}

export function findArticle(slug) {
  return practiceArticles.find((article) => article.slug === slug);
}

export function headingId(heading) {
  return heading.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// The editorial source uses H2 sections and plain-text H2/H3 headings.
// Keep their content intact; visual inserts are attached to an H2 by title.
export function articleSections(article) {
  return article.bodyMarkdown.trim().split(/\n(?=## )/).map((section) => {
    const [heading, ...body] = section.split("\n");
    if (!heading.startsWith("## ")) throw new Error(`Seção sem H2: ${article.slug}`);
    const title = heading.slice(3).trim();
    return { title, id: headingId(title), markdown: body.join("\n").trim() };
  });
}

export function articleOutline(article) {
  return [...article.bodyMarkdown.matchAll(/^(#{2,3}) (.+)$/gm)].map((match) => ({
    title: match[2], id: headingId(match[2]), level: match[1].length,
  }));
}

export function practiceMetadata(article) {
  const title = article?.title || practiceCollection.title;
  const description = article?.metaDescription || `${practiceCollection.subtitle} ${practiceCollection.introduction}`;
  const path = article ? articlePath(article.slug) : practiceCollection.basePath;
  const cover = article || practiceArticles[0];
  const images = [{ url: publicAbsoluteUrl(cover.coverPath), width: 1672, height: 941, alt: cover.coverAlt, type: "image/png" }];
  const metadata = pageMetadata(title, description, path);
  return {
    ...metadata,
    authors: [{ name: article?.author || practiceCollection.author }],
    openGraph: {
      ...metadata.openGraph,
      type: article ? "article" : "website",
      images,
      ...(article ? { authors: [article.author] } : {}),
      ...(article?.publicationDate ? { publishedTime: article.publicationDate } : {}),
    },
    twitter: { ...metadata.twitter, images },
  };
}
