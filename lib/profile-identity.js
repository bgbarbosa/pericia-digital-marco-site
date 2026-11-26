import { profile } from "@/data/profile";
import { publicAbsoluteUrl } from "@/lib/site-url";

export const profilePath = "/perfil";
const profileUrl = publicAbsoluteUrl(profilePath);

export const profilePerson = {
  "@type": "Person",
  "@id": `${profileUrl}#person`,
  name: profile.name,
  alternateName: profile.displayName,
  url: profileUrl,
};

export function personForByline(name) {
  if (name === profilePerson.name || name === profilePerson.alternateName) return profilePerson;
  return { "@type": "Person", name };
}
