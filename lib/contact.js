export const CONTACT_TYPES = [
  "Capacitações",
  "Palestras ou mentorias",
  "Perícia na Prática",
  "Soluções digitais",
  "Outro",
];

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  subject: { min: 5, max: 150 },
  message: { min: 10, max: 4000 },
};

function clean(value) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim()
    : "";
}

function validLength(value, { min, max }) {
  return value.length >= min && value.length <= max;
}

export function validateContact(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { success: false, message: "Dados do formulário inválidos." };
  }

  const data = {
    name: clean(value.name),
    email: clean(value.email).toLowerCase(),
    subject: clean(value.subject),
    contactType: clean(value.contactType),
    message: clean(value.message),
    turnstileToken: clean(value.turnstileToken),
  };

  if (!validLength(data.name, CONTACT_LIMITS.name)) {
    return { success: false, field: "name", message: "Informe um nome entre 2 e 100 caracteres." };
  }
  if (data.email.length > CONTACT_LIMITS.email.max || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { success: false, field: "email", message: "Informe um e-mail válido." };
  }
  if (!validLength(data.subject, CONTACT_LIMITS.subject)) {
    return { success: false, field: "subject", message: "Informe um assunto entre 5 e 150 caracteres." };
  }
  if (!CONTACT_TYPES.includes(data.contactType)) {
    return { success: false, field: "contactType", message: "Selecione um tipo de contato." };
  }
  if (!validLength(data.message, CONTACT_LIMITS.message)) {
    return { success: false, field: "message", message: "A mensagem deve ter entre 10 e 4000 caracteres." };
  }
  if (!data.turnstileToken || data.turnstileToken.length > 2048) {
    return { success: false, field: "turnstileToken", message: "Conclua a verificação de segurança antes de enviar." };
  }
  return { success: true, data };
}

export function contactFormUrl({ subject, type } = {}) {
  const params = new URLSearchParams();
  if (typeof subject === "string" && subject.trim()) params.set("assunto", subject.trim().slice(0, CONTACT_LIMITS.subject.max));
  if (CONTACT_TYPES.includes(type)) params.set("tipo", type);
  return `/contato${params.size ? `?${params}` : ""}`;
}

export function contactPrefill(searchParams = {}) {
  const subject = clean(searchParams.assunto);
  const type = clean(searchParams.tipo);
  return {
    subject: subject.slice(0, CONTACT_LIMITS.subject.max),
    type: CONTACT_TYPES.includes(type) ? type : "",
  };
}
