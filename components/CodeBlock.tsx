"use client";

import { useEffect } from "react";
import { terminalCopy } from "@/lib/content";

/**
 * Adds a language label and a copy button to every code block inside the
 * rendered markdown. Runs after hydration so MDX still renders a usable
 * <pre> without JavaScript.
 */
export default function CodeBlock({ scope = "[data-post-body]" }: { scope?: string }) {
  useEffect(() => {
    const root = document.querySelector(scope);
    if (!root) return;

    const blocks = Array.from(root.querySelectorAll("pre"));
    for (const pre of blocks) {
      if (pre.dataset.enhanced === "true") continue;
      pre.dataset.enhanced = "true";

      const figure = pre.closest("figure") ?? pre;
      const language = pre.getAttribute("data-language") ?? "";

      const bar = document.createElement("div");
      bar.className = "codeblock__bar";

      const label = document.createElement("span");
      label.className = "codeblock__lang";
      label.textContent = language;

      const status = document.createElement("span");
      status.className = "codeblock__status";
      status.setAttribute("aria-live", "polite");

      const button = document.createElement("button");
      button.type = "button";
      button.className = "codeblock__copy";
      button.textContent = terminalCopy.copy;

      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(pre.innerText);
          status.textContent = terminalCopy.ok;
        } catch {
          status.textContent = terminalCopy.copyFailed;
        }
        window.setTimeout(() => {
          status.textContent = "";
        }, 1800);
      });

      bar.append(label, status, button);
      figure.parentElement?.insertBefore(bar, figure);
    }
  }, [scope]);

  return null;
}
