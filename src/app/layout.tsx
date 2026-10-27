import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import Dock from "@/components/Dock";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SmoothScroll from "@/components/block/smooth-scroll";
import { Analytics } from "@vercel/analytics/next";
import { siteUrl } from "@/lib/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Steven Marathias · Business & Sports Analytics",
    template: "%s · Steven Marathias",
  },
  description:
    "Business analyst and BU MSBA candidate. Pricing, operations and marketing analytics, plus sports analytics including Catch Radius Pressure and Catch Point Analytics.",
  openGraph: {
    title: "Steven Marathias · Business & Sports Analytics",
    description: "I turn messy data into decisions for pricing, marketing, operations and front offices.",
    url: "/",
    siteName: "Steven Marathias",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
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
        <SmoothScroll>
          <Nav />
          <div id="main">{children}</div>
          <Footer />
          <Dock />
        </SmoothScroll>
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
