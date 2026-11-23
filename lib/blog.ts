import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";

const blogDir = path.join(process.cwd(), "content", "blog");

const frontmatterSchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1).max(155),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, "date must be ISO (YYYY-MM-DD)"),
  updated: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}/, "updated must be ISO (YYYY-MM-DD)")
    .optional(),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().default(false),
});

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  draft: boolean;
  body: string;
  hash: string;
  minutes: number;
  words: number;
  headings: { id: string; text: string; level: 2 | 3 }[];
};

/** Deterministic 7-character commit hash for a post. */
export function postHash(slug: string): string {
  return crypto.createHash("sha1").update(slug).digest("hex").slice(0, 7);
}

export function formatDate(iso: string): string {
  return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toISOString().slice(0, 10);
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(body: string): Post["headings"] {
  const headings: Post["headings"] = [];
  let inFence = false;
  for (const line of body.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    headings.push({
      id: slugifyHeading(match[2]),
      text: match[2].trim(),
      level: match[1].length as 2 | 3,
    });
  }
  return headings;
}

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const filePath = path.join(blogDir, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const result = frontmatterSchema.safeParse(parsed.data);

  if (!result.success) {
    throw new Error(
      `Invalid frontmatter in content/blog/${fileName}:\n${result.error.issues
        .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`,
    );
  }

  const data = result.data;
  const stats = readingTime(parsed.content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: formatDate(data.date),
    updated: data.updated ? formatDate(data.updated) : undefined,
    tags: data.tags ?? [],
    draft: data.draft,
    body: parsed.content,
    hash: postHash(slug),
    minutes: Math.max(1, Math.round(stats.minutes)),
    words: stats.words,
    headings: extractHeadings(parsed.content),
  };
}

/**
 * Published posts, newest first. Drafts are visible in development so the
 * sample post can be written, and excluded from every production surface.
 */
export function getPosts(): Post[] {
  if (!fs.existsSync(blogDir)) return [];

  const posts = fs
    .readdirSync(blogDir)
    .filter((file) => /\.mdx?$/.test(file))
    .map(readPost)
    .filter((post) => process.env.NODE_ENV !== "production" || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return posts;
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((post) => post.slug === slug);
}

/**
 * Plain Markdown for `curl`: the title as an H1, frontmatter already removed,
 * and MDX-only comments stripped so the output is valid Markdown.
 */
export function postMarkdown(post: Post): string {
  const body = post.body
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return `# ${post.title}\n\n${body}\n`;
}
