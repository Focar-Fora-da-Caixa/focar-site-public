"use client";

import type { ContactField, ContactPageContent } from "@focar/content";
import Link from "next/link";
import Script from "next/script";
import { FormEvent, useState } from "react";

import styles from "./contact.module.css";

type ContactFormProps = {
  content: ContactPageContent["form"];
  enabled: boolean;
  siteKey: string;
};

type SubmissionState =
  | { status: "idle"; message: "" }
  | { status: "submitting"; message: string }
  | { status: "success" | "error"; message: string };

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
  }
}

function ContactInput({ field }: { field: ContactField }) {
  const minimumLength = field.name === "challenge" ? 10 : 2;
  const sharedProps = {
    autoComplete: field.autocomplete,
    id: field.id,
    maxLength: field.type === "textarea" ? 2000 : 300,
    minLength: minimumLength,
    name: field.name,
    required: field.required,
  };

  return (
    <label className={styles.field}>
      <span>
        {field.label}
        {field.required ? <span aria-hidden="true"> *</span> : null}
      </span>
      {field.type === "textarea" ? (
        <textarea {...sharedProps} rows={6} />
      ) : (
        <input {...sharedProps} type={field.type} />
      )}
    </label>
  );
}

export function ContactForm({
  content,
  enabled,
  siteKey,
}: ContactFormProps) {
  const [submission, setSubmission] = useState<SubmissionState>({
    message: "",
    status: "idle",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmission({
      message: "Enviando as informações com segurança…",
      status: "submitting",
    });

    try {
      const response = await fetch("/api/diagnostico", {
        body: JSON.stringify({
          challenge: formData.get("challenge"),
          city: formData.get("city"),
          company: formData.get("company"),
          consent: formData.get("consent") === "on",
          name: formData.get("name"),
          segment: formData.get("segment"),
          turnstileToken: formData.get("cf-turnstile-response"),
          website: formData.get("website"),
          whatsapp: formData.get("whatsapp"),
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = (await response.json()) as {
        message?: string;
        success?: boolean;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Não foi possível enviar.");
      }

      form.reset();
      window.turnstile?.reset();
      setSubmission({
        message: content.successMessage,
        status: "success",
      });
    } catch (error) {
      window.turnstile?.reset();
      setSubmission({
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar agora. Tente novamente.",
        status: "error",
      });
    }
  }

  return (
    <>
      {enabled ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      ) : null}

      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset disabled={!enabled || submission.status === "submitting"}>
          <legend>{content.title}</legend>

          <div className={styles.fields}>
            {content.fields.map((field) => (
              <ContactInput field={field} key={field.id} />
            ))}
          </div>

          <label className={styles.honeypot} aria-hidden="true">
            Website
            <input autoComplete="off" name="website" tabIndex={-1} type="text" />
          </label>

          <label className={styles.consent}>
            <input name="consent" required={content.consent.required} type="checkbox" />
            <span>
              {content.consent.label}{" "}
              <Link href="/privacidade">Ler a Política de Privacidade.</Link>
            </span>
          </label>

          {enabled ? (
            <div
              className="cf-turnstile"
              data-action="diagnostico"
              data-language="pt-BR"
              data-sitekey={siteKey}
              data-theme="light"
            />
          ) : null}

          <button className={styles.submit} type="submit">
            {submission.status === "submitting"
              ? "Enviando…"
              : content.submitLabel}
          </button>
        </fieldset>

        {submission.status !== "idle" ? (
          <p
            aria-live="polite"
            className={styles.feedback}
            data-status={submission.status}
            role="status"
          >
            {submission.message}
          </p>
        ) : null}
      </form>
    </>
  );
}
