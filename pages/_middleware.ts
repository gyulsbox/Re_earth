import type { NextRequest, NextFetchEvent } from "next/server";
import { NextResponse } from "next/server";

export default function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.ua?.isBot) {
    console.log("Bot Detected");
    return new Response("Please don't be a bot. Be human.", { status: 403 });
  }
  if (!req.url.includes("/api")) {
    if (!req.url.includes("/welcome") && !req.cookies.reearthSession) {
      if (req.url.includes("/enter")) {
        return;
      } else {
        return NextResponse.redirect(`${req.nextUrl.origin}/welcome`);
      }
    } else if (req.url.includes("/enter") && req.cookies.reearthSession) {
      return NextResponse.redirect(`${req.nextUrl.origin}/`);
    } else {
      return;
    }
  }
}
