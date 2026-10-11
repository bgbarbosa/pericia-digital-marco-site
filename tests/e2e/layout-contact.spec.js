import { expect, test } from "@playwright/test";
import content from "../../data/practice-articles.json";
import { homeMenu, profile, whatsappUrl } from "../../data/profile";

const collection = "/pericia-na-pratica";
const articlePath = ({ slug }) => `${collection}/${slug}`;
const routes = ["/", "/cartao", collection, ...content.articles.map(articlePath)];
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const optionalLines = "\n\nSe quiser, posso informar:\nMeu nome:\nMinha profissão:";
const collectionMessage = "Olá, Marco. Vim pela seção Perícia na Prática e gostaria de receber novos conteúdos." + optionalLines;
const articleMessage = (title) => `Olá, Marco. Li o artigo “${title}” na seção Perícia na Prática e gostaria de conversar e receber novos conteúdos.${optionalLines}`;

async function noOverflow(page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(await page.evaluate(() => innerWidth));
}

for (const width of widths) {
  test(`layout e navegação das sete páginas em ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      expect((await page.goto(route)).status()).toBe(200);
      await noOverflow(page);
      const trigger = page.getByRole("button", { name: "Abrir menu" });
      const mobile = await trigger.isVisible();
      if (mobile) await trigger.click();
      const navigation = page.getByRole("navigation", { name: mobile ? "Navegação móvel" : "Navegação principal" });
      const links = navigation.getByRole("link");
      expect((await links.allTextContents()).slice(0, homeMenu.length)).toEqual(homeMenu.map(({ label }) => label));
      expect(homeMenu.slice(0, 2).map(({ label }) => label)).toEqual(["Início", "Perícia na Prática"]);
      for (const link of await links.all()) {
        const box = await link.boundingBox();
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
      }
      if (mobile) {
        await page.keyboard.press("Escape");
        await expect(trigger).toBeFocused();
      } else {
        const bounds = await page.locator(".header-inner > :visible").evaluateAll((items) => items.map((item) => {
          const { x, width } = item.getBoundingClientRect();
          return { x, width };
        }));
        for (let i = 1; i < bounds.length; i++) expect(bounds[i].x).toBeGreaterThanOrEqual(bounds[i - 1].x + bounds[i - 1].width);
      }
    }
    expect(errors).toEqual([]);
  });
}

test("home compartilha alinhamentos, equilibra cards e separa associações", async ({ page }) => {
  for (const width of [390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const sections = page.locator(".hero-grid, #capacitacoes > .site-container, #aplicacoes-ia, #sobre, #contato > .site-container");
    const bounds = await sections.evaluateAll((items) => items.map((element) => {
      const rect = element.getBoundingClientRect();
      const css = getComputedStyle(element);
      return { x: rect.x + parseFloat(css.paddingLeft), right: rect.right - parseFloat(css.paddingRight) };
    }));
    expect(bounds).toHaveLength(5);
    for (const box of bounds) {
      expect(Math.abs(box.x - bounds[0].x)).toBeLessThanOrEqual(1);
      expect(Math.abs(box.right - bounds[0].right)).toBeLessThanOrEqual(1);
    }
    const credentials = page.locator("#sobre > .credentials-layout");
    await expect(credentials.locator(".credential-memberships")).toHaveCount(0);
    await expect(page.locator("#sobre > .credential-memberships")).toHaveCount(1);
    for (const selector of ["#capacitacoes .editorial-grid", "#solucoes-digitais", ".credentials-layout"]) {
      const cards = await page.locator(`${selector} > *`).evaluateAll((items) => items.map((element) => {
        const { x, y, height } = element.getBoundingClientRect();
        const last = element.lastElementChild.getBoundingClientRect();
        return { x, y, height, empty: y + height - last.bottom };
      }));
      if (width >= 768) {
        for (let i = 0; i < cards.length; i += 2) {
          expect(cards[i].y).toBe(cards[i + 1].y);
          expect(cards[i].height).toBe(cards[i + 1].height);
        }
        // Real content fills each panel; associations no longer stretch the work card.
        if (selector === ".credentials-layout") for (const card of cards) expect(card.empty).toBeLessThanOrEqual(34);
      }
    }
    for (const image of await page.locator(".hero-portrait img, .credential-membership img").all()) {
      expect(await image.evaluate((element) => getComputedStyle(element).objectFit)).toBe("contain");
    }
  }
});

test("card integral é um único link com foco, hover e ativação pelas bordas", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const position of [{ x: 8, y: 8 }, { x: "right", y: "bottom" }]) {
    await page.goto("/");
    const region = page.locator('section[aria-labelledby="pratica-chamada"]');
    const card = region.getByRole("link", { name: "Perícia na Prática", exact: true });
    await expect(region.locator("a")).toHaveCount(1);
    await expect(card.locator("a, button, input")).toHaveCount(0);
    await expect(region).not.toContainText(/Explorar|quatro artigos/i);
    await expect(card).toHaveAttribute("href", collection);
    await expect(card).toHaveAttribute("aria-describedby", "pratica-chamada-resumo");
    await card.scrollIntoViewIfNeeded();
    const originalBorder = await card.evaluate((element) => getComputedStyle(element).borderColor);
    await card.hover();
    await expect.poll(() => card.evaluate((element) => getComputedStyle(element).borderColor)).not.toBe(originalBorder);
    const rect = await card.boundingBox();
    await card.click({ position: { x: position.x === "right" ? rect.width - 8 : position.x, y: position.y === "bottom" ? rect.height - 8 : position.y } });
    await expect(page).toHaveURL(new RegExp(`${collection}$`));
  }
  await page.goto("/");
  const card = page.locator('section[aria-labelledby="pratica-chamada"] > a');
  await page.keyboard.press("Tab");
  await card.focus();
  await expect(card).toBeFocused();
  expect(await card.evaluate((element) => getComputedStyle(element).outlineWidth)).toBe("3px");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(new RegExp(`${collection}$`));
});

test("oscilação é lenta, altera somente opacidade e é desativada com redução de movimento", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const card = page.locator('section[aria-labelledby="pratica-chamada"] > a');
  const motion = await card.evaluate((element) => {
    const css = getComputedStyle(element, "::before");
    const animation = element.getAnimations({ subtree: true })[0];
    const frames = animation.effect.getKeyframes();
    return { name: css.animationName, duration: css.animationDuration, keys: Object.keys(frames[0]), values: frames.map(({ opacity }) => opacity) };
  });
  expect(motion.name).not.toBe("none");
  expect(parseFloat(motion.duration)).toBeGreaterThanOrEqual(10);
  expect(motion.keys).toContain("opacity");
  expect(motion.keys).not.toContain("transform");
  expect(new Set(motion.values).size).toBeGreaterThan(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await card.evaluate((element) => getComputedStyle(element, "::before").animationName)).toBe("none");
});

test("WhatsApp da coleção é opcional e só prepara texto, sem captura nem envio pelo site", async ({ page, context }) => {
  const externalRequests = [];
  page.on("request", (request) => {
    if (/^https?:/.test(request.url()) && new URL(request.url()).host !== "127.0.0.1:3100") externalRequests.push(request.url());
  });
  await page.goto(collection);
  const link = page.getByRole("link", { name: "Receber conteúdos pelo WhatsApp" });
  const href = await link.getAttribute("href");
  const url = new URL(href);
  expect(url.origin + url.pathname).toBe(whatsappUrl);
  expect(url.searchParams.get("text")).toBe(collectionMessage);
  expect(url.search).not.toMatch(/\s|Olá|profissão/);
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  await expect(page.locator("form, input, textarea")).toHaveCount(0);
  await expect(page.getByText(/Nome e profissão são opcionais/)).toBeVisible();
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  expect(await context.cookies()).toEqual([]);
  expect(externalRequests).toEqual([]);
  // Stop at a local fixture: exercising the link must never send an actual message.
  await context.route("https://wa.me/**", (route) => route.fulfill({ status: 200, contentType: "text/html", body: "<p>Destino de teste local</p>" }));
  const popupPromise = page.waitForEvent("popup");
  await link.click();
  const popup = await popupPromise;
  await popup.waitForLoadState();
  expect(new URL(popup.url()).searchParams.get("text")).toBe(collectionMessage);
  expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
  await popup.close();
});

for (const article of content.articles) {
  test(`contatos contextuais e e-mail centralizado: ${article.slug}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(articlePath(article));
    const contact = page.locator("#contato-artigo");
    const message = articleMessage(article.title);
    for (const link of await page.getByRole("link", { name: "Conversar pelo WhatsApp", exact: true }).all()) {
      const url = new URL(await link.getAttribute("href"));
      expect(url.origin + url.pathname).toBe(whatsappUrl);
      expect(url.searchParams.get("text")).toBe(message);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
    await expect(page.locator(".header-contact")).toHaveText("Conversar pelo WhatsApp");
    await expect(contact.getByRole("link", { name: "Abrir cartão profissional" })).toHaveCount(0);
    await expect(contact.locator('a[href="/cartao"]')).toHaveCount(0);
    await expect(page.locator("form, input, textarea")).toHaveCount(0);
    const action = contact.getByRole("link", { name: "Enviar e-mail", exact: true });
    const url = new URL(await action.getAttribute("href"));
    expect(url.protocol).toBe("mailto:");
    expect(url.pathname).toBe(profile.email);
    expect(url.searchParams.get("subject")).toBe(`Contato sobre o artigo: ${article.title}`);
    expect(url.searchParams.get("body")).toBe(`Olá, Marco.\n\nLi o artigo “${article.title}” na seção Perícia na Prática e gostaria de conversar sobre o tema.`);
    await expect(contact.getByRole("link", { name: profile.email, exact: true })).toHaveAttribute("href", url.href);
    await expect(contact).toContainText("aplicativo configurado");
    await expect(contact).toContainText("Nome e profissão são opcionais");
  });
}

for (const mode of ["modern", "unavailable", "denied", "fallback-false", "fallback-throw"]) {
  test(`cópia de e-mail confirma resultado real e restaura foco: ${mode}`, async ({ page }) => {
    await page.addInitScript((mode) => {
      window.copyEvidence = [];
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: mode === "modern" || mode === "denied" ? {
          writeText: async (value) => {
            if (mode === "denied") throw new DOMException("Denied", "NotAllowedError");
            window.copyEvidence.push({ method: "clipboard", value });
          },
        } : undefined,
      });
      document.execCommand = (command) => {
        if (mode === "fallback-throw") throw new Error("Unavailable");
        if (mode === "fallback-false") return false;
        window.copyEvidence.push({ method: command, value: document.activeElement.value });
        return true;
      };
    }, mode);
    await page.goto(articlePath(content.articles[0]));
    const contact = page.locator("#contato-artigo");
    const button = contact.getByRole("button", { name: "Copiar e-mail" });
    await button.click();
    const status = contact.getByRole("status");
    await expect(status).toHaveAttribute("aria-live", "polite");
    if (mode.startsWith("fallback-")) {
      await expect(status).toContainText("Não foi possível copiar");
      await expect(status).not.toContainText("E-mail copiado");
      expect(await page.evaluate(() => window.copyEvidence)).toEqual([]);
    } else {
      await expect(status).toHaveText("E-mail copiado.");
      expect(await page.evaluate(() => window.copyEvidence)).toEqual([{ method: mode === "modern" ? "clipboard" : "copy", value: profile.email }]);
    }
    await expect(button).toBeFocused();
    await expect(page.locator("textarea")).toHaveCount(0);
  });
}

for (const width of widths) {
  test(`texto a 200% preserva menu, foco e leitura em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto(route);
      await page.addStyleTag({ content: "html { font-size: 200%; }" });
      await noOverflow(page);
      if (route === "/") {
        // A page can have no overflow and still squeeze each word into a column.
        for (const selector of ['section[aria-labelledby="pratica-chamada"] > a > div', '.hero-featured > div']) {
          expect((await page.locator(selector).boundingBox()).width).toBeGreaterThanOrEqual(180);
        }
      }
      const trigger = page.getByRole("button", { name: "Abrir menu" });
      await expect(trigger).toBeVisible();
      await trigger.click();
      await noOverflow(page);
      await expect(page.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link").first()).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(trigger).toBeFocused();
    }
  });
}
