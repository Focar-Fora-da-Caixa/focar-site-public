import nodemailer from "nodemailer";

import type { ContactSubmission } from "./contact-submission";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function requireEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing server configuration: ${name}`);
  }
  return value;
}

function parseEmailList(value: string): string[] {
  return value
    .split(/[,;]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function sendContactSubmission(
  submission: ContactSubmission,
): Promise<void> {
  const port = Number(requireEnvironmentVariable("SMTP_PORT"));
  if (!Number.isInteger(port)) {
    throw new Error("Invalid server configuration: SMTP_PORT");
  }

  const transporter = nodemailer.createTransport({
    auth: {
      pass: requireEnvironmentVariable("SMTP_PASSWORD"),
      user: requireEnvironmentVariable("SMTP_USER"),
    },
    host: requireEnvironmentVariable("SMTP_HOST"),
    port,
    secure: port === 465,
  });

  const fields = [
    ["Nome", submission.name],
    ["Empresa", submission.company],
    ["Cidade", submission.city],
    ["WhatsApp", submission.whatsapp],
    ["Segmento", submission.segment],
    ["Desafio", submission.challenge],
  ] as const;
  const safeCompany = submission.company.replace(/[\r\n]+/g, " ").slice(0, 80);
  const recipients = parseEmailList(
    requireEnvironmentVariable("FORM_DESTINATION_EMAIL"),
  );

  if (recipients.length === 0) {
    throw new Error("Invalid server configuration: FORM_DESTINATION_EMAIL");
  }

  await transporter.sendMail({
    from: `"Site Focar" <${requireEnvironmentVariable("FORM_FROM_EMAIL")}>`,
    html: `
      <h1>Nova solicitação de diagnóstico</h1>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
        ${fields
          .map(
            ([label, value]) =>
              `<tr><th align="left" valign="top">${escapeHtml(label)}</th><td>${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
    `,
    replyTo: submission.whatsapp,
    subject: `Diagnóstico pelo site — ${safeCompany}`,
    text: fields.map(([label, value]) => `${label}: ${value}`).join("\n"),
    to: recipients,
  });
}
