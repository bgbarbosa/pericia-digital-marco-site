import QRCode from "qrcode";

import { requestAwareUrl } from "@/lib/site-url";

export const runtime = "nodejs";

export async function GET(request) {
  const target = requestAwareUrl(request.url, "/cartao");
  const svg = await QRCode.toString(target, {
    type: "svg",
    width: 360,
    margin: 2,
    errorCorrectionLevel: "H",
    color: {
      dark: "#071426",
      light: "#ffffff",
    },
  });

  return new Response(svg, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "image/svg+xml; charset=utf-8",
      "X-QR-Code-Target": target,
    },
  });
}
