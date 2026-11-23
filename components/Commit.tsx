import type { ReactNode } from "react";
import Rail from "./Rail";

type CommitProps = {
  on: number[];
  /** Lane that gets a node; omit for a continuation row. */
  node?: number;
  /** Lane index that colours this commit's hash. */
  lane: number;
  className?: string;
  children: ReactNode;
};

export default function Commit({ on, node, lane, className, children }: CommitProps) {
  return (
    <section
      className={["commit", className].filter(Boolean).join(" ")}
      data-lane={lane}
    >
      <Rail on={on} node={node} />
      <div className="commit__body">{children}</div>
    </section>
  );
}

export function CommitMeta({
  hash,
  children,
}: {
  hash: string;
  children: ReactNode;
}) {
  return (
    <p className="meta">
      <b>{hash}</b> <span>{children}</span>
    </p>
  );
}
