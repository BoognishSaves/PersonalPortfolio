import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Paul Haddad | HaddadaddaH",
  description:
    "Product leader, builder, entrepreneur, and musician. The living digital identity of John Paul Haddad.",
  metadataBase: new URL("https://haddadaddah.com"),
  icons: {
    icon: [{ url: "/haddadaddah-micro.svg", type: "image/svg+xml" }],
    shortcut: "/haddadaddah-micro.svg",
    apple: "/haddadaddah-micro.svg",
  },
  openGraph: {
    title: "John Paul Haddad | HaddadaddaH",
    description: "Product leader. Builder. Entrepreneur. Musician.",
    url: "https://haddadaddah.com",
    siteName: "HaddadaddaH",
    type: "website",
    images: [{
      url: "/public%20haddadaddah%20social.png",
      alt: "John Paul Haddad — HaddadaddaH",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "John Paul Haddad | HaddadaddaH",
    description: "Product leader. Builder. Entrepreneur. Musician.",
    images: ["/public%20haddadaddah%20social.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
