export type ContactSubmission = {
  challenge: string;
  city: string;
  company: string;
  consent: true;
  name: string;
  segment: string;
  turnstileToken: string;
  whatsapp: string;
  website: string;
};

type TextRule = {
  max: number;
  min: number;
};

const TEXT_RULES = {
  challenge: { min: 10, max: 2000 },
  city: { min: 2, max: 100 },
  company: { min: 2, max: 120 },
  name: { min: 2, max: 100 },
  segment: { min: 3, max: 300 },
  whatsapp: { min: 8, max: 30 },
} satisfies Record<
  Exclude<keyof ContactSubmission, "consent" | "turnstileToken" | "website">,
  TextRule
>;

export type ContactSubmissionResult =
  | { success: true; data: ContactSubmission }
  | { success: false; message: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeText(value: unknown): string {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

export function validateContactSubmission(
  input: unknown,
): ContactSubmissionResult {
  if (!isRecord(input)) {
    return { success: false, message: "Dados inválidos." };
  }

  const values = Object.fromEntries(
    Object.keys(TEXT_RULES).map((key) => [key, normalizeText(input[key])]),
  ) as Record<keyof typeof TEXT_RULES, string>;

  for (const [key, rule] of Object.entries(TEXT_RULES) as Array<
    [keyof typeof TEXT_RULES, TextRule]
  >) {
    const value = values[key];
    if (value.length < rule.min || value.length > rule.max) {
      return {
        success: false,
        message: "Revise os campos obrigatórios e tente novamente.",
      };
    }
  }

  const turnstileToken = normalizeText(input.turnstileToken);
  if (!turnstileToken || turnstileToken.length > 2048) {
    return {
      success: false,
      message: "Conclua a verificação de segurança.",
    };
  }

  if (input.consent !== true) {
    return {
      success: false,
      message: "É necessário autorizar o tratamento dos dados.",
    };
  }

  return {
    success: true,
    data: {
      ...values,
      consent: true,
      turnstileToken,
      website: normalizeText(input.website),
    },
  };
}
