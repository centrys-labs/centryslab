"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { useConsent } from "./ConsentProvider";

type PostHog = {
  init: (key: string, options?: Record<string, unknown>) => void;
  opt_out_capturing?: () => void;
  reset?: () => void;
};

declare global {
  interface Window {
    posthog?: PostHog;
  }
}

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";
const assetsHost =
  process.env.NEXT_PUBLIC_POSTHOG_ASSETS_HOST ??
  host.replace(/(^https:\/\/)([a-z]{2})\.i\.posthog\.com/, "$1$2-assets.i.posthog.com");

export default function Analytics() {
  const { choice } = useConsent();
  const started = useRef(false);

  const start = useCallback(() => {
    if (!key || !window.posthog || started.current) return;
    window.posthog.init(key, {
      api_host: host,
      persistence: "localStorage+cookie",
      capture_pageview: true,
      autocapture: false,
      disable_session_recording: true,
      person_profiles: "identified_only",
      respect_dnt: true,
    });
    started.current = true;
  }, []);

  useEffect(() => {
    if (choice === "granted") start();
    if (choice !== "denied" || !started.current) return;

    window.posthog?.opt_out_capturing?.();
    window.posthog?.reset?.();
    started.current = false;
  }, [choice, start]);

  if (choice !== "granted" || !key) return null;

  return (
    <Script
      id="posthog"
      src={`${assetsHost}/static/array.js`}
      strategy="afterInteractive"
      onLoad={start}
    />
  );
}
