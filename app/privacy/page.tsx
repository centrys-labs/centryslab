import Link from "next/link";
import { Fragment } from "react";
import Commit, { CommitMeta } from "@/components/Commit";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { blog, buildMetadata, privacyPage, site } from "@/lib/content";
import { breadcrumbList } from "@/lib/jsonld";

export const metadata = buildMetadata({
  title: privacyPage.heading,
  description:
    "What Centrys Labs stores: consent-gated analytics, the Buttondown newsletter, and nothing else.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <main id="main" className="shell">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">{blog.crumbs.home}</Link>
          <span aria-hidden="true">/</span>
          <span>{privacyPage.heading}</span>
        </nav>

        <Commit on={[0]} node={0} lane={0}>
          <CommitMeta hash={privacyPage.hash}>{privacyPage.meta}</CommitMeta>
          <h1>{privacyPage.heading}</h1>
          <p className="tagline">{privacyPage.tagline}</p>
          <p className="post-meta">{privacyPage.updated}</p>
        </Commit>

        <Commit on={[0]} lane={0}>
          <div className="prose">
            {privacyPage.sections.map((section) => (
              <Fragment key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Fragment>
            ))}
            <p>
              {privacyPage.contactLabel}{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>
          </div>
        </Commit>
      </main>

      <Footer />

      <JsonLd
        data={breadcrumbList([
          { name: blog.crumbs.home, path: "/" },
          { name: privacyPage.heading, path: "/privacy" },
        ])}
      />
    </>
  );
}
