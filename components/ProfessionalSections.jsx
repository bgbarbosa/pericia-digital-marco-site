import Image from "next/image";

import Panel from "@/components/Panel";
import SectionTitle from "@/components/SectionTitle";

export function DigitalForensicsSection() {
  return (
    <section id="pericia-digital" className="relative scroll-mt-24 py-14 sm:py-16 md:py-18">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.06),transparent_45%)]" />
      <div className="relative mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <SectionTitle>O que é Perícia Digital?</SectionTitle>
        <Panel className="mt-8 sm:mt-9 md:p-10 xl:p-11">
          <div className="border-l-4 border-cyan-400 pl-4 text-base leading-8 text-slate-300 sm:pl-6 sm:text-lg sm:leading-9 xl:text-[1.24rem] xl:leading-10">
            <p>
              A perícia digital é a aplicação de método técnico para identificar,
              preservar, organizar e analisar vestígios eletrônicos com potencial de
              relevância em contextos judiciais, administrativos e investigativos.
            </p>
            <p className="mt-4">
              No contexto da computação forense e da análise de dispositivos eletrônicos,
              o trabalho envolve atenção à integridade dos dados, à cadeia de custódia, à
              rastreabilidade das etapas executadas e à leitura técnica do material examinado.
            </p>
          </div>
        </Panel>
      </div>
    </section>
  );
}

export function SpecializationSection({ areas }) {
  return (
    <section id="especializacao" className="scroll-mt-24 pb-14 sm:pb-16 md:pb-18">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <SectionTitle>Áreas de Especialização</SectionTitle>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-7">
          {areas.map((item) => (
            <Panel
              as="article"
              key={item.title}
              className="transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.045]"
            >
              <h3 className="text-xl font-semibold leading-snug text-cyan-300 sm:text-2xl xl:text-[1.82rem]">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-300 xl:text-[1.1rem] xl:leading-9">
                {item.text}
              </p>
            </Panel>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrajectorySection({ profile }) {
  return (
    <section id="trajetoria" className="scroll-mt-24 py-14 sm:py-16 md:py-18">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <SectionTitle>Trajetória Profissional</SectionTitle>
        <Panel className="mt-8 sm:mt-9 md:p-10 xl:p-11">
          <div className="border-l-4 border-cyan-400 pl-4 sm:pl-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-sm xl:text-base">
              Apresentação profissional
            </p>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg sm:leading-9 xl:text-[1.2rem] xl:leading-10">
              <strong className="text-white">{profile.name}</strong> atua na área de
              investigação, análise de dados e tecnologia forense, com experiência prática em
              evidências digitais, cadeia de custódia e documentação técnica.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg sm:leading-9 xl:text-[1.2rem] xl:leading-10">
              Possui mais de 12 anos de experiência em investigação, análise técnica,
              documentação de vestígios e organização de elementos probatórios em contextos
              que exigem método, cadeia de custódia e rigor técnico.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg sm:leading-9 xl:text-[1.2rem] xl:leading-10">
              Sua trajetória reúne experiência prática e formação complementar em análise de
              dados, inteligência artificial, perícia digital e computação forense, com ênfase
              em método, clareza e rigor técnico.
            </p>
          </div>
        </Panel>
      </div>
    </section>
  );
}

export function CredentialsSection({ credentials, emphasisPoints, profile }) {
  return (
    <section id="credenciais" className="scroll-mt-24 py-14 sm:py-16 md:py-18">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <SectionTitle>Credenciais</SectionTitle>
        <Panel className="mt-8 sm:mt-9 md:p-10 xl:p-11">
          <div className="flex flex-wrap gap-3 text-sm leading-7 text-slate-200 sm:gap-4 sm:text-base xl:gap-5">
            {emphasisPoints.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-slate-900/70 px-4 py-2.5 sm:px-5 sm:py-3 xl:px-6 xl:py-3.5"
              >
                <span aria-hidden="true">✓</span> {item}
              </span>
            ))}
          </div>
        </Panel>

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:gap-7">
          <Panel>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300 xl:text-base">
              Formação e experiência
            </h3>
            <ul className="mt-5 space-y-3 text-base leading-7 text-slate-300 sm:space-y-4">
              {credentials.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3.5 sm:px-5 sm:py-4 xl:text-[1.03rem] xl:leading-8"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300 xl:text-base">
              {profile.association.acronym}
            </h3>
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
                {profile.association.name}, apresentada no site como referência institucional de
                vinculação profissional.
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </section>
  );
}
