import Image from "next/image";
import DetailPage from "@/components/DetailPage";
import { ImageDemonstrations } from "@/components/ApprovedContent";
import { imageDemonstrations, verifiedTrainingTopics } from "@/data/public-content";
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
      <section className="content-section course-overview">
        <div>
          <p className="course-eyebrow">Formação complementar · concluída em agosto de 2026</p>
          <h2>Além da aparência</h2>
          <p className="course-lead">
            Examinar uma imagem ou um vídeo começa por perguntas sobre <strong>origem,
            contexto e arquivo disponível</strong>. A aparência pode orientar a análise,
            mas não basta para afirmar como o conteúdo foi produzido.
          </p>
        </div>
        <dl className="course-facts" aria-label="Dados confirmados da formação">
          <div><dt>Carga horária</dt><dd>20 horas</dd></div>
          <div><dt>Conclusão</dt><dd>Agosto de 2026</dd></div>
        </dl>
      </section>

      <section className="content-section course-reading">
        <div className="course-copy">
          <p className="course-eyebrow">01 · Conceitos</p>
          <h2>Conteúdo sintético e conteúdo alterado</h2>
          <p>
            Conteúdo sintético é produzido por sistemas computacionais. Conteúdo
            alterado parte de um registro preexistente que sofreu alguma mudança.
            A distinção ajuda a formular perguntas; ela não classifica, por si,
            um arquivo específico.
          </p>
        </div>
        <figure className="course-figure">
          <Image
            src="/formacao/sintetico-e-alterado.svg"
            alt="Diagrama conceitual: um caminho produz imagem sintética por sistema computacional; outro modifica um registro preexistente"
            width={640}
            height={760}
            unoptimized
            loading="eager"
            sizes="(max-width: 767px) 100vw, 640px"
          />
          <figcaption>Ilustração conceitual original. Não representa arquivo, ocorrência ou prova de caso real.</figcaption>
        </figure>
        <p className="course-highlight">
          Uma aparência estranha, isoladamente, não comprova geração por IA,
          manipulação ou autoria.
        </p>
      </section>

      <section className="content-section course-reading">
        <div className="course-copy">
          <p className="course-eyebrow">02 · Método</p>
          <h2>Perguntas antes de conclusões</h2>
          <p>
            O exame busca compreender a origem e as possíveis transformações do
            conteúdo. Importam o contexto da circulação, o arquivo realmente
            disponível e a comparação com outras fontes. O que não pode ser
            verificado também deve aparecer na conclusão.
          </p>
        </div>
        <figure className="course-figure">
          <Image
            src="/formacao/fluxo-analise-visual.svg"
            alt="Fluxo de análise conceitual: origem, contexto, arquivo disponível, comparação e conclusão limitada"
            width={640}
            height={840}
            unoptimized
            loading="eager"
            sizes="(max-width: 767px) 100vw, 640px"
          />
          <figcaption>Fluxo editorial ilustrativo. Cada etapa depende do material acessível e não descreve uma perícia realizada.</figcaption>
        </figure>
        <p>
          O NIST descreve frentes técnicas para transparência de conteúdo digital,
          como rastrear procedência, identificar conteúdo sintético, usar marcações
          e testar ferramentas. <a className="text-link" href="https://www.nist.gov/publications/reducing-risks-posed-synthetic-content-overview-technical-approaches-digital-content" target="_blank" rel="noopener noreferrer">Fonte: NIST AI 100-4 — resumo da publicação ↗</a>
        </p>
      </section>

      <section className="content-section course-examples">
        <div className="course-copy">
          <p className="course-eyebrow">Situações hipotéticas</p>
          <h2>Como as perguntas mudam a leitura</h2>
          <p>Os exemplos abaixo são didáticos e fictícios. Não são casos atendidos, trabalhos de Marco, disciplinas comprovadas ou demonstrações periciais aprovadas.</p>
        </div>
        <div className="course-example-grid">
          <article className="course-example">
            <p className="course-example-label">Exemplo didático fictício 1</p>
            <h3>Imagem com legenda sobre um evento</h3>
            <p>Uma publicação hipotética atribui a um evento a imagem de uma multidão. Antes de avaliar a alegação, perguntaríamos onde a imagem apareceu primeiro, quem publicou a legenda, qual é a data e se existe o arquivo em melhor qualidade.</p>
            <p>Outras imagens ou registros do mesmo evento poderiam oferecer comparação. Compressão, recorte ou iluminação incomum podem alterar a aparência; nenhum desses sinais, sozinho, prova geração por IA ou autoria.</p>
          </article>
          <article className="course-example">
            <p className="course-example-label">Exemplo didático fictício 2</p>
            <h3>Vídeo curto sem a sequência completa</h3>
            <p>Um trecho hipotético circula sem a gravação original. A análise perguntaria de onde veio, se há a sequência integral, quais arquivos estão disponíveis e se outras fontes confirmam o contexto.</p>
            <p>Sem esses elementos, pode ser impossível avaliar edições ou a relação entre imagem e áudio. A conclusão deve registrar o que foi observado e o que continua incerto.</p>
          </article>
        </div>
      </section>

      {verifiedTrainingTopics.length > 0 && (
        <section className="content-section">
          <h2>Conteúdos estudados</h2>
          <ul>{verifiedTrainingTopics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
        </section>
      )}
      <ImageDemonstrations entries={imageDemonstrations} />

      <section className="content-section course-limits">
        <h2>Limites das observações e técnicas</h2>
        <p>Um indício visual ou resultado de ferramenta não deve ser tratado isoladamente como comprovação de geração por IA, manipulação ou autoria. As conclusões dependem do material disponível, dos métodos e da verificação de hipóteses alternativas.</p>
        <p>A formação integra o repertório técnico complementar de Marco em investigação, perícia digital e computação forense. Não representa promessa de detecção infalível, identificação automática de autoria ou resultado judicial.</p>
      </section>
    </DetailPage>
  );
}
