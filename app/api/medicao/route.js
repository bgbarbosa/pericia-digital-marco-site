import {
  metricsRequestAllowed, metricsRequestOptOut, sendMetric, validateBrowserMetric,
} from "@/lib/metrics-server";

export const runtime = "nodejs";
const MAX_BODY = 512;

function reply(status) {
  return new Response(null, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request) {
  if (!metricsRequestAllowed(request)) return reply(403);
  if (metricsRequestOptOut(request)) return reply(204);
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return reply(415);
  if (Number(request.headers.get("content-length")) > MAX_BODY) return reply(413);
  if (!request.body) return reply(400);

  const reader = request.body.getReader();
  const bytes = new Uint8Array(MAX_BODY);
  let length = 0;
  let metric;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (length + value.byteLength > MAX_BODY) {
        await reader.cancel();
        return reply(413);
      }
      bytes.set(value, length);
      length += value.byteLength;
    }
    metric = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes.subarray(0, length)));
  } catch {
    return reply(400);
  } finally {
    reader.releaseLock();
  }

  if (!validateBrowserMetric(metric)) return reply(400);
  return reply(await sendMetric(metric) ? 204 : 503);
}
