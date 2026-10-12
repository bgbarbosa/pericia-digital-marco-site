import { whatsappUrl } from "@/data/profile";
import { contactFormUrl } from "@/lib/contact";

export function practiceWhatsAppUrl(articleTitle) {
  const introduction = articleTitle
    ? `Olá, Marco. Li o artigo “${articleTitle}” na seção Perícia na Prática e gostaria de conversar e receber novos conteúdos.`
    : "Olá, Marco. Vim pela seção Perícia na Prática e gostaria de receber novos conteúdos.";
  const message = `${introduction}\n\nSe quiser, posso informar:\nMeu nome:\nMinha profissão:`;
  return `${whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function practiceContactUrl(articleTitle) {
  return contactFormUrl({ subject: `Contato sobre o artigo: ${articleTitle}`, type: "Perícia na Prática" });
}
