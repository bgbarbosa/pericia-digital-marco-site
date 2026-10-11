import Panel from "@/components/Panel";
import SectionTitle from "@/components/SectionTitle";

export default function ContactSection({
  emailUrl,
  profile,
  telephoneUrl,
  whatsappUrl,
}) {
  return (
    <section
      id="contato"
      className="home-section home-contact"
    >
      <div className="site-container">
        <SectionTitle>Contato</SectionTitle>
        <p className="mx-auto mt-5 max-w-4xl text-center text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
          Entre em contato para solicitar informações sobre capacitações,
          conversar sobre uma palestra ou mentoria, ou apresentar uma
          necessidade relacionada a soluções digitais. A disponibilidade, o
          formato e o escopo são definidos mediante alinhamento prévio.
        </p>
        <div className="contact-grid">
          <Panel className="home-card">
            <h3 className="text-2xl font-semibold text-cyan-300 xl:text-[2.1rem]">
              Base profissional
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-300 xl:text-[1.12rem] xl:leading-9">
              {profile.city}, com contato para informações sobre conteúdos,
              capacitações e projetos tecnológicos.
            </p>
          </Panel>

          <Panel className="home-card">
            <h3 className="text-2xl font-semibold text-cyan-300 xl:text-[2.1rem]">
              WhatsApp e telefone
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-center font-semibold text-white transition hover:bg-cyan-400/20 focus-visible:outline-cyan-200"
              >
                WhatsApp {profile.phone.display}
              </a>
              <a
                href={telephoneUrl}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-center font-semibold text-slate-200 transition hover:bg-white/5 focus-visible:outline-cyan-200"
              >
                Ligar
              </a>
            </div>
          </Panel>

          <Panel className="home-card">
            <h3 className="text-2xl font-semibold text-cyan-300 xl:text-[2.1rem]">
              E-mail
            </h3>
            <a
              href={emailUrl}
              className="contact-email mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-center font-semibold text-white transition hover:bg-white/5 hover:text-cyan-300 focus-visible:outline-cyan-200"
            >
              {profile.email}
            </a>
          </Panel>
        </div>
        <div className="contact-links">
          <a
            className="text-link"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn profissional ↗
          </a>
          <a
            className="text-link"
            href={profile.damaUniverse}
            target="_blank"
            rel="noopener noreferrer"
          >
            Dama Universe ↗
          </a>
        </div>
      </div>
    </section>
  );
}
