import "server-only";
import { articlePrefix, metricSources, metricsOrigin } from "@/lib/metrics";
import { publicPagePaths } from "@/lib/public-pages";

const panelEndpoint = "https://painel-autoridade-digital-mb.marcobarbosa.chatgpt.site/api/collect";
const pagePaths = new Set(publicPagePaths);
const collectableEvents = ["view", "guide_click", "profile_click", "contact_click"];
const expectedHost = new URL(metricsOrigin).host;

export function metricsRequestAllowed(request) {
  const host = request.headers.get("host") || new URL(request.url).host;
  const fetchSite = request.headers.get("sec-fetch-site");
  return process.env.VERCEL_ENV === "production" &&
    host === expectedHost &&
    request.headers.get("origin") === metricsOrigin &&
    (!fetchSite || fetchSite === "same-origin");
}

export function metricsRequestOptOut(request) {
  return ["dnt", "sec-gpc", "x-mb-metrics-opt-out"].some((header) => request.headers.get(header) === "1");
}

export function validateBrowserMetric(input) {
  if (!input || typeof input !== "object" || Object.keys(input).length !== 3) return false;
  const { event, path, source } = input;
  if (!collectableEvents.includes(event) || typeof path !== "string" ||
      path.length > 200 || !pagePaths.has(path)) return false;
  if (event === "view") return metricSources.includes(source);
  if (source !== "internal") return false;
  return event === "contact_click" || path.startsWith(articlePrefix);
}

export async function sendMetric(metric) {
  const token = process.env.MB_METRICS_PANEL_TOKEN;
  const writeKey = process.env.MB_METRICS_WRITE_KEY;
  if (!token || !writeKey) return false;
  try {
    const response = await fetch(panelEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OAI-Sites-Authorization": `Bearer ${token}`,
        "X-MB-Metrics-Key": writeKey,
      },
      body: JSON.stringify(metric),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(2_000),
    });
    return response.status === 204;
  } catch {
    return false;
  }
}
