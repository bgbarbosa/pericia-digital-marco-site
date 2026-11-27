export const metricsOrigin = "https://pericia-digital-marco-site.vercel.app";
export const articlePrefix = "/pericia-na-pratica/";
export const metricSources = [
  "direct", "google", "bing", "search_other", "ai", "dama", "social", "external", "internal",
];

export function metricsOptOut() {
  return navigator.globalPrivacyControl === true ||
    navigator.doNotTrack === "1" || window.doNotTrack === "1";
}

function domainMatches(host, domains) {
  return domains.some((domain) => host === domain || host.endsWith(`.${domain}`));
}

export function metricReferrer(referrer) {
  let url;
  try {
    url = new URL(referrer);
  } catch {
    return "direct";
  }
  if (url.origin === metricsOrigin) return "internal";
  const host = url.hostname;
  if (domainMatches(host, [
    "chatgpt.com", "openai.com", "gemini.google.com", "perplexity.ai", "copilot.microsoft.com", "claude.ai", "grok.com",
  ])) return "ai";
  if (domainMatches(host, ["google.com", "google.com.br", "google.co.uk"])) return "google";
  if (domainMatches(host, ["bing.com"])) return "bing";
  if (domainMatches(host, ["duckduckgo.com", "search.yahoo.com", "search.brave.com", "ecosia.org"])) return "search_other";
  if (domainMatches(host, ["damauniverse.com.br", "dama-universe.vercel.app"])) return "dama";
  if (domainMatches(host, [
    "facebook.com", "instagram.com", "linkedin.com", "lnkd.in", "x.com", "twitter.com", "t.co",
    "whatsapp.com", "wa.me", "reddit.com", "youtube.com",
  ])) return "social";
  return "external";
}
