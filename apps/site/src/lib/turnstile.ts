type TurnstileResponse = {
  action?: string;
  hostname?: string;
  success: boolean;
};

const SITEVERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(
  token: string,
  remoteIp: string | undefined,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    return false;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(SITEVERIFY_ENDPOINT, {
      body: JSON.stringify({
        remoteip: remoteIp,
        response: token,
        secret,
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
      signal: controller.signal,
    });

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as TurnstileResponse;
    const allowedHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean);
    const hostnameAllowed =
      allowedHostnames.length === 0 ||
      (result.hostname !== undefined &&
        allowedHostnames.includes(result.hostname));

    return (
      result.success &&
      result.action === "diagnostico" &&
      hostnameAllowed
    );
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
