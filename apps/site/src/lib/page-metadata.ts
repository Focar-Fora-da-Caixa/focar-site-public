import { siteContent } from "@focar/content";
import type { Metadata } from "next";

type PageMetadataInput = {
  description: string;
  path: `/${string}` | "/";
  title: string;
};

export function createPageMetadata({
  description,
  path,
  title,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${siteContent.brand.shortName}`;

  return {
    alternates: {
      canonical: path,
    },
    description,
    openGraph: {
      description,
      images: [
        {
          alt: `${siteContent.brand.name} — ${title}`,
          height: 630,
          url: "/opengraph-image",
          width: 1200,
        },
      ],
      locale: "pt_BR",
      siteName: siteContent.brand.name,
      title,
      type: "website",
      url: path,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: ["/twitter-image"],
      title: fullTitle,
    },
  };
}
