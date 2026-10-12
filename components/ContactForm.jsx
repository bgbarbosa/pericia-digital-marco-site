"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { CONTACT_LIMITS, CONTACT_TYPES, validateContact } from "@/lib/contact";

const inputClass = "w-full min-w-0 rounded-xl border border-white/20 bg-slate-950 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/30";

export default function ContactForm({ initialSubject = "", initialType = "", siteKey = "" }) {
  const formRef = useRef(null);
  const widgetContainerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const [fieldError, setFieldError] = useState(null);
  const [widgetError, setWidgetError] = useState(false);

  useEffect(() => () => {
    if (widgetIdRef.current !== null && window.turnstile?.remove) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }
  }, []);

  function renderWidget() {
    if (!siteKey || !widgetContainerRef.current || !window.turnstile?.render || widgetIdRef.current !== null) return;
    widgetIdRef.current = window.turnstile.render(widgetContainerRef.current, {
      sitekey: siteKey,
      theme: "dark",
      size: "flexible",
      callback: (value) => { setToken(value); setWidgetError(false); },
      "expired-callback": () => setToken(""),
      "error-callback": () => { setToken(""); setWidgetError(true); },
    });
  }

  function resetWidget() {
    setToken("");
    if (widgetIdRef.current !== null) window.turnstile?.reset?.(widgetIdRef.current);
  }

  function errorProps(field) {
    return {
      "aria-invalid": fieldError?.field === field || undefined,
      "aria-describedby": fieldError?.field === field ? `contact-error-${field}` : undefined,
    };
  }

  function errorMessage(field) {
    return fieldError?.field === field
      ? <span id={`contact-error-${field}`} className="block text-sm text-rose-200">{fieldError.message}</span>
      : null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const validation = validateContact({
      name: values.get("name"),
      email: values.get("email"),
      subject: values.get("subject"),
      contactType: values.get("contactType"),
      message: values.get("message"),
      turnstileToken: token,
    });

    if (!validation.success) {
      setStatus("error");
      setFeedback(validation.message);
      setFieldError(validation);
      if (validation.field && validation.field !== "turnstileToken") {
        form.elements.namedItem(validation.field)?.focus();
      }
      return;
    }

    setStatus("sending");
    setFeedback("");
    setFieldError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        setStatus("error");
        setFeedback(result?.message || "O envio falhou. Seu texto foi mantido; tente novamente.");
        setFieldError(result?.field ? { field: result.field, message: result.message } : null);
        resetWidget();
        return;
      }
      form.reset();
      setStatus("success");
      setFeedback(result?.message || "O serviço confirmou o envio da mensagem. O recebimento na caixa postal ainda não foi verificado.");
      resetWidget();
    } catch {
      setStatus("error");
      setFeedback("Falha de conexão. Seu texto foi mantido; tente novamente.");
      resetWidget();
    }
  }

  return (
    <div className="contact-form-card" id="formulario">
      <h2>Escreva sua mensagem</h2>
      <p>Preencha os cinco campos abaixo. O envio não cria cadastro.</p>
      <form ref={formRef} noValidate onSubmit={handleSubmit} aria-busy={status === "sending"} className="contact-form">
        <div className="contact-form-grid">
          <label>
            <span>Nome</span>
            <input className={inputClass} name="name" type="text" autoComplete="name" minLength={CONTACT_LIMITS.name.min} maxLength={CONTACT_LIMITS.name.max} required {...errorProps("name")} />
            {errorMessage("name")}
          </label>
          <label>
            <span>E-mail</span>
            <input className={inputClass} name="email" type="email" autoComplete="email" maxLength={CONTACT_LIMITS.email.max} required {...errorProps("email")} />
            {errorMessage("email")}
          </label>
          <label>
            <span>Assunto</span>
            <input className={inputClass} name="subject" type="text" defaultValue={initialSubject} minLength={CONTACT_LIMITS.subject.min} maxLength={CONTACT_LIMITS.subject.max} required {...errorProps("subject")} />
            {errorMessage("subject")}
          </label>
          <label>
            <span>Tipo de contato</span>
            <select className={inputClass} name="contactType" defaultValue={initialType} required {...errorProps("contactType")}>
              <option value="">Selecione uma opção</option>
              {CONTACT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
            </select>
            {errorMessage("contactType")}
          </label>
        </div>
        <label>
          <span>Mensagem</span>
          <textarea className={inputClass} name="message" rows={7} minLength={CONTACT_LIMITS.message.min} maxLength={CONTACT_LIMITS.message.max} required {...errorProps("message")} />
          {errorMessage("message")}
        </label>
        <p className="contact-form-notice">Não envie senhas, documentos sigilosos ou informações restritas.</p>
        {siteKey ? (
          <>
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={renderWidget} onError={() => setWidgetError(true)} />
            <div ref={widgetContainerRef} className="contact-turnstile" aria-label="Verificação de segurança" />
            {widgetError ? <p role="alert" className="text-sm text-rose-200">A verificação de segurança não carregou. Atualize a página e tente novamente.</p> : null}
            {errorMessage("turnstileToken")}
          </>
        ) : <p className="text-sm text-amber-200" role="status">O envio pelo formulário aguarda configuração. Use o WhatsApp disponível nesta página.</p>}
        {status === "sending" ? <p role="status">Enviando mensagem. Aguarde a confirmação do serviço.</p> : null}
        {feedback ? <p role="status" aria-live="polite" className={status === "success" ? "contact-feedback-success" : "contact-feedback-error"}>{feedback}</p> : null}
        <button className="action-primary" type="submit" disabled={status === "sending" || !siteKey}>
          {status === "sending" ? "Enviando..." : "Enviar mensagem"}
        </button>
      </form>
    </div>
  );
}
