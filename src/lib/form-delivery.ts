/*
 * Delivers form submissions by email (Resend) and, optionally, to a webhook.
 *
 * Email: set RESEND_API_KEY (`wrangler secret put RESEND_API_KEY`, or .dev.vars locally).
 * The sending domain must be verified in Resend. Override the defaults with
 * FORM_TO_EMAIL (comma-separated for several) and FORM_FROM_EMAIL.
 *
 * A submission counts as delivered when at least one configured destination accepts it,
 * so a hiccup in one channel doesn't lose the lead.
 */

const DEFAULT_TO = "luke@utilityvalet.io"
const DEFAULT_FROM = "Utility Valet Website <forms@utilityvalet.io>"

type Env = Record<string, string | undefined>

export type DeliveryResult = "delivered" | "not-configured" | "failed"

export function runtimeEnv(locals: unknown): Env {
  const env = (locals as { runtime?: { env?: Env } }).runtime?.env ?? {}
  return new Proxy(env, { get: (e, key: string) => e[key] ?? import.meta.env[key] })
}

export async function deliverSubmission(opts: {
  env: Env
  subject: string
  /** Labelled fields, in the order they should appear in the email. */
  fields: [label: string, value: string][]
  replyTo?: string
  webhook?: string
  webhookPayload: Record<string, string>
}): Promise<DeliveryResult> {
  const attempts: Promise<boolean>[] = []

  if (opts.env.RESEND_API_KEY) attempts.push(sendEmail(opts))
  if (opts.webhook) attempts.push(postWebhook(opts.webhook, opts.webhookPayload))
  if (!attempts.length) return "not-configured"

  const results = await Promise.all(attempts)
  return results.some(Boolean) ? "delivered" : "failed"
}

async function sendEmail({ env, subject, fields, replyTo }: Parameters<typeof deliverSubmission>[0]) {
  const filled = fields.filter(([, v]) => v)
  const text = filled.map(([k, v]) => `${k}: ${v}`).join("\n")
  const rows = filled
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${escape(k)}</td>` +
        `<td style="padding:6px 0;white-space:pre-wrap">${escape(v)}</td></tr>`
    )
    .join("")

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.FORM_FROM_EMAIL || DEFAULT_FROM,
        to: (env.FORM_TO_EMAIL || DEFAULT_TO).split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: replyTo,
        subject,
        text,
        html: `<table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
      }),
    })
    if (!res.ok) console.error(`[forms] Resend ${res.status}: ${await res.text()}`)
    return res.ok
  } catch (err) {
    console.error("[forms] Resend request failed", err)
    return false
  }
}

async function postWebhook(url: string, payload: Record<string, string>) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) console.error(`[forms] Webhook ${res.status}`)
    return res.ok
  } catch (err) {
    console.error("[forms] Webhook request failed", err)
    return false
  }
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}
