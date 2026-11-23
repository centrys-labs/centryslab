import type { Element, Root } from "hast";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified, type Plugin } from "unified";
import { visit } from "unist-util-visit";

const org = "centrys-labs";

/** Fetch the repository README. Returns null when GitHub is unreachable. */
export async function fetchReadme(slug: string): Promise<string | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.raw+json",
      "User-Agent": "centrys-labs-site",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${org}/${slug}/readme`,
      {
        headers,
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
      },
    );

    if (!response.ok) return null;
    const body = await response.text();
    return body.trim().length > 0 ? body : null;
  } catch {
    return null;
  }
}

const schema = {
  ...defaultSchema,
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "figure",
    "figcaption",
    "details",
    "summary",
    "picture",
    "source",
    "kbd",
  ],
  attributes: {
    ...defaultSchema.attributes,
    "*": [...(defaultSchema.attributes?.["*"] ?? []), "className", "align"],
    code: [...(defaultSchema.attributes?.code ?? []), "className", "style"],
    span: [...(defaultSchema.attributes?.span ?? []), "className", "style"],
    pre: [
      ...(defaultSchema.attributes?.pre ?? []),
      "className",
      "style",
      "data-language",
    ],
    img: [...(defaultSchema.attributes?.img ?? []), "width", "height"],
  },
};

/** README links are relative to the repository; make them absolute. */
const rewriteRelativeLinks =
  (slug: string): Plugin<[], Root> =>
  () =>
  (tree) => {
    const linkBase = `https://github.com/${org}/${slug}/blob/HEAD/`;
    const rawBase = `https://raw.githubusercontent.com/${org}/${slug}/HEAD/`;

    visit(tree, "element", (node: Element) => {
      const properties = node.properties;
      if (!properties) return;

      const href = properties.href;
      if (typeof href === "string" && !/^(https?:|mailto:|#|\/\/)/.test(href)) {
        properties.href = new URL(href, linkBase).href;
      }

      const src = properties.src;
      if (typeof src === "string" && !/^(https?:|data:|\/\/)/.test(src)) {
        properties.src = new URL(src, rawBase).href;
      }
    });
  };

/** READMEs start at h1; the page already has one, so demote every heading. */
const demoteHeadings: Plugin<[], Root> = () => (tree) => {
  visit(tree, "element", (node: Element) => {
    const match = /^h([1-5])$/.exec(node.tagName);
    if (match) node.tagName = `h${Number(match[1]) + 1}`;
  });
};

/** Markdown (no MDX expressions) to sanitized HTML. */
export async function renderReadme(
  slug: string,
  markdown: string,
): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize, schema)
    .use(rewriteRelativeLinks(slug))
    .use(demoteHeadings)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark" },
      keepBackground: false,
      defaultLang: "plaintext",
    })
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}
