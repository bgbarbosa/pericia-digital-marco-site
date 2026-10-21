import Image from "next/image";
import { DamaDetail, ToolDetail } from "@/components/ApplicationTopicContent";
import DetailPage from "@/components/DetailPage";
import { applicationTopics } from "@/data/applications";
import { pageMetadata } from "@/lib/page-metadata";
import SelectedDamaTools from "@/components/SelectedDamaTools";

export const metadata = pageMetadata(
  "Aplicações de IA e soluções digitais",
  "Duas frentes de trabalho: ferramentas orientadas por necessidades e o projeto autoral Dama Universe.",
  "/aplicacoes",
);

export default function Page() {
  return (
    <DetailPage
      title="Aplicações de IA e soluções digitais"
      intro="Convido você a conhecer o Dama Universe, site que criei para apresentar aplicações de inteligência artificial e soluções digitais. Ali, projetos, ferramentas e conteúdos mostram possibilidades de uso da tecnologia a partir de necessidades concretas."
    >
      <section className="content-section">
        <SelectedDamaTools />
        <div className="application-intro">
          <h2>Explore as propostas</h2>
          <p>Abra os cards para conhecer cada tema. Os exemplos são didáticos: mostram possibilidades de aplicação, sem representar clientes, trabalhos contratados ou resultados assegurados.</p>
        </div>
        <div className="application-grid">
          {applicationTopics.map((topic, index) => (
            <details className="application-card" key={topic.slug}>
              <summary aria-controls={`${topic.slug}-conteudo`}>
                <Image src={topic.image} alt={topic.imageAlt} width={720} height={440} unoptimized loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 767px) 100vw, 50vw" />
                <span className="application-card-body">
                  <span className="application-card-title">{topic.title}</span>
                  <span>{topic.description}</span>
                  <span className="application-card-action" aria-hidden="true">
                    <span className="when-closed">Conhecer o tema ↓</span>
                    <span className="when-open">Recolher conteúdo ↑</span>
                  </span>
                </span>
              </summary>
              <div id={`${topic.slug}-conteudo`} className="application-card-content">
                {topic.slug === "dama-universe" ? <DamaDetail /> : <ToolDetail />}
              </div>
            </details>
          ))}
        </div>
      </section>
    </DetailPage>
  );
}
