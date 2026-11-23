import { NextResponse, type NextRequest } from "next/server";
import { getPosts, postMarkdown } from "@/lib/blog";
import { plainTextSite } from "@/lib/content";

export const config = {
  matcher: ["/", "/blog/:path*"],
};

function isTerminalClient(userAgent: string): boolean {
  return /^(curl|wget)/i.test(userAgent);
}

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  if (!isTerminalClient(userAgent)) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return new NextResponse(plainTextSite(), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "User-Agent",
      },
    });
  }

  const match = /^\/blog\/([^/]+)\/?$/.exec(pathname);
  if (!match) return NextResponse.next();

  const post = getPosts().find((entry) => entry.slug === match[1]);
  if (!post) return NextResponse.next();

  return new NextResponse(postMarkdown(post), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "User-Agent",
    },
  });
}
