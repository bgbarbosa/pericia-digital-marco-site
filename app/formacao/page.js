import Link from "next/link";
import DetailPage from "@/components/DetailPage";
import {
  academicFormation,
  credentials,
  profile,
  featuredTraining,
} from "@/data/profile";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Formação e credenciais",
  "Graduação, pós-graduações e cursos complementares de Marco Barbosa.",
  "/formacao",
);
export default function Page() {
  return (
    <DetailPage
      title="Formação e credenciais"
      intro="A formação reúne Administração, Inteligência Artificial, análise de dados e conhecimentos complementares em investigação e tecnologia forense."
    >
      <section className="content-section">
        <h2>Graduação, pós-graduações e especialização</h2>
        <ul className="detail-grid" aria-label="Formação acadêmica">
          {academicFormation.map((item) => (
            <li className="detail-panel" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="content-section">
        <h2>Cursos e formação complementar</h2>
        <ul className="space-y-4">
          {credentials.slice(2, -1).map((item) => (
            <li className="detail-panel" key={item}>
              {item}
            </li>
          ))}
        </ul>
        <Link className="text-link" href={featuredTraining.href}>
          Aprofundar: {featuredTraining.title} →
        </Link>
      </section>
      <section className="content-section">
        <h2>Vínculo associativo e currículo</h2>
        <p>{profile.association.statement}</p>
        <a
          className="text-link"
          href={profile.lattes}
          target="_blank"
          rel="noopener noreferrer"
        >
          Consultar Currículo Lattes ↗
        </a>
      </section>
    </DetailPage>
  );
}
