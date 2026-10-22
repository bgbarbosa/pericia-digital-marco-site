import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  for (const deviceScaleFactor of [1, 2]) {
    test.describe(`cabeçalho ${width}px em ${deviceScaleFactor}x`, () => {
      test.use({ viewport: { width, height: 1000 }, deviceScaleFactor });

      test("entrega a matriz sem subdimensionar e mantém o card acessível", async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto("/");
        const header = page.locator(".site-header");
        const logo = header.locator('a[href="/perfil"]');
        const image = logo.locator("img");
        await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
        const pixels = await image.evaluate(element => ({
          source: new URL(element.currentSrc).pathname,
          available: element.naturalWidth,
          required: element.getBoundingClientRect().width * devicePixelRatio,
          filter: getComputedStyle(element).filter,
          transform: getComputedStyle(element).transform,
        }));
        expect(pixels.source).toBe("/marca/marco-barbosa-logo-oficial.jpg");
        expect(pixels.available).toBeGreaterThanOrEqual(pixels.required);
        expect(pixels.filter).toBe("none");
        expect(pixels.transform).toBe("none");

        if (width < 1280) await page.getByRole("button", { name: "Abrir menu", exact: true }).click();
        const card = header.locator("a.header-ecosystem-card:visible");
        await expect(card).toHaveCount(1);
        await expect(card).toHaveAccessibleName("Dama Universe");
        await expect(card).toHaveAttribute("href", "https://damauniverse.com.br");
        await expect(card).toHaveAttribute("target", "_blank");
        await expect(card).toHaveAttribute("rel", "noopener noreferrer");
        await expect(card.locator("a, button")).toHaveCount(0);
        const box = await card.boundingBox();
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(await card.evaluate(element => {
          const rect = element.getBoundingClientRect();
          return document.elementFromPoint(rect.left + 4, rect.top + rect.height / 2)?.closest("a") === element;
        })).toBe(true);
        await card.focus();
        await page.keyboard.press("Tab");
        await page.keyboard.press("Shift+Tab");
        await expect(card).toBeFocused();
        expect(await card.evaluate(element => getComputedStyle(element).outlineStyle)).toBe("solid");
        expect(await card.evaluate(element => parseFloat(getComputedStyle(element).transitionDuration))).toBeLessThanOrEqual(.001);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
      });
    });
  }
}
