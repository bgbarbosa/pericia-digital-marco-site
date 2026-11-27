import { expect, test } from "@playwright/test";

const article = "/pericia-na-pratica/preservacao-evidencias-digitais";

test("a prévia local rejeita a coleta após navegar pelo artigo", async ({ page, request }) => {
  const metrics = [];
  page.on("request", (req) => {
    if (new URL(req.url()).pathname === "/api/medicao") metrics.push(req.method());
  });

  await page.goto(article);
  await page.locator('article a[href="/perfil"]').first().click();
  await expect(page).toHaveURL(/\/perfil$/);
  expect(metrics).toEqual([]);

  const response = await request.post("/api/medicao", {
    data: { event: "view", path: article, source: "direct" },
  });
  expect(response.status()).toBe(403);
});
