import { siteContent } from "@focar/content";
import { Container } from "@focar/ui";
import type { Route } from "next";
import Link from "next/link";

import { FocarSymbol } from "@/components/brand-assets";
import { createPageMetadata } from "@/lib/page-metadata";

import styles from "./links.module.css";

export const metadata = createPageMetadata({
  description: siteContent.links.seo.description,
  path: "/links",
  title: siteContent.links.seo.title,
});

function isInternalHref(href: string) {
  return href.startsWith("/");
}

type ActionLinkProps = {
  href: string;
  label: string;
  note: string;
  primary?: boolean;
};

function ActionLink({ href, label, note, primary = false }: ActionLinkProps) {
  const className = primary ? styles.primaryAction : styles.secondaryAction;
  const content = (
    <>
      <span className={styles.actionRow}>
        <span className={styles.actionLabel}>{label}</span>
        <span aria-hidden="true" className={styles.actionIcon}>
          <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.5 8H12.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
            <path
              d="M8.75 4.5L12.5 8L8.75 11.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </span>
      </span>
      <span className={styles.actionNote}>{note}</span>
    </>
  );

  if (isInternalHref(href)) {
    return (
      <Link className={className} href={href as Route}>
        {content}
      </Link>
    );
  }

  return (
    <a className={className} href={href} rel="noreferrer" target="_blank">
      {content}
    </a>
  );
}

export default function LinksPage() {
  const { links } = siteContent;

  return (
    <main className={styles.page}>
      <Container size="content">
        <div className={styles.shell}>
          <section className={styles.panel}>
            <header className={styles.header} data-reveal="1">
              <span className={styles.brandMark}>
                <FocarSymbol aria-hidden="true" className={styles.symbol} />
              </span>
              <p className={styles.headerLabel}>{links.hero.eyebrow}</p>
            </header>

            <div className={styles.intro} data-reveal="2">
              <h1 className={styles.title}>{links.hero.title}</h1>
              <p className={styles.description}>{links.hero.description}</p>
            </div>

            <div className={styles.actions} data-reveal="3">
              <ActionLink
                href={links.primaryAction.href}
                label={links.primaryAction.label}
                note={links.primaryAction.note}
                primary
              />
              {links.secondaryActions.map((item) => (
                <ActionLink
                  href={item.href}
                  key={item.href}
                  label={item.label}
                  note={item.note}
                />
              ))}
            </div>

            <div className={styles.channelsSection} data-reveal="4">
              <p className={styles.channelsTitle}>Canais diretos</p>
              {links.channels.map((channel) => (
                <div className={styles.metaCard} key={channel.label}>
                  <span className={styles.metaLabel}>{channel.label}</span>
                  <a href={channel.href} rel="noreferrer" target="_blank">
                    {channel.value}
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </main>
  );
}
