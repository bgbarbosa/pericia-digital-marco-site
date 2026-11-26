import Link from "next/link";
import Image from "next/image";
import { practiceCollection } from "@/lib/practice-articles";
import styles from "./Practice.module.css";

export default function PracticeCallout() {
  return (
    <section className="content-section practice-callout-section" aria-labelledby="pratica-chamada">
      <Link className={styles.callout} href={practiceCollection.basePath} aria-labelledby="pratica-chamada" aria-describedby="pratica-chamada-resumo">
        <div>
          <span className={styles.calloutIcon} aria-hidden="true">
            <Image src="/forense/universo-forense-editorial.svg" alt="" width={32} height={32} />
          </span>
          <div>
            <h2 id="pratica-chamada">{practiceCollection.title}</h2>
            <p id="pratica-chamada-resumo">{practiceCollection.subtitle}</p>
          </div>
        </div>
        <span className={styles.calloutArrow} aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
