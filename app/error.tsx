"use client";

import Link from "next/link";
import { useEffect } from "react";
import { errorPage } from "@/lib/content";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="shell fatal">
      <h1 className="fatal__line">{errorPage.message}</h1>
      <div className="fatal__links">
        <button type="button" className="fatal__button" onClick={() => reset()}>
          {errorPage.retry}
        </button>
        <Link href="/">{errorPage.home}</Link>
      </div>
    </main>
  );
}
