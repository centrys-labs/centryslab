import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { projects, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const newest = posts[0]?.updated ?? posts[0]?.date;
  const newestDate = newest ? new Date(`${newest}T00:00:00Z`) : undefined;

  return [
    {
      url: site.url,
      ...(newestDate ? { lastModified: newestDate } : {}),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/blog`,
      ...(newestDate ? { lastModified: newestDate } : {}),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(`${post.updated ?? post.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
