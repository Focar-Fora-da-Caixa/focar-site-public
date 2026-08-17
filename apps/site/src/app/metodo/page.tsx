import { siteContent } from "@focar/content";

import { CtaPanel, Hero, MethodSteps } from "@/components";
import { createPageMetadata } from "@/lib/page-metadata";

import {
  CycleGraphic,
  IndicatorsSection,
  LimitsSection,
  TimelineSection,
} from "./sections";

export const metadata = createPageMetadata({
  description: siteContent.method.seo.description,
  path: "/metodo",
  title: siteContent.method.seo.title,
});

export default function MethodPage() {
  const { method } = siteContent;

  return (
    <main>
      <Hero
        {...method.hero}
        media={<CycleGraphic steps={method.cycle.steps} />}
      />
      <MethodSteps {...method.cycle} />
      <TimelineSection {...method.timeline} />
      <IndicatorsSection {...method.indicators} />
      <LimitsSection {...method.limits} />
      <CtaPanel {...method.cta} />
    </main>
  );
}
