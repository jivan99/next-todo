import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const signedinPages = ["/", "/me"];

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.TODO_ACCESS_TOKEN;

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }
}
