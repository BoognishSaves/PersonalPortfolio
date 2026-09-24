import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "John Paul Haddad | HaddadaddaH",
  description:
    "Product leader, builder, entrepreneur, and musician. The living digital identity of John Paul Haddad.",
  metadataBase: new URL("https://haddadaddah.com"),
  icons: {
    icon: [{ url: "/haddadaddah-logo.svg", type: "image/svg+xml" }],
    shortcut: "/haddadaddah-logo.svg",
    apple: "/haddadaddah-logo.svg",
  },
  openGraph: {
    title: "John Paul Haddad | HaddadaddaH",
    description: "Product leader. Builder. Entrepreneur. Musician.",
    url: "https://haddadaddah.com",
    siteName: "HaddadaddaH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
