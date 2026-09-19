import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cardMenu } from "@/data/profile";
export default function DetailPage({ title, intro, children }) {
  return (
    <main className="min-h-screen bg-[#020817] text-slate-100">
      <Header menu={cardMenu} contactHref="/#contato" />
      <div className="detail-heading">
        <Link className="text-link" href="/#inicio">
          ← Voltar à página inicial
        </Link>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      {children}
      <div className="content-section">
        <Link className="action-secondary" href="/#contato">
          Entrar em contato
        </Link>
      </div>
      <Footer />
    </main>
  );
}
