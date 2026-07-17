import { NextResponse, type NextRequest } from "next/server";

// Pre-launch "coming soon" gate.
// Controlled ONLY by the NEXT_PUBLIC_COMING_SOON flag:
//   "true"  -> gate is ON, everyone is redirected to /launch.
//   anything else / unset -> gate is OFF, the full site is live.
// When you're ready to launch, set the flag to "false" and redeploy.
//
// PREVIEW BYPASS (for you & your team):
//   Visit  https://your-site/?preview=YOUR_TOKEN  once. This drops a cookie
//   that lets you browse the whole site while the public still sees /launch.
//   Set PREVIEW_TOKEN in your env to something private; defaults to "zigam-preview".
const PREVIEW_TOKEN = process.env.PREVIEW_TOKEN || "zigam-preview";
const PREVIEW_COOKIE = "zigam_preview";

export function middleware(req: NextRequest) {
  const comingSoon = process.env.NEXT_PUBLIC_COMING_SOON === "true";
  if (!comingSoon) return NextResponse.next();

  const { pathname, searchParams } = req.nextUrl;

  // 1) Preview link: set the bypass cookie, then clean the URL.
  if (searchParams.get("preview") === PREVIEW_TOKEN) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("preview");
    const res = NextResponse.redirect(url);
    res.cookies.set(PREVIEW_COOKIE, PREVIEW_TOKEN, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  // 2) Already holding a valid preview cookie → full access.
  if (req.cookies.get(PREVIEW_COOKIE)?.value === PREVIEW_TOKEN) {
    return NextResponse.next();
  }

  // 3) Always allow the launch page, API routes, and static assets.
  const allowed =
    pathname === "/launch" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico";
  if (allowed) return NextResponse.next();

  // 4) Everyone else → the launch page.
  const url = req.nextUrl.clone();
  url.pathname = "/launch";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
