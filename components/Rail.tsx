type RailProps = {
  /** Lane indexes that draw a line through this row. */
  on: number[];
  /** Lane index that gets a node at the top of the row. */
  node?: number;
};

export default function Rail({ on, node }: RailProps) {
  return (
    <div className="rail" aria-hidden="true">
      {[0, 1, 2, 3].map((lane) => (
        <i
          key={lane}
          className={[
            "lane",
            `lane${lane}`,
            on.includes(lane) ? "on" : "",
            node === lane ? "n" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
      ))}
    </div>
  );
}
