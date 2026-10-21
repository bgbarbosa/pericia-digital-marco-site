import { damaEditorial } from "@/data/dama-editorial";
import styles from "./selected-dama-tools.module.css";

export default function SelectedDamaTools() {
  return <section className={styles.section} aria-labelledby="selected-tools-title">
    <p className={styles.eyebrow}>Ecossistema autoral · Dama Universe</p>
    <h2 id="selected-tools-title">Projetos e ferramentas autorais</h2>
    <p>Conheça dois exemplos do ecossistema Dama Universe: organização de processos e apoio à escrita com inteligência artificial.</p>
    <div className={styles.grid}>
      {damaEditorial.tools.map(tool => <article key={tool.slug}>
        <a className={styles.card} href={tool.href} target="_blank" rel="noopener noreferrer" aria-label={tool.action} data-testid={`selected-tool-${tool.slug}`}>
          <p className={styles.status}>{tool.status}</p>
          <h3>{tool.title}</h3>
          <p>{tool.description}</p>
          <span className={styles.destination}>No Dama Universe <span aria-hidden="true">↗︎</span></span>
          <span className={styles.action}>{tool.action} <span aria-hidden="true">↗︎</span></span>
        </a>
      </article>)}
    </div>
    <p className={styles.note}>Consulte o estágio e as condições de cada recurso na página de destino. Projetos dependem de alinhamento prévio; o acesso ao GPT segue as condições e os limites do ChatGPT.</p>
    <p className={styles.utility}><a href={damaEditorial.publicUtility} target="_blank" rel="noopener noreferrer">Utilidade Pública no Dama Universe <span aria-hidden="true">↗︎</span></a><span>Informações e canais reunidos pelo ecossistema; não são serviços prestados por Marco Barbosa.</span></p>
  </section>;
}
