import { useEffect, useRef, useState } from "react"
import { Check, Droplet, Flame, Plug, Wifi } from "lucide-react"
import { animate, motion, useInView, useReducedMotion } from "motion/react"

import { REVIEW_COUNT } from "@/data/testimonials"
import { cn } from "@/lib/utils"

/*
 * Frosted-glass overlays for the "Why partner with us?" photo cards.
 * Decorative only: every number is sample data and each stage is aria-hidden.
 * Animations start when the card scrolls into view and loop gently after.
 */

const glass =
  "rounded-2xl bg-white/55 shadow-[0_24px_60px_-24px_rgb(5_10_74/0.45)] ring-1 ring-white/70 backdrop-blur-xl backdrop-saturate-150"

function useStage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion() ?? false
  return { ref, run: inView && !reduce, reduce }
}

/* 1 · Revenue sharing: quarterly total counts up as move-in payouts land. */
const payouts = ["1420 Oak St · 3B", "88 Birch Ln", "301 Elm Ave · 12"]

export function RevenueVisual() {
  const { ref, run, reduce } = useStage()
  const [total, setTotal] = useState(reduce ? 9600 : 0)
  const [shown, setShown] = useState(reduce ? payouts.length : 0)

  useEffect(() => {
    if (!run) return
    const counter = animate(0, 9600, { duration: 2.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setTotal(v) })
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setShown(i)
      if (i >= payouts.length) clearInterval(timer)
    }, 700)
    return () => {
      counter.stop()
      clearInterval(timer)
    }
  }, [run])

  return (
    <div ref={ref} className={cn(glass, "w-[250px] p-5")}>
      <p className="text-center text-[12px] font-medium text-navy/70">Revenue share · this quarter</p>
      <p className="mt-2 text-center font-heading text-[34px] leading-none font-medium tracking-tight text-navy tabular-nums">
        ${Math.round(total).toLocaleString("en-US")}
      </p>
      <ul className="mt-4 grid gap-1.5">
        {payouts.map((p, i) => (
          <motion.li
            key={p}
            initial={false}
            animate={i < shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="flex items-center justify-between rounded-lg bg-white/70 px-2.5 py-1.5 text-[11.5px]"
          >
            <span className="truncate font-medium text-navy">{p}</span>
            <span className="font-semibold text-[#0f7a45]">+$75</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

/* 2 · Staff time: utility setups check themselves off, staff hours stay at zero. */
const tasks = [
  { label: "Electricity", icon: Plug },
  { label: "Water & sewer", icon: Droplet },
  { label: "Gas", icon: Flame },
  { label: "Internet", icon: Wifi },
]

export function TimeVisual() {
  const { ref, run, reduce } = useStage()
  const [done, setDone] = useState(reduce ? tasks.length : 0)

  useEffect(() => {
    if (!run) return
    // Check items off, hold, then reset and loop.
    let n = 0
    const timer = setInterval(() => {
      n = n >= tasks.length + 3 ? 0 : n + 1
      setDone(Math.min(n, tasks.length))
    }, 800)
    return () => clearInterval(timer)
  }, [run])

  return (
    <div ref={ref} className={cn(glass, "w-[240px] p-4")}>
      <div className="flex items-center justify-between px-1">
        <p className="text-[12px] font-semibold text-navy">Move-in · Unit 3B</p>
        <span className="rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-royal">Auto</span>
      </div>
      <ul className="mt-3 grid gap-1.5">
        {tasks.map((t, i) => {
          const on = i < done
          const Icon = t.icon
          return (
            <li key={t.label} className="flex items-center gap-2.5 rounded-lg bg-white/70 px-2.5 py-2">
              <Icon className="size-3.5 text-royal" />
              <span className="flex-1 text-[12px] font-medium text-navy">{t.label}</span>
              <span
                className={cn(
                  "flex size-[18px] items-center justify-center rounded-full transition-colors duration-300",
                  on ? "bg-cyan text-navy" : "bg-navy/10 text-transparent"
                )}
              >
                <motion.span initial={false} animate={{ scale: on ? 1 : 0.4 }} transition={{ type: "spring", stiffness: 500, damping: 22 }}>
                  <Check className="size-3" strokeWidth={3} />
                </motion.span>
              </span>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-center text-[11px] text-navy/70">
        Staff time spent: <span className="font-semibold text-navy">0 min</span>
      </p>
    </div>
  )
}

/* 3 · Residents: real review excerpts rotate under the review-count gauge. */
const quotes = [
  { text: "Very professional and helpful!", name: "Randy W." },
  { text: "Moving is stressful but this was one thing I didn’t have to stress about!", name: "Bianca F." },
  { text: "He saved us money and the hassle of doing it myself.", name: "Melissa M." },
]

export function ResidentsVisual() {
  const { ref, run, reduce } = useStage()
  const [q, setQ] = useState(0)
  const R = 58
  const arc = Math.PI * R

  useEffect(() => {
    if (!run) return
    const timer = setInterval(() => setQ((v) => (v + 1) % quotes.length), 3000)
    return () => clearInterval(timer)
  }, [run])

  return (
    <div ref={ref} className={cn(glass, "w-[250px] px-5 pt-4 pb-5 text-center")}>
      <p className="text-[12px] font-medium text-navy/70">Resident reviews</p>
      <div className="relative mx-auto mt-2 h-[76px] w-[140px]">
        <svg viewBox="0 0 140 76" className="absolute inset-0 size-full" fill="none">
          <path d={`M12 70 A${R} ${R} 0 0 1 128 70`} stroke="rgb(255 255 255 / 0.8)" strokeWidth="10" strokeLinecap="round" />
          <motion.path
            d={`M12 70 A${R} ${R} 0 0 1 128 70`}
            stroke="url(#uv-gauge)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={arc}
            initial={{ strokeDashoffset: reduce ? arc * 0.02 : arc }}
            animate={run || reduce ? { strokeDashoffset: arc * 0.02 } : undefined}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="uv-gauge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#2cccfb" />
              <stop offset="1" stopColor="#0e6df9" />
            </linearGradient>
          </defs>
        </svg>
        <p className="absolute inset-x-0 bottom-0 font-heading text-[24px] leading-none font-medium text-navy">{REVIEW_COUNT}</p>
      </div>
      <div className="relative mt-4 h-[64px]">
        {quotes.map((item, i) => (
          <motion.figure
            key={item.name}
            initial={false}
            animate={i === q ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col justify-center rounded-lg bg-white/70 px-3 py-2"
          >
            <p className="text-[11.5px] leading-snug font-medium text-navy text-balance">“{item.text}”</p>
            <p className="text-[10px] text-navy/60">{item.name}</p>
          </motion.figure>
        ))}
      </div>
    </div>
  )
}
