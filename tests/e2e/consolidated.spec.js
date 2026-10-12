import { expect, test } from "@playwright/test";
import practiceContent from "../../data/practice-articles.json";
import {
  approvedTrajectory,
  approvedDemonstrations,
} from "../../lib/public-content";

const routes = [
  "/",
  "/cartao",
  "/aplicacoes",
  "/aplicacoes/da-necessidade-a-ferramenta",
  "/aplicacoes/dama-universe",
  "/contato",
  "/formacao/deteccao-imagens-ia",
];
for (const width of [320, 390, 768, 1440]) {
  for (const route of routes) {
    test(`página pública ${route} em ${width}px`, async ({
      page,
    }, testInfo) => {
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (message) => {
        if (message.type() === "error") errors.push(message.text());
      });
      await page.setViewportSize({ width, height: 900 });
      expect((await page.goto(route)).status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `http://127.0.0.1:3100${route === "/" ? "" : route}`,
      );
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /.+/,
      );
      for (const image of await page.locator("main img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate((img) => img.complete && img.naturalWidth > 0),
          )
          .toBe(true);
      }
      await expect(page.locator("body")).not.toContainText(
        /preencher depois|pendente de aprovação|URL configurada|durante os testes/i,
      );
      await expect(
        page.locator("#trajetoria-atuacao, #demonstracoes"),
      ).toHaveCount(0);
      await expect(
        page.getByRole("heading", { name: "Conteúdos estudados" }),
      ).toHaveCount(0);
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
      await page.screenshot({
        path: testInfo.outputPath(`pagina-${width}.png`),
        fullPage: true,
      });
      expect(errors).toEqual([]);
    });
  }
}

test("destaque da formação leva ao conteúdo na mesma aba", async ({ page }) => {
  await page.goto("/");
  const link = page.locator("#inicio").getByRole("link", { name: /^Formação em destaque:/ });
  await expect(link).toHaveAttribute("href", "/formacao/deteccao-imagens-ia");
  await expect(link).not.toHaveAttribute("target", "_blank");
  await page.keyboard.press("Tab");
  await link.focus();
  expect(await link.evaluate((el) => getComputedStyle(el).outlineStyle)).toBe("solid");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/formacao\/deteccao-imagens-ia$/);
  await page.getByRole("link", { name: "← Voltar à página inicial" }).click();
});

test("menu isola foco, restaura rolagem e responde à largura", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(
    page
      .getByRole("navigation", { name: "Navegação móvel" })
      .getByRole("link")
      .first(),
  ).toBeFocused();
  for (const key of ["Tab", "Shift+Tab"])
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press(key);
      expect(
        await page.evaluate(() =>
          document.querySelector("dialog").contains(document.activeElement),
        ),
      ).toBe(true);
    }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator("dialog")).not.toBeVisible();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole("button", { name: "Abrir menu" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("contatos e retrato centralizados; contato móvel vem antes dos complementos", async ({
  page,
}) => {
  for (const route of ["/", "/cartao"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    await expect(
      page.locator('a[href="https://wa.me/5567992368049"]'),
    ).toHaveCount(1);
    await expect(page.locator('a[href="tel:+5567992368049"]')).toHaveCount(1);
    await expect(route === "/" ? page.locator(".contact-email") : page.getByTestId("card-email-address")).toHaveAttribute("href", "/contato");
    await expect(page.getByAltText(/^Retrato profissional/)).toHaveAttribute(
      "src",
      /marco-barbosa/,
    );
    await expect(page.locator('a[href*="linkedin.com/in/"]')).toHaveCount(1);
    await expect(page.locator("body")).not.toContainText(
      /99939|marcobarbo@gmail\.com/,
    );
  }
  const whatsapp = await page
    .locator('a[href^="https://wa.me/"]')
    .boundingBox();
  const email = await page.getByTestId("card-email-address").boundingBox();
  const details = await page
    .getByRole("list", { name: "Principais áreas profissionais" })
    .boundingBox();
  expect(whatsapp.y).toBeLessThan(750);
  expect(email.y).toBeLessThan(details.y);
  expect((await page.getByTestId("download-vcf").boundingBox()).y).toBeLessThan(
    details.y,
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  const portrait = await page
    .getByAltText(/^Retrato profissional/)
    .boundingBox();
  expect(portrait.height).toBeLessThanOrEqual(450);
  expect(portrait.width / portrait.height).toBeGreaterThan(0.65);
});

for (const mode of [
  "copy-denied",
  "fallback-false",
  "share-abort",
  "share-denied",
  "share-ok",
  "copy-ok",
  "fallback-ok",
]) {
  test(`compartilhamento local: ${mode}`, async ({ page }) => {
    await page.addInitScript((mode) => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: mode.startsWith("fallback")
          ? undefined
          : {
              writeText: async () => {
                if (mode.includes("denied"))
                  throw new DOMException("Denied", "NotAllowedError");
              },
            },
      });
      document.execCommand = () => mode === "fallback-ok";
      Object.defineProperty(navigator, "share", {
        configurable: true,
        value: async () => {
          if (mode === "share-abort")
            throw new DOMException("Cancelled", "AbortError");
          if (mode === "share-denied")
            throw new DOMException("Denied", "NotAllowedError");
        },
      });
    }, mode);
    await page.goto("/cartao");
    await page
      .getByTestId(mode.startsWith("share") ? "share-card" : "copy-card")
      .click();
    const status = page.getByTestId("share-status");
    if (mode.includes("denied") || mode === "fallback-false") {
      await expect(status).toContainText("Não foi possível copiar");
      await expect(status).not.toContainText("Link copiado");
    } else if (mode === "share-abort")
      await expect(status).toHaveText("Compartilhamento cancelado.");
    else if (mode === "share-ok")
      await expect(status).toHaveText("Cartão compartilhado.");
    else await expect(status).toHaveText("Link do cartão copiado.");
    await expect(page.locator("textarea")).toHaveCount(0);
  });
}

test("sitemap, âncoras e ausência de rotas de rascunho", async ({
  page,
  request,
}) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  expect(urls.sort()).toEqual([
    ...routes,
    practiceContent.collection.basePath,
    ...practiceContent.articles.map(({ slug }) => `${practiceContent.collection.basePath}/${slug}`),
  ].sort());
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page
      .locator('a[href^="#"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")))) {
      expect(href.length).toBeGreaterThan(1);
      await expect(page.locator(href)).toHaveCount(1);
    }
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => [
        ...new Set(links.map((link) => link.getAttribute("href"))),
      ])) {
      expect((await request.get(href.split("#")[0] || "/")).ok()).toBe(true);
    }
  }
  for (const path of ["/rascunhos", "/trajetoria", "/demonstracoes"])
    expect((await request.get(path)).status()).toBe(404);
});

test("conteúdo incompleto não atravessa o filtro de publicação", () => {
  const entry = {
    approved: true,
    title: "Exemplo de teste",
    date: "2026-09-19",
    institution: "Teste",
    theme: "Teste",
    role: "Teste",
    description: "Teste",
    source: "Teste",
    usage: "Autorizado",
  };
  expect(approvedTrajectory([entry])).toHaveLength(1);
  expect(
    approvedTrajectory([
      { ...entry, approved: false },
      { ...entry, source: "" },
    ]),
  ).toEqual([]);
  const demo = {
    ...entry,
    image: "/exemplo.png",
    alt: "Teste",
    technique: "Teste",
    observation: "Teste",
    indication: "Teste",
    limitation: "Teste",
  };
  expect(approvedDemonstrations([demo])).toHaveLength(1);
  expect(
    approvedDemonstrations([
      { ...demo, image: "//externo/exemplo.png" },
      { ...demo, limitation: "" },
    ]),
  ).toEqual([]);
});

test("texto ampliado e redução de movimento", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(route);
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/");
  expect(
    await page
      .locator(".featured-training-badge")
      .evaluate((el) => getComputedStyle(el).animationDuration),
  ).toBe("1e-05s");
});


test("resumo FaCiencia confirmado e associação APECOF preservada", async ({ page }) => {
  await page.goto("/#formacao-card");
  await expect(page.getByRole("list", { name: "Formação acadêmica" })).toContainText(
    "Pós-graduação em Análise de Dados pela Faculdade FaCiencia, 360 horas, período de 2023 a 2024, concluída.",
  );
  await expect(page.getByTestId("apecof-membership")).toContainText("Associado à Associação Nacional dos Peritos em Computação Forense - APECOF.");
  await page.goto("/");
  const logo = page.getByRole("img", { name: "Logotipo da APECOF" });
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute("src", /apecof/);
  for (const [width, size] of [[390, 128], [768, 144], [1440, 160]]) {
    await page.setViewportSize({ width, height: 900 });
    await expect.poll(() => logo.locator("..").evaluate((el) => el.getBoundingClientRect().width)).toBe(size);
  }
});
