import { plainTextSite, projects, site, terminalCopy } from "./content";

export type TerminalLine = {
  text: string;
  href?: string;
  /** True for the echoed command line. */
  prompt?: boolean;
};

export type PostLink = {
  slug: string;
  title: string;
  date: string;
  hash: string;
};

export const chipCommands = ["help", "ls", "gitway", "curl centrys.ai.id"] as const;

export function normalizeCommand(raw: string): string {
  return raw.trim().replace(/\s+/g, " ");
}

export function runCommand(
  raw: string,
  posts: PostLink[] = [],
): { lines: TerminalLine[]; clear: boolean } {
  const command = normalizeCommand(raw);
  const key = command.toLowerCase();

  if (!command) return { lines: [], clear: false };

  if (key.startsWith("sudo")) {
    return { lines: [{ text: terminalCopy.sudo }], clear: false };
  }

  switch (key) {
    case "help":
      return { lines: [{ text: terminalCopy.help }], clear: false };
    case "ls":
      return { lines: [{ text: terminalCopy.ls }], clear: false };
    case "whoami":
      return { lines: [{ text: terminalCopy.whoami }], clear: false };
    case "contact":
      return {
        lines: [{ text: site.email, href: `mailto:${site.email}` }],
        clear: false,
      };
    case "curl centrys.ai.id":
      return {
        lines: plainTextSite()
          .replace(/\n$/, "")
          .split("\n")
          .map((text) => ({ text })),
        clear: false,
      };
    case "blog":
      return {
        lines:
          posts.length > 0
            ? posts
                .slice(0, 5)
                .map((post) => ({
                  text: `${post.hash} ${post.date} ${post.title}`,
                  href: `/blog/${post.slug}`,
                }))
            : [{ text: terminalCopy.emptyBlog }],
        clear: false,
      };
    case "clear":
      return { lines: [], clear: true };
    default:
      break;
  }

  const project = projects.find((entry) => entry.slug === key);
  if (project) {
    return {
      lines: [
        { text: project.description },
        { text: project.repo.replace(/^https?:\/\//, ""), href: project.repo },
      ],
      clear: false,
    };
  }

  return { lines: [{ text: terminalCopy.notFound(command) }], clear: false };
}
