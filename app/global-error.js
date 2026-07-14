"use client";

export default function GlobalError({ reset }) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-slate-100">
        <main className="flex min-h-screen items-center justify-center px-4">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Erro inesperado
            </p>
            <h1 className="mt-3 text-4xl font-bold text-white">Não foi possível exibir a página</h1>
            <p className="mt-4 leading-7 text-slate-300">
              Tente novamente. Se o problema persistir, use os canais de contato do site.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500 focus-visible:outline-none"
            >
              Tentar novamente
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
