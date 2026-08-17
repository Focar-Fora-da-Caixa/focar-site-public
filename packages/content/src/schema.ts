export type ContentStatus =
  | "architecture"
  | "draft"
  | "approved"
  | "blocked-by-evidence";

export type ComponentKey =
  | "case-grid"
  | "contact-channels"
  | "contact-form"
  | "cta-panel"
  | "differentiators"
  | "evidence"
  | "faq"
  | "fit-checklist"
  | "hero"
  | "human-profile"
  | "legal-content"
  | "manifesto"
  | "method-steps"
  | "metric-framework"
  | "narrative"
  | "offer-detail"
  | "problem-statement"
  | "responsibility-split"
  | "service-grid"
  | "team"
  | "thesis"
  | "timeline"
  | "value-grid";

export type LinkContent = {
  label: string;
  href: string;
};

export type BrandContent = {
  name: string;
  shortName: string;
  website: string;
  category: string;
  tagline: string;
  belief: string;
  description: string;
  region: string;
  primaryCta: LinkContent;
  secondaryCta: LinkContent;
  assets: {
    logoFull: string;
    logoSymbol: string;
    logoWordmark: string;
    status: "pending" | "available";
  };
};

export type NavigationContent = {
  primary: LinkContent[];
  utility: LinkContent[];
};

export type EditorialItem = {
  title: string;
  description: string;
};

export type HomePageContent = {
  status: Extract<ContentStatus, "draft" | "approved">;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: LinkContent;
    secondaryAction: LinkContent;
  };
  problem: {
    eyebrow: string;
    title: string;
    description: string;
    items: EditorialItem[];
  };
  thesis: {
    eyebrow: string;
    title: string;
    description: string;
  };
  method: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<EditorialItem & { id: string; number: string }>;
    action: LinkContent;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<EditorialItem & { id: string; label: string }>;
    action: LinkContent;
  };
  differentiators: {
    eyebrow: string;
    title: string;
    items: EditorialItem[];
  };
  fit: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  evidence: {
    enabled: boolean;
    title: string;
    disabledReason: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    action: LinkContent;
  };
};

export type MethodPageContent = {
  status: Extract<ContentStatus, "draft" | "approved">;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryAction: LinkContent;
    secondaryAction: LinkContent;
  };
  cycle: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<
      EditorialItem & {
        id: string;
        number: string;
        outcome: string;
      }
    >;
  };
  timeline: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<EditorialItem & { number: string; period: string }>;
  };
  indicators: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  limits: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    action: LinkContent;
  };
};

export type ContactField = {
  id: string;
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "textarea";
  autocomplete: string;
  required: boolean;
};

export type ContactPageContent = {
  status: Extract<ContentStatus, "draft" | "approved">;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  expectation: {
    title: string;
    items: string[];
  };
  unavailable: {
    eyebrow: string;
    title: string;
    description: string;
  };
  form: {
    title: string;
    submitLabel: string;
    successMessage: string;
    fields: ContactField[];
    consent: {
      required: boolean;
      label: string;
    };
    destinationStatus: "pending" | "configured";
  };
  whatsapp: {
    enabled: boolean;
    label: string;
    href: string | null;
    disabledReason: string;
  };
};

export type LinksPageContent = {
  status: Extract<ContentStatus, "draft" | "approved">;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  primaryAction: {
    label: string;
    href: string;
    note: string;
  };
  secondaryActions: Array<{
    label: string;
    href: string;
    note: string;
  }>;
  channels: Array<{
    label: string;
    value: string;
    href: string;
  }>;
  footerNote: string;
};

export type PrivacySection = {
  title: string;
  paragraphs: string[];
};

export type PrivacyPageContent = {
  status: Extract<ContentStatus, "draft" | "approved">;
  seo: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  controller: {
    name: string;
    document: string;
    contactEmail: string;
  };
  sections: PrivacySection[];
  lastUpdatedLabel: string;
  lastUpdated: string;
};

export type PageSection = {
  id: string;
  component: ComponentKey;
  purpose: string;
};

export type PageBlueprint = {
  id: string;
  path: string;
  title: string;
  goal: string;
  status: ContentStatus;
  sections: PageSection[];
};

export type PagesContent = {
  pages: PageBlueprint[];
};

export type SiteContent = {
  brand: BrandContent;
  contact: ContactPageContent;
  home: HomePageContent;
  links: LinksPageContent;
  method: MethodPageContent;
  navigation: NavigationContent;
  pages: PagesContent;
  privacy: PrivacyPageContent;
};
