import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JsonLd from "@/components/JsonLd";
import CredentialsAffiliations from "@/components/CredentialsAffiliations";
import FormationExperience from "@/components/FormationExperience";
import PracticeCallout from "@/components/practice/PracticeCallout";
import ForensicsHomeSection from "@/components/forensics/ForensicsHomeSection";
import { CapacitySection } from "@/components/PositioningSections";
import { TrajectoryEvents } from "@/components/ApprovedContent";
import { trajectoryEntries } from "@/data/public-content";
import { approvedTrajectory } from "@/lib/public-content";
import { publicAbsoluteUrl } from "@/lib/site-url";
import {
  capacityModalities,
  featuredTraining,
  homeMenu,
  profile,
  telephoneUrl,
  whatsappUrl,
} from "@/data/profile";

const homeTitle = "Marco Barbosa | Computação forense, análise de dados e IA";
const homeDescription =
  "Conheça a trajetória e a produção de Marco Barbosa, em Campo Grande/MS, em computação forense, análise de dados e inteligência artificial aplicada.";
const homeUrl = publicAbsoluteUrl("/");

export const metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: profile.displayName,
    title: homeTitle,
    description: homeDescription,
    url: homeUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};
const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${homeUrl}#website`,
  url: homeUrl,
  name: profile.displayName,
  alternateName: profile.name,
};

export default function HomePage() {
  const menu = approvedTrajectory(trajectoryEntries).length
    ? [
        ...homeMenu.slice(0, -1),
        { label: "Atuação", href: "#trajetoria-atuacao" },
        homeMenu.at(-1),
      ]
    : homeMenu;
  return (
    <main className="home-page min-h-screen bg-[#020817] text-slate-100">
      <JsonLd data={website} />
      <Header menu={menu} contactHref="/contato" contactLabel="Contato" />
      <HeroSection
        featuredTraining={featuredTraining}
        profile={profile}
      />
      <ForensicsHomeSection />
      <PracticeCallout />
      <CapacitySection modalities={capacityModalities} />
      <TrajectoryEvents entries={trajectoryEntries} />
      <section id="sobre" className="content-section">
        <h2>Formação e experiência</h2>
        <p>
          <strong>{profile.name}</strong> reúne formação em Inteligência
          Artificial e análise de dados, com mais de 12 anos de experiência em
          investigação e análise técnica. Seu vínculo como Investigador da
          Polícia Civil do Mato Grosso do Sul é apresentado exclusivamente como
          informação curricular.
        </p>
        <FormationExperience />
        <CredentialsAffiliations profile={profile} />
      </section>
      <ContactSection
        profile={profile}
        telephoneUrl={telephoneUrl}
        whatsappUrl={whatsappUrl}
      />
      <Footer showProfileLink={false} />
    </main>
  );
}
