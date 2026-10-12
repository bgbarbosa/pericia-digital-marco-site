import Link from "next/link";
import Image from "next/image";

import Panel from "@/components/Panel";
import ShareCardActions from "@/components/ShareCardActions";

export default function VirtualCard({
  displayAddress,
  profile,
  telephoneUrl,
  virtualCardAreas,
  virtualCardForensics,
  whatsappUrl,
}) {
  return (
    <section className="relative mx-auto w-full max-w-5xl px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
      <div className="absolute left-1/2 top-24 h-72 w-72 max-w-full -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <Panel className="relative overflow-hidden border-cyan-400/15 bg-slate-950/80 p-0 sm:p-0 md:p-0 xl:p-0">
        <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
          <div className="mx-auto mt-5 w-[240px] max-w-full self-start overflow-hidden rounded-2xl border border-white/10 lg:mx-5 lg:mt-8 lg:w-auto">
            <div className="relative aspect-[3/2]">
              <Image
                src={profile.image}
                alt={`Retrato profissional de ${profile.name}`}
                fill
                preload
                className="object-contain"
                sizes="(max-width: 1023px) 240px, 335px"
              />
            </div>
            <div className="hidden p-5 lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Cartão profissional digital
              </p>
              <p className="mt-2 text-sm text-slate-300">{displayAddress}</p>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-sm">
              Inteligência Artificial aplicada
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-base font-medium leading-7 text-cyan-200 sm:text-lg">
              {profile.title}
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="action-primary mt-4 w-full"
            >
              Conversar pelo WhatsApp {profile.phone.display}
            </a>
            <a
              href="/contato"
              data-testid="card-email-address"
              className="mt-4 inline-flex max-w-full flex-col rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] focus-visible:outline-cyan-200 sm:flex-row sm:items-center sm:gap-2"
            >
              <span className="font-semibold text-cyan-300">
                E-mail profissional:
              </span>
              <span className="break-all text-slate-200">{profile.email}</span>
            </a>

            <div className="mt-7">
              <ShareCardActions
                contactHref="/contato"
                profileName={profile.name}
                telephoneUrl={telephoneUrl}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                className="text-link"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <a
                className="text-link"
                href={profile.damaUniverse}
                target="_blank"
                rel="noopener noreferrer"
              >
                Dama Universe ↗
              </a>
              <Link className="text-link" href="/">
                Acessar site principal →
              </Link>
            </div>
            <ul
              className="mt-6 grid gap-2 sm:grid-cols-2"
              aria-label="Principais áreas profissionais"
            >
              {virtualCardAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-slate-200"
                >
                  {area}
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.06] p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                Experiência e formação técnica
              </p>
              <h2 className="mt-2 text-lg font-semibold leading-7 text-cyan-100 sm:text-lg">
                {virtualCardForensics.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {virtualCardForensics.text}
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.04] p-5 text-center sm:flex-row sm:text-left">
              <Image
                src="/cartao/qr-code"
                alt="QR Code para abrir este cartão profissional"
                width={150}
                height={150}
                unoptimized
                className="h-[150px] w-[150px] rounded-xl bg-white p-2"
                data-testid="qr-code"
              />
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Aponte a câmera do celular
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Use a câmera do celular para abrir e guardar este cartão
                  profissional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </section>
  );
}
