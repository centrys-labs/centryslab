import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/CodeBlock";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { getPost, getPosts } from "@/lib/blog";
import { blog, buildMetadata, projects } from "@/lib/content";
import { blogPosting, breadcrumbList } from "@/lib/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    ...buildMetadata({
      title: post.title,
      description: post.description,
      path: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    }),
    robots: post.draft ? { index: false, follow: false } : { index: true, follow: true },
  };
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const showToc = post.words > 1500;

  return (
    <>
      <main id="main" className="shell">
        <article>
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">{blog.crumbs.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href="/blog">{blog.crumbs.blog}</Link>
          </nav>

          <header>
            <h1>{post.title}</h1>
            <p className="post-meta">
              <time dateTime={post.date}>{post.date}</time>
              {post.updated ? (
                <>
                  {" · "}
                  {blog.updatedLabel} <time dateTime={post.updated}>{post.updated}</time>
                </>
              ) : null}
              {" · "}
              {blog.readingTime(post.minutes)}
            </p>
          </header>

          {showToc ? (
            <nav className="toc" aria-label="On this page">
              <p>On this page</p>
              <ul>
                {post.headings.map((heading) => (
                  <li key={heading.id} data-level={heading.level}>
                    <a href={`#${heading.id}`}>{heading.text}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <div className="prose" data-post-body>
            <MDXRemote
              source={post.body}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" as const }],
                    [rehypePrettyCode, prettyCodeOptions],
                  ],
                },
              }}
            />
          </div>

          <CodeBlock />

          <footer className="post-footer">
            <p>{blog.readInTerminal}</p>
            <code>curl centrys.ai.id/blog/{post.slug}</code>
            <ul>
              <li>
                <Link href="/blog">{blog.backToBlog}</Link>
              </li>
              {projects.map((project) => (
                <li key={project.slug}>
                  <a href={project.repo}>{project.name}</a>
                </li>
              ))}
            </ul>
          </footer>
        </article>
      </main>

      <Footer />

      <JsonLd data={blogPosting(post)} />
      <JsonLd
        data={breadcrumbList([
          { name: blog.crumbs.home, path: "/" },
          { name: blog.crumbs.blog, path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
    </>
  );
}
