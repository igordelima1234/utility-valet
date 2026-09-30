import { createClient } from "@sanity/client"
import type { ServiceKey } from "@/data/revenue-valet"

/*
 * Revenue Valet service pages are edited in Sanity (Studio lives in /studio).
 * Pages that read from here render on request, so a published edit shows up
 * without a redeploy. The project ID and dataset are public, not secrets.
 */
export const sanity = createClient({
  projectId: "fmxto53a",
  dataset: "production",
  apiVersion: "2026-09-30",
  useCdn: true,
})

export type Service = {
  _id: string
  key: ServiceKey
  slug: string
  title: string
  summary: string
  headline: string
  overview: {
    heading: string
    paragraphs: string[]
    points: { _key: string; title: string; body: string }[]
  }
}

const SERVICE_FIELDS = `
  _id,
  "key": serviceKey,
  "slug": slug.current,
  title,
  summary,
  headline,
  overview { heading, paragraphs, points[] { _key, title, body } }
`

export const getServices = () =>
  sanity.fetch<Service[]>(`*[_type == "revenueValetService" && defined(slug.current) && defined(serviceKey)]{${SERVICE_FIELDS}}`)

export const getService = (slug: string) =>
  sanity.fetch<Service | null>(`*[_type == "revenueValetService" && slug.current == $slug][0]{${SERVICE_FIELDS}}`, { slug })
