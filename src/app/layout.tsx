import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZIGAM — Your Home, Our Willing Hands",
  description:
    "Zigam: Africa's premier and most trusted ecosystem of homemaking professionals and the homes and businesses they support.",
  icons: { icon: "/images/favicon.png" },
  openGraph: {
    title: "ZIGAM — Your Home, Our Willing Hands",
    description:
      "Africa's premier and most trusted ecosystem of homemaking professionals and the homes and businesses they support.",
    siteName: "ZIGAM",
    images: ["/images/favicon.png"],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ZIGAM — Your Home, Our Willing Hands",
    description:
      "Africa's premier and most trusted ecosystem of homemaking professionals and the homes and businesses they support.",
  },
};

export const viewport: Viewport = {
  themeColor: "#B68A35",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
