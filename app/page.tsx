import Link from "next/link";
import Commit, { CommitMeta } from "@/components/Commit";
import ContactLine from "@/components/ContactLine";
import Footer from "@/components/Footer";
import ForkMerge from "@/components/ForkMerge";
import JsonLd from "@/components/JsonLd";
import ProjectCommit from "@/components/ProjectCommit";
import {
  buildMetadata,
  contact,
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
  return (
    <>
      <main id="main" className="shell">
        <Commit on={[0]} node={0} lane={0}>
          <CommitMeta hash={hero.hash}>{hero.meta}</CommitMeta>
          <h1>{hero.heading}</h1>
          <p className="tagline">{hero.tagline}</p>
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
          <ContactLine />
        </Commit>
      </main>

      <Footer />

      <JsonLd data={organization()} />
      <JsonLd data={website()} />
    </>
  );
}
