import Link from "next/link";
import Commit, { CommitMeta } from "@/components/Commit";
import ContactLine from "@/components/ContactLine";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  about,
  blog,
  buildMetadata,
  contact,
  projects,
  site,
} from "@/lib/content";
import { breadcrumbList } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: about.heading,
  description: site.positioning,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <main id="main" className="shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">{blog.crumbs.home}</Link>
          <span aria-hidden="true">/</span>
          <span>{about.heading}</span>
        </nav>

        <Commit on={[0]} node={0} lane={0}>
          <CommitMeta hash={about.hash}>{about.meta}</CommitMeta>
          <h1>{about.heading}</h1>
          <p className="tagline">{about.tagline}</p>
          {about.paragraphs.map((paragraph) => (
            <p className="copy" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </Commit>

        <Commit on={[0]} lane={0}>
          <h2 className="post-title" id="projects">
            {about.projectsLabel}
          </h2>
          <ul className="link-list">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/projects/${project.slug}`}>{project.name}</Link>
                <span> — {project.description}</span>
              </li>
            ))}
          </ul>
        </Commit>

        <Commit on={[0]} node={0} lane={0}>
          <CommitMeta hash={contact.hash}>{contact.meta}</CommitMeta>
          <h2 className="post-title" id="contact">
            {contact.heading}
          </h2>
          <ContactLine />
        </Commit>
      </main>

      <Footer />

      <JsonLd
        data={breadcrumbList([
          { name: blog.crumbs.home, path: "/" },
          { name: about.heading, path: "/about" },
        ])}
      />
    </>
  );
}
