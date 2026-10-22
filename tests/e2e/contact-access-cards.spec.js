import { expect, test } from "@playwright/test";

const accesses = [
  { label: "LinkedIn profissional", href: "https://www.linkedin.com/in/marco-aur%C3%A9lio-barbosa-79850926a/" },
  { label: "Dama Universe", href: "https://damauniverse.com.br" },
  { label: "Perfil e currículo", href: "/perfil" },
];

for (const width of [320, 360, 375, 390, 430, 768, 1024, 1440]) {
  test(`Contato mantém painéis e alinha os três acessos em ${width}px`, async ({ page }) => {
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewportSize({ width, height: 1100 });
    await page.goto("/");
    const contact = page.locator("#contato");
    const panels = contact.locator(".contact-grid > *");
    await expect(panels).toHaveCount(3);
    await expect(panels.locator("h3")).toHaveText(["Base profissional", "WhatsApp e telefone", "E-mail"]);
    await expect(panels.nth(0)).toContainText("Campo Grande/MS");
    await expect(panels.locator('a[href="https://wa.me/5567992368049"]')).toHaveCount(1);
    await expect(panels.locator('a[href="tel:+5567992368049"]')).toHaveCount(1);
    await expect(panels.locator(".contact-email")).toHaveAttribute("href", "/contato");
    await expect(contact.locator(".contact-grid > a")).toHaveCount(0);
    await expect(contact.locator(".contact-links")).toHaveCount(0);
    const group = contact.getByRole("group", { name: "Mais acessos profissionais" });
    const cards = group.getByRole("link");
    await expect(cards).toHaveCount(3);
    const cardBoxes = [];
    for (const [index, access] of accesses.entries()) {
      const card = cards.nth(index);
      await expect(card).toHaveAccessibleName(access.label);
      await expect(card).toHaveAttribute("href", access.href);
      await expect(contact.getByRole("link", { name: access.label, exact: true })).toHaveCount(1);
      await expect(card.locator("a,button")).toHaveCount(0);
      await card.scrollIntoViewIfNeeded();
      expect(await card.evaluate(element => {
        const rect = element.getBoundingClientRect();
        return [[4, rect.height / 2], [rect.width - 4, rect.height / 2], [rect.width / 2, 4], [rect.width / 2, rect.height - 4]].every(([x, y]) => document.elementFromPoint(rect.left + x, rect.top + y)?.closest("a") === element);
      })).toBe(true);
      const box = await card.evaluate(element => {
        const rect = element.getBoundingClientRect();
        return { x: rect.x, y: rect.y + scrollY, width: rect.width, height: rect.height, overflow: element.scrollWidth > element.clientWidth };
      });
      expect(box.height).toBeGreaterThanOrEqual(48);
      expect(box.overflow).toBe(false);
      cardBoxes.push(box);
    }
    const panelBoxes = await panels.evaluateAll(elements => elements.map(element => {
      const rect = element.getBoundingClientRect();
      return { x: rect.x, width: rect.width };
    }));
    if (width >= 1024) {
      for (let index = 0; index < 3; index++) {
        expect(cardBoxes[index].x).toBeCloseTo(panelBoxes[index].x, 0);
        expect(cardBoxes[index].width).toBeCloseTo(panelBoxes[index].width, 0);
        expect(cardBoxes[index].y).toBeCloseTo(cardBoxes[0].y, 0);
      }
    } else {
      for (let index = 0; index < 3; index++) {
        expect(cardBoxes[index].x).toBeCloseTo(panelBoxes[0].x, 0);
        expect(cardBoxes[index].width).toBeCloseTo(panelBoxes[0].width, 0);
        if (index > 0) expect(cardBoxes[index].y).toBeGreaterThan(cardBoxes[index - 1].y + cardBoxes[index - 1].height);
      }
    }
    await expect(page.locator("footer").getByRole("link", { name: "Perfil e currículo", exact: true })).toHaveCount(0);
    await expect(page.locator('footer a[href="/perfil"] img')).toHaveCount(1);
    await expect(page.locator("footer")).toContainText("não constituem manifestação institucional");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}

for (const width of [390, 1440]) {
  test(`Tab, foco e texto ampliado nos acessos de Contato em ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const cards = page.locator(".contact-link-grid > a");
    await expect(cards.first()).toHaveCSS("min-height", "64px");
    await cards.first().focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    for (let index = 0; index < 3; index++) {
      const card = cards.nth(index);
      await expect(card).toBeFocused();
      await expect(card).toHaveCSS("outline-style", "solid");
      await expect(card).toHaveCSS("outline-width", "3px");
      expect(await card.evaluate(element => element.matches(":focus-visible"))).toBe(true);
      expect(await card.evaluate(element => parseFloat(getComputedStyle(element).transitionDuration))).toBeLessThanOrEqual(.001);
      await page.keyboard.press("Tab");
    }
    await expect(page.locator('footer a[href="/perfil"]').first()).toBeFocused();
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    for (const card of await cards.all()) {
      expect(await card.evaluate(element => element.scrollWidth <= element.clientWidth)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
  });
}

for (const access of accesses) {
  for (const method of ["borda", "Enter"]) {
    test(`${access.label} funciona pela ${method}`, async ({ page }) => {
      const external = access.href.startsWith("https:");
      if (external) {
        await page.context().route(new URL(access.href).href, route => route.fulfill({ status: 200, contentType: "text/html", body: "<title>Destino externo controlado</title>" }));
      }
      await page.goto("/");
      const card = page.locator(".contact-link-grid").getByRole("link", { name: access.label, exact: true });
      const activate = async () => {
        if (method === "Enter") {
          await card.focus();
          await page.keyboard.press("Enter");
        } else {
          await card.click({ position: { x: 4, y: 24 } });
        }
      };
      if (external) {
        await expect(card).toHaveAttribute("target", "_blank");
        await expect(card).toHaveAttribute("rel", "noopener noreferrer");
        const popupPromise = page.waitForEvent("popup");
        await activate();
        const popup = await popupPromise;
        await expect(popup).toHaveURL(new URL(access.href).href);
        await popup.close();
      } else {
        expect(await card.getAttribute("target")).toBeNull();
        await activate();
        await expect(page).toHaveURL(/\/perfil$/);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText("Marco Barbosa");
      }
    });
  }
}

test("outras rotas preservam o link textual e a marca no rodapé", async ({ page }) => {
  for (const path of ["/contato", "/cartao", "/perfil", "/aplicacoes", "/pericia-na-pratica"]) {
    expect((await page.goto(path)).status()).toBe(200);
    await expect(page.locator("footer").getByRole("link", { name: "Perfil e currículo", exact: true })).toHaveAttribute("href", "/perfil");
    await expect(page.locator('footer a[href="/perfil"] img')).toHaveCount(1);
    await expect(page.locator("footer")).toContainText("não constituem manifestação institucional");
  }
});
