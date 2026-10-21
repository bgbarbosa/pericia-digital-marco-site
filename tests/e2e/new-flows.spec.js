import { expect, test } from "@playwright/test";
import { applicationTopics } from "../../data/applications";
import { profile } from "../../data/profile";

const origin = "http://127.0.0.1:3100";

async function mockTurnstile(page) {
  await page.route("https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: `window.turnstile = {
        render(_element, options) { this.options = options; options.callback("local-test-token"); return 0; },
        reset() { this.options.callback("local-test-token"); },
        remove() {}
      };`,
    }),
  );
}

test("aplicações convidam ao Dama Universe e os cartões abrem e recolhem", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const menu = page.getByRole("navigation", { name: "Navegação principal" });
  await expect(menu.getByRole("link", { name: "Formação" })).toHaveCount(0);
  await expect(menu.getByRole("link", { name: "Experiência" })).toHaveCount(0);
  await expect(menu.getByRole("link", { name: "Aplicações de IA" })).toHaveAttribute("href", "/aplicacoes");
  await expect(page.locator("#aplicacoes-ia, #solucoes-digitais")).toHaveCount(0);
  await menu.getByRole("link", { name: "Aplicações de IA" }).click();
  await expect(page).toHaveURL(`${origin}/aplicacoes`);
  await expect(page.locator(".detail-heading")).toContainText("site que criei");
  await expect(page.getByRole("region", { name: "Projetos e ferramentas autorais" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Conhecer o projeto", exact: true })).toHaveAttribute("href", `${profile.damaUniverse}/programas/dama-gestor-rh`);
  await expect(page.getByRole("link", { name: "Conhecer o assistente", exact: true })).toHaveAttribute("href", `${profile.damaUniverse}/gpts#especialista-em-escrita-e-revisao`);
  for (const topic of applicationTopics) {
    const card = page.locator(".application-card").filter({ has: page.getByText(topic.title, { exact: true }) });
    await expect(card).toBeVisible();
    await expect(card.getByRole("img")).toHaveAttribute("alt", topic.imageAlt);
    await expect(card).not.toHaveAttribute("open", "");
    await card.locator("summary").click({ position: { x: 12, y: 12 } });
    await expect(card).toHaveAttribute("open", "");
    await expect(card.locator(".application-card-content h2").first()).toBeVisible();
    await expect(page).toHaveURL(`${origin}/aplicacoes`);
    await card.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(card).not.toHaveAttribute("open", "");
    await page.goto(`/aplicacoes/${topic.slug}`);
    await expect(page).toHaveURL(`${origin}/aplicacoes/${topic.slug}`);
    await expect(page.locator("h1")).toHaveText(topic.title);
    const backLink = page.getByRole("link", { name: "← Voltar a Aplicações de IA" });
    await expect(backLink).toHaveCount(1);
    await expect(page.getByRole("link", { name: "← Voltar à página inicial" })).toHaveCount(0);
    await backLink.click();
    await expect(page).toHaveURL(`${origin}/aplicacoes`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator(".application-card").first().locator("summary").click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect((await page.goto("/aplicacoes/tema-inexistente")).status()).toBe(404);
});

test("cartões de formação e experiência abrem por mouse, teclado e link direto", async ({ page }) => {
  await page.goto("/");
  const formation = page.locator("#formacao-card");
  const experience = page.locator("#experiencia-card");
  await expect(formation).not.toHaveAttribute("open", "");
  await formation.locator("summary").click();
  await expect(formation).toHaveAttribute("open", "");
  await expect(formation.getByRole("link", { name: /Aprofundar:/ })).toHaveAttribute("href", "/formacao/deteccao-imagens-ia");
  await formation.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(formation).not.toHaveAttribute("open", "");
  await experience.locator("summary").focus();
  await page.keyboard.press("Space");
  await expect(experience).toHaveAttribute("open", "");
  await page.goto("/#formacao-card");
  await expect(page).toHaveURL(`${origin}/#formacao-card`);
  await expect(formation).toHaveAttribute("open", "");
  const oldFormation = await page.request.get("/formacao", { maxRedirects: 0 });
  expect(oldFormation.status()).toBe(308);
  expect(oldFormation.headers().location).toBe("/#formacao-card");
  const oldExperience = await page.request.get("/experiencia", { maxRedirects: 0 });
  expect(oldExperience.status()).toBe(308);
  expect(oldExperience.headers().location).toBe("/#experiencia-card");
});

test("links de contato e prefiltro do artigo apontam para o formulário", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".contact-email")).toHaveAttribute("href", "/contato");
  await expect(page.locator(".contact-email")).toContainText(profile.email);
  await page.goto("/cartao");
  await expect(page.getByTestId("card-email-address")).toHaveAttribute("href", "/contato");
  await expect(page.getByRole("link", { name: "Enviar e-mail", exact: true })).toHaveAttribute("href", "/contato");
  await page.goto("/pericia-na-pratica/mensagens-whatsapp-alem-do-print");
  const contextual = page.locator("#contato-artigo").getByRole("link", { name: "Enviar e-mail" });
  const url = new URL(await contextual.getAttribute("href"), origin);
  expect(url.pathname).toBe("/contato");
  expect(url.searchParams.get("tipo")).toBe("Perícia na Prática");
  expect(url.searchParams.get("assunto")).toContain("Mensagens de WhatsApp");
  await contextual.click();
  await expect(page).toHaveURL(url.href);
  await expect(page.locator('input[name="subject"]')).toHaveValue(url.searchParams.get("assunto"));
  await expect(page.locator('select[name="contactType"]')).toHaveValue("Perícia na Prática");
});

test("API rejeita entrada inválida, outra origem e configuração ausente sem enviar", async ({ request }) => {
  const valid = {
    name: "Pessoa de teste",
    email: "pessoa@example.org",
    subject: "Consulta de teste",
    contactType: "Outro",
    message: "Mensagem de teste para verificar validação local.",
    turnstileToken: "local-test-token",
  };
  const invalid = await request.post("/api/contact", { data: { ...valid, email: "email-invalido" } });
  expect(invalid.status()).toBe(400);
  expect((await invalid.json()).field).toBe("email");
  const sameOrigin = await request.post("/api/contact", {
    data: { ...valid, email: "email-invalido" },
    headers: { Origin: origin },
  });
  expect(sameOrigin.status()).toBe(400);
  const forbidden = await request.post("/api/contact", { data: valid, headers: { Origin: "https://outro.example" } });
  expect(forbidden.status()).toBe(403);
  const unavailable = await request.post("/api/contact", { data: valid });
  expect(unavailable.status()).toBe(503);
  expect((await unavailable.json()).message).toContain("temporariamente indisponível");
});

test("formulário valida campos, mantém texto na falha e só confirma resposta aceita", async ({ page }) => {
  test.skip(!process.env.CONTACT_TEST_SITE_KEY, "Executar com CONTACT_TEST_SITE_KEY=1 para simular o Turnstile localmente.");
  await mockTurnstile(page);
  await page.goto("/contato");
  const form = page.locator("form.contact-form");
  await expect(form.getByRole("button", { name: "Enviar mensagem" })).toBeEnabled();
  await form.getByRole("button", { name: "Enviar mensagem" }).click();
  await expect(form.locator('input[name="name"]')).toHaveAttribute("aria-invalid", "true");
  await form.locator('input[name="name"]').fill("Pessoa de teste");
  await form.locator('input[name="email"]').fill("pessoa@example.org");
  await form.locator('input[name="subject"]').fill("Consulta de teste");
  await form.locator('select[name="contactType"]').selectOption("Outro");
  await form.locator('textarea[name="message"]').fill("Mensagem para verificar estados do formulário.");
  await page.route("**/api/contact", (route) => route.fulfill({ status: 502, contentType: "application/json", body: JSON.stringify({ message: "O serviço não aceitou a mensagem." }) }));
  await form.getByRole("button", { name: "Enviar mensagem" }).click();
  await expect(form.getByRole("status").last()).toContainText("não aceitou");
  await expect(form.locator('textarea[name="message"]')).toHaveValue("Mensagem para verificar estados do formulário.");
  await page.unroute("**/api/contact");
  let accept;
  const waitForAcceptance = new Promise((resolve) => { accept = resolve; });
  await page.route("**/api/contact", async (route) => {
    await waitForAcceptance;
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ message: "O serviço confirmou o envio da mensagem." }) });
  });
  await form.getByRole("button", { name: "Enviar mensagem" }).click();
  await expect(form.getByRole("button", { name: "Enviando..." })).toBeDisabled();
  accept();
  await expect(form.getByRole("status").last()).toContainText("confirmou o envio");
  await expect(form.locator('textarea[name="message"]')).toHaveValue("");
});

test("home, contato e aplicações cabem no celular e com texto ampliado", async ({ page }) => {
  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/contato", "/aplicacoes", "/aplicacoes/da-necessidade-a-ferramenta", "/aplicacoes/dama-universe"]) {
      await page.goto(route);
      await page.addStyleTag({ content: "html { font-size: 200%; }" });
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
});
