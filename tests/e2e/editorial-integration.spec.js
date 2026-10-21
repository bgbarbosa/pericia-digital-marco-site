import { expect, test } from "@playwright/test";
import { damaEditorial } from "../../data/dama-editorial";

for (const width of [390, 1440]) {
  test(`vitrine selecionada e navegação cruzada em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/aplicacoes");
    const section = page.getByRole("region", { name: "Projetos e ferramentas autorais" });
    await expect(section.getByRole("article")).toHaveCount(2);
    for (const tool of damaEditorial.tools) {
      const link = section.getByRole("link", { name: tool.action, exact: true });
      await expect(link).toHaveAttribute("href", tool.href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
      await expect(link).toContainText(tool.status);
      await expect(link.locator("a,button,[tabindex]")).toHaveCount(0);
      await link.focus();
      await page.keyboard.press("Shift+Tab");
      await page.keyboard.press("Tab");
      await expect(link).toBeFocused();
      expect(await link.evaluate(el => getComputedStyle(el).outlineStyle)).not.toBe("none");
    }
    await expect(section.getByRole("link", { name: "Utilidade Pública no Dama Universe" })).toHaveAttribute("href", damaEditorial.publicUtility);
    const siteHeader = page.locator(".site-header");
    if (width < 1280) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await expect(page.getByRole("navigation", { name: "Navegação móvel" }).getByRole("link", { name: "Dama Universe", exact: true })).toBeVisible();
      await page.keyboard.press("Escape");
    } else {
      await expect(siteHeader.getByRole("link", { name: "Dama Universe", exact: true })).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
