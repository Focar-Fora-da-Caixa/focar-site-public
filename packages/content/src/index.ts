import brand from "./site/brand.json";
import contact from "./site/contact.json";
import home from "./site/home.json";
import links from "./site/links.json";
import method from "./site/method.json";
import navigation from "./site/navigation.json";
import pages from "./site/pages.json";
import privacy from "./site/privacy.json";

import { validateSiteContent } from "./validate";

export const siteContent = validateSiteContent({
  brand,
  contact,
  home,
  links,
  method,
  navigation,
  pages,
  privacy,
});

export type {
  BrandContent,
  ContactField,
  ContactPageContent,
  ComponentKey,
  ContentStatus,
  EditorialItem,
  HomePageContent,
  LinksPageContent,
  MethodPageContent,
  LinkContent,
  NavigationContent,
  PageBlueprint,
  PageSection,
  PagesContent,
  PrivacyPageContent,
  PrivacySection,
  SiteContent,
} from "./schema";
