export const token = {
  color: {
    brand: "var(--color-brand-primary)",
    brandSoft: "var(--color-brand-soft)",
    background: "var(--color-background)",
    backgroundSubtle: "var(--color-background-subtle)",
    backgroundEmphasis: "var(--color-background-emphasis)",
    text: "var(--color-text)",
    textMuted: "var(--color-text-muted)",
    textInverse: "var(--color-text-inverse)",
    action: "var(--color-action)",
    border: "var(--color-border)",
    focus: "var(--color-focus)",
  },
  container: {
    narrow: "var(--container-narrow)",
    content: "var(--container-content)",
    wide: "var(--container-wide)",
  },
  motion: {
    fast: "var(--duration-fast)",
    normal: "var(--duration-normal)",
    slow: "var(--duration-slow)",
    standard: "var(--ease-standard)",
    emphasized: "var(--ease-emphasized)",
  },
  radius: {
    small: "var(--radius-sm)",
    medium: "var(--radius-md)",
    large: "var(--radius-lg)",
    pill: "var(--radius-pill)",
  },
  shadow: {
    subtle: "var(--shadow-subtle)",
    raised: "var(--shadow-raised)",
  },
} as const;
