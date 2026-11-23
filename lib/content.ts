import type { Metadata } from "next";

export const site = {
  name: "Centrys Labs",
  url: "https://centryslab.ai.id",
  tagline: "For the things worth building.",
  description:
    "Centrys Labs makes software we wanted to use ourselves: gitway, repolith and stagezero.",
  orgDescription: "making software we wanted to use ourselves.",
  positioning:
    "We build software, tools, and infrastructure for developers and beyond.",
  location: "Indonesia",
  email: "help@centryslab.ai.id",
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
  meta: "(HEAD -> main) Centrys Labs <help@centryslab.ai.id>",
  heading: "For the things worth building.",
  tagline:
    "We’re a small studio in Indonesia making software we wanted to use ourselves. Tools and infrastructure for developers, and beyond.",
  links: [
    { label: "Browse the repositories", href: site.repositories, external: true },
    { label: "centryslab.ai.id", href: site.url, external: true },
    { label: "Blog", href: "/blog", external: false },
    { label: "About", href: "/about", external: false },
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

export const consent = {
  label: "Analytics consent",
  text: "Analytics cookies show us which pages get read. They load only if you accept; declining leaves the site exactly as it is.",
  accept: "Accept analytics",
  decline: "Decline",
  settings: "Cookie settings",
  privacy: "Privacy",
};

export const newsletter = {
  heading: "Notes in your inbox",
  blurb:
    "New posts and releases, plus the occasional note on what we're building. Double opt-in, unsubscribe any time.",
  emailLabel: "Email address",
  placeholder: "you@example.com",
  submit: "Subscribe",
  sending: "Sending…",
  ok: "Check your inbox to confirm.",
  invalid: "That email doesn't look right.",
  unconfigured: "The newsletter isn't connected yet.",
  rateLimited: "Too many attempts. Try again later.",
  failed: "That didn't go through. Try again in a moment.",
  privacyNote: "We keep your address with Buttondown.",
};

export const privacyPage = {
  hash: "9a9e901",
  meta: "(privacy) Centrys Labs",
  heading: "Privacy",
  tagline: "What this site stores, and what it leaves alone.",
  updated: "Last updated 24 November 2026.",
  sections: [
    {
      heading: "What this site stores",
      paragraphs: [
        "There is no account and no tracking by default. Your analytics choice is kept in your browser's local storage under centryslab-consent-v1, so the banner doesn't ask on every visit.",
      ],
    },
    {
      heading: "Analytics",
      paragraphs: [
        "If you accept, we load PostHog and record page views. PostHog stores an identifier in a first-party cookie and local storage, which is how returning visits are told apart. We turn off autocapture and session recording, and PostHog honours Do Not Track.",
        "If you decline, no analytics script is loaded. Withdrawing consent later through Cookie settings applies an opt-out and resets the stored identifier.",
      ],
    },
    {
      heading: "Newsletter",
      paragraphs: [
        "The signup form on the blog sends your email address to Buttondown, our newsletter provider. Buttondown keeps the subscriber list and sends the confirmation email. We also forward the request's IP address so Buttondown can check for spam.",
        "We use the address only to send the newsletter. Subscriptions use double opt-in, and every email includes an unsubscribe link that removes you from the list.",
      ],
    },
    {
      heading: "What we don't do",
      paragraphs: [
        "No advertising cookies, no selling or renting your data, and no cross-site profiles.",
      ],
    },
    {
      heading: "Changes to this page",
      paragraphs: [
        "If what we collect changes, this page changes with it and the date at the top moves.",
      ],
    },
  ],
  contactLabel: "Questions about this page:",
};

export const about = {
  hash: "ab0071",
  meta: "(about) Centrys Labs",
  heading: "About Centrys Labs",
  tagline:
    "A small software studio in Indonesia, building the tools we wanted and couldn’t find.",
  paragraphs: [
    "We make software, tools and infrastructure for developers and beyond. Every project starts as something we needed ourselves, so the first user of anything we ship is us.",
    "We build in the open. The code, the issues and the releases are public, because a tool worth using is a tool worth reading, running and changing.",
  ],
  projectsLabel: "The projects",
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
 * proxy's curl response read this.
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
