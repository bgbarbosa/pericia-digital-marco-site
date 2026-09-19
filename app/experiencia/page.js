import DetailPage from "@/components/DetailPage";
import { KnowledgeAreasSection } from "@/components/ProfessionalSections";
import { knowledgeAreas, emphasisPoints } from "@/data/profile";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Experiência e conhecimentos",
  "Investigação, análise técnica, documentação e tecnologia na trajetória de Marco Barbosa.",
  "/experiencia",
);
export default function Page() {
  return (
    <DetailPage
      title="Experiência e conhecimentos"
      intro="Mais de 12 anos de experiência em investigação, análise técnica, documentação e organização de informações."
    >
      <section className="content-section">
        <h2>Trajetória profissional</h2>
        <p>
          Marco Aurélio Pereira Barbosa atua como Investigador da Polícia Civil
          do Mato Grosso do Sul. O vínculo é uma informação curricular; este
          site apresenta sua atuação pessoal, educacional e tecnológica.
        </p>
        <p>
          A experiência com documentação e leitura crítica de informações se
          relaciona ao trabalho com capacitações, conteúdos e projetos digitais.
          Não são divulgados casos, operações ou informações restritas.
        </p>
      </section>
      <KnowledgeAreasSection areas={knowledgeAreas} />
      <section className="content-section">
        <h2>Entender os campos técnicos</h2>
        <p>
          Perícia digital examina vestígios eletrônicos por meio de
          procedimentos documentados. A computação forense aplica métodos
          computacionais a esse exame. OSINT é a investigação com fontes
          abertas: disponibilidade pública não dispensa avaliação de contexto,
          origem e confiabilidade.
        </p>
        <p>
          Como exemplo didático, organizar uma sequência de documentos e
          registrar suas fontes ajuda a comparar informações. Isso não
          determina, por si só, autoria ou responsabilidade.
        </p>
        <h3>Limites do exame</h3>
        <p>
          A revisão científica do NIST destaca que nem todo vestígio pode ser
          encontrado e que o significado de artefatos pode mudar com as versões
          dos programas. Recuperação de dados não é garantida.
        </p>
        <a
          className="text-link"
          href="https://www.nist.gov/publications/digital-investigation-techniques-nist-scientific-foundation-review"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fonte: NISTIR 8354 — resumo da publicação ↗
        </a>
      </section>
      <section className="content-section">
        <h2>Forma de trabalho</h2>
        <ul className="detail-grid">
          {emphasisPoints.map((item) => (
            <li className="detail-panel" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </DetailPage>
  );
}
