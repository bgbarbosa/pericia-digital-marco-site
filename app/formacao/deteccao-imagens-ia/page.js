import DetailPage from "@/components/DetailPage";
import { ImageDemonstrations } from "@/components/ApprovedContent";
import {
  imageDemonstrations,
  verifiedTrainingTopics,
} from "@/data/public-content";
import { featuredTraining } from "@/data/profile";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  featuredTraining.title,
  "Formação de 20 horas concluída em agosto de 2026 e introdução aos limites da análise de imagens e vídeos sintéticos.",
  featuredTraining.href,
);
export default function Page() {
  return (
    <DetailPage
      title={featuredTraining.title}
      intro="Formação complementar de Marco Barbosa no campo da análise de conteúdo visual sintético e manipulado."
    >
      <section className="content-section">
        <h2>O que é esse campo de análise</h2>
        <p>
          O exame de imagens e vídeos busca compreender sua origem e possíveis
          transformações. Conteúdo sintético é produzido por sistemas
          computacionais; conteúdo manipulado pode partir de um registro real
          que foi alterado.
        </p>
        <h3>Por que exige atenção</h3>
        <p>
          A aparência convincente de uma imagem não esclarece, sozinha, como ela
          foi produzida. É necessário considerar a origem, o contexto e os
          procedimentos usados no exame, evitando conclusões baseadas apenas na
          impressão visual.
        </p>
        <p>
          O NIST apresenta diferentes frentes para a transparência de conteúdo
          digital: rastrear a procedência, identificar conteúdo sintético, usar
          marcações e testar ferramentas.
        </p>
        <a
          className="text-link"
          href="https://www.nist.gov/publications/reducing-risks-posed-synthetic-content-overview-technical-approaches-digital-content"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fonte: NIST AI 100-4 — resumo da publicação ↗
        </a>
      </section>
      <section className="content-section">
        <h2>Dados da formação</h2>
        <dl className="detail-grid">
          <div className="detail-panel">
            <dt>Carga horária</dt>
            <dd className="text-xl font-semibold text-cyan-200">20 horas</dd>
          </div>
          <div className="detail-panel">
            <dt>Conclusão</dt>
            <dd className="text-xl font-semibold text-cyan-200">
              Agosto de 2026
            </dd>
          </div>
        </dl>
        <p>
          Essa formação integra o repertório técnico complementar de Marco em
          investigação, perícia digital e computação forense.
        </p>
      </section>
      {verifiedTrainingTopics.length > 0 && (
        <section className="content-section">
          <h2>Conteúdos estudados</h2>
          <ul>
            {verifiedTrainingTopics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </section>
      )}
      <ImageDemonstrations entries={imageDemonstrations} />
      <section className="content-section">
        <h2>Limitações das observações e técnicas</h2>
        <p>
          Um indício visual ou resultado de ferramenta não deve ser tratado
          isoladamente como comprovação de geração por IA, manipulação ou
          autoria. As conclusões dependem do material disponível, dos métodos e
          da verificação de hipóteses alternativas.
        </p>
        <p>
          A formação não representa promessa de detecção infalível,
          identificação automática de autoria ou resultado judicial.
        </p>
      </section>
    </DetailPage>
  );
}
