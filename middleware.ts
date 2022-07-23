import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

// const isMobile = (userAgent: string) =>
//   /iPhone|iPad|iPod|Android/i.test(userAgent);

export function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const session = req.cookies.get("reearthSession");
  if (
    // pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    pathname.includes(".") || // exclude all files in the public folder
    PUBLIC_FILE.test(pathname)
  )
    return NextResponse.next();

  if (!pathname.includes("/api")) {
    if (!pathname.includes("/enter") && !session) {
      return NextResponse.redirect(new URL("/enter", req.url));
    }
  }
  return NextResponse.next();
}
