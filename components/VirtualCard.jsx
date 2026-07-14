import Image from "next/image";

import Panel from "@/components/Panel";
import ShareCardActions from "@/components/ShareCardActions";

export default function VirtualCard({
  displayAddress,
  emailUrl,
  profile,
  specializationAreas,
  telephoneUrl,
  whatsappUrl,
}) {
  return (
    <section className="relative mx-auto w-full max-w-5xl px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
      <div className="absolute left-1/2 top-24 h-72 w-72 max-w-full -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <Panel className="relative overflow-hidden border-cyan-400/15 bg-slate-950/80 p-0 sm:p-0 md:p-0 xl:p-0">
        <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative min-h-[390px] overflow-hidden border-b border-white/10 lg:min-h-[680px] lg:border-b-0 lg:border-r">
            <Image
              src={profile.image}
              alt={`Retrato profissional de ${profile.name}`}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 430px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-cyan-950/15" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Cartão profissional digital
              </p>
              <p className="mt-2 text-sm text-slate-300">{displayAddress}</p>
            </div>
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300 sm:text-sm">
              Perícia digital e tecnologia forense
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-lg font-medium leading-8 text-cyan-200 sm:text-xl">
              {profile.title}
            </p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2" aria-label="Principais áreas de atuação">
              {specializationAreas.slice(0, 4).map((area) => (
                <li
                  key={area.title}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-slate-200"
                >
                  {area.title}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
              <div>
                <p className="text-sm font-semibold text-white">{profile.association.acronym}</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  {profile.association.name}
                </p>
              </div>
              <div className="relative h-20 w-20 justify-self-center overflow-hidden rounded-full bg-white sm:justify-self-end">
                <Image
                  src={profile.association.image}
                  alt={`Logotipo da ${profile.association.acronym}`}
                  fill
                  className="object-contain p-2"
                  sizes="80px"
                />
              </div>
            </div>

            <div className="mt-7">
              <ShareCardActions
                emailUrl={emailUrl}
                profileName={profile.name}
                telephoneUrl={telephoneUrl}
                whatsappUrl={whatsappUrl}
              />
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
                <h2 className="text-lg font-semibold text-white">Aponte a câmera do celular</h2>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  O QR Code abre este cartão na URL configurada para o site ou, durante os
                  testes, no endereço atual.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </section>
  );
}
