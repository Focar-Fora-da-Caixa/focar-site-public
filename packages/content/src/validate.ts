import type {
  BrandContent,
  ComponentKey,
  ContactPageContent,
  ContentStatus,
  HomePageContent,
  LinksPageContent,
  MethodPageContent,
  NavigationContent,
  PagesContent,
  PrivacyPageContent,
  SiteContent,
} from "./schema";

const CONTENT_STATUSES = new Set<ContentStatus>([
  "architecture",
  "draft",
  "approved",
  "blocked-by-evidence",
]);

const COMPONENT_KEYS = new Set<ComponentKey>([
  "case-grid",
  "contact-channels",
  "contact-form",
  "cta-panel",
  "differentiators",
  "evidence",
  "faq",
  "fit-checklist",
  "hero",
  "human-profile",
  "legal-content",
  "manifesto",
  "method-steps",
  "metric-framework",
  "narrative",
  "offer-detail",
  "problem-statement",
  "responsibility-split",
  "service-grid",
  "team",
  "thesis",
  "timeline",
  "value-grid",
]);

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Invalid site content: ${message}`);
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasText(record: Record<string, unknown>, key: string): boolean {
  return typeof record[key] === "string" && record[key].trim().length > 0;
}

function validateLink(value: unknown, context: string): void {
  assert(isRecord(value), `${context} must be an object`);
  assert(hasText(value, "label"), `${context}.label is required`);
  assert(hasText(value, "href"), `${context}.href is required`);
  assert(
    String(value.href).startsWith("/"),
    `${context}.href must be an internal path`,
  );
}

export function validateSiteContent(input: {
  brand: unknown;
  contact: unknown;
  home: unknown;
  links: unknown;
  method: unknown;
  navigation: unknown;
  pages: unknown;
  privacy: unknown;
}): SiteContent {
  assert(isRecord(input.brand), "brand must be an object");
  assert(hasText(input.brand, "name"), "brand.name is required");
  assert(hasText(input.brand, "website"), "brand.website is required");
  assert(
    String(input.brand.website).startsWith("https://"),
    "brand.website must use https",
  );
  assert(hasText(input.brand, "tagline"), "brand.tagline is required");
  assert(hasText(input.brand, "belief"), "brand.belief is required");
  validateLink(input.brand.primaryCta, "brand.primaryCta");
  validateLink(input.brand.secondaryCta, "brand.secondaryCta");
  assert(isRecord(input.brand.assets), "brand.assets must be an object");

  assert(isRecord(input.contact), "contact must be an object");
  assert(
    input.contact.status === "draft" || input.contact.status === "approved",
    "contact.status must be draft or approved",
  );
  assert(isRecord(input.contact.form), "contact.form must be an object");
  assert(
    isRecord(input.contact.unavailable) &&
      hasText(input.contact.unavailable, "title"),
    "contact.unavailable must contain a title",
  );
  assert(
    Array.isArray(input.contact.form.fields) &&
      input.contact.form.fields.length > 0,
    "contact.form.fields must contain at least one field",
  );
  assert(
    new Set(
      input.contact.form.fields
        .filter(isRecord)
        .map((field) => String(field.name)),
    ).size === input.contact.form.fields.length,
    "contact.form field names must be unique",
  );
  assert(isRecord(input.contact.whatsapp), "contact.whatsapp must be an object");
  assert(
    typeof input.contact.whatsapp.enabled === "boolean",
    "contact.whatsapp.enabled must be a boolean",
  );
  if (input.contact.whatsapp.enabled) {
    assert(
      typeof input.contact.whatsapp.href === "string" &&
        input.contact.whatsapp.href.startsWith("https://wa.me/"),
      "enabled WhatsApp requires a wa.me URL",
    );
  }

  assert(isRecord(input.home), "home must be an object");
  assert(
    input.home.status === "draft" || input.home.status === "approved",
    "home.status must be draft or approved",
  );
  assert(isRecord(input.home.hero), "home.hero must be an object");
  assert(hasText(input.home.hero, "title"), "home.hero.title is required");
  validateLink(input.home.hero.primaryAction, "home.hero.primaryAction");
  validateLink(input.home.hero.secondaryAction, "home.hero.secondaryAction");
  assert(isRecord(input.home.method), "home.method must be an object");
  assert(
    Array.isArray(input.home.method.steps) &&
      input.home.method.steps.length === 6,
    "home.method.steps must contain the six Sistema Focar steps",
  );
  assert(isRecord(input.home.services), "home.services must be an object");
  assert(
    Array.isArray(input.home.services.items) &&
      input.home.services.items.length === 3,
    "home.services.items must contain the three public offers",
  );
  assert(isRecord(input.home.evidence), "home.evidence must be an object");
  assert(
    typeof input.home.evidence.enabled === "boolean",
    "home.evidence.enabled must be a boolean",
  );
  assert(isRecord(input.home.cta), "home.cta must be an object");
  validateLink(input.home.cta.action, "home.cta.action");

  assert(isRecord(input.links), "links must be an object");
  assert(
    input.links.status === "draft" || input.links.status === "approved",
    "links.status must be draft or approved",
  );
  assert(isRecord(input.links.hero), "links.hero must be an object");
  assert(hasText(input.links.hero, "title"), "links.hero.title is required");
  assert(
    isRecord(input.links.primaryAction),
    "links.primaryAction must be an object",
  );
  assert(
    hasText(input.links.primaryAction, "label") &&
      hasText(input.links.primaryAction, "href") &&
      hasText(input.links.primaryAction, "note"),
    "links.primaryAction must contain label, href and note",
  );
  assert(
    Array.isArray(input.links.secondaryActions) &&
      input.links.secondaryActions.length > 0,
    "links.secondaryActions must contain at least one item",
  );
  input.links.secondaryActions.forEach((item, index) => {
    assert(
      isRecord(item) &&
        hasText(item, "label") &&
        hasText(item, "href") &&
        hasText(item, "note"),
      `links.secondaryActions[${index}] must contain label, href and note`,
    );
  });
  assert(
    Array.isArray(input.links.channels) && input.links.channels.length > 0,
    "links.channels must contain at least one item",
  );
  input.links.channels.forEach((channel, index) => {
    assert(
      isRecord(channel) &&
        hasText(channel, "label") &&
        hasText(channel, "value") &&
        hasText(channel, "href"),
      `links.channels[${index}] must contain label, value and href`,
    );
  });
  assert(hasText(input.links, "footerNote"), "links.footerNote is required");

  assert(isRecord(input.method), "method must be an object");
  assert(
    input.method.status === "draft" || input.method.status === "approved",
    "method.status must be draft or approved",
  );
  assert(isRecord(input.method.hero), "method.hero must be an object");
  assert(hasText(input.method.hero, "title"), "method.hero.title is required");
  validateLink(input.method.hero.primaryAction, "method.hero.primaryAction");
  validateLink(input.method.hero.secondaryAction, "method.hero.secondaryAction");
  assert(isRecord(input.method.cycle), "method.cycle must be an object");
  assert(
    Array.isArray(input.method.cycle.steps) &&
      input.method.cycle.steps.length === 6,
    "method.cycle.steps must contain the six Sistema Focar steps",
  );
  assert(isRecord(input.method.timeline), "method.timeline must be an object");
  assert(
    Array.isArray(input.method.timeline.items) &&
      input.method.timeline.items.length === 3,
    "method.timeline.items must contain the first three months",
  );
  assert(
    isRecord(input.method.indicators) &&
      Array.isArray(input.method.indicators.items),
    "method.indicators.items must be an array",
  );
  assert(isRecord(input.method.cta), "method.cta must be an object");
  validateLink(input.method.cta.action, "method.cta.action");

  assert(isRecord(input.navigation), "navigation must be an object");
  assert(
    Array.isArray(input.navigation.primary),
    "navigation.primary must be an array",
  );
  assert(
    Array.isArray(input.navigation.utility),
    "navigation.utility must be an array",
  );
  [...input.navigation.primary, ...input.navigation.utility].forEach(
    (link, index) => validateLink(link, `navigation link ${index}`),
  );

  assert(isRecord(input.pages), "pages must be an object");
  assert(Array.isArray(input.pages.pages), "pages.pages must be an array");

  const ids = new Set<string>();
  const paths = new Set<string>();

  for (const page of input.pages.pages) {
    assert(isRecord(page), "every page must be an object");
    assert(hasText(page, "id"), "every page requires an id");
    assert(hasText(page, "path"), `page ${String(page.id)} requires a path`);
    assert(
      Array.isArray(page.sections),
      `page ${String(page.id)} requires sections`,
    );
    assert(
      CONTENT_STATUSES.has(String(page.status) as ContentStatus),
      `page ${String(page.id)} has an invalid status`,
    );
    assert(!ids.has(String(page.id)), `duplicate page id: ${String(page.id)}`);
    assert(
      !paths.has(String(page.path)),
      `duplicate page path: ${String(page.path)}`,
    );

    ids.add(String(page.id));
    paths.add(String(page.path));

    const sectionIds = new Set<string>();
    for (const section of page.sections) {
      assert(
        isRecord(section),
        `page ${String(page.id)} contains an invalid section`,
      );
      assert(
        hasText(section, "id"),
        `page ${String(page.id)} contains a section without id`,
      );
      assert(
        COMPONENT_KEYS.has(String(section.component) as ComponentKey),
        `section ${String(section.id)} has an invalid component`,
      );
      assert(
        !sectionIds.has(String(section.id)),
        `page ${String(page.id)} has duplicate section id ${String(section.id)}`,
      );
      sectionIds.add(String(section.id));
    }
  }

  assert(isRecord(input.privacy), "privacy must be an object");
  assert(
    input.privacy.status === "draft" || input.privacy.status === "approved",
    "privacy.status must be draft or approved",
  );
  assert(isRecord(input.privacy.hero), "privacy.hero must be an object");
  assert(hasText(input.privacy.hero, "title"), "privacy.hero.title is required");
  assert(
    isRecord(input.privacy.controller),
    "privacy.controller must be an object",
  );
  assert(
    hasText(input.privacy.controller, "name") &&
      hasText(input.privacy.controller, "document") &&
      hasText(input.privacy.controller, "contactEmail"),
    "privacy.controller must contain name, document and contactEmail",
  );
  assert(
    Array.isArray(input.privacy.sections) && input.privacy.sections.length > 0,
    "privacy.sections must contain at least one section",
  );
  input.privacy.sections.forEach((section, index) => {
    assert(isRecord(section), `privacy.sections[${index}] must be an object`);
    assert(
      hasText(section, "title"),
      `privacy.sections[${index}].title is required`,
    );
    assert(
      Array.isArray(section.paragraphs) &&
        section.paragraphs.every(
          (paragraph) =>
            typeof paragraph === "string" && paragraph.trim().length > 0,
        ),
      `privacy.sections[${index}].paragraphs must contain text`,
    );
  });

  return {
    brand: input.brand as BrandContent,
    contact: input.contact as ContactPageContent,
    home: input.home as HomePageContent,
    links: input.links as LinksPageContent,
    method: input.method as MethodPageContent,
    navigation: input.navigation as NavigationContent,
    pages: input.pages as PagesContent,
    privacy: input.privacy as PrivacyPageContent,
  };
}
