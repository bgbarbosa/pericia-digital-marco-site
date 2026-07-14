import Footer from "@/components/Footer";
import Header from "@/components/Header";
import VirtualCard from "@/components/VirtualCard";
import {
  cardMenu,
  emailUrl,
  profile,
  specializationAreas,
  telephoneUrl,
  whatsappUrl,
} from "@/data/profile";
import {
  displaySiteAddress,
  hasPublicSiteUrl,
  publicAbsoluteUrl,
} from "@/lib/site-url";

const cardDescription =
  "Cartão profissional de Marco Aurélio Pereira Barbosa para contato e compartilhamento em dispositivos móveis.";

export const metadata = {
  title: "Cartão profissional",
  description: cardDescription,
  alternates: hasPublicSiteUrl
    ? {
        canonical: publicAbsoluteUrl("/cartao"),
      }
    : undefined,
  openGraph: {
    type: "profile",
    locale: "pt_BR",
    title: `Cartão profissional — ${profile.name}`,
    description: cardDescription,
    url: hasPublicSiteUrl ? publicAbsoluteUrl("/cartao") : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: `Cartão profissional — ${profile.name}`,
    description: cardDescription,
  },
};

export default function CardPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#020817] text-slate-100">
      <Header menu={cardMenu} brandHref="/" contactHref="/#contato" />
      <VirtualCard
        displayAddress={displaySiteAddress("/cartao")}
        emailUrl={emailUrl}
        profile={profile}
        specializationAreas={specializationAreas}
        telephoneUrl={telephoneUrl}
        whatsappUrl={whatsappUrl}
      />
      <Footer />
    </main>
  );
}
