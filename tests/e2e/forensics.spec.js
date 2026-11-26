import { expect, test } from "@playwright/test";
import areas from "../../data/forense/areas-pericia.json";
import editorial from "../../data/forense/textos-editoriais.json";

const path = "/areas-da-pericia";
const fields = (page) => page.locator('article[id^="tech-"]');
const allIds = areas.technicalFields.map(({ id }) => `tech-${id}`);
const idsOnPage = (page) => fields(page).evaluateAll((nodes) => nodes.map(({ id }) => id));

test("uma única seção na home encaminha para os sete recortes e o guia completo", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#pericia-aplicada");
  await expect(section.getByRole("heading", { level: 2 })).toHaveText(editorial.home.title);
  await expect(section.locator("article")).toHaveCount(8);
  await expect(section.locator("hr")).toHaveCount(0);
  await expect(section.getByRole("link", { name: "Explorar por área do Direito" })).toHaveCount(0);
  await expect(section.getByRole("link", { name: "Ler o guia completo", exact: true })).toHaveCount(0);
  await expect(section.getByText("Explorar esta área", { exact: true })).toHaveCount(0);
  await expect(section.locator("article > a")).toHaveCount(8);
  await expect(section.locator("article a a, article button")).toHaveCount(0);
  await expect(section.getByText(editorial.home.notice)).toBeVisible();
  await expect(page.locator("#pericia-aplicada + section").getByRole("link", { name: "Universo Forense" }))
    .toHaveAttribute("href", "/pericia-na-pratica");
  await expect(page.locator("#pericia-aplicada + section + #capacitacoes")).toHaveCount(1);

  for (const area of areas.lawAreas) {
    const card = section.locator("article").filter({ has: page.getByRole("heading", { name: area.title, exact: true }) });
    await expect(card).toContainText(area.summary);
    const link = card.getByRole("link", { name: area.title, exact: true });
    await expect(link).toHaveAccessibleDescription(area.summary);
    await link.locator("img").click();
    await expect(page).toHaveURL(new RegExp(`${path}\\?area=${area.id}$`));
    await expect(fields(page)).toHaveCount(area.technicalIds.length);
    expect(await idsOnPage(page)).toEqual(allIds.filter((id) => area.technicalIds.includes(id.slice(5))));
    for (const question of area.questions) await expect(page.getByText(question, { exact: true })).toBeVisible();
    await expect(page.getByText("Limites e responsabilidade técnica")).toBeVisible();
    await page.getByRole("link", { name: "Voltar às áreas do Direito" }).click();
    await expect(page).toHaveURL(/\/#pericia-aplicada$/);
  }

  const completeCard = section.getByRole("link", { name: editorial.home.guideCard.title, exact: true });
  await section.getByRole("link", { name: areas.lawAreas.at(-1).title, exact: true }).focus();
  await page.keyboard.press("Tab");
  await expect(completeCard).toBeFocused();
  await expect(completeCard).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`${path}$`));
  await expect(fields(page)).toHaveCount(15);
  await page.goBack();

  await section.getByRole("link", { name: "Ver conteúdo completo", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${path}$`));
  await expect(fields(page)).toHaveCount(15);
});

test("guia preserva cada campo e os textos aprovados, inclusive no fallback", async ({ page, request }) => {
  await page.goto(`${path}?area=inexistente`);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(editorial.guide.title);
  expect(await idsOnPage(page)).toEqual(allIds);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `http://127.0.0.1:3100${path}`);
  for (const [index, field] of areas.technicalFields.entries()) {
    const article = page.locator(`#tech-${field.id}`);
    await expect(article.getByRole("heading", { level: 3 })).toHaveText(field.title);
    await expect(article).toContainText(`Campo ${String(index + 1).padStart(2, "0")}`);
    await expect(article).toContainText(field.description);
    await expect(article).toContainText(field.application);
    await expect(article.getByRole("listitem")).toHaveText(field.possibilities.map((text) => `${text};`));
  }
  for (const block of [...editorial.guide.introduction, ...editorial.guide.closing]) {
    for (const text of block.items ?? [block.text]) await expect(page.getByText(text, { exact: true })).toBeVisible();
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).toContain(`${path}</loc>`);
  expect(sitemap).not.toContain("?area=");
});

for (const width of [390, 768, 1024, 1280, 1440]) {
  test(`Home, guia e recorte sem transbordamento em ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 940 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const section = page.locator("#pericia-aplicada");
    const row = await section.locator("article").evaluateAll((cards) => {
      const firstTop = cards[0].getBoundingClientRect().top;
      return cards.filter((card) => Math.abs(card.getBoundingClientRect().top - firstTop) < 1).length;
    });
    expect(row).toBe(width >= 1280 ? 4 : width === 390 ? 1 : 2);
    for (const image of await section.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const trigger = page.getByRole("button", { name: "Abrir menu" });
    if (await trigger.isVisible()) await trigger.click();
    const menu = page.getByRole("navigation", { name: width < 1280 ? "Navegação móvel" : "Navegação principal" });
    const link = menu.getByRole("link", { name: "Áreas da Perícia" });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(fields(page)).toHaveCount(15);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    const branch = page.getByLabel("Escolha a área do Direito");
    if (width <= 768) await branch.selectOption(`${path}?area=criminal`);
    else await page.getByRole("navigation", { name: "Áreas do Direito", exact: true }).getByRole("link", { name: "Direito Criminal", exact: true }).click();
    await expect(page).toHaveURL(/area=criminal$/);
    await expect(fields(page)).toHaveCount(13);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}

test("âncora por campo preserva URL, foco, recarga e histórico", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 940 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${path}?area=criminal`);
  await page.getByLabel("Ir para um campo de conhecimento").selectOption("#tech-mobile");
  await expect(page).toHaveURL(/area=criminal#tech-mobile$/);
  const field = page.locator("#tech-mobile");
  await expect(field).toBeFocused();
  await page.reload();
  await expect(page.getByLabel("Ir para um campo de conhecimento")).toHaveValue("#tech-mobile");
  await expect.poll(async () => (await field.boundingBox()).y).toBeGreaterThanOrEqual(72);
  await page.goBack();
  await expect(page).toHaveURL(/area=criminal$/);
  await page.goForward();
  await expect(page).toHaveURL(/#tech-mobile$/);
  await page.setViewportSize({ width: 1440, height: 940 });
  await expect(page.getByRole("navigation", { name: "Campos de conhecimento" }).locator('[aria-current="location"]'))
    .toHaveAttribute("href", "#tech-mobile");
});

test("guia mantém os seletores legíveis com texto ampliado", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  for (const route of [path, `${path}?area=criminal`]) {
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    await expect(page.getByLabel("Escolha a área do Direito")).toBeVisible();
    await expect(page.getByLabel("Ir para um campo de conhecimento")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  }
});
