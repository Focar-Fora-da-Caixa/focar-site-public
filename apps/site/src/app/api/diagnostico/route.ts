import { createHash } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { sendContactSubmission } from "@/lib/contact-mailer";
import { validateContactSubmission } from "@/lib/contact-submission";
import { getContactFormConfiguration } from "@/lib/site-readiness";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const MAX_BODY_SIZE = 16_000;
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const attempts = new Map<string, { count: number; expiresAt: number }>();

function getClientIp(request: NextRequest): string | undefined {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    undefined
  );
}

function isRateLimited(ip: string | undefined): boolean {
  const key = createHash("sha256").update(ip ?? "unknown").digest("hex");
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.expiresAt <= now) {
    attempts.set(key, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function json(message: string, status: number) {
  return NextResponse.json(
    { message, success: status >= 200 && status < 300 },
    { headers: { "Cache-Control": "no-store" }, status },
  );
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_SIZE) {
    return json("Solicitação muito grande.", 413);
  }

  const configuration = getContactFormConfiguration();
  if (!configuration.enabled) {
    return json("Este canal ainda não está disponível.", 503);
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return json("Muitas tentativas. Aguarde alguns minutos.", 429);
  }

  let input: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_SIZE) {
      return json("Solicitação muito grande.", 413);
    }
    input = JSON.parse(rawBody) as unknown;
  } catch {
    return json("Dados inválidos.", 400);
  }

  const validation = validateContactSubmission(input);
  if (!validation.success) {
    return json(validation.message, 400);
  }

  if (validation.data.website) {
    return json("Recebemos sua solicitação.", 200);
  }

  const verified = await verifyTurnstileToken(
    validation.data.turnstileToken,
    ip,
  );
  if (!verified) {
    return json("Não foi possível validar a segurança do envio.", 400);
  }

  try {
    await sendContactSubmission(validation.data);
    return json("Recebemos sua solicitação.", 200);
  } catch (error) {
    console.error("Contact form delivery failed", error);
    return json("Não foi possível enviar agora. Tente novamente mais tarde.", 502);
  }
}
