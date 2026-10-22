import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ featuredTraining, profile }) {
  return (
    <section id="inicio" className="hero-section border-b border-white/10">
      <div className="hero-grid site-container">
        <div className="hero-intro">
          <h1 className="hero-title font-bold text-white">
            {profile.heroTitle}
          </h1>
          <p className="hero-subtitle mt-4 text-base text-slate-300 sm:text-lg">
            {profile.subtitle}
          </p>
          <p className="hero-audience">{profile.heroAudience}</p>
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
        <div className="hero-actions" role="group" aria-label="Acessos profissionais">
          <Link className="hero-action-card hero-action-card-primary" href="/contato">
            Entrar em contato
          </Link>
          <a
            className="hero-action-card"
            href={profile.lattes}
            target="_blank"
            rel="noopener noreferrer"
          >
            Currículo Lattes <span aria-hidden="true">↗</span>
          </a>
          <Link className="hero-action-card" href="/cartao">
            Abrir cartão virtual <span aria-hidden="true">→</span>
          </Link>
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
