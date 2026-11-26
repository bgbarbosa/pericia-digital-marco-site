"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import styles from "./Forensics.module.css";

function subscribe(listener) {
  window.addEventListener("hashchange", listener);
  return () => window.removeEventListener("hashchange", listener);
}

const getHash = () => window.location.hash;
const emptyHash = () => "";

export default function GuideFieldNavigation({ fields, branchOptions, currentPath }) {
  const hash = useSyncExternalStore(subscribe, getHash, emptyHash);
  const router = useRouter();

  if (branchOptions) {
    const selected = fields.some(({ anchor }) => hash === `#${anchor}`) ? hash : "";
    return (
      <div className={styles.mobileSelect}>
        <label htmlFor="guide-branch">Escolha a área do Direito</label>
        <select id="guide-branch" value={currentPath} onChange={(event) => router.push(event.target.value)}>
          {branchOptions.map(({ title, href }) => <option key={href} value={href}>{title}</option>)}
        </select>
        <label htmlFor="guide-field">Ir para um campo de conhecimento</label>
        <select id="guide-field" value={selected} onChange={(event) => {
          const target = event.target.value;
          if (target) window.location.hash = target;
          else window.location.hash = "guia-topo";
        }}>
          <option value="">Selecionar um campo</option>
          {fields.map(({ anchor, number, title }) => <option key={anchor} value={`#${anchor}`}>{number} — {title}</option>)}
        </select>
      </div>
    );
  }

  return (
    <nav aria-labelledby="guide-index-label" className={styles.fieldIndex}>
      {fields.map(({ anchor, number, title }) => (
        <a key={anchor} className={styles.sideLink} href={`#${anchor}`}
          aria-current={hash === `#${anchor}` ? "location" : undefined}>
          <span className={styles.indexNumber}>{number}</span>{title}
        </a>
      ))}
    </nav>
  );
}
