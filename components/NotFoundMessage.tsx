"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { notFoundPage } from "@/lib/content";

export default function NotFoundMessage() {
  const pathname = usePathname();
  const requested = pathname === "/" ? "" : pathname;

  return (
    <main id="main" className="shell fatal">
      <h1 className="fatal__line">{notFoundPage.pathspec(requested)}</h1>
      <ul className="fatal__links">
        <li>
          <Link href="/">{notFoundPage.home}</Link>
        </li>
        <li>
          <Link href="/blog">{notFoundPage.blog}</Link>
        </li>
      </ul>
    </main>
  );
}
