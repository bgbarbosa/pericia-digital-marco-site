"use client";

import { useEffect, useRef, useState } from "react";

export default function Header({ menu, brandHref = "/", contactHref }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-400/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 max-w-[1480px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 xl:px-10">
        <a
          href={brandHref}
          className="font-mono text-[15px] font-bold tracking-[0.28em] text-cyan-300 transition hover:text-cyan-200 focus-visible:outline-none sm:text-base sm:tracking-[0.34em]"
          aria-label="Ir para o início"
        >
          M.A.P.B
        </a>

        <nav className="hidden items-center gap-5 xl:flex 2xl:gap-8" aria-label="Navegação principal">
          {menu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-semibold text-slate-300 transition hover:text-cyan-300 focus-visible:outline-none 2xl:text-base"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={contactHref}
          className="hidden min-h-11 items-center rounded-2xl border border-cyan-400/35 bg-cyan-400/10 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20 focus-visible:outline-none 2xl:inline-flex 2xl:text-base"
        >
          Contato profissional
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-2.5 text-cyan-100 transition hover:bg-cyan-400/20 focus-visible:outline-none xl:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">{isOpen ? "Fechar menu" : "Abrir menu"}</span>
          <span aria-hidden="true" className="flex w-6 flex-col gap-1.5">
            <span className={`h-0.5 bg-current transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 bg-current transition ${isOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 bg-current transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4.5rem)] xl:hidden"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-slate-950/75 backdrop-blur-sm"
            aria-label="Fechar menu ao tocar fora"
            onClick={closeMenu}
          />
          <nav
            className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto border-l border-cyan-400/15 bg-slate-950 p-5 shadow-2xl sm:p-6"
            aria-label="Navegação móvel"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Navegação
            </p>
            <div className="flex flex-col gap-2">
              {menu.map((item, index) => (
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-base font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 focus-visible:outline-none"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href={contactHref}
              onClick={closeMenu}
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-cyan-600 px-5 py-3 text-base font-semibold text-white transition hover:bg-cyan-500 focus-visible:outline-none"
            >
              Contato profissional
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
