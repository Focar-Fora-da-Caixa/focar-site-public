import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import styles from "./button-link.module.css";

type ButtonLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: "primary" | "secondary" | "inverse";
};

export function ButtonLink({
  children,
  className,
  href,
  variant = "primary",
}: ButtonLinkProps) {
  const classes = [styles.button, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={classes} href={href as Route}>
      {children}
    </Link>
  );
}
