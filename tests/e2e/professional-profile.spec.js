import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";

for (const width of [320, 390, 768, 1280, 1440]) {
  test(`marca e perfil sem transbordamento em ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize({ width, height: 1000 });
    for (const path of ["/", "/cartao", "/perfil"]) {
      expect((await page.goto(path)).status()).toBe(200);
      const logo = page.locator(".site-header").getByRole("link", { name: "Marco Barbosa — abrir perfil e currículo", exact: true });
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute("href", "/perfil");
      await expect.poll(() => logo.locator("img").evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      const logoBox = await logo.boundingBox();
      expect(logoBox.height).toBeGreaterThanOrEqual(44);
      if ([390, 1440].includes(width)) {
        await page.screenshot({ path: `build/marca-marco-20261021/${path === "/" ? "home" : path.slice(1)}-${width}.png` });
      }
    }
    expect(errors).toEqual([]);
  });
}

test("logo leva ao perfil por teclado e mantém currículo, autoria e cartão", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const logo = page.locator(".site-header a").first();
  await logo.focus();
  await expect(logo).toBeFocused();
  expect(await logo.evaluate(element => getComputedStyle(element).outlineStyle)).toBe("solid");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/perfil$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Marco Barbosa");
  await expect(page.getByText("É também o criador do", { exact: false })).toBeVisible();
  await expect(page.locator('#formacao').getByText(/Em andamento/)).toBeVisible();
  await expect(page.locator('#qualificacoes > ul > li')).toHaveCount(12);
  await expect(page.getByTestId("selected-tool-dama-gestor-rh")).toContainText("Projeto sob consulta");
  await expect(page.locator('[data-testid^="selected-tool-"]')).toHaveCount(2);
  await expect(page.getByRole("link", { name: "Baixar currículo em PDF", exact: true })).toHaveAttribute("download", "");
  await page.getByRole("link", { name: "Abrir cartão digital", exact: true }).click();
  await expect(page).toHaveURL(/\/cartao$/);
  await expect(page.getByTestId("qr-code")).toBeVisible();
  await expect(page.getByTestId("download-vcf")).toBeVisible();
  await page.getByRole("link", { name: "Perfil e currículo →", exact: true }).click();
  await expect(page).toHaveURL(/\/perfil$/);
});

test("currículo mantém os bytes originais e perfil entra no sitemap e SEO", async ({ request, page }) => {
  const pdf = await request.get("/documentos/curriculo-marco-barbosa-2026-10.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect(createHash("sha256").update(await pdf.body()).digest("hex")).toBe("4eddea9ad419793b59f7befcaaae3bb6576d6f6b1222007d75a0e39f6a544182");
  expect(await (await request.get("/sitemap.xml")).text()).toContain("/perfil</loc>");
  await page.goto("/perfil");
  await expect(page).toHaveTitle(/Perfil e currículo de Marco Barbosa/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "http://127.0.0.1:3100/perfil");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Perfil e currículo/);
});
