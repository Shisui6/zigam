import { NextResponse, type NextRequest } from "next/server";

// Pre-launch "coming soon" gate.
// When NEXT_PUBLIC_COMING_SOON === "true" and we're before the launch date,
// all visitors are redirected to /launch. Set the flag to "false" (or let the
// launch date pass) to open the full site.
const LAUNCH_DATE = "2026-07-15T09:00:00+01:00";

export function middleware(req: NextRequest) {
  const comingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";
  if (!comingSoon) return NextResponse.next();

  const launched = Date.now() >= new Date(LAUNCH_DATE).getTime();
  if (launched) return NextResponse.next();

  const { pathname } = req.nextUrl;
  // Allow the launch page itself, API routes, and static assets through.
  const allowed =
    pathname === "/launch" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico";
  if (allowed) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/launch";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
