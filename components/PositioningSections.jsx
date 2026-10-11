import Link from "next/link";
import Panel from "@/components/Panel";
import SectionTitle from "@/components/SectionTitle";

const sectionContainer =
  "mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10";
const cardClass = "home-card";

function EditorialCards({ items }) {
  return (
    <div className="editorial-grid mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 xl:gap-7">
      {items.map((item) => (
        <Panel as="article" key={item.title} className={cardClass}>
          <h3 className="text-xl font-semibold leading-snug text-cyan-300 sm:text-2xl xl:text-[1.7rem]">
            {item.title}
          </h3>
          <p className="mt-4 text-base leading-8 text-slate-300 xl:text-[1.08rem] xl:leading-9">
            {item.text}
          </p>
        </Panel>
      ))}
    </div>
  );
}

export function CapacitySection({ modalities }) {
  return (
    <section id="capacitacoes" className="home-section">
      <div className="site-container">
        <SectionTitle>Capacitações em Inteligência Artificial</SectionTitle>
        <p className="mx-auto mt-5 max-w-5xl text-center text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
          Modalidades de capacitação organizadas de acordo com o público, o contexto de
          aplicação e os objetivos de aprendizagem. Os temas, formatos e a disponibilidade
          são definidos mediante alinhamento prévio.
        </p>
        <EditorialCards items={modalities} />
        <div className="section-action">
          <Link
            href="/#contato"
            className="action-primary"
          >
            Solicitar informações sobre capacitações
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AiApplicationsSection({ applications }) {
  return (
    <section
      id="aplicacoes-ia"
      className="relative scroll-mt-24 py-14 sm:py-16 md:py-18"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.06),transparent_45%)]" />
      <div className={`relative ${sectionContainer}`}>
        <SectionTitle>Temas e aplicações da Inteligência Artificial</SectionTitle>
        <p className="mx-auto mt-5 max-w-5xl text-center text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
          Conteúdos voltados à compreensão e à aplicação prática da Inteligência
          Artificial em atividades profissionais, com atenção à clareza, à verificação das
          informações e ao uso responsável da tecnologia.
        </p>
        <EditorialCards items={applications} />
      </div>
    </section>
  );
}

export function DigitalSolutionsSection({ points }) {
  return (
    <section
      id="solucoes-digitais"
      className="scroll-mt-24 py-14 sm:py-16 md:py-18"
    >
      <div className={sectionContainer}>
        <SectionTitle>Soluções digitais personalizadas</SectionTitle>
        <div className="mx-auto mt-5 max-w-5xl text-center text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
          <p>
            Desenvolvimento de ferramentas, automações, protótipos e sistemas sob medida,
            utilizando Python, tecnologias web e recursos de Inteligência Artificial,
            conforme as necessidades e os objetivos de cada projeto.
          </p>
          <p className="mt-4">
            Cada necessidade é analisada individualmente para definição de possibilidades
            técnicas, escopo e forma de desenvolvimento, sem promessa prévia de prazo ou
            resultado.
          </p>
        </div>
        <EditorialCards items={points} />
        <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-7 text-slate-400">
          Disponibilidade e escopo sujeitos a alinhamento prévio e à validação institucional
          aplicável.
        </p>
        <div className="mt-7 text-center">
          <Link
            href="/#contato"
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-7 py-3.5 text-base font-semibold text-cyan-100 transition hover:bg-cyan-400/20 focus-visible:outline-cyan-200"
          >
            Apresentar uma necessidade
          </Link>
        </div>
      </div>
    </section>
  );
}
