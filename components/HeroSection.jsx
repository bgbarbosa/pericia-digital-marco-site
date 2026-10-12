import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ featuredTraining, profile }) {
  return (
    <section id="inicio" className="hero-section border-b border-white/10">
      <div className="hero-grid site-container">
        <div className="hero-intro">
          <p className="text-lg font-semibold text-cyan-200">
            {profile.displayName}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {profile.heroTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            {profile.subtitle}
          </p>
        </div>
        <div className="hero-portrait relative mx-auto overflow-hidden rounded-[2rem] border border-cyan-300/25">
          <Image
            src={profile.image}
            alt={`Retrato profissional de ${profile.name}`}
            fill
            preload
            className="object-contain"
            sizes="(max-width: 767px) 320px, (max-width: 1023px) 35vw, 420px"
          />
        </div>
        <div className="hero-actions">
          <div className="flex flex-wrap gap-3">
            <a className="action-primary" href="#capacitacoes">
              Conhecer capacitações
            </a>
            <a className="action-secondary" href="/contato">
              Entrar em contato
            </a>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
            <a
              className="text-link"
              href={profile.lattes}
              target="_blank"
              rel="noopener noreferrer"
            >
              Currículo Lattes ↗
            </a>
            <Link className="text-link" href="/cartao">
              Abrir cartão virtual →
            </Link>
          </div>
        </div>
        {featuredTraining && (
          <Link
            href={featuredTraining.href}
            aria-label={`${featuredTraining.label}: ${featuredTraining.title}`}
            className="hero-featured featured-training-card linked-panel flex items-center gap-4"
          >
            <span className="featured-training-badge flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-slate-950">
              {featuredTraining.workload}
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-200">
                {featuredTraining.label} →
              </p>
              <p className="mt-1 font-semibold text-white">
                {featuredTraining.title}
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {featuredTraining.completion}
              </p>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
