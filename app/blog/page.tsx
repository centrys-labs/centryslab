import Link from "next/link";
import Commit from "@/components/Commit";
import Footer from "@/components/Footer";
import { getPosts } from "@/lib/blog";
import { blog, buildMetadata } from "@/lib/content";

export const metadata = buildMetadata({
  title: blog.title,
  description: blog.description,
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <>
      <main id="main" className="shell">
        <header className="page-head">
          <h1>{blog.title}</h1>
          <p className="tagline tagline--project">{blog.intro}</p>
        </header>

        {posts.length === 0 ? (
          <p className="empty">
            {blog.empty} <Link href="/">{blog.emptyLink}</Link>
          </p>
        ) : (
          posts.map((post) => (
            <Commit key={post.slug} on={[0]} node={0} lane={0}>
              <p className="meta">
                <b>{post.hash}</b>{" "}
                <time dateTime={post.date}>{post.date}</time>
              </p>
              <h2 className="post-title">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="copy">{post.description}</p>
              {post.tags.length > 0 ? (
                <p className="tags">{post.tags.join("  ")}</p>
              ) : null}
            </Commit>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}
