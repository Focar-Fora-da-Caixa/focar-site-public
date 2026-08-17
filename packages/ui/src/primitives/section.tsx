import type { ComponentPropsWithoutRef } from "react";

import styles from "./section.module.css";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: "none" | "medium" | "large";
  tone?: "default" | "subtle" | "brand" | "dark";
};

export function Section({
  children,
  className,
  spacing = "medium",
  tone = "default",
  ...props
}: SectionProps) {
  const classes = [styles.section, styles[spacing], styles[tone], className]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
}
