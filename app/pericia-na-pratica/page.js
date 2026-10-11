import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleCards from "@/components/practice/ArticleCards";
import { practiceWhatsAppUrl } from "@/lib/practice-contact";
import { cardMenu } from "@/data/profile";
import { practiceArticles, practiceCollection, practiceMetadata } from "@/lib/practice-articles";
import styles from "@/components/practice/Practice.module.css";

export const metadata = practiceMetadata();

export default function PracticeCollectionPage() {
  const contactUrl = practiceWhatsAppUrl();
  return (
    <main className={styles.shell}>
      <Header menu={cardMenu} contactHref={contactUrl} contactLabel="Conversar pelo WhatsApp" />
      <div className={styles.collectionIntro}>
        <div className={styles.container}>
          <Link className="text-link" href="/">← Voltar à página inicial</Link>
          <p className={styles.eyebrow}>Mensagens · documentos · imagens · dados</p>
          <h1>{practiceCollection.title}</h1>
          <p className={styles.collectionSubtitle}>{practiceCollection.subtitle}</p>
          <p className={styles.introduction}>{practiceCollection.introduction}</p>
        </div>
      </div>
      <div className={`${styles.container} ${styles.collectionBody}`}>
        <p className={styles.collectionByline}>Por {practiceCollection.author} · {practiceCollection.brand}</p>
        <ArticleCards articles={practiceArticles} />
        <div className={styles.collectionContact}>
          <a className="action-primary" href={contactUrl} target="_blank" rel="noopener noreferrer">Receber conteúdos pelo WhatsApp</a>
          <p className={styles.contactNote}>Você pode editar a mensagem antes de enviar. Nome e profissão são opcionais.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
