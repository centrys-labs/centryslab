"use client";

import Link from "next/link";
import { consent } from "@/lib/content";
import { useConsent } from "./ConsentProvider";

export default function CookieBanner() {
  const { ready, bannerOpen, decide } = useConsent();

  if (!ready || !bannerOpen) return null;

  return (
    <section className="cookie-banner" role="dialog" aria-label={consent.label}>
      <p className="cookie-banner__text" id="cookie-banner-text">
        {consent.text}{" "}
        <Link href="/privacy">{consent.privacy}</Link>
      </p>
      <div className="cookie-banner__actions">
        <button type="button" className="action" onClick={() => decide("denied")}>
          {consent.decline}
        </button>
        <button
          type="button"
          className="action action--primary"
          onClick={() => decide("granted")}
        >
          {consent.accept}
        </button>
      </div>
    </section>
  );
}
