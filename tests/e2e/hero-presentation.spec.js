import { expect, test } from "@playwright/test";

const title = "Inteligência Artificial, perícia digital e desenvolvimento de software";
const subtitle = "Consultoria tecnológica, análise de dados, automação e capacitação em IA, com foco em necessidades concretas e escopo definido para cada projeto.";
const audience = "Para pessoas, empresas e profissionais do Direito.";
const actions = [
  { name: "Entrar em contato", href: "/contato" },
  { name: "Currículo Lattes", href: "https://lattes.cnpq.br/1970561249212557" },
  { name: "Abrir cartão virtual", href: "/cartao" },
];

for (const width of [320, 360, 390, 768, 1024, 1440, 1920]) {
  test(`apresentação e três cards preservam leitura e layout em ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 1100 });
    await page.goto("/");
    const hero = page.locator("#inicio");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(hero.getByRole("heading", { level: 1 })).toHaveText(title);
    await expect(hero.locator(".hero-subtitle")).toHaveText(subtitle);
    await expect(hero.locator(".hero-audience")).toHaveText(audience);
    await expect(hero.locator(".hero-audience")).toBeVisible();
    await expect(hero.locator(".hero-intro > p").first()).toHaveText("Marco Barbosa");
    await expect(hero.getByRole("link", { name: "Conhecer capacitações" })).toHaveCount(0);
    const group = hero.getByRole("group", { name: "Acessos profissionais" });
    await expect(group.getByRole("link")).toHaveCount(3);
    const boxes = [];
    for (const [index, action] of actions.entries()) {
      const card = group.getByRole("link").nth(index);
      await expect(card).toHaveAccessibleName(action.name);
      await expect(card).toHaveAttribute("href", action.href);
      await expect(card.locator("a, button")).toHaveCount(0);
      await expect(hero.getByRole("link", { name: action.name, exact: true })).toHaveCount(1);
      await card.scrollIntoViewIfNeeded();
      expect(await card.evaluate(element => {
        const rect = element.getBoundingClientRect();
        return [[4, rect.height / 2], [rect.width - 4, rect.height / 2], [rect.width / 2, 4], [rect.width / 2, rect.height - 4]].every(([x, y]) => document.elementFromPoint(rect.left + x, rect.top + y)?.closest("a") === element);
      })).toBe(true);
      boxes.push(await card.evaluate(element => {
        const rect = element.getBoundingClientRect();
        return { x: rect.x + scrollX, y: rect.y + scrollY, width: rect.width, height: rect.height };
      }));
    }
    for (const box of boxes) expect(box.height).toBeGreaterThanOrEqual(48);
    if (width >= 1024) {
      for (const box of boxes) {
        expect(box.y).toBeCloseTo(boxes[0].y, 0);
        expect(box.height).toBeCloseTo(boxes[0].height, 0);
        expect(box.width).toBeCloseTo(boxes[0].width, 0);
      }
    } else if (width < 768) {
      expect(boxes[0].y + boxes[0].height).toBeLessThan(boxes[1].y);
      expect(boxes[1].y + boxes[1].height).toBeLessThan(boxes[2].y);
    } else {
      expect(boxes[0].y).toBeCloseTo(boxes[1].y, 0);
      expect(boxes[2].y).toBeGreaterThan(boxes[0].y);
    }
    const portrait = hero.getByAltText(/^Retrato profissional/);
    await expect.poll(() => portrait.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect(portrait).toHaveClass(/object-contain/);
    await expect(hero.locator(".hero-featured")).toHaveAttribute("href", "/formacao/deteccao-imagens-ia");
    await expect(page.locator("#capacitacoes .capacity-card")).toHaveCount(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}

for (const width of [390, 1024]) {
  test(`Tab, foco e movimento reduzido nos três acessos em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const cards = page.locator(".hero-actions > a");
    await cards.first().focus();
    for (let index = 0; index < 3; index++) {
      const card = cards.nth(index);
      await expect(card).toBeFocused();
      expect(await card.evaluate(element => getComputedStyle(element).outlineStyle)).toBe("solid");
      expect(await card.evaluate(element => parseFloat(getComputedStyle(element).transitionDuration))).toBeLessThanOrEqual(.001);
      await page.keyboard.press("Tab");
    }
    await expect(page.locator(".hero-featured")).toBeFocused();
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    for (const card of await cards.all()) {
      expect(await card.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    }
  });
}

for (const action of actions) {
  for (const method of ["clique na borda", "Enter"]) {
    test(`${action.name} abre o destino por ${method}`, async ({ page }) => {
      // Lattes externo interceptado: verifica navegação sem depender da disponibilidade do CNPq.
      if (action.href.startsWith("https:")) {
        await page.context().route(action.href, route => route.fulfill({ status: 200, contentType: "text/html", body: "<title>Destino externo de teste</title>" }));
      }
      await page.goto("/");
      const card = page.locator(".hero-actions").getByRole("link", { name: action.name, exact: true });
      const activate = async () => {
        if (method === "Enter") {
          await card.focus();
          await page.keyboard.press("Enter");
        } else {
          await card.click({ position: { x: 4, y: 20 } });
        }
      };
      if (action.href.startsWith("https:")) {
        await expect(card).toHaveAttribute("target", "_blank");
        await expect(card).toHaveAttribute("rel", "noopener noreferrer");
        const popupPromise = page.waitForEvent("popup");
        await activate();
        const popup = await popupPromise;
        await expect(popup).toHaveURL(action.href);
        await popup.close();
        await expect(page).toHaveURL(/\/$/);
      } else {
        await activate();
        await expect(page).toHaveURL(new RegExp(`${action.href}$`));
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        expect((await page.request.get(action.href)).status()).toBe(200);
      }
    });
  }
}

test("clique no espaço entre os cards não inicia navegação", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const cards = page.locator(".hero-actions > a");
  const first = await cards.nth(0).boundingBox();
  const second = await cards.nth(1).boundingBox();
  const point = { x: (first.x + first.width + second.x) / 2, y: first.y + first.height / 2 };
  expect(await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest("a") === null, point)).toBe(true);
  await page.mouse.click(point.x, point.y);
  await expect(page).toHaveURL(/\/$/);
});
