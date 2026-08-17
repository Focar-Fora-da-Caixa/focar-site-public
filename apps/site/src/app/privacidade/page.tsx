import { siteContent } from "@focar/content";
import { Container, Section } from "@focar/ui";

import { createPageMetadata } from "@/lib/page-metadata";
import styles from "./privacy.module.css";

export const metadata = createPageMetadata({
  description: siteContent.privacy.seo.description,
  path: "/privacidade",
  title: siteContent.privacy.seo.title,
});

export default function PrivacyPage() {
  const { privacy } = siteContent;

  return (
    <main>
      <Section aria-labelledby="privacy-title" className={styles.hero} spacing="large">
        <Container size="content">
          <p className={styles.eyebrow}>{privacy.hero.eyebrow}</p>
          <h1 id="privacy-title">{privacy.hero.title}</h1>
          <p className={styles.lead}>{privacy.hero.description}</p>
          <p className={styles.updated}>
            {privacy.lastUpdatedLabel}: {privacy.lastUpdated}
          </p>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container size="content">
          <div className={styles.content}>
            <aside className={styles.identity}>
              <p className={styles.identityLabel}>Controlador dos dados</p>
              <h2>{privacy.controller.name}</h2>
              <p>{privacy.controller.document}</p>
              <a href={`mailto:${privacy.controller.contactEmail}`}>
                {privacy.controller.contactEmail}
              </a>
            </aside>

            <div className={styles.sections}>
              {privacy.sections.map((section) => (
                <section data-reveal-on-scroll key={section.title}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
