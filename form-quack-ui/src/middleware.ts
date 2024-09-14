import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Authorization", "Bearer " + cookies().get("auth_token")?.value);

  if (!["/login", "/register", "/forgot-password"].includes(request.nextUrl.pathname)) {
    if (!cookies().has("auth_token")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    if (cookies().has("auth_token")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
