import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import "./globals.css";

// Self-hosted (all SIL Open Font License). next/font adds size-matched fallbacks so text doesn't jump on load.
const display = localFont({
  src: [
    { path: "../fonts/big-shoulders-display-latin-700-normal.woff2", weight: "700" },
    { path: "../fonts/big-shoulders-display-latin-800-normal.woff2", weight: "800" },
    { path: "../fonts/big-shoulders-display-latin-900-normal.woff2", weight: "900" },
  ],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["Arial Narrow", "Arial", "sans-serif"],
});

const body = localFont({
  src: [
    { path: "../fonts/newsreader-latin-opsz-normal.woff2", weight: "200 800", style: "normal" },
    { path: "../fonts/newsreader-latin-opsz-italic.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-body",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "serif"],
});

const mono = localFont({
  src: [
    { path: "../fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "../fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
});

// Vercel sets this at build time, so link previews point at the live site.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Steven Marathias · Sports & Business Analytics",
    template: "%s · Steven Marathias",
  },
  description:
    "Business analyst and BU MSBA candidate. I build metrics for the moments box scores miss: Catch Radius Pressure, Catch Point Analytics, Sentry and more.",
  openGraph: {
    title: "Steven Marathias · Sports & Business Analytics",
    description: "I build metrics for the moments box scores miss.",
    images: [{ url: "/headshot.jpg", width: 640, height: 640, alt: "Steven Marathias" }],
    type: "website",
  },
  twitter: { card: "summary", images: ["/headshot.jpg"] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0A1220",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Nav />
        <div id="main">{children}</div>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
