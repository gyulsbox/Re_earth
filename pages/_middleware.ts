import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log("it's global middleware");

  if (req.ua?.isBot) {
    return new Response("Please don't be a bot. Be human.", { status: 403 });
  }
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/enter") && !req.cookies.reearthSession) {
      return NextResponse.redirect(`${req.nextUrl.origin}/enter`);
    }
  }
}
