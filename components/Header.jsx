"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import BrandLogo from "@/components/BrandLogo";

export default function Header({
  menu,
  contactHref,
  contactLabel = "Falar sobre capacitação",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const firstLinkRef = useRef(null);
  const dialogRef = useRef(null);
  const externalContact = /^https?:\/\//.test(contactHref ?? "");
  const navigationItems = menu.filter((item) => item.label !== contactLabel);

  useEffect(() => {
    if (!isOpen) return undefined;
    const dialog = dialogRef.current;
    const trigger = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    firstLinkRef.current?.focus();
    const triggerIsVisible = () => trigger && getComputedStyle(trigger).display !== "none";
    const resize = new ResizeObserver(() => {
      if (!triggerIsVisible()) setIsOpen(false);
    });
    resize.observe(trigger);
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      resize.disconnect();
      if (triggerIsVisible()) trigger.focus();
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
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-cyan-400/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="site-container header-inner">
        <BrandLogo placement="header" />

        <nav
          className="header-navigation"
          aria-label="Navegação principal"
        >
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="header-nav-link font-semibold text-slate-300 transition hover:text-cyan-300 focus-visible:outline-cyan-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cross-link header-ecosystem-card" href={profile.damaUniverse} target="_blank" rel="noopener noreferrer">Dama Universe <span aria-hidden="true">↗︎</span></a>

        <a
          href={contactHref}
          target={externalContact ? "_blank" : undefined}
          rel={externalContact ? "noopener noreferrer" : undefined}
          className="header-contact action-secondary border-cyan-400/35 bg-cyan-400/10 text-cyan-100 transition hover:bg-cyan-400/20 focus-visible:outline-cyan-200"
        >
          {contactLabel}
        </a>

        <button
          ref={menuButtonRef}
          type="button"
          className="header-menu-button min-h-11 min-w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-2.5 text-cyan-100 transition hover:bg-cyan-400/20 focus-visible:outline-cyan-200"
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
            {navigationItems.map((item, index) => (
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
              href={profile.damaUniverse}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="header-ecosystem-card self-start"
            >Dama Universe <span aria-hidden="true">↗︎</span></a>
            <a
              href={contactHref}
              target={externalContact ? "_blank" : undefined}
              rel={externalContact ? "noopener noreferrer" : undefined}
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
