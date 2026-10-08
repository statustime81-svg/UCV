import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Urban Culinary Venture",
  description: "Food brands for existing restaurant kitchens. Berlin, Germany.",
  icons: { icon: "/favicon.svg" },
  other: { google: "notranslate" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      translate="no"
      className="notranslate"
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}