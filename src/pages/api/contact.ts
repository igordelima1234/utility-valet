import type { APIRoute } from "astro"

export const prerender = false

/*
 * Receives general enquiries from the Contact page and forwards them as JSON to
 * CONTACT_FORM_WEBHOOK_URL, falling back to DEMO_FORM_WEBHOOK_URL so one webhook can take both.
 * Set it with `wrangler secret put CONTACT_FORM_WEBHOOK_URL`, or in .dev.vars locally.
 * Without either the endpoint answers 503, so the form shows an error instead of losing a lead.
 */

const REQUIRED = ["name", "email", "topic", "message"] as const
const FIELDS = [...REQUIRED, "company", "phone", "page"] as const

export const POST: APIRoute = async ({ request, locals }) => {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return json({ error: "Invalid JSON" }, 400)
  }

  // Honeypot filled in: pretend it worked.
  if (typeof body.website === "string" && body.website.trim()) return json({ ok: true })

  const lead: Record<string, string> = {}
  for (const f of FIELDS) lead[f] = String(body[f] ?? "").trim().slice(0, 5000)

  const missing = REQUIRED.filter((f) => !lead[f])
  if (missing.length) return json({ error: "Missing fields", missing }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return json({ error: "Invalid email" }, 400)

  const env = (locals as { runtime?: { env?: Record<string, string | undefined> } }).runtime?.env
  const webhook =
    env?.CONTACT_FORM_WEBHOOK_URL ??
    import.meta.env.CONTACT_FORM_WEBHOOK_URL ??
    env?.DEMO_FORM_WEBHOOK_URL ??
    import.meta.env.DEMO_FORM_WEBHOOK_URL
  if (!webhook) return json({ error: "Form delivery is not configured" }, 503)

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, form: "contact", submittedAt: new Date().toISOString() }),
  })
  if (!res.ok) return json({ error: "Delivery failed" }, 502)

  return json({ ok: true })
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } })
}
