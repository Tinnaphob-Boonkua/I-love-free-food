import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "MomentUS — Moment of Us";

/**
 * The link preview is the first frame anyone sees of a gift, so it is held to
 * the same world as the pages: umbra ground, one warm source, Bodoni wordmark.
 *
 * Bodoni is fetched rather than committed. If the fetch fails the card still
 * renders in a serif — an unstyled preview beats a build that will not deploy.
 */
async function bodoni(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@500&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((r) => r.text());

    const url = css.match(/src: url\((https:\/\/[^)]+)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const display = await bodoni();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          // Satori cannot read CSS variables, so the palette is repeated here
          // by value. These are umbra, filament, halide and silver from
          // globals.css — if a token changes, change it here too.
          backgroundColor: "#140f0c",
          backgroundImage:
            "radial-gradient(110% 80% at 50% -20%, rgba(212,137,74,0.30) 0%, rgba(20,15,12,0) 60%)",
          color: "#efe6d6",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 10,
            background: "#d4894a",
          }}
        />
        <div
          style={{
            fontFamily: display ? "Bodoni" : "serif",
            fontSize: 132,
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          MomentUS
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c4b8a8",
          }}
        >
          Moment of Us
        </div>
        <div style={{ marginTop: 40, fontSize: 34, color: "#c4b8a8", maxWidth: 860 }}>
          A memory place for anyone you love. When the occasion arrives, the timeline can be read
          as a gift.
        </div>
      </div>
    ),
    {
      ...size,
      fonts: display
        ? [{ name: "Bodoni", data: display, weight: 500 as const, style: "normal" as const }]
        : [],
    },
  );
}
