import { Container, Section, Stack } from "@focar/ui";

import type { MethodStepContent } from "./types";
import styles from "./method-steps.module.css";

type MethodStepsProps = {
  description?: string;
  eyebrow?: string;
  steps: MethodStepContent[];
  title: string;
};

export function MethodSteps({
  description,
  eyebrow,
  steps,
  title,
}: MethodStepsProps) {
  return (
    <Section className={styles.section} aria-labelledby="method-title" id="metodo">
      <Container>
        <Stack gap="large">
          <Stack className={styles.heading} gap="small">
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            <h2 className={styles.title} id="method-title">{title}</h2>
            {description ? <p className={styles.description}>{description}</p> : null}
          </Stack>

          <ol className={styles.steps}>
            {steps.map((step) => (
              <li className={styles.step} data-reveal-on-scroll key={step.id}>
                <p aria-hidden="true" className={styles.number}>{step.number}</p>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                {step.outcome ? <p className={styles.outcome}>{step.outcome}</p> : null}
              </li>
            ))}
          </ol>
        </Stack>
      </Container>
    </Section>
  );
}
