import type { APIRoute } from "astro"
import { deliverSubmission, runtimeEnv } from "@/lib/form-delivery"

export const prerender = false

/*
 * Receives "Book a demo" submissions from the Revenue Valet service pages and emails them
 * (see lib/form-delivery). Also forwards them as JSON to DEMO_FORM_WEBHOOK_URL
 * (Zapier, Make, HubSpot, Slack…) if set.
 * With no destination configured the endpoint answers 503, so the form shows an error instead of losing a lead.
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

  const env = runtimeEnv(locals)
  const result = await deliverSubmission({
    env,
    subject: `Demo request: ${lead.service || "Revenue Valet"} (${lead.company})`,
    fields: [
      ["Service", lead.service],
      ["Company", lead.company],
      ["Name", lead.name],
      ["Email", lead.email],
      ["Phone", lead.phone],
      ["State", lead.state],
      ["How they heard about us", lead.source],
      ["Page", lead.page],
    ],
    replyTo: lead.email,
    webhook: env.DEMO_FORM_WEBHOOK_URL,
    webhookPayload: { ...lead, submittedAt: new Date().toISOString() },
  })
  if (result === "not-configured") return json({ error: "Form delivery is not configured" }, 503)
  if (result === "failed") return json({ error: "Delivery failed" }, 502)

  return json({ ok: true })
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } })
}
