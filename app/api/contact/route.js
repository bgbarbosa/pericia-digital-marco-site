import { validateContact } from "@/lib/contact";

export const runtime = "nodejs";

const TIMEOUT_MS = 8_000;
const MAX_BODY_BYTES = 12_000;
const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function reply(message, status, field) {
  return Response.json({ message, ...(field ? { field } : {}) }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function configuredEndpoint() {
  const raw = process.env.CONTACT_FORM_ENDPOINT?.trim();
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.hostname !== "formspree.io" || !/^\/f\/[A-Za-z0-9]+$/.test(url.pathname) || url.search || url.hash) return null;
    return url.href;
  } catch {
    return null;
  }
}

async function postWithTimeout(url, body, headers) {
  return fetch(url, {
    method: "POST",
    body,
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

export async function POST(request) {
  const origin = request.headers.get("origin");
  const publicUrl = new URL(request.url);
  publicUrl.host = request.headers.get("host") || publicUrl.host;
  const forwardedProtocol = request.headers.get("x-forwarded-proto");
  if (forwardedProtocol === "http" || forwardedProtocol === "https") {
    publicUrl.protocol = `${forwardedProtocol}:`;
  }
  if (origin && origin !== publicUrl.origin) {
    return reply("Origem do envio inválida.", 403);
  }
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return reply("Origem do envio inválida.", 403);
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return reply("Envie os dados em JSON.", 415);
  }
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    return reply("Mensagem acima do limite permitido.", 413);
  }

  let input;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) return reply("Mensagem acima do limite permitido.", 413);
    input = JSON.parse(body);
  } catch {
    return reply("Não foi possível interpretar os dados enviados.", 400);
  }

  const validation = validateContact(input);
  if (!validation.success) return reply(validation.message, 400, validation.field);

  const endpoint = configuredEndpoint();
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!endpoint || !secret) {
    return reply("O formulário está temporariamente indisponível. Use o WhatsApp para entrar em contato.", 503);
  }

  const { data } = validation;
  try {
    const verifyBody = new URLSearchParams({ secret, response: data.turnstileToken });
    const verificationResponse = await postWithTimeout(VERIFY_URL, verifyBody, { "Content-Type": "application/x-www-form-urlencoded" });
    if (!verificationResponse.ok) return reply("Não foi possível verificar a segurança do envio. Tente novamente.", 502, "turnstileToken");
    const verification = await verificationResponse.json();
    if (!verification.success || (verification.hostname && verification.hostname !== publicUrl.hostname)) {
      return reply("A verificação de segurança expirou ou foi recusada. Tente novamente.", 403, "turnstileToken");
    }

    const form = new FormData();
    form.set("name", data.name);
    form.set("email", data.email);
    form.set("_replyto", data.email);
    form.set("subject", data.subject);
    form.set("contactType", data.contactType);
    form.set("message", data.message);
    form.set("_subject", `Contato profissional: ${data.subject}`);
    const providerResponse = await postWithTimeout(endpoint, form, { Accept: "application/json" });
    if (providerResponse.status === 429) {
      return reply("O limite de envios foi atingido. Seu texto foi mantido; tente novamente mais tarde.", 429);
    }
    if (!providerResponse.ok) {
      return reply("O serviço não aceitou a mensagem. O texto foi mantido; tente novamente mais tarde.", 502);
    }
    return reply("O serviço confirmou o envio da mensagem. O recebimento na caixa postal ainda não foi verificado.", 200);
  } catch (error) {
    const timeout = error?.name === "TimeoutError" || error?.name === "AbortError";
    return reply(timeout
      ? "O serviço demorou para responder. Seu texto foi mantido; tente novamente."
      : "Não foi possível enviar agora. Seu texto foi mantido; tente novamente.", timeout ? 504 : 502);
  }
}
