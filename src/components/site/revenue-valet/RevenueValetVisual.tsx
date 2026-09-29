import { useEffect, useState, type ComponentType, type SVGProps } from "react"
import { AirVent, Award, BugOff, CreditCard, ShieldCheck, Tag, TrendingUp, Wifi } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { Switch } from "@/components/site/HeroVisual"
import { cn } from "@/lib/utils"

/*
 * Revenue Valet hero: a resident (generated photo cutout) with the benefits app
 * in front of her. Decorative only: the stage is aria-hidden and inert, and
 * every number here is sample data.
 */

type Icon = ComponentType<SVGProps<SVGSVGElement>>

const benefits: { name: string; detail: string; icon: Icon }[] = [
  { name: "Instanet", detail: "1 Gig · included", icon: Wifi },
  { name: "Renter's insurance", detail: "Policy active", icon: ShieldCheck },
  { name: "Pest control", detail: "On demand", icon: BugOff },
  { name: "Air filter delivery", detail: "Every 90 days", icon: AirVent },
  { name: "Credit reporting", detail: "Rent reported", icon: CreditCard },
]

function Phone({ onCount }: { onCount: number }) {
  return (
    <div className="w-[284px] rounded-[46px] bg-white/55 p-[9px] shadow-[0_40px_80px_-30px_rgb(5_10_74/0.55)] ring-1 ring-white/70 backdrop-blur">
      <div className="flex h-[584px] flex-col overflow-hidden rounded-[38px] bg-white">
        <div className="flex items-center justify-between px-7 pt-4 pb-2 text-[12px] font-semibold text-navy">
          <span>9:41</span>
          <span className="h-[22px] w-[84px] rounded-full bg-navy" />
          <span className="h-2.5 w-4 rounded-[3px] border border-navy/70 p-px">
            <span className="block h-full w-3/4 rounded-[1px] bg-navy" />
          </span>
        </div>

        <div className="px-5 pt-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
            <img src="/brand/logo/revenue-valet-mark.png" alt="" className="size-5 object-contain" />
            Revenue Valet
          </div>
          <p className="mt-3 font-heading text-[19px] leading-tight font-medium text-navy">Hi Keirra</p>
          <p className="mt-1 text-[12px] text-muted-foreground">Your resident benefits</p>

          <div className="relative mt-4 overflow-hidden rounded-2xl bg-gradient-deep p-4 text-white">
            <div className="flex items-center justify-between text-[11px] text-white/70">
              <span>Reward points</span>
              <Award className="size-4 text-cyan" />
            </div>
            <p className="mt-1 font-heading text-[26px] leading-none font-medium tabular-nums">2,450</p>
            <p className="mt-2 flex items-center gap-1 text-[10.5px] font-semibold text-cyan">
              <TrendingUp className="size-3" /> +250 for on-time rent
            </p>
          </div>
        </div>

        <ul className="mt-2 flex-1 px-3">
          {benefits.map((b, i) => {
            const on = i < onCount
            const Icon = b.icon
            return (
              <li key={b.name} className="flex items-center gap-3 rounded-xl px-2 py-[7px]">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-300",
                    on ? "bg-navy text-cyan" : "bg-mist text-navy/40"
                  )}
                >
                  <Icon className="size-[17px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-tight font-semibold text-navy">{b.name}</span>
                  <span className="block text-[11px] leading-tight text-muted-foreground">{on ? b.detail : "Available"}</span>
                </span>
                <Switch on={on} />
              </li>
            )
          })}
        </ul>

        <div className="px-5 pb-6">
          <div className="flex h-11 items-center justify-center gap-2 rounded-full bg-navy text-[13px] font-semibold text-white">
            <Tag className="size-4 text-cyan" /> Browse exclusive deals
          </div>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-navy/80" />
        </div>
      </div>
    </div>
  )
}

export default function RevenueValetVisual() {
  const reduce = useReducedMotion()
  const [onCount, setOnCount] = useState(0)

  // Switch benefits on one at a time, then hold on the finished state.
  useEffect(() => {
    if (reduce) {
      setOnCount(benefits.length)
      return
    }
    const timers = benefits.map((_, i) => setTimeout(() => setOnCount(i + 1), 1100 + i * 600))
    return () => timers.forEach(clearTimeout)
  }, [reduce])

  const done = onCount >= benefits.length

  return (
    <div aria-hidden inert className="pointer-events-none absolute inset-0 select-none">
      <div className="absolute top-[30%] right-[8%] size-[55%] rounded-full bg-white/35 blur-3xl" />

      {/* Resident, anchored to the bottom of the panel. */}
      <motion.img
        src="/brand/photos/revenue-valet-resident-1100.webp"
        srcSet="/brand/photos/revenue-valet-resident-640.webp 640w, /brand/photos/revenue-valet-resident-1100.webp 1100w"
        sizes="(min-width: 1024px) 40vw, 70vw"
        alt=""
        width={1100}
        height={1682}
        className="absolute right-[-6%] bottom-0 h-[94%] w-auto max-w-none object-contain object-bottom sm:right-[2%] lg:right-[0%] xl:right-[5%] 2xl:right-[8%]"
        initial={reduce ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Fixed-size stage, scaled to fit the panel. */}
      <div className="absolute top-1/2 left-[4%] h-[680px] w-[1000px] origin-left -translate-y-1/2 scale-[0.58] sm:left-[8%] sm:scale-[0.72] lg:left-[6%] lg:scale-[0.7] xl:scale-[0.82] 2xl:scale-95">
        <motion.div
          className="absolute top-[70px] left-0"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Phone onCount={onCount} />
        </motion.div>

        <motion.div
          className="absolute top-[258px] left-[220px] flex items-center gap-3 rounded-2xl bg-white/95 py-3 pr-5 pl-3 shadow-[0_20px_50px_-20px_rgb(5_10_74/0.45)] ring-1 ring-navy/5"
          initial={false}
          animate={done ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: done && !reduce ? 0.35 : 0 }}
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-cyan text-navy">
            <Award className="size-4" />
          </span>
          <span>
            <span className="block text-[13px] font-semibold text-navy">Rent paid on time · +250 points</span>
            <span className="block text-[11px] text-muted-foreground">Keirra's benefits are live · 5 of 5 active</span>
          </span>
        </motion.div>
      </div>
    </div>
  )
}
