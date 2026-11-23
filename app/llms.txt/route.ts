import { getPosts } from "@/lib/blog";
import { projects, site } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const posts = getPosts();

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.orgDescription}`,
    "",
    site.positioning,
    "",
    `Site: ${site.url}`,
    `GitHub: ${site.github}`,
    `Contact: ${site.email}`,
    "",
    "## Projects",
    "",
    ...projects.map(
      (project) =>
        `- [${project.name}](${project.repo}): ${project.description} ${project.language}, ${project.license}. Page: ${site.url}/projects/${project.slug}`,
    ),
    "",
    "## Blog",
    "",
    ...(posts.length > 0
      ? posts.map(
          (post) =>
            `- [${post.title}](${site.url}/blog/${post.slug}) — ${post.date}: ${post.description}`,
        )
      : [`- No posts published yet: ${site.url}/blog`]),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
