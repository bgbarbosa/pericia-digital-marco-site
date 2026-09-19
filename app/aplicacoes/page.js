import DetailPage from "@/components/DetailPage";
import {
  AiApplicationsSection,
  DigitalSolutionsSection,
} from "@/components/PositioningSections";
import { aiApplications, digitalSolutionPoints } from "@/data/profile";
import { pageMetadata } from "@/lib/page-metadata";
export const metadata = pageMetadata(
  "Aplicações de IA e soluções digitais",
  "ChatGPT, prompts, análise de dados, organização documental e automação na prática profissional.",
  "/aplicacoes",
);
export default function Page() {
  return (
    <DetailPage
      title="Aplicações de IA e soluções digitais"
      intro="Marco trabalha com capacitações e projetos que aproximam ferramentas digitais das necessidades de profissionais e equipes."
    >
      <section className="content-section">
        <h2>Entender antes de aplicar</h2>
        <p>
          Inteligência Artificial reúne técnicas para realizar tarefas como
          reconhecer padrões e gerar conteúdo. ChatGPT é uma ferramenta de IA
          com interação por linguagem: pode apoiar a escrita e a organização de
          ideias, mas suas respostas precisam ser conferidas.
        </p>
        <p>
          Engenharia de prompts é a elaboração de instruções com objetivo,
          contexto e critérios claros. Análise de dados envolve organizar,
          comparar e interpretar informações; exige atenção às fontes e ao que
          elas realmente permitem afirmar.
        </p>
        <h3>GPTs personalizados</h3>
        <p>
          São configurações do ChatGPT para uma finalidade específica,
          combinando instruções, conhecimento e recursos. Um exemplo didático é
          orientar a revisão de textos por critérios definidos. A
          disponibilidade desses recursos depende da plataforma e deve ser
          conferida antes de planejar sua adoção.
        </p>
        <a
          className="text-link"
          href="https://help.openai.com/en/articles/8554407-gpts-faq"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fonte: OpenAI — GPTs no ChatGPT ↗
        </a>
      </section>
      <AiApplicationsSection applications={aiApplications} />
      <section className="content-section" id="exemplos">
        <h2>Exemplos didáticos</h2>
        <p>
          As situações abaixo ilustram usos possíveis. Não representam clientes,
          trabalhos executados ou resultados obtidos por Marco.
        </p>
        <div className="detail-grid">
          <article className="detail-panel">
            <h3>Escrita, revisão e síntese</h3>
            <p>
              Solicitar uma síntese de um texto público, indicar o público
              leitor e conferir cada afirmação contra o original. Um prompt pode
              definir extensão, tom e formato de saída.
            </p>
          </article>
          <article className="detail-panel">
            <h3>Organização documental</h3>
            <p>
              Criar um índice de documentos autorizados com título, data e
              fonte, preservando os originais. O índice facilita localizar
              informações; não substitui a leitura das fontes.
            </p>
          </article>
          <article className="detail-panel">
            <h3>Planejamento e análise de dados</h3>
            <p>
              Organizar etapas de uma atividade em uma tabela, comparar valores
              e revisar cálculos e hipóteses antes de tomar decisões.
            </p>
          </article>
          <article className="detail-panel">
            <h3>Automação e ferramentas</h3>
            <p>
              Automatizar uma tarefa repetitiva com regras verificáveis, como
              padronizar nomes de cópias de arquivos. Testar em uma amostra e
              prever revisão humana antes de ampliar o uso.
            </p>
          </article>
        </div>
      </section>
      <DigitalSolutionsSection points={digitalSolutionPoints} />
    </DetailPage>
  );
}
