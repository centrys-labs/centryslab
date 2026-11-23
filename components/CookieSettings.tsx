"use client";

import { consent } from "@/lib/content";
import { useConsent } from "./ConsentProvider";

export default function CookieSettings() {
  const { open } = useConsent();

  return (
    <button type="button" className="footer-settings" onClick={open}>
      {consent.settings}
    </button>
  );
}
