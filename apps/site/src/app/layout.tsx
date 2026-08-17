import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { siteContent } from "@focar/content";

import { createFaviconDataUrl } from "@/components/brand-assets";
import { SiteChrome } from "@/components/site-chrome";

import "./globals.css";

const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  areaServed: siteContent.brand.region,
  description: siteContent.brand.description,
  email: "contato@focarforadacaixa.com.br",
  image: `${siteContent.brand.website}/opengraph-image`,
  name: siteContent.brand.name,
  slogan: siteContent.brand.tagline,
  url: siteContent.brand.website,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  description: siteContent.brand.description,
  inLanguage: "pt-BR",
  name: siteContent.brand.name,
  url: siteContent.brand.website,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteContent.brand.website),
  applicationName: siteContent.brand.name,
  category: siteContent.brand.category,
  title: {
    default: siteContent.home.seo.title,
    template: `%s | ${siteContent.brand.shortName}`,
  },
  description: siteContent.home.seo.description,
  authors: [{ name: siteContent.brand.name }],
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml",
        url: createFaviconDataUrl("#0b0b0d"),
      },
      {
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
        url: createFaviconDataUrl("#ffffff"),
      },
    ],
  },
  keywords: [
    "crescimento digital",
    "marketing para empresas locais",
    "conteúdo estratégico",
    "tráfego pago",
    "produção audiovisual",
    "diagnóstico de marketing",
    "Focar Fora da Caixa",
  ],
  openGraph: {
    description: siteContent.home.seo.description,
    images: [
      {
        alt: `${siteContent.brand.name} — ${siteContent.brand.tagline}`,
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    locale: "pt_BR",
    siteName: siteContent.brand.name,
    title: siteContent.home.seo.title,
    type: "website",
    url: siteContent.brand.website,
  },
  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      follow: isProduction,
      index: isProduction,
    },
  },
  twitter: {
    card: "summary_large_image",
    description: siteContent.home.seo.description,
    images: ["/twitter-image"],
    title: `${siteContent.home.seo.title} | ${siteContent.brand.shortName}`,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#ffffff", media: "(prefers-color-scheme: light)" },
    { color: "#0b0b0d", media: "(prefers-color-scheme: dark)" },
  ],
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
          type="application/ld+json"
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
