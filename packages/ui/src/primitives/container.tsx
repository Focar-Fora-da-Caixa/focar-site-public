import type { ComponentPropsWithoutRef } from "react";

import styles from "./container.module.css";

type ContainerSize = "narrow" | "content" | "wide";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
};

export function Container({
  children,
  className,
  size = "content",
  ...props
}: ContainerProps) {
  const classes = [styles.container, styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
