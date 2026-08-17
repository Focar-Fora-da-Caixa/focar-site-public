import { siteContent } from "@focar/content";

import { createPageMetadata } from "@/lib/page-metadata";

import {
  CtaPanel,
  Hero,
  MethodSteps,
  ServiceGrid,
} from "@/components";
import {
  DifferentiatorsSection,
  FitSection,
  HeroSignal,
  ProblemSection,
  ThesisSection,
} from "@/components/sections/home-sections";

export const metadata = createPageMetadata({
  description: siteContent.home.seo.description,
  path: "/",
  title: siteContent.home.seo.title,
});

export default function Home() {
  const { home } = siteContent;

  return (
    <main>
      <Hero
        {...home.hero}
        media={<HeroSignal eyebrow={home.thesis.eyebrow} title={home.thesis.title} />}
      />
      <ProblemSection {...home.problem} />
      <ThesisSection {...home.thesis} />
      <MethodSteps {...home.method} />
      <ServiceGrid
        description={home.services.description}
        eyebrow={home.services.eyebrow}
        services={home.services.items}
        title={home.services.title}
      />
      <DifferentiatorsSection {...home.differentiators} />
      <FitSection {...home.fit} />
      <CtaPanel {...home.cta} />
    </main>
  );
}
