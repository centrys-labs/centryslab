"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { terminalCopy } from "@/lib/content";
import {
  chipCommands,
  normalizeCommand,
  runCommand,
  type PostLink,
  type TerminalLine,
} from "@/lib/terminal";

export default function Terminal({ posts }: { posts: PostLink[] }) {
  const [entries, setEntries] = useState<TerminalLine[]>([]);
  const [value, setValue] = useState("");
  const [historyPos, setHistoryPos] = useState(-1);
  const history = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // One friendly line in the console, no analytics.
    console.log(terminalCopy.consoleLine);
  }, []);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [entries]);

  function run(raw: string) {
    const command = normalizeCommand(raw);
    if (!command) return;

    const result = runCommand(command, posts);
    setEntries((previous) =>
      result.clear
        ? []
        : [
            ...previous,
            { text: `${terminalCopy.prompt} ${command}`, prompt: true },
            ...result.lines,
          ],
    );
    history.current = [...history.current, command];
    setHistoryPos(-1);
    setValue("");
    inputRef.current?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.current.length === 0) return;
      const next =
        historyPos === -1
          ? history.current.length - 1
          : Math.max(0, historyPos - 1);
      setHistoryPos(next);
      setValue(history.current[next] ?? "");
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyPos === -1) return;
      const next = historyPos + 1;
      if (next >= history.current.length) {
        setHistoryPos(-1);
        setValue("");
      } else {
        setHistoryPos(next);
        setValue(history.current[next] ?? "");
      }
    }
  }

  function onPanelClick(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.closest("a, button, input")) return;
    inputRef.current?.focus();
  }

  return (
    <div className="terminal-block">
      <div className="terminal" onClick={onPanelClick}>
        <div
          className="terminal__output"
          ref={outputRef}
          aria-live="polite"
          aria-label={terminalCopy.label}
        >
          {entries.length === 0 ? (
            <p className="terminal__hint">{terminalCopy.hint}</p>
          ) : (
            entries.map((entry, index) => (
              <p
                key={`${index}-${entry.text}`}
                className={entry.prompt ? "terminal__line terminal__line--echo" : "terminal__line"}
              >
                {entry.href ? (
                  entry.href.startsWith("/") ? (
                    <Link href={entry.href}>{entry.text}</Link>
                  ) : (
                    <a href={entry.href} rel="noreferrer">
                      {entry.text}
                    </a>
                  )
                ) : (
                  entry.text
                )}
              </p>
            ))
          )}
        </div>

        <noscript>
          <p className="terminal__hint">{terminalCopy.noScript}</p>
        </noscript>

        <form
          className="terminal__prompt"
          onSubmit={(event) => {
            event.preventDefault();
            run(value);
          }}
        >
          <span aria-hidden="true">{terminalCopy.prompt}</span>
          <input
            ref={inputRef}
            className="terminal__input"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            aria-label={terminalCopy.label}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>

      <ul className="chips">
        {chipCommands.map((command) => (
          <li key={command}>
            <button type="button" className="chip" onClick={() => run(command)}>
              {command}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
