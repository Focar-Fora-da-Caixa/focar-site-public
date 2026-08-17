import type { HomePageContent } from "@focar/content";
import { Container, Section, Stack } from "@focar/ui";

import { FocarSymbol } from "@/components/brand-assets";

import styles from "./home-sections.module.css";

type ProblemSectionProps = HomePageContent["problem"];
type ThesisSectionProps = HomePageContent["thesis"];
type DifferentiatorsSectionProps = HomePageContent["differentiators"];
type FitSectionProps = HomePageContent["fit"];

export function HeroSignal({ eyebrow, title }: Pick<ThesisSectionProps, "eyebrow" | "title">) {
  return (
    <aside className={styles.signal} data-reveal="4">
      <div className={styles.signalTop}>
        <span aria-hidden="true" className={styles.signalIndex}>01</span>
        <p className={styles.signalEyebrow}>{eyebrow}</p>
      </div>
      <p>{title}</p>
      <div className={styles.signalFoot}>
        <span>Direção</span>
        <span>Conteúdo</span>
        <span>Dados</span>
      </div>
      <FocarSymbol aria-hidden="true" className={styles.signalLogo} />
    </aside>
  );
}

export function ProblemSection({
  description,
  eyebrow,
  items,
  title,
}: ProblemSectionProps) {
  return (
    <Section aria-labelledby="problem-title" className={styles.problem}>
      <Container>
        <div className={styles.splitHeading}>
          <Stack gap="small">
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.sectionTitle} id="problem-title">{title}</h2>
          </Stack>
          <p className={styles.lead}>{description}</p>
        </div>

        <ul className={styles.problemGrid}>
          {items.map((item, index) => (
            <li className={styles.problemItem} data-reveal-on-scroll key={item.title}>
              <span aria-hidden="true" className={styles.itemIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function ThesisSection({
  description,
  eyebrow,
  title,
}: ThesisSectionProps) {
  return (
    <Section aria-labelledby="thesis-title" className={styles.thesis} spacing="large" tone="brand">
      <Container size="wide">
        <div className={styles.thesisLayout}>
          <p className={styles.thesisEyebrow}>{eyebrow}</p>
          <h2 className={styles.thesisTitle} id="thesis-title">{title}</h2>
          <p className={styles.thesisDescription}>{description}</p>
        </div>
      </Container>
    </Section>
  );
}

export function DifferentiatorsSection({
  eyebrow,
  items,
  title,
}: DifferentiatorsSectionProps) {
  return (
    <Section aria-labelledby="differentiators-title" id="diferenciais">
      <Container>
        <div className={styles.splitHeading}>
          <Stack gap="small">
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.sectionTitle} id="differentiators-title">{title}</h2>
          </Stack>
        </div>

        <ul className={styles.differentiatorGrid}>
          {items.map((item, index) => (
            <li className={styles.differentiator} data-reveal-on-scroll key={item.title}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

export function FitSection({ eyebrow, items, title }: FitSectionProps) {
  return (
    <Section aria-labelledby="fit-title" className={styles.fit} tone="subtle">
      <Container>
        <div className={styles.fitLayout}>
          <Stack gap="small">
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.sectionTitle} id="fit-title">{title}</h2>
          </Stack>

          <ul className={styles.fitList}>
            {items.map((item) => (
              <li data-reveal-on-scroll key={item}>
                <span aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
