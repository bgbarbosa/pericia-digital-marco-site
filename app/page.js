import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CredentialsAffiliations from "@/components/CredentialsAffiliations";
import FormationExperience from "@/components/FormationExperience";
import PracticeCallout from "@/components/practice/PracticeCallout";
import { CapacitySection } from "@/components/PositioningSections";
import { TrajectoryEvents } from "@/components/ApprovedContent";
import { trajectoryEntries } from "@/data/public-content";
import { approvedTrajectory } from "@/lib/public-content";
import {
  capacityModalities,
  featuredTraining,
  heroHighlights,
  homeMenu,
  profile,
  telephoneUrl,
  whatsappUrl,
} from "@/data/profile";

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
      <Header menu={menu} brandHref="#inicio" contactHref="/contato" contactLabel="Contato" />
      <HeroSection
        featuredTraining={featuredTraining}
        highlights={heroHighlights}
        profile={profile}
      />
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
      <Footer />
    </main>
  );
}
