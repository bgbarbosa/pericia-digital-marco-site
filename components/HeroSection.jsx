import Image from "next/image";

export default function HeroSection({ profile }) {
  return (
    <section
      id="inicio"
      className="relative scroll-mt-24 overflow-hidden border-b border-white/10 pt-18"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12),transparent_42%),linear-gradient(90deg,rgba(2,6,23,1),rgba(3,16,37,0.98),rgba(2,6,23,1))]" />
      <div className="absolute left-1/2 top-12 h-[360px] w-[360px] max-w-full -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl sm:h-[420px] sm:w-[420px]" />

      <div className="relative mx-auto max-w-[1480px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 xl:px-10 xl:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.16fr_0.84fr] lg:items-center xl:gap-12">
          <div className="max-w-[920px] text-center lg:text-left">
            <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 sm:px-5 sm:text-base xl:text-[1.05rem]">
              {profile.name}
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-[1.02] text-white sm:text-5xl md:text-6xl xl:text-[4.7rem]">
              {profile.title}
            </h1>

            <p className="mx-auto mt-5 max-w-[860px] text-xl font-medium leading-snug text-cyan-300 sm:text-2xl lg:mx-0 xl:text-[2.15rem]">
              {profile.subtitle}
            </p>

            <p className="mx-auto mt-6 max-w-[900px] text-base leading-8 text-slate-300 sm:text-lg sm:leading-9 lg:mx-0 xl:text-[1.2rem] xl:leading-10">
              {profile.introduction}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4 lg:justify-start">
              <a
                href={profile.lattes}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-cyan-600 px-7 py-3.5 text-base font-semibold text-white shadow-[0_0_30px_rgba(8,145,178,0.25)] transition hover:bg-cyan-500 focus-visible:outline-none"
              >
                Currículo Lattes
              </a>
              <a
                href="#contato"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/15 px-7 py-3.5 text-base font-semibold text-slate-100 transition hover:bg-white/5 focus-visible:outline-none"
              >
                Contato profissional
              </a>
              <a
                href="/cartao"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/5 px-7 py-3.5 text-base font-semibold text-cyan-100 transition hover:bg-cyan-400/10 focus-visible:outline-none"
              >
                Abrir cartão virtual
              </a>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-3 sm:gap-4 xl:gap-5">
              {[
                ["Área", "Perícia Digital e Computação Forense"],
                ["Ênfase", "Cadeia de custódia e análise técnica"],
                ["Trajetória", "Investigação, documentação e evidências digitais"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur xl:p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300 sm:text-[13px] xl:text-sm">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200 sm:text-base sm:leading-7 xl:text-[1.05rem]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[410px] w-full max-w-[360px] overflow-hidden rounded-[1.7rem] border border-cyan-400/15 bg-gradient-to-b from-white/10 to-white/5 shadow-[0_0_50px_rgba(8,145,178,0.12)] sm:h-[500px] sm:max-w-[420px] md:rounded-[2rem] xl:h-[580px] xl:max-w-[470px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_42%)]" />
              <Image
                src={profile.image}
                alt={`Retrato profissional de ${profile.name}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 420px, 470px"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent sm:h-44" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
