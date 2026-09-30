import { AirVent, Award, BugOff, ConciergeBell, CreditCard, ShieldCheck, Sparkles, Tag, Wifi } from "lucide-react"
import type { ServiceKey } from "@/data/revenue-valet"

/** Icon for each Revenue Valet service, shared by the overview cards and subpages. */
export const serviceIcons = {
  instanet: Wifi,
  insurance: ShieldCheck,
  pest: BugOff,
  filters: AirVent,
  rewards: Award,
  credit: CreditCard,
  deals: Tag,
  valet: ConciergeBell,
  coming: Sparkles,
} satisfies Record<ServiceKey | "coming", unknown>
