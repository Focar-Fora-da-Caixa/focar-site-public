import type { ReactNode } from "react";

export type ActionContent = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryAction: ActionContent;
  secondaryAction?: ActionContent;
  media?: ReactNode;
};

export type MethodStepContent = {
  id: string;
  number: string;
  title: string;
  description: string;
  outcome?: string;
};

export type ServiceContent = {
  id: string;
  title: string;
  description: string;
  href?: string;
  label?: string;
};

export type EvidenceContent = {
  label: string;
  value: string;
  context: string;
  period?: string;
  source?: string;
};
