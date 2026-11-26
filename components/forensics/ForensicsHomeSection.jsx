import Image from "next/image";
import Link from "next/link";
import { areaPath, guidePath, home, lawAreas } from "@/lib/forensics";
import ForensicsIcon from "./ForensicsIcon";
import styles from "./Forensics.module.css";

const emphasis = "aplicadas ao Direito.";
const cards = [...lawAreas, { id: "todas", ...home.guideCard }];
const indicatorIcons = ["grid", "layers", "shield"];

export default function ForensicsHomeSection() {
  return (
    <section id="pericia-aplicada" aria-labelledby="pericia-heading" className={`site-container ${styles.homeSection}`}>
      <div className={styles.homeIntro}>
        <div>
          <p className={styles.eyebrow}>{home.eyebrow}</p>
          <h2 id="pericia-heading">{home.title.slice(0, -emphasis.length)}<span>{emphasis}</span></h2>
          <p className={styles.lead}>{home.lead}</p>
          <p className={styles.context}>{home.context}</p>
          <ul className={styles.indicators} role="list">
            {home.indicators.map((indicator, index) => (
              <li key={indicator}><ForensicsIcon name={indicatorIcons[index]} />{indicator}</li>
            ))}
          </ul>
        </div>
        <figure className={styles.heroArt}>
          <Image src="/forense/ilustracao-vestigios-digitais.svg" width={510} height={366}
            alt="Vestígios digitais organizados em uma linha do tempo" />
          <figcaption>Ilustração conceitual · Análise e correlação de informações digitais</figcaption>
        </figure>
      </div>
      <div className={styles.areaSelection}>
        <p>{home.instruction}</p>
        <Link className={styles.shortcut} href={guidePath}>{home.guideShortcut}<ForensicsIcon name="arrow" /></Link>
      </div>
      <div className={styles.lawGrid}>
        {cards.map(({ id, title, summary }) => {
          const complete = id === "todas";
          const titleId = `pericia-card-${id}`;
          return (
            <article key={id}>
              <Link
                className={complete ? `${styles.lawCard} ${styles.complete}` : styles.lawCard}
                href={areaPath(id)}
                aria-labelledby={titleId}
                aria-describedby={`${titleId}-resumo`}
              >
                <div className={styles.cardArt}>
                  <Image src={`/forense/card-${id}.svg`} alt="" width={320} height={128} />
                </div>
                <div className={styles.cardBody}>
                  <h3 id={titleId}>{title}</h3>
                  <p id={`${titleId}-resumo`}>{summary}</p>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
      <p className={`${styles.notice} ${styles.homeNotice}`}><strong>Importante:</strong>{home.notice.slice("Importante:".length)}</p>
    </section>
  );
}
