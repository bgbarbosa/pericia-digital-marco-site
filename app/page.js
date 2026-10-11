import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CredentialsAffiliations from "@/components/CredentialsAffiliations";
import PracticeCallout from "@/components/practice/PracticeCallout";
import { CapacitySection } from "@/components/PositioningSections";
import { TrajectoryEvents } from "@/components/ApprovedContent";
import { trajectoryEntries } from "@/data/public-content";
import { approvedTrajectory } from "@/lib/public-content";
import {
  capacityModalities,
  emailUrl,
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
      <Header menu={menu} brandHref="#inicio" contactHref="#contato" />
      <HeroSection
        featuredTraining={featuredTraining}
        highlights={heroHighlights}
        profile={profile}
      />
      <PracticeCallout />
      <CapacitySection modalities={capacityModalities} />
      <section id="aplicacoes-ia" className="content-section">
        <h2>Aplicações de IA e soluções digitais</h2>
        <p>
          Escrita, revisão, síntese, planejamento e análise de dados: a
          tecnologia pode apoiar tarefas profissionais com conferência humana e
          organização das fontes.
        </p>
        <div id="solucoes-digitais" className="detail-grid">
          <article className="detail-panel">
            <h3>Da necessidade à ferramenta</h3>
            <p>
              Projetos, automações e soluções digitais personalizadas com
              Python, tecnologias web e recursos de Inteligência Artificial,
              conforme o contexto de cada trabalho.
            </p>
            <Link className="text-link" href="/aplicacoes">
              Conhecer aplicações e exemplos →
            </Link>
          </article>
          <article className="detail-panel">
            <h3>Projeto autoral Dama Universe</h3>
            <p>
              Dama Universe é um projeto autoral de Marco Barbosa relacionado à
              organização de informações e a soluções digitais.
            </p>
            <a
              className="text-link"
              href={profile.damaUniverse}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conhecer Dama Universe ↗
            </a>
          </article>
        </div>
      </section>
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
        <div className="detail-grid credentials-layout">
          <article className="detail-panel">
            <h3>Formação e credenciais</h3>
            <p>
              Pós-graduado em Inteligência Artificial e em Análise de Dados;
              graduado em Administração. A formação complementar inclui perícia
              digital e computação forense.
            </p>
            <Link className="text-link" href="/formacao">
              Consultar formação completa →
            </Link>
          </article>
          <article id="conhecimentos" className="detail-panel">
            <h3>Forma de trabalho</h3>
            <p>
              Rigor, clareza, método, documentação e rastreabilidade orientam a
              organização das informações e a leitura técnica. A investigação e
              a tecnologia forense integram esse repertório complementar.
            </p>
            <Link className="text-link" href="/experiencia">
              Conhecer experiência e conhecimentos →
            </Link>
          </article>
        </div>
        <CredentialsAffiliations profile={profile} />
      </section>
      <ContactSection
        emailUrl={emailUrl}
        profile={profile}
        telephoneUrl={telephoneUrl}
        whatsappUrl={whatsappUrl}
      />
      <Footer />
    </main>
  );
}
