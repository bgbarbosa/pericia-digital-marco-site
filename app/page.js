import Image from "next/image";
import Link from "next/link";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
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
    <main className="min-h-screen bg-[#020817] text-slate-100">
      <Header menu={menu} brandHref="#inicio" contactHref="#contato" />
      <HeroSection
        featuredTraining={featuredTraining}
        highlights={heroHighlights}
        profile={profile}
      />
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
        <div className="detail-grid">
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
            <div className="mt-5 flex flex-col items-center rounded-[1.6rem] border border-white/10 bg-slate-900/60 p-5 text-center sm:p-6 xl:p-7">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border border-white/10 bg-slate-950 sm:h-36 sm:w-36 xl:h-40 xl:w-40">
                <Image
                  src={profile.association.image}
                  alt={`Logotipo da ${profile.association.acronym}`}
                  fill
                  className="object-contain p-3"
                  sizes="160px"
                />
              </div>
              <p className="mt-4 text-xl font-semibold text-white sm:text-[1.35rem] xl:text-[1.45rem]">
                {profile.association.acronym}
              </p>
              <p className="mt-2 max-w-md text-base leading-8 text-slate-300 xl:text-[1.1rem] xl:leading-9">
                {profile.association.statement}
              </p>
            </div>
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
