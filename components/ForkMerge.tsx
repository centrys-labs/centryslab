const laneCenters = [30, 50, 70];

export default function ForkMerge({ kind }: { kind: "fork" | "merge" }) {
  return (
    <div className="connector" aria-hidden="true">
      <div className="connector__rail">
        <svg
          className="fork"
          viewBox="0 0 80 48"
          preserveAspectRatio="none"
          fill="none"
          focusable="false"
        >
          <path
            className="main draw"
            d="M10 0V48"
            pathLength={1}
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
          {laneCenters.map((x, index) => (
            <path
              key={x}
              className={`draw lane${index + 1}`}
              d={
                kind === "fork"
                  ? `M10 0C10 24 ${x} 24 ${x} 48`
                  : `M${x} 0C${x} 24 10 24 10 48`
              }
              pathLength={1}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>
      <div className="connector__body" />
    </div>
  );
}
