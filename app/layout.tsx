import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steven Marathias · Analytics Portfolio",
  description:
    "Business analyst and BU MSBA candidate building sports and marketing analytics: Catch Radius Pressure, Catch Point Analytics, Sentry and more.",
  openGraph: {
    title: "Steven Marathias · Analytics Portfolio",
    description: "I build metrics for the moments box scores miss.",
    images: ["/headshot.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F5F1" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1612" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
