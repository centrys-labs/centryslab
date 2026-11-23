import { hero, site } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${hero.heading} ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgImage({
    title: hero.heading,
    meta: `${hero.hash} (HEAD -> main) ${site.name}`,
  });
}
