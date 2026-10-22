import BrandLogo from "@/components/BrandLogo";

export default function Footer({ showProfileLink = true }) {
  return (
    <footer className="border-t border-white/10 px-4 py-8 text-center text-sm text-slate-400 sm:text-[15px] xl:text-base">
      <div className="mb-5 flex flex-col items-center gap-1">
        <BrandLogo placement="footer" />
        {showProfileLink && <a className="text-link" href="/perfil">Perfil e currículo</a>}
      </div>
      <p>
        © 2026 Marco Aurélio Pereira Barbosa <span aria-hidden="true">•</span> Inteligência
        Artificial, capacitação e soluções digitais
      </p>
      <p className="mx-auto mt-4 max-w-5xl text-xs leading-6 text-slate-400 sm:text-sm sm:leading-7">
        Site profissional de caráter pessoal, educacional e tecnológico. As opiniões,
        conteúdos e projetos apresentados não constituem manifestação institucional nem
        representam órgão público, associação profissional ou entidade à qual o titular
        esteja vinculado.
      </p>
      <a
        href="/cartao"
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2 font-semibold text-cyan-300 transition hover:bg-cyan-400/10 hover:text-cyan-200 focus-visible:outline-cyan-200"
      >
        Abrir cartão virtual
      </a>
    </footer>
  );
}
