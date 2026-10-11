"use client";

import { useState } from "react";
import styles from "@/components/practice/Practice.module.css";

function copyWithSelection(email) {
  const previousFocus = document.activeElement;
  const field = document.createElement("textarea");
  field.value = email;
  field.readOnly = true;
  field.tabIndex = -1;
  field.setAttribute("aria-hidden", "true");
  field.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none";
  document.body.appendChild(field);
  try {
    field.focus({ preventScroll: true });
    field.select();
    if (!document.execCommand?.("copy")) throw new Error("Copy unavailable");
  } finally {
    field.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

export default function CopyEmailButton({ email }) {
  const [status, setStatus] = useState("");
  const [copying, setCopying] = useState(false);

  async function copyEmail() {
    if (copying) return;
    setCopying(true);
    setStatus("");
    try {
      try {
        if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(email);
      } catch {
        copyWithSelection(email);
      }
      setStatus("E-mail copiado.");
    } catch {
      setStatus("Não foi possível copiar. Selecione e copie o endereço exibido acima.");
    } finally {
      setCopying(false);
    }
  }

  return (
    <div className={styles.copyEmail}>
      <button className="action-secondary" type="button" onClick={copyEmail} aria-disabled={copying}>
        {copying ? "Copiando…" : "Copiar e-mail"}
      </button>
      <p className={styles.copyStatus} role="status" aria-live="polite" aria-atomic="true">{status}</p>
    </div>
  );
}
