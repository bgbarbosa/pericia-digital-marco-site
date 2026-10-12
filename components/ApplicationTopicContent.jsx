import { AiApplicationsSection, DigitalSolutionsSection } from "@/components/PositioningSections";
import { aiApplications, digitalSolutionPoints, profile } from "@/data/profile";

export function ToolDetail() {
  return (
    <>
      <section className="content-section editorial-copy">
        <h2>Entender antes de aplicar</h2>
        <p>Uma ferramenta útil começa com uma pergunta específica: qual tarefa precisa de apoio, quais entradas estão disponíveis e que resultado pode ser conferido? A resposta orienta o formato do fluxo, sem presumir que Inteligência Artificial seja necessária em todas as etapas.</p>
        <p>ChatGPT pode apoiar escrita, revisão, síntese e organização de ideias. Engenharia de prompts define objetivo, contexto e critérios para instruções mais claras. Análise de dados organiza e compara informações, sempre com atenção às fontes e ao que elas permitem afirmar.</p>
        <h3>Para quem pode ser útil</h3>
        <p>Profissionais e equipes que precisam organizar documentos autorizados, revisar textos, comparar dados ou reduzir tarefas repetitivas podem estudar um fluxo sob medida. O escopo depende da finalidade, do material e das regras aplicáveis.</p>
        <h3>Exemplos didáticos</h3>
        <ul className="editorial-list">
          <li><strong>Escrita e síntese:</strong> resumir um texto público com critérios definidos e confrontar cada afirmação com o original.</li>
          <li><strong>Organização documental:</strong> criar um índice com título, data e fonte, preservando os arquivos originais.</li>
          <li><strong>Dados e planejamento:</strong> estruturar uma tabela, conferir filtros e cálculos e revisar hipóteses antes de decidir.</li>
          <li><strong>Automação:</strong> testar em uma amostra uma regra repetitiva, como padronizar nomes de cópias, antes de ampliar o uso.</li>
        </ul>
        <h3>Processo e limites</h3>
        <p>O trabalho começa com recorte da necessidade, identificação das fontes e critérios de validação. Seguem protótipo, teste com dados adequados e revisão humana. A disponibilidade, o escopo e a forma de desenvolvimento dependem de alinhamento prévio.</p>
        <p>GPTs personalizados são configurações do ChatGPT para finalidades específicas. Sua disponibilidade depende da plataforma; dados sensíveis exigem avaliação própria antes de qualquer uso. Uma saída automática não substitui verificação da fonte nem decisão profissional.</p>
      </section>
      <AiApplicationsSection applications={aiApplications} />
      <DigitalSolutionsSection points={digitalSolutionPoints} />
    </>
  );
}

export function DamaDetail() {
  return (
    <section className="content-section editorial-copy">
      <h2>Um projeto autoral em evolução</h2>
      <p>O Dama Universe é um projeto autoral de Marco Barbosa. Conforme a apresentação do próprio projeto, reúne e documenta programas, ferramentas digitais, GPTs personalizados, conteúdos técnicos, referências e registros de desenvolvimento.</p>
      <p>O espaço aborda organização de informações, inteligência artificial, análise de dados, automação e produtividade. A página do projeto funciona como central para acompanhar materiais publicados e sua evolução; cada programa ou conteúdo tem escopo próprio.</p>
      <h3>Para quem pode ser útil</h3>
      <p>Visitantes interessados em conhecer os projetos e consultar conteúdos podem usar a central para localizar um tema e seguir para a página específica antes de avaliar sua pertinência.</p>
      <h3>Um caminho de leitura</h3>
      <ol className="editorial-list">
        <li>Identifique o programa, GPT ou conteúdo de interesse no catálogo.</li>
        <li>Leia a descrição, os requisitos e os limites publicados para esse item.</li>
        <li>Consulte as referências e atualizações, quando disponibilizadas, antes de decidir como utilizá-lo.</li>
      </ol>
      <h3>Alcance e cuidado</h3>
      <p>A existência de um item no catálogo não indica disponibilidade universal, adequação a qualquer caso, contratação ou resultado assegurado. Não se devem inserir senhas, documentos restritos ou dados pessoais de terceiros sem avaliação e autorização apropriadas.</p>
      <p>O projeto é pessoal. Sua autoria não representa endosso de órgão público, associação ou entidade à qual Marco esteja vinculado.</p>
      <a className="action-secondary" href={profile.damaUniverse} target="_blank" rel="noopener noreferrer">Visitar Dama Universe ↗</a>
    </section>
  );
}
