import type { ComponentPropsWithoutRef } from "react";

import styles from "./visually-hidden.module.css";

export function VisuallyHidden({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"span">) {
  const classes = [styles.hidden, className].filter(Boolean).join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
