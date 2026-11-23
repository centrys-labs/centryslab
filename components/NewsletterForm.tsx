"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { consent, newsletter } from "@/lib/content";

type State = "idle" | "sending" | "done" | "error";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("sending");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          company: data.get("company"),
        }),
      });

      if (response.ok) {
        setState("done");
        setMessage(newsletter.ok);
        setEmail("");
        return;
      }

      const body = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      setState("error");
      setMessage(
        body.error === "not_configured"
          ? newsletter.unconfigured
          : body.error === "rate_limited"
            ? newsletter.rateLimited
            : body.error === "invalid_email"
              ? newsletter.invalid
              : newsletter.failed,
      );
    } catch {
      setState("error");
      setMessage(newsletter.failed);
    }
  }

  return (
    <form className="newsletter" onSubmit={onSubmit}>
      <label className="visually-hidden" htmlFor="newsletter-email">
        {newsletter.emailLabel}
      </label>
      <input
        id="newsletter-email"
        className="newsletter__input"
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder={newsletter.placeholder}
        autoComplete="email"
        required
      />
      <input
        className="visually-hidden"
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <button
        className="action action--primary"
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? newsletter.sending : newsletter.submit}
      </button>
      <p
        className={`newsletter__status${state === "error" ? " newsletter__status--error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
      <p className="newsletter__note">
        {newsletter.privacyNote}{" "}
        <Link href="/privacy">{consent.privacy}</Link>.
      </p>
    </form>
  );
}
