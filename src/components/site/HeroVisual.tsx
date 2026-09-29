import { useEffect, useState, type ComponentType, type SVGProps } from "react"
import {
  BadgeDollarSign,
  Building2,
  Check,
  ChevronDown,
  Droplet,
  Flame,
  LayoutGrid,
  Settings,
  ShieldCheck,
  TrendingUp,
  Truck,
  Users,
  Wifi,
  Zap,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/*
 * Illustrative product UI for the homepage hero. Decorative only: the whole
 * stage is aria-hidden and inert, and every number here is sample data.
 */

type Icon = ComponentType<SVGProps<SVGSVGElement>>

const services: { name: string; detail: string; icon: Icon }[] = [
  { name: "Electricity", detail: "On · Apr 12", icon: Zap },
  { name: "Water & sewer", detail: "On · Apr 12", icon: Droplet },
  { name: "Gas", detail: "On · Apr 12", icon: Flame },
  { name: "Internet", detail: "Install · Apr 12, 9am", icon: Wifi },
  { name: "Renters insurance", detail: "Policy active", icon: ShieldCheck },
]

const bars = [34, 42, 38, 55, 48, 62, 58, 71, 66, 80, 76, 92]

const moveIns = [
  { initials: "KE", name: "Keirra E.", unit: "1420 Oak St · 3B", status: "Connected" },
  { initials: "WG", name: "William G.", unit: "88 Birch Ln", status: "Scheduled" },
  { initials: "ML", name: "Melany L.", unit: "301 Elm Ave · 12", status: "In progress" },
]

const statusStyle: Record<string, string> = {
  Connected: "bg-[#e3f9ee] text-[#0f7a45]",
  Scheduled: "bg-ice text-royal",
  "In progress": "bg-[#f3e8ff] text-[#7a2bb8]",
}

export function Switch({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "flex h-[22px] w-[38px] shrink-0 items-center rounded-full p-[3px] transition-colors duration-300",
        on ? "justify-end bg-cyan" : "justify-start bg-[#e3e6ef]"
      )}
    >
      <motion.span layout transition={{ type: "spring", stiffness: 600, damping: 32 }} className="size-4 rounded-full bg-white shadow-sm" />
    </span>
  )
}

function Phone({ onCount }: { onCount: number }) {
  const done = onCount >= services.length
  return (
    <div className="w-[284px] rounded-[46px] bg-white/55 p-[9px] shadow-[0_40px_80px_-30px_rgb(5_10_74/0.55)] ring-1 ring-white/70 backdrop-blur">
      <div className="flex h-[584px] flex-col overflow-hidden rounded-[38px] bg-white">
        <div className="flex items-center justify-between px-7 pt-4 pb-2 text-[12px] font-semibold text-navy">
          <span>9:41</span>
          <span className="h-[22px] w-[84px] rounded-full bg-navy" />
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-4 rounded-[3px] border border-navy/70 p-px">
              <span className="block h-full w-3/4 rounded-[1px] bg-navy" />
            </span>
          </span>
        </div>

        <div className="px-5 pt-3">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
            <img src="/brand/logo/utility-valet-mark.png" alt="" className="size-5" />
            Utility Valet
          </div>
          <p className="mt-3 font-heading text-[19px] leading-tight font-medium text-navy">Your move-in</p>
          <p className="mt-1 text-[12px] text-muted-foreground">1420 Oak St, Apt 3B · Apr 12</p>

          <div className="mt-4 rounded-2xl bg-mist p-3.5">
            <div className="flex items-baseline justify-between text-[12px]">
              <span className="font-semibold text-navy">
                {Math.min(onCount, services.length)} of {services.length} services on
              </span>
              <span className="text-muted-foreground">{done ? "Ready" : "Setting up"}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#e3e6ef]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan to-royal"
                animate={{ width: `${(Math.min(onCount, services.length) / services.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        </div>

        <ul className="mt-2 flex-1 px-3">
          {services.map((s, i) => {
            const on = i < onCount
            const Icon = s.icon
            return (
              <li key={s.name} className="flex items-center gap-3 rounded-xl px-2 py-2.5">
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-[10px] transition-colors duration-300",
                    on ? "bg-navy text-cyan" : "bg-mist text-navy/40"
                  )}
                >
                  <Icon className="size-[17px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] leading-tight font-semibold text-navy">{s.name}</span>
                  <span className="block text-[11px] leading-tight text-muted-foreground">{on ? s.detail : "Waiting"}</span>
                </span>
                <Switch on={on} />
              </li>
            )
          })}
        </ul>

        <div className="px-5 pb-6">
          <div
            className={cn(
              "flex h-11 items-center justify-center gap-2 rounded-full text-[13px] font-semibold transition-colors duration-500",
              done ? "bg-cyan text-navy" : "bg-navy text-white"
            )}
          >
            {done ? (
              <>
                <Check className="size-4" /> All set. Welcome home
              </>
            ) : (
              "Connecting your services…"
            )}
          </div>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-navy/80" />
        </div>
      </div>
    </div>
  )
}

function Dashboard({ animate }: { animate: boolean }) {
  const nav: [Icon, string][] = [
    [LayoutGrid, "Overview"],
    [Truck, "Move-ins"],
    [Users, "Residents"],
    [BadgeDollarSign, "Revenue"],
    [Settings, "Settings"],
  ]
  return (
    <div className="w-[820px] overflow-hidden rounded-2xl bg-white/60 shadow-[0_40px_90px_-30px_rgb(5_10_74/0.5)] ring-1 ring-white/70 backdrop-blur">
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/80" />
        <span className="size-2.5 rounded-full bg-white/80" />
        <span className="size-2.5 rounded-full bg-white/80" />
        <span className="ml-4 flex-1 rounded-full bg-white/70 py-1 text-center text-[11px] text-navy/60">app.utilityvalet.io</span>
      </div>
      <div className="flex h-[430px] bg-white">
        <aside className="w-[190px] shrink-0 border-r border-navy/6 p-4">
          <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] font-semibold text-navy">
            <span className="flex size-6 items-center justify-center rounded-md bg-ice text-royal">
              <Building2 className="size-3.5" />
            </span>
            Oakridge Properties
            <ChevronDown className="ml-auto size-3.5 text-navy/50" />
          </div>
          <ul className="mt-5 grid gap-0.5">
            {nav.map(([Icon, label], i) => (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12.5px] font-medium",
                  i === 0 ? "bg-mist text-navy" : "text-navy/60"
                )}
              >
                <Icon className="size-4" />
                {label}
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1 p-6">
          <p className="font-heading text-[17px] font-medium text-navy">Overview</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              ["Move-ins · 30 days", "128", "12%"],
              ["Residents connected", "94%", "4%"],
              ["Revenue share", "$9,600", "18%"],
            ].map(([label, value, delta]) => (
              <div key={label} className="rounded-xl border border-navy/8 p-3.5">
                <p className="text-[11px] text-muted-foreground">{label}</p>
                <p className="mt-1 flex items-baseline gap-2">
                  <span className="text-[22px] leading-none font-semibold tracking-tight text-navy">{value}</span>
                  <span className="flex items-center gap-0.5 text-[10.5px] font-semibold text-[#0f9d58]">
                    <TrendingUp className="size-3" />
                    {delta}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-[1.35fr_1fr] gap-3">
            <div className="rounded-xl border border-navy/8 p-3.5">
              <p className="text-[11.5px] font-semibold text-navy">Services connected</p>
              <div className="mt-3 flex h-[132px] items-end gap-[7px] border-b border-navy/8">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-[4px] bg-gradient-to-t from-cyan/70 to-royal"
                    initial={animate ? { height: 0 } : false}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: 0.3 + i * 0.05, type: "spring", stiffness: 140, damping: 18 }}
                  />
                ))}
              </div>
              <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
              </div>
            </div>
            <div className="rounded-xl border border-navy/8 p-3.5">
              <p className="text-[11.5px] font-semibold text-navy">Upcoming move-ins</p>
              <ul className="mt-2 grid gap-2.5">
                {moveIns.map((m) => (
                  <li key={m.name} className="flex items-center gap-2.5">
                    <span className="flex size-7 items-center justify-center rounded-full bg-ice text-[10px] font-semibold text-navy">
                      {m.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[11.5px] font-semibold text-navy">{m.name}</span>
                      <span className="block truncate text-[10px] text-muted-foreground">{m.unit}</span>
                    </span>
                    <span className={cn("rounded-full px-2 py-0.5 text-[9.5px] font-semibold whitespace-nowrap", statusStyle[m.status])}>
                      {m.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HeroVisual() {
  const reduce = useReducedMotion()
  const [onCount, setOnCount] = useState(0)

  // Switch utilities on one at a time, then hold on the finished state.
  useEffect(() => {
    if (reduce) {
      setOnCount(services.length)
      return
    }
    const timers = services.map((_, i) => setTimeout(() => setOnCount(i + 1), 1100 + i * 650))
    return () => timers.forEach(clearTimeout)
  }, [reduce])

  const done = onCount >= services.length

  return (
    <div aria-hidden inert className="pointer-events-none absolute inset-0 select-none">
      {/* Fixed-size stage, scaled to fit the panel. */}
      <div className="absolute top-1/2 left-[4%] h-[680px] w-[1000px] origin-left -translate-y-1/2 scale-[0.58] sm:left-[8%] sm:scale-[0.72] lg:left-[6%] lg:scale-[0.7] xl:scale-[0.82] 2xl:scale-95">
        <motion.div
          className="absolute top-0 left-[170px]"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Dashboard animate={!reduce} />
        </motion.div>

        <motion.div
          className="absolute top-[70px] left-0"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <Phone onCount={onCount} />
        </motion.div>

        <motion.div
          className="absolute top-[470px] left-[320px] flex items-center gap-3 rounded-2xl bg-white/95 py-3 pr-5 pl-3 shadow-[0_20px_50px_-20px_rgb(5_10_74/0.45)] ring-1 ring-navy/5"
          initial={false}
          animate={done ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 22, delay: done && !reduce ? 0.35 : 0 }}
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-cyan text-navy">
            <Zap className="size-4" />
          </span>
          <span>
            <span className="block text-[13px] font-semibold text-navy">Power's on at 1420 Oak St</span>
            <span className="block text-[11px] text-muted-foreground">Keirra moves in tomorrow · all 5 services ready</span>
          </span>
        </motion.div>
      </div>
    </div>
  )
}
