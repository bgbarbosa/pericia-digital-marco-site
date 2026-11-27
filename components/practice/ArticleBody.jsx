import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { articleSections, headingId } from "@/lib/practice-articles";
import styles from "./Practice.module.css";

function ReferenceLink({ href, children }) {
  if (href?.startsWith("/") && !href.startsWith("//")) {
    return <Link href={href}>{children}</Link>;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}

function Subheading({ children }) {
  return <h3 id={headingId(String(children))} tabIndex={-1}>{children}</h3>;
}

function TableHeading({ children }) {
  return <th scope="col">{children}</th>;
}

const markdownComponents = { a: ReferenceLink, h3: Subheading, th: TableHeading };

function ArticleDiagram({ article }) {
  return (
    <figure className={styles.diagram} data-testid="article-diagram">
      <Image
        src={article.diagramPath}
        alt={article.diagramAlt}
        width={1200}
        height={960}
        unoptimized
        className={styles.diagramImage}
      />
      <div className={styles.diagramMobile} role="group" aria-label={article.diagramAlt}>
        <h3>{article.diagramMobile.title}</h3>
        <dl>
          {article.diagramMobile.items.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.description}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.diagramNote}>{article.diagramMobile.note}</p>
      </div>
      <figcaption>{article.diagramCaption}</figcaption>
    </figure>
  );
}

export default function ArticleBody({ article }) {
  return (
    <div className={styles.prose} data-testid="article-body">
      {article.introMarkdown && (
        <Markdown remarkPlugins={[remarkGfm]} skipHtml components={markdownComponents}>
          {article.introMarkdown}
        </Markdown>
      )}
      {articleSections(article).map((section) => (
        <section key={section.id} aria-labelledby={section.id}>
          <h2 id={section.id} tabIndex={-1}>{section.title}</h2>
          <Markdown remarkPlugins={[remarkGfm]} skipHtml components={markdownComponents}>
            {section.markdown}
          </Markdown>
          {section.title === article.pullQuoteAfterHeading && (
            <blockquote className={styles.pullQuote} data-testid="article-pullquote">
              <p>{article.pullQuote}</p>
            </blockquote>
          )}
          {section.title === article.diagramAfterHeading && <ArticleDiagram article={article} />}
        </section>
      ))}
    </div>
  );
}
