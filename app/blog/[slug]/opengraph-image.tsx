import { getPost } from "@/lib/blog";
import { blog, site } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `A post from ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgImage({
    title: post?.title ?? blog.title,
    meta: `blog/${slug} · ${site.name}`,
  });
}
