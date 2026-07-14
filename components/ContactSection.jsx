import Panel from "@/components/Panel";
import SectionTitle from "@/components/SectionTitle";

export default function ContactSection({ emailUrl, profile, telephoneUrl, whatsappUrl }) {
  return (
    <section id="contato" className="scroll-mt-24 pb-16 pt-10 sm:pb-18 md:pb-20">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <SectionTitle>Contato</SectionTitle>
        <div className="mt-8 grid gap-4 sm:mt-9 sm:gap-6 md:grid-cols-3 xl:gap-7">
          <Panel>
            <h3 className="text-2xl font-semibold text-cyan-300 xl:text-[2.1rem]">
              Base profissional
            </h3>
            <p className="mt-5 text-base leading-8 text-slate-300 xl:text-[1.12rem] xl:leading-9">
              {profile.city}
              <br />
              Contato profissional para informações institucionais, acadêmicas e técnicas.
            </p>
          </Panel>

          <Panel>
            <h3 className="text-2xl font-semibold text-cyan-300 xl:text-[2.1rem]">
              WhatsApp e telefone
            </h3>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-center font-semibold text-white transition hover:bg-cyan-400/20 focus-visible:outline-none"
              >
                WhatsApp {profile.phone.display}
              </a>
              <a
                href={telephoneUrl}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-center font-semibold text-slate-200 transition hover:bg-white/5 focus-visible:outline-none"
              >
                Ligar
              </a>
            </div>
          </Panel>

          <Panel>
            <h3 className="text-2xl font-semibold text-cyan-300 xl:text-[2.1rem]">
              E-mail
            </h3>
            <a
              href={emailUrl}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center break-all rounded-xl border border-white/10 px-4 py-3 text-center font-semibold text-white transition hover:bg-white/5 hover:text-cyan-300 focus-visible:outline-none"
            >
              {profile.email}
            </a>
          </Panel>
        </div>
      </div>
    </section>
  );
}
