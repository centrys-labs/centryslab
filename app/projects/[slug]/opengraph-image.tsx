import { projects, site } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `A project from ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  return renderOgImage({
    title: project?.name ?? site.name,
    meta: project ? project.description : site.name,
  });
}
