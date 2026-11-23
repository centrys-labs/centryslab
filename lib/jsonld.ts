import type { Post } from "./blog";
import { projects, site, type Project } from "./content";

const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

const organizationNode = {
  "@type": "Organization",
  "@id": organizationId,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.email,
  description: site.description,
  sameAs: [site.github],
};

export function organization() {
  return { "@context": "https://schema.org", ...organizationNode };
}

export function website() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: site.url,
    inLanguage: "en",
    description: site.description,
    publisher: { "@id": organizationId },
  };
}

export function softwareSourceCode(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.name,
    description: project.description,
    url: `${site.url}/projects/${project.slug}`,
    codeRepository: project.repo,
    programmingLanguage: project.language,
    license: project.licenseUrl,
    author: { "@id": organizationId, "@type": "Organization", name: site.name, url: site.url },
  };
}

export function blogPosting(post: Post) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    inLanguage: "en",
    author: { "@id": organizationId, "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": organizationId, "@type": "Organization", name: site.name, url: site.url },
  };
}

export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? site.url : `${site.url}${item.path}`,
    })),
  };
}

export const projectList = projects;
