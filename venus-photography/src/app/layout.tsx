import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { siteUrl } from "@/lib/siteUrl";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const sans = Jost({
  variable: "--font-sans",
  subsets: ["latin"],
});

const script = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const title = "Venus — The Photography Company | Indian Wedding Photography & Films";
const description =
  "Premium Indian and Tamil wedding photography, cinematic wedding films, pre-wedding stories and heirloom albums by Venus — The Photography Company, Chennai.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "wedding photography Chennai",
    "Tamil wedding photographer",
    "Indian wedding photography",
    "candid wedding photography",
    "cinematic wedding films",
    "pre-wedding shoot",
    "destination wedding photographer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Venus — The Photography Company",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
