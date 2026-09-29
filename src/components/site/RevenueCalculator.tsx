import { useEffect, useRef, useState } from "react"
import { animate, useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

// Same assumptions as the current utilityvalet.io calculator.
const MIN = 1_000
const MAX = 20_000
const PER_DOOR_INSTANET = 20 // $ per door, per month (average)
const CHURN = 0.25 // yearly
const CONVERSION = 0.7
const PER_MOVE_IN = 75 // $

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
const count = new Intl.NumberFormat("en-US")

function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const previous = useRef(value)
  const reduce = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduce) {
      node.textContent = format(value)
      previous.current = value
      return
    }
    const controls = animate(previous.current, value, {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = format(v)),
    })
    previous.current = value
    return () => controls.stop()
  }, [value, format, reduce])

  return <span ref={ref}>{format(value)}</span>
}

function ResultCard({
  highlight,
  title,
  amount,
  caption,
  footnote,
}: {
  highlight?: boolean
  title: string
  amount: number
  caption: React.ReactNode
  footnote: string
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-3xl bg-white p-7 md:p-9",
        highlight ? "shadow-[0_24px_60px_-24px_rgb(14_109_249/0.45)] ring-2 ring-cyan" : "ring-1 ring-navy/8"
      )}
    >
      {highlight && (
        <span className="absolute -top-3.5 left-7 rounded-full bg-cyan px-3 py-1 font-heading text-[0.6875rem] font-medium tracking-wider text-navy uppercase md:left-9">
          Best return
        </span>
      )}
      <p className="font-heading text-lg font-medium text-navy">{title}</p>
      <p
        className={cn(
          "mt-3 font-heading text-[2.5rem] leading-none font-medium tracking-tight tabular-nums md:text-5xl",
          highlight ? "text-gradient-logo" : "text-navy"
        )}
      >
        <AnimatedNumber value={amount} format={(n) => usd.format(Math.round(n))} />
      </p>
      <p className="mt-3 text-navy/80">{caption}</p>
      <p className="mt-auto pt-6 text-xs leading-relaxed text-muted-foreground">{footnote}</p>
    </div>
  )
}

export default function RevenueCalculator() {
  const [doors, setDoors] = useState(10_000)
  const withInstanet = doors * PER_DOOR_INSTANET
  const without = (doors * CHURN * CONVERSION * PER_MOVE_IN) / 12

  return (
    <section className="px-3 md:px-4">
      <div className="mx-auto max-w-[1440px] rounded-[2rem] bg-mist px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="mb-3 font-heading text-xs font-medium tracking-widest text-royal uppercase">Revenue calculator</p>
            <h2 className="mb-0">Get paid to make your residents happy (seriously)</h2>
          </div>

          <div className="mt-12 rounded-3xl bg-white p-6 ring-1 ring-navy/8 md:mt-16 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <p id="doors-label" className="font-semibold text-navy">
                How many doors in your portfolio?
              </p>
              <p className="font-heading text-3xl font-medium text-royal tabular-nums md:text-4xl" aria-live="polite">
                {count.format(doors)}
                <span className="sr-only"> doors</span>
              </p>
            </div>
            <Slider
              className="mt-6"
              min={MIN}
              max={MAX}
              step={500}
              value={[doors]}
              onValueChange={([v]) => setDoors(v)}
              label="Doors in your portfolio"
            />
            <div className="mt-3 flex justify-between text-sm text-muted-foreground tabular-nums">
              <span>{count.format(MIN)}</span>
              <span>{count.format(MAX)}</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <ResultCard
              highlight
              title="With InstaNet"
              amount={withInstanet}
              caption={
                <>
                  per month with <strong className="font-semibold">InstaNet</strong>
                </>
              }
              footnote="* $20 per door, per month on average."
            />
            <ResultCard
              title="Without InstaNet"
              amount={without}
              caption={
                <>
                  per month without <strong className="font-semibold">InstaNet</strong>
                </>
              }
              footnote="* Estimate based on 25% churn rate and 70% conversion rate at $75 per move-in."
            />
          </div>

          <div className="mt-12 flex justify-center">
            <Button href="/property-managers" size="lg" icon="arrow">
              Get started
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
