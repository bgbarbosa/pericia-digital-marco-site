import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCards from "@/components/practice/ArticleCards";
import ArticleBody from "@/components/practice/ArticleBody";
import { cardMenu, emailUrl, whatsappUrl } from "@/data/profile";
import { articleOutline, findArticle, practiceArticles, practiceCollection, practiceMetadata } from "@/lib/practice-articles";
import styles from "@/components/practice/Practice.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return practiceArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const article = findArticle((await params).slug);
  if (!article) notFound();
  return practiceMetadata(article);
}

export default async function PracticeArticlePage({ params }) {
  const article = findArticle((await params).slug);
  if (!article) notFound();
  const related = article.relatedSlugs.map(findArticle).filter(Boolean);
  const contactUrl = `${whatsappUrl}?text=${encodeURIComponent(`Olá, Marco. Li o artigo “${article.title}” e gostaria de conversar sobre uma questão técnica e os materiais disponíveis.`)}`;

  return (
    <main className={styles.shell}>
      <Header menu={cardMenu} contactHref="#contato-artigo" contactLabel="Contato profissional" />
      <article
        className={`${styles.container} ${styles.article}`}
        style={{ "--article-accent": article.theme.accent, "--article-tint": article.theme.tint }}
      >
        <Link className={styles.backLink} href={practiceCollection.basePath}>
          ← Voltar à coleção {practiceCollection.title}
        </Link>
        <header className={styles.articleHeader}>
          <p className={styles.category}>{article.category}</p>
          <h1>{article.title}</h1>
          <p className={styles.subtitle}>{article.subtitle}</p>
          <p className={styles.byline}>Por <strong>{article.author}</strong> · {article.brand}</p>
          <p className={styles.excerpt} data-testid="article-excerpt">{article.excerpt}</p>
        </header>
        <figure className={styles.cover} data-testid="article-cover">
          <Image src={article.coverPath} alt={article.coverAlt} width={1672} height={941} preload sizes="(max-width: 1152px) 100vw, 1120px" />
          <figcaption>{article.coverCaption}</figcaption>
        </figure>
        <div className={styles.readingLayout}>
          <nav className={styles.toc} aria-label="Sumário do artigo">
            <p>Nesta leitura</p>
            <ol>
              {articleOutline(article).map((heading) => (
                <li key={heading.id} className={heading.level === 3 ? styles.tocSubheading : undefined}>
                  <a href={`#${heading.id}`}>{heading.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <ArticleBody article={article} />
        </div>
        <section id="contato-artigo" className={styles.contact} aria-labelledby="contato-artigo-titulo">
          <h2 id="contato-artigo-titulo">Contato profissional</h2>
          <p>Converse sobre a questão técnica e os materiais disponíveis.</p>
          <div className={styles.contactActions}>
            <a className="action-primary" href={contactUrl} target="_blank" rel="noopener noreferrer">Conversar pelo WhatsApp</a>
            <a className="action-secondary" href={emailUrl}>Enviar e-mail</a>
            <Link className="text-link" href="/cartao">Abrir cartão profissional</Link>
          </div>
        </section>
      </article>
      <section className={`${styles.container} ${styles.related}`} aria-labelledby="outras-leituras">
        <h2 id="outras-leituras">Outras leituras de {practiceCollection.title}</h2>
        <ArticleCards articles={related} compact />
        <Link className={styles.backLink} href={practiceCollection.basePath}>Ver toda a coleção →</Link>
      </section>
      <Footer />
    </main>
  );
}
