import type { MethodPageContent } from "@focar/content";
import { Container, Section, Stack } from "@focar/ui";

import styles from "./method.module.css";

type CycleGraphicProps = {
  steps: MethodPageContent["cycle"]["steps"];
};

export function CycleGraphic({ steps }: CycleGraphicProps) {
  return (
    <aside aria-label="Etapas do Sistema Focar" className={styles.cycleGraphic}>
      <ol>
        {steps.map((step) => (
          <li key={step.id}>
            <span>{step.number}</span>
            {step.title}
          </li>
        ))}
      </ol>
      <span aria-hidden="true" className={styles.cycleRing} />
    </aside>
  );
}

export function TimelineSection({
  description,
  eyebrow,
  items,
  title,
}: MethodPageContent["timeline"]) {
  return (
    <Section aria-labelledby="timeline-title" id="primeiros-90-dias">
      <Container>
        <div className={styles.sectionHeading}>
          <Stack gap="small">
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.sectionTitle} id="timeline-title">{title}</h2>
          </Stack>
          <p className={styles.lead}>{description}</p>
        </div>

        <ol className={styles.timeline}>
          {items.map((item) => (
            <li data-reveal-on-scroll key={item.number}>
              <span className={styles.timelineNumber}>{item.number}</span>
              <p className={styles.period}>{item.period}</p>
              <h3>{item.title}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function IndicatorsSection({
  description,
  eyebrow,
  items,
  title,
}: MethodPageContent["indicators"]) {
  return (
    <Section aria-labelledby="indicators-title" className={styles.indicators} spacing="large" tone="brand">
      <Container>
        <div className={styles.indicatorsLayout}>
          <Stack gap="medium">
            <p className={styles.brandEyebrow}>{eyebrow}</p>
            <h2 className={styles.sectionTitle} id="indicators-title">{title}</h2>
            <p className={styles.brandLead}>{description}</p>
          </Stack>

          <ul className={styles.indicatorList}>
            {items.map((item) => (
              <li data-reveal-on-scroll key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export function LimitsSection({
  description,
  eyebrow,
  title,
}: MethodPageContent["limits"]) {
  return (
    <Section aria-labelledby="limits-title" tone="subtle">
      <Container size="content">
        <div className={styles.limits}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h2 className={styles.sectionTitle} id="limits-title">{title}</h2>
          <p className={styles.limitDescription}>{description}</p>
        </div>
      </Container>
    </Section>
  );
}
