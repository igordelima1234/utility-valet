import type { APIRoute } from "astro"

export const prerender = false

/*
 * Receives "Book a demo" submissions from the Revenue Valet service pages and
 * forwards them as JSON to DEMO_FORM_WEBHOOK_URL (Zapier, Make, HubSpot, Slack…).
 * Set it with `wrangler secret put DEMO_FORM_WEBHOOK_URL`, or in .dev.vars locally.
 * Without it the endpoint answers 503, so the form shows an error instead of losing a lead.
 */

const REQUIRED = ["company", "name", "phone", "email", "state"] as const
const FIELDS = [...REQUIRED, "source", "service", "page"] as const

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
  for (const f of FIELDS) lead[f] = String(body[f] ?? "").trim().slice(0, 2000)

  const missing = REQUIRED.filter((f) => !lead[f])
  if (missing.length) return json({ error: "Missing fields", missing }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return json({ error: "Invalid email" }, 400)

  const env = (locals as { runtime?: { env?: Record<string, string | undefined> } }).runtime?.env
  const webhook = env?.DEMO_FORM_WEBHOOK_URL ?? import.meta.env.DEMO_FORM_WEBHOOK_URL
  if (!webhook) return json({ error: "Form delivery is not configured" }, 503)

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString() }),
  })
  if (!res.ok) return json({ error: "Delivery failed" }, 502)

  return json({ ok: true })
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } })
}
