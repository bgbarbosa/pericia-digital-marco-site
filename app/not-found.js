import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020817] px-4 text-slate-100">
      <div className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Erro 404</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Página não encontrada</h1>
        <p className="mt-4 leading-7 text-slate-300">
          O endereço informado não corresponde a uma página disponível neste site.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500 focus-visible:outline-none"
        >
          Voltar ao início
        </Link>
      </div>
    </main>
  );
}
