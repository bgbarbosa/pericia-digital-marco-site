import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { cardMenu, profile, whatsappUrl } from "@/data/profile";
import { contactPrefill } from "@/lib/contact";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Contato",
  "Envie uma mensagem a Marco Barbosa sobre capacitações, Perícia na Prática ou soluções digitais.",
  "/contato",
);

export default async function ContactPage({ searchParams }) {
  const prefill = contactPrefill(await searchParams);
  return (
    <main className="min-h-screen bg-[#020817] text-slate-100">
      <Header menu={cardMenu} contactHref="/contato#formulario" contactLabel="Contato" />
      <div className="detail-heading">
        <Link className="text-link" href="/">← Voltar à página inicial</Link>
        <h1>Contato</h1>
        <p>Converse com Marco Barbosa sobre capacitações, palestras ou mentorias, Perícia na Prática e soluções digitais. Informe apenas o necessário para contextualizar sua mensagem.</p>
      </div>
      <section className="contact-page-content content-section">
        <div className="contact-page-aside">
          <h2>Antes de escrever</h2>
          <p>Escolha o assunto mais próximo do que você procura. A disponibilidade e o escopo de cada atividade dependem de alinhamento prévio.</p>
          <p>O endereço profissional para esta página é <strong>{profile.email}</strong>. Use o formulário abaixo para enviar sua mensagem.</p>
          <a className="action-secondary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Conversar pelo WhatsApp</a>
        </div>
        <ContactForm initialSubject={prefill.subject} initialType={prefill.type} siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || ""} />
      </section>
      <Footer />
    </main>
  );
}
