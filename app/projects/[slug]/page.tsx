import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import Commit, { CommitMeta } from "@/components/Commit";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { blog, buildMetadata, projectPage, projects } from "@/lib/content";
import { fetchReadme, renderReadme } from "@/lib/github";
import { breadcrumbList, softwareSourceCode } from "@/lib/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) return {};

  return buildMetadata({
    title: project.name,
    description: project.metaDescription,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();

  const markdown = await fetchReadme(project.slug);
  const html = markdown ? await renderReadme(project.slug, markdown) : null;

  return (
    <>
      <main id="main" className="shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">{blog.crumbs.home}</Link>
          <span aria-hidden="true">/</span>
          <span>{project.name}</span>
        </nav>

        <Commit on={[project.lane]} node={project.lane} lane={project.lane}>
          <CommitMeta hash={project.hash}>{`(${project.slug})`}</CommitMeta>
          <h1 className="project-name project-name--page">{project.name}</h1>
          <p className="tagline tagline--project">{project.description}</p>
          <ul className="kv">
            <li>
              {projectPage.languageLabel}: {project.language}
            </li>
            <li>
              {projectPage.licenseLabel}: {project.license}
            </li>
          </ul>
          <p className="links-row">
            <a href={project.repo}>{projectPage.links.repository}</a>
            <a href={`${project.repo}/issues`}>{projectPage.links.issues}</a>
            <a href={`${project.repo}/releases`}>{projectPage.links.releases}</a>
          </p>
        </Commit>

        <Commit on={[project.lane]} lane={project.lane}>
          {html ? (
            <>
              <div
                className="prose"
                data-post-body
                dangerouslySetInnerHTML={{ __html: html }}
              />
              <CodeBlock />
            </>
          ) : (
            <p className="copy">{projectPage.readmeFailed}</p>
          )}
        </Commit>
      </main>

      <Footer />

      <JsonLd data={softwareSourceCode(project)} />
      <JsonLd
        data={breadcrumbList([
          { name: blog.crumbs.home, path: "/" },
          { name: project.name, path: `/projects/${project.slug}` },
        ])}
      />
    </>
  );
}
