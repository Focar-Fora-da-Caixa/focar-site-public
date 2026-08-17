import { siteContent } from "@focar/content";
import { Container } from "@focar/ui";
import Link from "next/link";

import { FocarFullLogo, ModoDigitalSymbol } from "@/components/brand-assets";

import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner} size="wide">
        <div className={styles.identity}>
          <Link
            aria-label={`${siteContent.brand.name} — Início`}
            className={styles.brand}
            href="/"
          >
            <FocarFullLogo aria-hidden="true" />
          </Link>
          <p>{siteContent.brand.description}</p>
        </div>

        <div className={styles.meta}>
          <p>{siteContent.brand.region}</p>
          <a
            href="https://instagram.com/focarforadacaixa"
            rel="noreferrer"
            target="_blank"
          >
            Instagram — @focarforadacaixa
          </a>
          <Link href="/privacidade">Política de Privacidade</Link>
          <p>© {new Date().getFullYear()} {siteContent.brand.shortName}</p>
        </div>
      </Container>

      <Container className={styles.creditRow} size="wide">
        <a
          aria-label="Construído por Modo Digital"
          className={styles.modoBadge}
          href="https://sejamododigital.com.br"
          rel="noreferrer"
          target="_blank"
        >
          <span>Construído por</span>
          <ModoDigitalSymbol aria-hidden="true" />
          <strong>Modo Digital</strong>
        </a>
      </Container>
    </footer>
  );
}
