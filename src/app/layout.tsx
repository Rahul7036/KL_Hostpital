import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, Manrope } from "next/font/google";
import { site } from "@/content/site";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

const description =
  "KL Skin & Children's Hospital: a specialised dermatology and paediatric hospital in Jadcherla, Mahabubnagar. Skin, hair & scalp care and children's healthcare. Book an appointment on WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "KL Skin & Children's Hospital, Jadcherla | Dermatologist & Paediatrician",
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  keywords: [
    "dermatologist in Jadcherla",
    "skin hospital Jadcherla",
    "paediatrician in Jadcherla",
    "children's hospital Jadcherla",
    "pediatrician Mahabubnagar",
    "dermatologist Mahabubnagar",
    "hair fall treatment Jadcherla",
    "KL Hospital Jadcherla",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: "KL Skin & Children's Hospital, Jadcherla",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "KL Skin & Children's Hospital, Jadcherla",
    description,
  },
  other: {
    "geo.region": "IN-TG",
    "geo.placename": "Jadcherla, Mahabubnagar",
  },
};

export const viewport: Viewport = {
  themeColor: "#0e4744",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable} ${instrument.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-teal-900 focus:px-5 focus:py-3 focus:text-ivory-50"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
