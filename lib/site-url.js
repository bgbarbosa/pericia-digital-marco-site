const DEVELOPMENT_URL = "http://localhost:3000";

function parseUrl(value, variableName) {
  if (!value) {
    return null;
  }

  const normalized = /^https?:\/\//i.test(value) ? value : `https://${value}`;

  try {
    const url = new URL(normalized);
    url.pathname = "/";
    url.search = "";
    url.hash = "";
    return url;
  } catch {
    throw new Error(`${variableName} deve conter uma URL HTTP ou HTTPS válida.`);
  }
}

const configuredUrl = parseUrl(
  process.env.NEXT_PUBLIC_SITE_URL?.trim(),
  "NEXT_PUBLIC_SITE_URL",
);
const vercelUrl = parseUrl(
  process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    process.env.VERCEL_URL?.trim(),
  "VERCEL_URL",
);

export const publicSiteUrl = configuredUrl || vercelUrl;
export const metadataBase = publicSiteUrl || new URL(DEVELOPMENT_URL);
export const hasPublicSiteUrl = Boolean(publicSiteUrl);

export function absoluteUrl(path = "/") {
  return new URL(path, metadataBase).toString();
}

export function publicAbsoluteUrl(path = "/") {
  return publicSiteUrl ? new URL(path, publicSiteUrl).toString() : null;
}

export function requestAwareUrl(requestUrl, path = "/") {
  const requestOrigin = new URL(requestUrl).origin;
  return new URL(path, publicSiteUrl || requestOrigin).toString();
}

export function displaySiteAddress(path = "") {
  const url = new URL(path || "/", metadataBase);
  const pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "");
  return `${url.host}${pathname}`;
}
