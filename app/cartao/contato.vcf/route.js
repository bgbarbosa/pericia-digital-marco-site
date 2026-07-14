import { profile } from "@/data/profile";
import { requestAwareUrl } from "@/lib/site-url";

function escapeVCard(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export async function GET(request) {
  const siteUrl = requestAwareUrl(request.url, "/");
  const [firstName, ...lastNameParts] = profile.name.split(" ");
  const lastName = lastNameParts.join(" ");
  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVCard(lastName)};${escapeVCard(firstName)};;;`,
    `FN:${escapeVCard(profile.name)}`,
    `TEL;TYPE=CELL:${profile.phone.international}`,
    `EMAIL;TYPE=INTERNET:${profile.email}`,
    `URL:${siteUrl}`,
    `NOTE:${escapeVCard(profile.title)}`,
    "END:VCARD",
    "",
  ].join("\r\n");

  return new Response(vCard, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Disposition":
        'attachment; filename="marco-aurelio-pereira-barbosa.vcf"',
      "Content-Type": "text/vcard; charset=utf-8",
    },
  });
}
