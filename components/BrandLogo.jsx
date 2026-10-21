import Image from "next/image";
import Link from "next/link";
import styles from "./brand-logo.module.css";

/** Identidade oficial fornecida pelo titular; o arquivo original não é redesenhado. */
export default function BrandLogo({ placement = "header" }) {
  return (
    <Link href="/perfil" className={`${styles.link} ${styles[placement] || ""}`} aria-label="Marco Barbosa — abrir perfil e currículo" title="Conheça o perfil e currículo de Marco Barbosa">
      <Image src="/marca/marco-barbosa-logo.webp" alt="Marco Barbosa — monograma MB" width={1600} height={533} sizes={placement === "card" ? "320px" : "240px"} preload={placement === "header"} className={styles.image} />
    </Link>
  );
}
