"use client";

import { siteContent } from "@focar/content";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { FocarSymbol, FocarWordmark } from "@/components/brand-assets";
import { useScrollThreshold } from "@/hooks/use-scroll-threshold";

import { Container } from "@focar/ui";

import styles from "./site-header.module.css";

export function SiteHeader() {
  const compact = useScrollThreshold(56);
  const pathname = usePathname();

  return (
    <header className={styles.header} data-compact={compact} data-reveal="1">
      <Container className={styles.inner} size="wide">
        <Link
          aria-label={`${siteContent.brand.name} — Início`}
          className={styles.brand}
          href="/"
        >
          <span className={styles.wordmark}>
            <FocarWordmark aria-hidden="true" />
          </span>
          <span className={styles.symbol}>
            <FocarSymbol aria-hidden="true" />
          </span>
        </Link>

        <nav aria-label="Navegação principal" className={styles.navigation}>
          <ul className={styles.links}>
            {siteContent.navigation.primary
              .filter(({ href }) => href === "/metodo" || href === "/servicos")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    aria-current={pathname === item.href ? "page" : undefined}
                    href={
                      (item.href === "/servicos"
                        ? "/#servicos"
                        : item.href) as Route
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <Link
          aria-label={siteContent.brand.primaryCta.label}
          className={styles.action}
          href="/contato"
        >
          <span aria-hidden="true" className={styles.actionIcon}>
            <svg
              fill="none"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8H12"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M8.5 4.5L12.5 8L8.5 11.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </span>
          <span className={styles.actionLabel}>{siteContent.brand.primaryCta.label}</span>
        </Link>
      </Container>
    </header>
  );
}
