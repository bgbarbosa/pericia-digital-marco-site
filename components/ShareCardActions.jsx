"use client";

import { useState } from "react";
import Link from "next/link";

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

export default function ShareCardActions({
  emailUrl,
  profileName,
  telephoneUrl,
  whatsappUrl,
}) {
  const [status, setStatus] = useState("");

  const copyCardUrl = async (message = "Link do cartão copiado.") => {
    await copyText(window.location.href);
    setStatus(message);
  };

  const shareCard = async () => {
    const shareData = {
      title: `Cartão profissional — ${profileName}`,
      text: "Cartão profissional de perícia digital e computação forense.",
      url: window.location.href,
    };

    if (!navigator.share) {
      await copyCardUrl("Compartilhamento não disponível. Link copiado.");
      return;
    }

    try {
      await navigator.share(shareData);
      setStatus("Cartão compartilhado.");
    } catch (error) {
      if (error?.name !== "AbortError") {
        await copyCardUrl("Não foi possível abrir o compartilhamento. Link copiado.");
      }
    }
  };

  const buttonClass =
    "inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-slate-100 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 focus-visible:outline-none sm:text-base";

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/" className={`${buttonClass} bg-cyan-600 hover:bg-cyan-500`}>
          Acessar site principal
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          Conversar pelo WhatsApp
        </a>
        <a href={telephoneUrl} className={buttonClass}>
          Ligar
        </a>
        <a href={emailUrl} className={buttonClass}>
          Enviar e-mail
        </a>
        <a
          href="/cartao/contato.vcf"
          download
          className={buttonClass}
          data-testid="download-vcf"
        >
          Salvar contato (.vcf)
        </a>
        <button type="button" onClick={shareCard} className={buttonClass} data-testid="share-card">
          Compartilhar cartão
        </button>
        <button type="button" onClick={() => copyCardUrl()} className={buttonClass} data-testid="copy-card">
          Copiar endereço do cartão
        </button>
        <a
          href="/cartao/opengraph-image"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          data-testid="open-card-image"
        >
          Abrir imagem do cartão
        </a>
      </div>
      <p
        className="mt-4 min-h-6 text-center text-sm font-medium text-cyan-200"
        role="status"
        aria-live="polite"
        data-testid="share-status"
      >
        {status}
      </p>
    </div>
  );
}
