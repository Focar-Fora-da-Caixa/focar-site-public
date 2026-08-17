import { siteContent } from "@focar/content";

const REQUIRED_FORM_ENVIRONMENT_VARIABLES = [
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "FORM_FROM_EMAIL",
  "FORM_DESTINATION_EMAIL",
] as const;

function readEnvironmentVariable(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export function getContactFormConfiguration() {
  const missingVariables = REQUIRED_FORM_ENVIRONMENT_VARIABLES.filter(
    (name) => !readEnvironmentVariable(name),
  );

  return {
    enabled:
      siteContent.contact.form.destinationStatus === "configured" &&
      siteContent.privacy.status === "approved" &&
      missingVariables.length === 0,
    missingVariables,
    siteKey: readEnvironmentVariable("NEXT_PUBLIC_TURNSTILE_SITE_KEY"),
  };
}
