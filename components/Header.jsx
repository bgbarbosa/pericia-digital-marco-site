"use client";

import { useEffect, useRef, useState } from "react";

export default function Header({
  menu,
  brandHref = "/",
  contactHref,
  contactLabel = "Falar sobre capacitação",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    const dialog = dialogRef.current;
    const trigger = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    firstLinkRef.current?.focus();
    const desktop = window.matchMedia("(min-width: 1280px)");
    const resize = () => {
      if (desktop.matches) setIsOpen(false);
    };
    desktop.addEventListener("change", resize);
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", resize);
      if (!desktop.matches) trigger?.focus();
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const keepFocus = (event) => {
    if (event.key !== "Tab") return;
    const items = [
      ...dialogRef.current.querySelectorAll("a[href], button:not([disabled])"),
    ];
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cyan-400/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-18 max-w-[1480px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 xl:px-10">
        <a
          href={brandHref}
          className="shrink-0 font-mono text-[15px] font-bold tracking-normal text-cyan-300 transition hover:text-cyan-200 focus-visible:outline-cyan-200 sm:text-base sm:tracking-normal"
          aria-label="Ir para o início"
        >
          Marco Barbosa
        </a>

        <nav
          className="hidden min-w-0 items-center gap-3 xl:flex 2xl:gap-5"
          aria-label="Navegação principal"
        >
          {menu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-semibold text-slate-300 transition hover:text-cyan-300 focus-visible:outline-cyan-200 2xl:text-base"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={contactHref}
          className="hidden min-h-11 items-center whitespace-nowrap rounded-2xl border border-cyan-400/35 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20 focus-visible:outline-cyan-200 xl:inline-flex 2xl:px-5 2xl:text-base"
        >
          {contactLabel}
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-2.5 text-cyan-100 transition hover:bg-cyan-400/20 focus-visible:outline-cyan-200 xl:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">
            {isOpen ? "Fechar menu" : "Abrir menu"}
          </span>
          <span aria-hidden="true" className="flex w-6 flex-col gap-1.5">
            <span
              className={`h-0.5 bg-current transition ${isOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 bg-current transition ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 bg-current transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <dialog
        onKeyDown={keepFocus}
        ref={dialogRef}
        id="mobile-menu"
        aria-label="Menu de navegação"
        onCancel={closeMenu}
        className="mobile-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
      >
        <div className="ml-auto flex min-h-full w-full max-w-sm flex-col border-l border-cyan-400/20 bg-slate-950 p-5 text-slate-100">
          <button
            className="action-secondary self-end"
            type="button"
            onClick={closeMenu}
          >
            Fechar menu
          </button>
          <nav
            aria-label="Navegação móvel"
            className="mt-5 flex flex-col gap-3"
          >
            {menu.map((item, index) => (
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="action-secondary justify-start"
              >
                {item.label}
              </a>
            ))}
            <a
              href={contactHref}
              onClick={closeMenu}
              className="action-primary"
            >
              {contactLabel}
            </a>
          </nav>
        </div>
      </dialog>
    </header>
  );
}
