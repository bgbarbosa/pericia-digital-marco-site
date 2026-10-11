import Image from "next/image";
import Link from "next/link";
import { articlePath } from "@/lib/practice-articles";
import styles from "./Practice.module.css";

export default function ArticleCards({ articles, compact = false }) {
  const Heading = compact ? "h3" : "h2";
  return (
    <div className={compact ? styles.relatedGrid : styles.cards}>
      {articles.map((article, index) => (
        <article key={article.slug} className={styles.card}>
          <Image
            src={article.coverPath}
            alt={article.coverAlt}
            width={1672}
            height={941}
            className={styles.cardImage}
            loading={!compact && index < 2 ? "eager" : "lazy"}
            sizes={compact ? "(max-width: 767px) 100vw, 360px" : "(max-width: 767px) 100vw, 560px"}
          />
          <div className={styles.cardText}>
            <p className={styles.category}>{article.category}</p>
            <Heading>
              <Link href={articlePath(article.slug)}>{article.title}</Link>
            </Heading>
            <p className={styles.cardSubtitle}>{article.subtitle}</p>
            {!compact && <p className={styles.cardExcerpt}>{article.excerpt}</p>}
            <Link className={styles.readLink} href={articlePath(article.slug)} aria-label={`Ler artigo: ${article.title}`}>
              Ler artigo <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
