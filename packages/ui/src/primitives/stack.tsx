import type { ComponentPropsWithoutRef } from "react";

import styles from "./stack.module.css";

type StackProps = ComponentPropsWithoutRef<"div"> & {
  gap?: "small" | "medium" | "large" | "section";
};

export function Stack({
  children,
  className,
  gap = "medium",
  ...props
}: StackProps) {
  const classes = [styles.stack, styles[gap], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
