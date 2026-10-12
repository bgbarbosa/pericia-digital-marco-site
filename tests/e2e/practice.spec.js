import { expect, test } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import content from "../../data/practice-articles.json";
import integrity from "../../docs/PERICIA_NA_PRATICA_INTEGRIDADE.json";

const basePath = "/pericia-na-pratica";
const publicationDate = "2026-10-11";
const publicOrigin = "https://pericia-digital-marco-site.vercel.app";
const articlePath = (article) => `${basePath}/${article.slug}`;
const allRoutes = ["/", "/cartao", basePath, ...content.articles.map(articlePath)];
const normalize = (value) => value.replace(/\s+/g, " ").trim();

test("fonte editorial única e integridade dos quatro textos e onze imagens", () => {
  expect(content.collection.title).toBe("Perícia na Prática");
  expect(content.collection.subtitle).toBe("Aplicações, exemplos e situações concretas.");
  expect(content.collection.publicationStatus).toBe("publicado");
  expect(content.collection.publicationDate).toBe(publicationDate);
  expect(content.collection.publicUrl).toBe(`${publicOrigin}${basePath}`);
  expect(content.articles).toHaveLength(4);
  expect(new Set(content.articles.map(({ slug }) => slug)).size).toBe(4);
  for (const article of content.articles) {
    const provenance = integrity.contentChecks.find(({ slug }) => slug === article.slug);
    expect(createHash("sha256").update(article.bodyMarkdown).digest("hex").toUpperCase())
      .toBe(provenance.bodyMarkdownSha256);
    expect(article.publicationStatus).toBe("publicado");
    expect(article.publicationDate).toBe(publicationDate);
    expect(article.publicUrl).toBe(`${publicOrigin}${articlePath(article)}`);
    expect(article.bodyMarkdown).toMatch(/hipotético/);
    expect(article.relatedSlugs.sort()).toEqual(content.articles.filter(({ slug }) => slug !== article.slug).map(({ slug }) => slug).sort());
    const headings = [...article.bodyMarkdown.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
    expect(headings.filter((heading) => heading === article.diagramAfterHeading)).toHaveLength(1);
    expect(headings.filter((heading) => heading === article.pullQuoteAfterHeading)).toHaveLength(1);
  }
  for (const asset of integrity.assets) {
    expect(createHash("sha256").update(readFileSync(path.join(process.cwd(), asset.path))).digest("hex").toUpperCase()).toBe(asset.sha256);
  }
});

for (const width of [320, 390, 768, 1440]) {
  test(`coleção com quatro leituras disponíveis em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    expect((await page.goto(basePath)).status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("Perícia na Prática");
    await expect(page.getByText(content.collection.subtitle, { exact: true })).toBeVisible();
    for (const article of content.articles) {
      const card = page.locator("article").filter({ has: page.getByRole("heading", { name: article.title, exact: true }) });
      await expect(card).toContainText(article.excerpt);
      await expect(card.getByRole("link", { name: `Ler artigo: ${article.title}` })).toHaveAttribute("href", articlePath(article));
      await expect(card.getByRole("img")).toHaveAttribute("alt", article.coverAlt);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

for (const width of [390, 1440]) {
  for (const article of content.articles) {
    test(`leitura integral, quadros e navegação: ${article.slug} em ${width}px`, async ({ page, request }) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width, height: 900 });
      expect((await page.goto(articlePath(article))).status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(article.title);
      await expect(page.getByTestId("article-excerpt")).toHaveText(article.excerpt);
      await expect(page.getByTestId("article-cover")).toHaveCount(1);
      await expect(page.getByTestId("article-cover").locator("figcaption")).toHaveText(article.coverCaption);
      await expect(page.getByTestId("article-cover").getByRole("img")).toHaveAttribute("alt", article.coverAlt);
      const body = page.getByTestId("article-body");
      const actual = normalize(await body.innerText());
      // Compare every supplied prose paragraph, including hypothetical examples
      // and technical limits. Links are reduced to their visible labels only.
      for (const block of article.bodyMarkdown.trim().split(/\n\s*\n/)) {
        if (/^(#|\||-|\d+\.)/.test(block)) continue;
        const expected = block.replace(/\[([^\]]+)\]\([^\s)]+\)/g, "$1");
        expect(actual).toContain(normalize(expected));
      }
      const tableLines = article.bodyMarkdown.split("\n").filter((line) => line.startsWith("|") && !/^\|[\s:|-]+$/.test(line));
      await expect(body.locator("table")).toHaveCount(1);
      for (const line of tableLines) {
        for (const cell of line.split("|").slice(1, -1)) expect(actual).toContain(cell.trim());
      }
      await expect(body.locator("th[scope=col]")).toHaveCount(2);
      await expect(page.getByTestId("article-pullquote")).toHaveCount(1);
      await expect(page.getByTestId("article-pullquote")).toHaveText(article.pullQuote);
      const quoteSection = page.getByTestId("article-pullquote").locator("..");
      await expect(quoteSection.locator("h2")).toHaveText(article.pullQuoteAfterHeading);
      const diagram = page.getByTestId("article-diagram");
      await expect(diagram).toHaveCount(1);
      await expect(diagram.locator("..").locator("h2")).toHaveText(article.diagramAfterHeading);
      await expect(diagram.locator("figcaption")).toHaveText(article.diagramCaption);
      // Role locators use the accessibility tree: exactly one equivalent diagram
      // representation is exposed at each viewport, with no hydration dependency.
      await expect(diagram.getByRole("img", { name: article.diagramAlt })).toHaveCount(width >= 768 ? 1 : 0);
      await expect(diagram.getByRole("group", { name: article.diagramAlt })).toHaveCount(width < 768 ? 1 : 0);
      for (const image of await page.locator("main img:visible").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
        expect(await image.getAttribute("alt")).toBeTruthy();
      }
      for (const link of await page.getByRole("navigation", { name: "Sumário do artigo" }).getByRole("link").all()) {
        const href = await link.getAttribute("href");
        await expect(page.locator(href)).toHaveCount(1);
        await link.click();
        await expect(page).toHaveURL(new RegExp(`${href}$`));
        await expect(page.locator(href)).toBeFocused();
        await expect.poll(async () => (await page.locator(href).boundingBox()).y).toBeGreaterThanOrEqual(70);
      }
      const sourceUrls = [...new Set(article.bodyMarkdown.match(/https?:\/\/[^\s)]+/g))];
      const renderedUrls = await body.locator("a[href]").evaluateAll((links) => links.map((link) => link.href));
      for (const url of sourceUrls) expect(renderedUrls).toContain(url);
      for (const link of await body.locator("a[href]").all()) {
        await expect(link).toHaveAttribute("rel", "noopener noreferrer");
        expect(new URL(await link.getAttribute("href")).protocol).toMatch(/^https?:$/);
      }
      for (const slug of article.relatedSlugs) {
        const href = `${basePath}/${slug}`;
        expect((await request.get(href)).status()).toBe(200);
        await expect(page.locator(`section[aria-labelledby="outras-leituras"] a[href="${href}"]`)).toHaveCount(2);
      }
      const whatsapp = new URL(await page.locator("#contato-artigo").getByRole("link", { name: "Conversar pelo WhatsApp" }).getAttribute("href"));
      expect(whatsapp.origin + whatsapp.pathname).toBe("https://wa.me/5567992368049");
      expect(whatsapp.searchParams.get("text")).toContain(article.title);
      await expect(page.getByRole("link", { name: "Enviar e-mail" })).toHaveAttribute("href", /^\/contato\?assunto=/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(errors).toEqual([]);
      await page.getByRole("link", { name: "← Voltar à coleção Perícia na Prática" }).click();
      await expect(page).toHaveURL(new RegExp(`${basePath}$`));
    });
  }
}

test("menu, chamada da home e foco de teclado abrem a coleção", async ({ page }) => {
  for (const width of [320, 390, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator("#inicio h1")).toHaveText("Inteligência Artificial aplicada à prática profissional");
    if (width < 1280) await page.getByRole("button", { name: "Abrir menu" }).click();
    const navigation = page.getByRole("navigation", { name: width < 1280 ? "Navegação móvel" : "Navegação principal" });
    const link = navigation.getByRole("link", { name: "Perícia na Prática", exact: true });
    await expect(link).toBeVisible();
    const bounds = await link.boundingBox();
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    await page.keyboard.press("Tab");
    await link.focus();
    expect(await link.evaluate((element) => getComputedStyle(element).outlineStyle)).toBe("solid");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`${basePath}$`));
    await page.goto("/");
    const callout = page.locator('section[aria-labelledby="pratica-chamada"]');
    await expect(callout).toContainText(content.collection.subtitle);
    const cta = callout.getByRole("link");
    await cta.click();
    await expect(page).toHaveURL(new RegExp(`${basePath}$`));
  }
});

test("AI Brasil e APECOF preservam redação, imagens e disposição responsiva", async ({ page }) => {
  await page.goto("/");
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const apecof = page.getByTestId("apecof-membership");
    const ai = page.getByTestId("ai-brasil-membership");
    await expect(apecof).toContainText("Associado à Associação Nacional dos Peritos em Computação Forense - APECOF.");
    await expect(ai).toContainText("Membro da comunidade AI Brasil");
    await expect(ai).toContainText("Atualização contínua e troca de conhecimentos em inteligência artificial que fortalecem minha atuação em análise de dados, computação forense e desenvolvimento de soluções.");
    await expect(ai.locator("a")).toHaveCount(0);
    await expect(ai.getByRole("img")).toHaveAttribute("alt", "Identidade visual da comunidade AI Brasil");
    for (const box of [apecof, ai]) expect(await box.getByRole("img").evaluate((img) => getComputedStyle(img).objectFit)).toBe("contain");
    const left = await apecof.boundingBox();
    const right = await ai.boundingBox();
    if (width === 1440) { expect(left.y).toBe(right.y); expect(right.x).toBeGreaterThan(left.x); }
    else expect(right.y).toBeGreaterThanOrEqual(left.y + left.height);
  }
});

test("novo retrato sem recorte na home, cartão e imagens sociais JPEG/PNG", async ({ page, request }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/cartao"]) {
      await page.goto(route);
      const image = page.getByAltText(/^Retrato profissional/);
      await expect(image).toHaveAttribute("src", /marco-barbosa-profissional\.jpg/);
      expect(await image.evaluate((img) => getComputedStyle(img).objectFit)).toBe("contain");
      const box = await image.boundingBox();
      expect(box.width / box.height).toBeCloseTo(1.5, 1);
      const ogUrl = await page.locator('meta[property="og:image"]').getAttribute("content");
      const response = await request.get(ogUrl);
      expect(response.ok()).toBe(true);
      expect(response.headers()["content-type"]).toContain("image/png");
      const png = await response.body();
      expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(png.readUInt32BE(16)).toBe(1200);
      expect(png.readUInt32BE(20)).toBe(630);
    }
  }
  const portrait = await request.get("/marco-barbosa-profissional.jpg");
  expect((await portrait.body()).subarray(0, 3).toString("hex")).toBe("ffd8ff");
});

test("metadados e sitemap usam as cinco rotas e a data real de publicação", async ({ page, request }) => {
  for (const article of [null, ...content.articles]) {
    const route = article ? articlePath(article) : basePath;
    await page.goto(route);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `http://127.0.0.1:3100${route}`);
    await expect(page).toHaveTitle(new RegExp(article?.title || content.collection.title));
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", article?.metaDescription || `${content.collection.subtitle} ${content.collection.introduction}`);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", `http://127.0.0.1:3100${route}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `http://127.0.0.1:3100${(article || content.articles[0]).coverPath}`);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", (article || content.articles[0]).coverAlt);
    const publishedTime = page.locator('meta[property="article:published_time"]');
    if (article) await expect(publishedTime).toHaveAttribute("content", publicationDate);
    else await expect(publishedTime).toHaveCount(0);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="robots"][content*="noindex"], meta[name="robots"][content*="nofollow"]')).toHaveCount(0);
    await expect(page.locator("time")).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText(content.collection.preparedAt);
    await expect(page.locator('a[href*="pericia-digital-aplicada"]')).toHaveCount(0);
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  for (const route of [basePath, ...content.articles.map(articlePath)]) expect(sitemap).toContain(`http://127.0.0.1:3100${route}</loc>`);
  expect(sitemap).not.toContain("<lastmod>");
  expect(sitemap).not.toContain("pericia-digital-aplicada");
  for (const invalid of [basePath + "/artigo-inexistente", "/pericia-digital-aplicada", "/pericia-digital-aplicada/" + content.articles[0].slug]) {
    expect((await request.get(invalid)).status()).toBe(404);
  }
});

test("sete páginas mantêm leitura sem transbordamento com texto ampliado e em 320px", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of allRoutes) {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto(route);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.setViewportSize({ width: 390, height: 900 });
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});
