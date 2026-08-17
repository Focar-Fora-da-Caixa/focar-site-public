import { ButtonLink, Container, Section, Stack } from "@focar/ui";

import type { ActionContent } from "./types";
import styles from "./cta-panel.module.css";

type CtaPanelProps = {
  action: ActionContent;
  description: string;
  eyebrow?: string;
  title: string;
};

export function CtaPanel({ action, description, eyebrow, title }: CtaPanelProps) {
  return (
    <Section aria-labelledby="cta-title" className={styles.section} id="diagnostico" spacing="large" tone="dark">
      <Container size="content">
        <Stack className={styles.content} gap="medium">
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h2 className={styles.title} id="cta-title">{title}</h2>
          <p className={styles.description}>{description}</p>
          <ButtonLink className={styles.action} href={action.href}>
            {action.label}
          </ButtonLink>
        </Stack>
      </Container>
    </Section>
  );
}
