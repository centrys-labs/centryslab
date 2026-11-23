import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const bg = "#1e2327";
const ink = "#e4dfd2";
const mute = "#8d979e";
const lanes = ["#e9b44c", "#8fb8de", "#b3c78a"];
const fontUrl =
  "https://fonts.googleapis.com/css2?family=Martian+Mono:wght@600&display=swap";
// An old desktop UA makes Google Fonts serve woff, which satori can parse.
const legacyUserAgent =
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36";

let fontData: ArrayBuffer | null | undefined;

async function loadMono(): Promise<ArrayBuffer | null> {
  if (fontData !== undefined) return fontData;
  try {
    const css = await fetch(fontUrl, {
      headers: { "User-Agent": legacyUserAgent },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 31536000 },
    });
    if (!css.ok) {
      fontData = null;
      return null;
    }

    const url = /url\((https:\/\/[^)]+)\)/.exec(await css.text())?.[1];
    if (!url) {
      fontData = null;
      return null;
    }

    const font = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 31536000 },
    });
    fontData = font.ok ? await font.arrayBuffer() : null;
  } catch {
    fontData = null;
  }
  return fontData ?? null;
}

function rail() {
  return (
    <div style={{ display: "flex", position: "relative", height: "100%" }}>
      {[0, 1, 2, 3].map((lane) => (
        <div
          key={lane}
          style={{
            display: "flex",
            position: "relative",
            width: 22,
            height: "100%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 2,
              height: "100%",
              background: lane === 0 ? "rgba(228,223,210,0.35)" : lanes[lane - 1],
              opacity: lane === 0 ? 1 : 0.75,
            }}
          />
          {lane === 0 ? (
            <div
              style={{
                position: "absolute",
                top: 118,
                left: 4,
                width: 14,
                height: 14,
                borderRadius: 7,
                background: ink,
              }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export async function renderOgImage({
  title,
  meta,
}: {
  title: string;
  meta: string;
}): Promise<ImageResponse> {
  const font = await loadMono();
  const tree = (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: bg,
        color: ink,
        padding: "64px 72px",
        fontFamily: font ? "Martian Mono" : "monospace",
      }}
    >
      {rail()}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: 64,
          flex: 1,
        }}
      >
        <div style={{ fontSize: 19, color: mute, marginBottom: 28 }}>{meta}</div>
        <div
          style={{
            fontSize: title.length > 46 ? 54 : 68,
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );

  const options = {
    ...ogSize,
    ...(font
      ? { fonts: [{ name: "Martian Mono", data: font, weight: 600 as const, style: "normal" as const }] }
      : {}),
  };

  try {
    return new ImageResponse(tree, options);
  } catch {
    // A font that satori cannot parse must not break the build.
    return new ImageResponse(tree, ogSize);
  }
}
