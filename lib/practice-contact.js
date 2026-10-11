import { emailUrl, whatsappUrl } from "@/data/profile";

export function practiceWhatsAppUrl(articleTitle) {
  const introduction = articleTitle
    ? `Olá, Marco. Li o artigo “${articleTitle}” na seção Perícia na Prática e gostaria de conversar e receber novos conteúdos.`
    : "Olá, Marco. Vim pela seção Perícia na Prática e gostaria de receber novos conteúdos.";
  const message = `${introduction}\n\nSe quiser, posso informar:\nMeu nome:\nMinha profissão:`;
  return `${whatsappUrl}?text=${encodeURIComponent(message)}`;
}

export function practiceEmailUrl(articleTitle) {
  const subject = `Contato sobre o artigo: ${articleTitle}`;
  const body = `Olá, Marco.\n\nLi o artigo “${articleTitle}” na seção Perícia na Prática e gostaria de conversar sobre o tema.`;
  return `${emailUrl}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
