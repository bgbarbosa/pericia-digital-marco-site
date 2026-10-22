import { expect, test } from "@playwright/test";
import { capacityModalities } from "../../data/profile";
import { imageDemonstrations, verifiedTrainingTopics } from "../../data/public-content";

for (const width of [390, 1440]) {
  test(`quatro capacitações abrem e fecham por mouse e teclado em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const navigation = width < 1280
      ? page.getByRole("navigation", { name: "Navegação móvel" })
      : page.getByRole("navigation", { name: "Navegação principal" });
    if (width < 1280) await page.getByRole("button", { name: "Abrir menu" }).click();
    await expect(navigation.getByRole("link", { name: "Capacitações", exact: true })).toHaveCount(0);
    if (width < 1280) await page.keyboard.press("Escape");
    await expect(page.locator("#capacitacoes h2")).toHaveText("Capacitações em Inteligência Artificial");
    await expect(page.locator("#inicio").getByRole("link", { name: "Conhecer capacitações" })).toHaveCount(0);
    const cards = page.locator("#capacitacoes .capacity-card");
    await expect(cards).toHaveCount(4);
    for (const [index, item] of capacityModalities.entries()) {
      const card = cards.nth(index);
      const trigger = card.locator("summary");
      const content = card.locator(".capacity-card-content");
      await expect(trigger.getByRole("heading", { name: item.title })).toBeVisible();
      await expect(trigger).toHaveAttribute("aria-controls", `capacitacao-${index + 1}-conteudo`);
      await expect(card).not.toHaveAttribute("open", "");
      await expect(content).toBeHidden();
      await trigger.click();
      await expect(card).toHaveAttribute("open", "");
      await expect(content).toBeVisible();
      await expect(content).toHaveText(item.text);
      await trigger.click();
      await expect(card).not.toHaveAttribute("open", "");
      await trigger.focus();
      await page.keyboard.press("Enter");
      await expect(card).toHaveAttribute("open", "");
      await page.keyboard.press("Space");
      await expect(card).not.toHaveAttribute("open", "");
    }
    await expect(page.getByRole("link", { name: "Solicitar informações sobre capacitações" })).toHaveAttribute("href", "/contato?tipo=Capacita%C3%A7%C3%B5es");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("painéis de capacitação mantêm leitura com texto ampliado e movimento reduzido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  const cards = page.locator("#capacitacoes .capacity-card");
  for (const card of await cards.all()) await card.locator("summary").click();
  await expect(cards.locator(".capacity-card-content:visible")).toHaveCount(4);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  expect(await cards.first().locator(".capacity-card-indicator").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
});

for (const width of [320, 390, 1440]) {
  test(`página do curso apresenta imagens, legendas e limites em ${width}px`, async ({ page, request }) => {
    await page.setViewportSize({ width, height: 900 });
    expect((await page.goto("/formacao/deteccao-imagens-ia")).status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("Detecção de Fotos e Vídeos gerados por Inteligência Artificial");
    await expect(page.getByRole("definition").filter({ hasText: "20 horas" })).toBeVisible();
    await expect(page.getByRole("definition").filter({ hasText: "Agosto de 2026" })).toBeVisible();
    const figures = page.locator(".course-figure");
    await expect(figures).toHaveCount(2);
    for (const figure of await figures.all()) {
      const image = figure.getByRole("img");
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveAttribute("alt", /.+/);
      await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
      await expect(figure.locator("figcaption")).toBeVisible();
      expect((await figure.locator("figcaption").innerText()).length).toBeGreaterThan(35);
      expect((await request.get(await image.getAttribute("src"))).status()).toBe(200);
    }
    await expect(page.getByText("Exemplo didático fictício 1")).toBeVisible();
    await expect(page.getByText("Exemplo didático fictício 2")).toBeVisible();
    await expect(page.getByRole("link", { name: /Fonte: NIST AI 100-4/ })).toHaveAttribute("href", /nist\.gov/);
    await expect(page.getByRole("heading", { name: "Conteúdos estudados" })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Demonstrações" })).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("curso continua legível em 390px com texto a 200% e movimento reduzido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/formacao/deteccao-imagens-ia");
  await page.addStyleTag({ content: "html { font-size: 200%; }" });
  for (const caption of await page.locator(".course-figure figcaption").all()) await expect(caption).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator(".course-figure img").first().evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  expect(verifiedTrainingTopics).toEqual([]);
  expect(imageDemonstrations).toEqual([]);
});
