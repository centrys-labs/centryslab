import type { Metadata } from "next";

export const site = {
  name: "Centrys Labs",
  url: "https://centrys.ai.id",
  tagline: "For the things worth building.",
  description:
    "Centrys Labs makes software we wanted to use ourselves: gitway, repolith and stagezero.",
  orgDescription: "making software we wanted to use ourselves.",
  positioning:
    "We build software, tools, and infrastructure for developers and beyond.",
  location: "Indonesia",
  email: "help@centrys.ai.id",
  github: "https://github.com/centrys-labs",
  repositories: "https://github.com/orgs/centrys-labs/repositories",
  themeColor: "#1e2327",
} as const;

export type Lane = 1 | 2 | 3;

export type Project = {
  slug: string;
  name: string;
  /** Verbatim repository description. */
  description: string;
  /** Short form used by the terminal and the plain-text version. */
  plain: string;
  body: string;
  language: string;
  license: string;
  licenseUrl: string;
  lane: Lane;
  hash: string;
  repo: string;
  metaDescription: string;
};

export const projects: Project[] = [
  {
    slug: "gitway",
    name: "gitway",
    description: "A GitHub workspace in your terminal.",
    plain: "a GitHub workspace in your terminal",
    body: "You already live in the shell. Your issues and pull requests shouldn’t make you leave it.",
    language: "TypeScript",
    license: "MIT",
    licenseUrl: "https://spdx.org/licenses/MIT.html",
    lane: 1,
    hash: "a3f9c1e",
    repo: "https://github.com/centrys-labs/gitway",
    metaDescription:
      "gitway is a GitHub workspace in your terminal, built by Centrys Labs. Written in TypeScript and released under the MIT license.",
  },
  {
    slug: "repolith",
    name: "repolith",
    description: "An AI-native GitHub experience for modern software collaboration.",
    plain: "an AI-native GitHub experience",
    body: "Collaboration rebuilt with AI as a starting point, not a sidebar.",
    language: "TypeScript",
    license: "MIT",
    licenseUrl: "https://spdx.org/licenses/MIT.html",
    lane: 2,
    hash: "7be20d4",
    repo: "https://github.com/centrys-labs/repolith",
    metaDescription:
      "repolith is an AI-native GitHub experience for modern software collaboration, built by Centrys Labs. TypeScript, MIT.",
  },
  {
    slug: "stagezero",
    name: "stagezero",
    description: "A lightweight, self-hosted application deployment platform.",
    plain: "lightweight, self-hosted deploys",
    body: "Ship your apps from your own machines, without a platform you can’t see inside.",
    language: "Svelte",
    license: "Apache-2.0",
    licenseUrl: "https://spdx.org/licenses/Apache-2.0.html",
    lane: 3,
    hash: "91d5a3f",
    repo: "https://github.com/centrys-labs/stagezero",
    metaDescription:
      "stagezero is a lightweight, self-hosted application deployment platform, built by Centrys Labs. Svelte, Apache-2.0.",
  },
];

export const hero = {
  hash: "c0ffee1",
  meta: "(HEAD -> main) Centrys Labs <help@centrys.ai.id>",
  heading: "For the things worth building.",
  tagline:
    "We’re a small studio in Indonesia making software we wanted to use ourselves. Tools and infrastructure for developers, and beyond.",
  links: [
    { label: "Browse the repositories", href: site.repositories, external: true },
    { label: "centrys.ai.id", href: site.url, external: true },
    { label: "Blog", href: "/blog", external: false },
  ],
};

export const why = {
  hash: "d00d5ec",
  meta: "Merge: gitway, repolith, stagezero",
  heading: "Why we build",
  tagline: "Every project starts as something we wanted and couldn’t find.",
  body: "That’s the whole method. We build the tool, use it ourselves, and publish it. Our three projects are open source under MIT or Apache-2.0.",
};

export const contact = {
  hash: "f1a9e00",
  meta: "Say hello",
  heading: "Write to us",
  parts: [
    { text: "Questions, ideas, or a bug you’d rather mention in person: " },
    { text: site.email, href: `mailto:${site.email}` },
    { text: ". Or " },
    { text: "follow along on GitHub", href: site.github },
    { text: "." },
  ],
};

export const footer = {
  line: "© 2026 Centrys Labs. Location: Indonesia. HEAD is detached, we’re fine.",
};

export const blog = {
  title: "Blog",
  intro: "Notes from building gitway, repolith and stagezero.",
  description: "Notes from building gitway, repolith and stagezero.",
  empty: "No commits yet.",
  emptyLink: "Go home",
  tagsLabel: "Tags",
  updatedLabel: "updated",
  readInTerminal: "Read this post in your terminal:",
  backToBlog: "All posts",
  projectLinksLabel: "The projects",
  notFound: "No such post.",
  crumbs: { home: "Home", blog: "Blog" },
  readingTime: (minutes: number) => `${minutes} min read`,
};

export const projectPage = {
  breadcrumb: site.name,
  languageLabel: "language",
  licenseLabel: "license",
  readmeFailed:
    "The repository README isn’t available right now. The repository link below has the latest.",
  links: {
    repository: "Repository",
    issues: "Issues",
    releases: "Releases",
  },
  about: "About",
};

export const notFoundPage = {
  pathspec: (path: string) => `fatal: pathspec '${path}' did not match any files`,
  home: "git checkout main",
  blog: "git checkout blog",
};

export const errorPage = {
  message: "error: something broke on our side.",
  retry: "Try again",
  home: "git checkout main",
};

export const copyLabels = {
  ok: "Copied",
  copy: "Copy",
  copyFailed: "Select the code and copy it",
};

/**
 * The body served to curl and Wget. One source of truth: the middleware, the
 * terminal's `curl centrys.ai.id` command and the tests all read this.
 */
export function plainTextSite(): string {
  const pad = Math.max(...projects.map((project) => project.name.length));
  const lines = projects.map(
    (project) => `  ${project.name.padEnd(pad + 2)}${project.plain}`,
  );
  return [
    `# ${site.name}`,
    site.tagline,
    "",
    ...lines,
    "",
    site.github,
    site.email,
    "",
  ].join("\n");
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageMetaInput): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": `${site.url}/feed.xml` },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: "en",
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
