import Link from "next/link";
import Commit, { CommitMeta } from "@/components/Commit";
import ForkMerge from "@/components/ForkMerge";
import JsonLd from "@/components/JsonLd";
import ProjectCommit from "@/components/ProjectCommit";
import Terminal from "@/components/Terminal";
import { getPosts } from "@/lib/blog";
import {
  buildMetadata,
  contact,
  footer,
  hero,
  projects,
  site,
  why,
} from "@/lib/content";
import { organization, website } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: site.name,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const posts = getPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    hash: post.hash,
  }));

  return (
    <>
      <main id="main" className="shell">
        <Commit on={[0]} node={0} lane={0}>
          <CommitMeta hash={hero.hash}>{hero.meta}</CommitMeta>
          <h1>{hero.heading}</h1>
          <p className="tagline">{hero.tagline}</p>
          <Terminal posts={posts} />
          <ul className="hero-links">
            {hero.links.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a href={link.href} rel="noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href}>{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </Commit>

        <ForkMerge kind="fork" />

        {projects.map((project) => (
          <ProjectCommit key={project.slug} project={project} />
        ))}

        <ForkMerge kind="merge" />

        <Commit on={[0]} node={0} lane={0}>
          <CommitMeta hash={why.hash}>{why.meta}</CommitMeta>
          <h2 className="post-title" id="why-we-build">
            {why.heading}
          </h2>
          <p className="tagline tagline--project">{why.tagline}</p>
          <p className="copy">{why.body}</p>
        </Commit>

        <Commit on={[0]} node={0} lane={0}>
          <CommitMeta hash={contact.hash}>{contact.meta}</CommitMeta>
          <h2 className="post-title" id="contact">
            {contact.heading}
          </h2>
          <p className="copy">
            {contact.parts.map((part, index) =>
              part.href ? (
                <a key={index} href={part.href} rel="noreferrer">
                  {part.text}
                </a>
              ) : (
                <span key={index}>{part.text}</span>
              ),
            )}
          </p>
        </Commit>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <p>{footer.line}</p>
        </div>
      </footer>

      <JsonLd data={organization()} />
      <JsonLd data={website()} />
    </>
  );
}
