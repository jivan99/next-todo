import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const signedinPages = ["/", "/me"];

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();
  const token = req.cookies.TODO_ACCESS_TOKEN;

  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  if (req.nextUrl.pathname === "/login") {
    if (token) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
}
