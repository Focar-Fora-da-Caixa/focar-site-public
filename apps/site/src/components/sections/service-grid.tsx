import { ButtonLink, Container, Section, Stack } from "@focar/ui";

import type { ServiceContent } from "./types";
import styles from "./service-grid.module.css";

type ServiceGridProps = {
  description?: string;
  eyebrow?: string;
  services: ServiceContent[];
  title: string;
};

export function ServiceGrid({
  description,
  eyebrow,
  services,
  title,
}: ServiceGridProps) {
  return (
    <Section aria-labelledby="services-title" id="servicos" tone="subtle">
      <Container>
        <Stack gap="large">
          <Stack className={styles.heading} gap="small">
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            <h2 className={styles.title} id="services-title">{title}</h2>
            {description ? <p className={styles.description}>{description}</p> : null}
          </Stack>

          <ul className={styles.grid}>
            {services.map((service) => (
              <li className={styles.card} data-reveal-on-scroll key={service.id}>
                {service.label ? <p className={styles.label}>{service.label}</p> : null}
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                {service.href && service.label ? (
                  <ButtonLink href={service.href} variant="secondary">
                    {service.label}
                  </ButtonLink>
                ) : null}
              </li>
            ))}
          </ul>
        </Stack>
      </Container>
    </Section>
  );
}
