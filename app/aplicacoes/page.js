import Image from "next/image";
import Link from "next/link";
import DetailPage from "@/components/DetailPage";
import { applicationTopics } from "@/data/applications";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Aplicações de IA e soluções digitais",
  "Duas frentes de trabalho: ferramentas orientadas por necessidades e o projeto autoral Dama Universe.",
  "/aplicacoes",
);

export default function Page() {
  return (
    <DetailPage
      title="Aplicações de IA e soluções digitais"
      intro="Tecnologia pode apoiar a organização, a análise e a execução de tarefas. O ponto de partida é compreender a necessidade e os limites do material disponível."
    >
      <section className="content-section">
        <h2>Explore as duas propostas</h2>
        <p>Os exemplos são didáticos: mostram possibilidades de aplicação, sem representar clientes, trabalhos contratados ou resultados assegurados.</p>
        <div className="application-grid">
          {applicationTopics.map((topic, index) => (
            <Link className="application-card" href={`/aplicacoes/${topic.slug}`} key={topic.slug}>
              <Image src={topic.image} alt={topic.imageAlt} width={720} height={440} unoptimized loading={index === 0 ? "eager" : "lazy"} sizes="(max-width: 767px) 100vw, 50vw" />
              <span className="application-card-body">
                <span className="application-card-title">{topic.title}</span>
                <span>{topic.description}</span>
                <span className="application-card-action" aria-hidden="true">Conhecer o tema →</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </DetailPage>
  );
}
