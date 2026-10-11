import Link from "next/link";
import { practiceCollection } from "@/lib/practice-articles";
import styles from "./Practice.module.css";

export default function PracticeCallout() {
  return (
    <section className="content-section" aria-labelledby="pratica-chamada">
      <div className={styles.callout}>
        <div>
          <h2 id="pratica-chamada">{practiceCollection.title}</h2>
          <p>{practiceCollection.subtitle}</p>
        </div>
        <Link className="action-primary" href={practiceCollection.basePath}>
          Explorar os quatro artigos <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </section>
  );
}
