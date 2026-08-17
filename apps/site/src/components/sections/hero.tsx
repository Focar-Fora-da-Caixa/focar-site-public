import { ButtonLink, Container, Section, Stack } from "@focar/ui";

import type { HeroContent } from "./types";
import styles from "./hero.module.css";

export function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  media,
}: HeroContent) {
  return (
    <Section className={styles.section} aria-labelledby="page-title" spacing="large">
      <Container className={styles.container} size="wide">
        <div className={styles.layout}>
          <Stack className={styles.content} data-reveal="2" gap="large">
            <Stack gap="medium">
              {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
              <h1 className={styles.title} id="page-title">{title}</h1>
              <p className={styles.description}>{description}</p>
            </Stack>

            <div className={styles.actions}>
              <ButtonLink href={primaryAction.href}>
                {primaryAction.label}
              </ButtonLink>
              {secondaryAction ? (
                <ButtonLink
                  href={secondaryAction.href}
                  variant="secondary"
                >
                  {secondaryAction.label}
                </ButtonLink>
              ) : null}
            </div>
          </Stack>

          {media ? <div className={styles.media}>{media}</div> : null}
        </div>
      </Container>
    </Section>
  );
}
