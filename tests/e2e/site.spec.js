import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile-320", width: 320, height: 800 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-430", width: 430, height: 932 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

for (const viewport of viewports) {
  test(`página inicial não possui rolagem horizontal em ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Perícia Digital, Computação Forense e Evidências Digitais/i,
      }),
    ).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}

test("menu móvel é acessível, fecha por seleção e Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const menuButton = page.locator('button[aria-controls="mobile-menu"]');
  await menuButton.click();
  await expect(page.getByRole("navigation", { name: "Navegação móvel" })).toBeVisible();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");

  await page.getByRole("link", { name: "Especialização", exact: true }).click();
  await expect(page).toHaveURL(/#especializacao$/);
  await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );

  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("âncoras e imagens principais estão disponíveis", async ({ page }) => {
  await page.goto("/");

  for (const id of [
    "inicio",
    "pericia-digital",
    "especializacao",
    "trajetoria",
    "credenciais",
    "contato",
  ]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }

  for (const image of [
    page.getByAltText(/Retrato profissional/i),
    page.getByAltText(/Logotipo da APECOF/i),
  ]) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);
  }
});

test("cartão virtual oferece contatos, QR Code, VCF e compartilhamento alternativo", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: undefined,
    });
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/cartao");

  await expect(page.getByRole("heading", { level: 1, name: /Marco Aurélio/i })).toBeVisible();
  await expect(page.locator('a[href^="https://wa.me/"]')).toBeVisible();
  await expect(page.locator('a[href^="tel:"]')).toBeVisible();
  await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
  await expect(page.getByTestId("download-vcf")).toHaveAttribute("href", "/cartao/contato.vcf");

  const qrCode = page.getByTestId("qr-code");
  await expect(qrCode).toBeVisible();
  await expect.poll(() => qrCode.evaluate((element) => element.complete && element.naturalWidth > 0)).toBe(true);

  await page.getByTestId("share-card").click();
  await expect(page.getByTestId("share-status")).toContainText(/Link copiado/i);

  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
});

test("rotas auxiliares e metadados respondem corretamente", async ({ page, request }) => {
  const vcfResponse = await request.get("/cartao/contato.vcf");
  expect(vcfResponse.ok()).toBe(true);
  expect(vcfResponse.headers()["content-type"]).toContain("text/vcard");
  const vcf = await vcfResponse.text();
  expect(vcf).toContain("FN:Marco Aurélio Pereira Barbosa");
  expect(vcf).toContain("TEL;TYPE=CELL:+5567999398990");
  expect(vcf).toContain("EMAIL;TYPE=INTERNET:marcobarbo@gmail.com");
  expect(vcf).toContain("URL:http://127.0.0.1:3100/");

  const qrResponse = await request.get("/cartao/qr-code");
  expect(qrResponse.ok()).toBe(true);
  expect(qrResponse.headers()["content-type"]).toContain("image/svg+xml");
  expect(qrResponse.headers()["x-qr-code-target"]).toBe("http://127.0.0.1:3100/cartao");
  expect(await qrResponse.text()).toContain("<svg");

  for (const imagePath of ["/opengraph-image", "/cartao/opengraph-image"]) {
    const imageResponse = await request.get(imagePath);
    expect(imageResponse.ok()).toBe(true);
    expect(imageResponse.headers()["content-type"]).toContain("image/png");
  }

  await page.goto("/cartao");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /Cartão profissional/i,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "http://127.0.0.1:3100/cartao",
  );
});

test("cabeçalhos defensivos são enviados", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();

  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toContain("camera=()");
});
