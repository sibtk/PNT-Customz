import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { SITE } from "@/config/site";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: SITE.seo.title,
  description: SITE.seo.description,
  openGraph: {
    title: SITE.seo.title,
    description: SITE.seo.description,
    url: "/",
    siteName: SITE.company,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.seo.title,
    description: SITE.seo.description,
  },
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.company,
    url: "/",
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "19200 W Little York Rd, Suite 204",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77449",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "09:00", closes: "19:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "19:00" },
    ],
  };
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="bg-[#0B0B0C] text-white antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
