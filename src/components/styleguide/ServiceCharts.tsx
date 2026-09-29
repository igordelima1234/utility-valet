import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
  type SVGProps,
} from "react"
import {
  AirVent,
  Award,
  BadgeDollarSign,
  Bug,
  Car,
  Check,
  Gift,
  House,
  PiggyBank,
  RotateCcw,
  ShieldCheck,
  ShieldPlus,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  Users,
  Utensils,
  Wifi,
} from "lucide-react"
import { animate, motion, useInView, useReducedMotion } from "motion/react"


/*
 * One glanceable card per resident service: a headline number, one sentence,
 * and one simple animated picture. Each service has its own accent color.
 * Every number is sample data. The picture is decorative (aria-hidden); the
 * number and sentence carry the meaning in text.
 */

type Icon = ComponentType<SVGProps<SVGSVGElement>>

const EASE = [0.22, 1, 0.36, 1] as const

// Service accents. Each clears 3:1 against white so marks stay visible.
const accent = {
  instanet: "#0E6DF9",
  insurance: "#0D9488",
  pest: "#EA580C",
  filter: "#0891B2",
  credit: "#16A34A",
  valet: "#9333EA",
  rewards: "#D97706",
  deals: "#DB2777",
  coming: "#4F46E5",
}

const PlayContext = createContext({ play: false, reduce: false })
const usePlay = () => useContext(PlayContext)

// Shorthand for "start here unless reduced motion, animate to there once playing".
function useMotionProps<T extends object>(from: T, to: T) {
  const { play, reduce } = usePlay()
  return { initial: reduce ? false : from, animate: play ? to : from } as const
}

function CountUp({ to, format = (n: number) => Math.round(n).toLocaleString("en-US") }: { to: number; format?: (n: number) => string }) {
  const { play, reduce } = usePlay()
  const [value, setValue] = useState(reduce ? to : 0)

  useEffect(() => {
    if (reduce) {
      setValue(to)
      return
    }
    if (!play) return
    const controls = animate(0, to, { duration: 1.4, ease: EASE, onUpdate: setValue })
    return () => controls.stop()
  }, [play, reduce, to])

  return (
    <>
      <span aria-hidden>{format(value)}</span>
      <span className="sr-only">{format(to)}</span>
    </>
  )
}

function ServiceCard({
  icon: Icon,
  name,
  color,
  stat,
  caption,
  children,
}: {
  icon: Icon
  name: string
  color: string
  stat: ReactNode
  caption: string
  children: ReactNode
}) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduce = !!useReducedMotion()
  const [run, setRun] = useState(0)

  return (
    <figure
      ref={ref}
      style={{ "--accent": color } as CSSProperties}
      className="flex flex-col overflow-hidden rounded-2xl border bg-card"
    >
      <PlayContext.Provider value={{ play: inView || reduce, reduce }}>
        <div className="p-5 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-[10px] bg-[color-mix(in_oklab,var(--accent)_14%,white)] text-[var(--accent)]">
              <Icon className="size-4" />
            </span>
            <span className="flex-1 text-sm font-semibold text-navy">{name}</span>
            {!reduce && (
              <button
                type="button"
                onClick={() => setRun((r) => r + 1)}
                aria-label={`Replay ${name} animation`}
                className="flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-navy focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <RotateCcw className="size-3.5" />
              </button>
            )}
          </div>
          {/* Keyed on replay so the number and the picture restart together. */}
          <p key={`stat-${run}`} className="mt-4 text-[2.5rem] leading-none font-semibold tracking-tight text-navy">
            {stat}
          </p>
          <p className="mt-2 text-sm leading-snug text-muted-foreground">{caption}</p>
        </div>

        <div
          key={`visual-${run}`}
          aria-hidden
          className="mt-auto flex h-36 items-center justify-center bg-[color-mix(in_oklab,var(--accent)_8%,white)] px-6"
        >
          {children}
        </div>
      </PlayContext.Provider>
    </figure>
  )
}

/* ── Visuals ───────────────────────────────────── */

const income = [12, 16, 19, 23, 24, 28, 31, 33, 36, 38, 40, 43]

// A rising line that draws itself in.
function RisingLine() {
  const W = 240, H = 90, P = 8
  const x = (i: number) => P + (i * (W - P * 2)) / (income.length - 1)
  const y = (v: number) => H - P - (v / 45) * (H - P * 2)
  const line = income.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join("")
  const end = income.length - 1
  const lineMotion = useMotionProps({ pathLength: 0 }, { pathLength: 1 })
  const areaMotion = useMotionProps({ opacity: 0 }, { opacity: 0.18 })
  const dotMotion = useMotionProps({ scale: 0 }, { scale: 1 })

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-24 w-full overflow-visible">
      <motion.path
        d={`${line}L${x(end)},${H}L${x(0)},${H}Z`}
        fill="var(--accent)"
        {...areaMotion}
        transition={{ duration: 0.8, delay: 0.7 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...lineMotion}
        transition={{ duration: 1.4, ease: EASE }}
      />
      <motion.circle
        cx={x(end)}
        cy={y(income[end])}
        r={6}
        fill="var(--accent)"
        stroke="#fff"
        strokeWidth={3}
        {...dotMotion}
        transition={{ type: "spring", stiffness: 400, damping: 16, delay: 1.3 }}
      />
    </svg>
  )
}

// Two labelled bars: the typical option vs. ours.
function CompareBars({ ours, theirs, oursLabel = "Ours", theirsLabel = "Typical" }: { ours: number; theirs: number; oursLabel?: string; theirsLabel?: string }) {
  const theirsMotion = useMotionProps({ width: "0%" }, { width: `${theirs}%` })
  const oursMotion = useMotionProps({ width: "0%" }, { width: `${ours}%` })
  return (
    <div className="grid w-full gap-3 text-xs font-semibold">
      <div className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
        <span className="text-muted-foreground">{theirsLabel}</span>
        <motion.div className="h-6 rounded-full bg-[#CDD3E1]" {...theirsMotion} transition={{ duration: 0.8, ease: EASE }} />
      </div>
      <div className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
        <span className="text-navy">{oursLabel}</span>
        <motion.div className="h-6 rounded-full bg-[var(--accent)]" {...oursMotion} transition={{ duration: 1.1, delay: 0.3, ease: EASE }} />
      </div>
    </div>
  )
}

// A stopwatch that sweeps to half of its five-minute window, then checks off.
function Stopwatch() {
  const ringMotion = useMotionProps({ pathLength: 0 }, { pathLength: 154 / 300 })
  const checkMotion = useMotionProps({ scale: 0, opacity: 0 }, { scale: 1, opacity: 1 })
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-24">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle cx={50} cy={50} r={40} fill="none" stroke="color-mix(in oklab, var(--accent) 18%, white)" strokeWidth={10} />
          <motion.circle
            cx={50}
            cy={50}
            r={40}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={10}
            strokeLinecap="round"
            {...ringMotion}
            transition={{ duration: 1.3, ease: EASE }}
          />
        </svg>
        <motion.span
          className="absolute inset-0 m-auto flex size-10 items-center justify-center rounded-full bg-[var(--accent)] text-white"
          {...checkMotion}
          transition={{ type: "spring", stiffness: 420, damping: 16, delay: 1.2 }}
        >
          <Check className="size-5" strokeWidth={3} />
        </motion.span>
      </div>
      <div className="text-xs leading-tight text-muted-foreground">
        <span className="block text-lg font-semibold text-navy">2m 34s</span>
        typical reply
        <span className="mt-2 block">5 min limit</span>
      </div>
    </div>
  )
}

// Before bar stays; after bar shrinks from it.
function ShrinkBars({ after }: { after: number }) {
  const barMotion = useMotionProps({ width: "100%" }, { width: `${after}%` })
  return (
    <div className="grid w-full gap-3 text-xs font-semibold">
      <div className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
        <span className="text-muted-foreground">Before</span>
        <div className="h-6 rounded-full bg-[#CDD3E1]" />
      </div>
      <div className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
        <span className="text-navy">After</span>
        <motion.div className="h-6 rounded-full bg-[var(--accent)]" {...barMotion} transition={{ duration: 1.2, delay: 0.4, ease: EASE }} />
      </div>
    </div>
  )
}

// 20 residents; the ones paying on time light up in turn.
function DotGrid({ filled, total = 20 }: { filled: number; total?: number }) {
  const { play, reduce } = usePlay()
  return (
    <div className="grid grid-cols-10 gap-2">
      {Array.from({ length: total }, (_, i) => {
        const on = i < filled
        return (
          <motion.span
            key={i}
            className="size-5 rounded-full"
            initial={reduce ? false : { backgroundColor: "#DDE2EC", scale: 0.6 }}
            animate={
              play
                ? { backgroundColor: on ? "var(--accent)" : "#DDE2EC", scale: 1 }
                : { backgroundColor: "#DDE2EC", scale: 0.6 }
            }
            transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.05 }}
          />
        )
      })}
    </div>
  )
}

// Five stars filling in, the last one partly.
function StarRow({ rating }: { rating: number }) {
  const { play, reduce } = usePlay()
  return (
    <div className="flex gap-1.5">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i)) * 100
        return (
          <span key={i} className="relative size-9">
            <Star className="absolute inset-0 size-full fill-[#DDE2EC] text-[#DDE2EC]" />
            <motion.span
              className="absolute inset-0 overflow-hidden"
              initial={reduce ? false : { width: "0%" }}
              animate={{ width: play ? `${fill}%` : "0%" }}
              transition={{ duration: 0.4, delay: reduce ? 0 : 0.2 + i * 0.15, ease: "easeOut" }}
            >
              <Star className="size-9 fill-[var(--accent)] text-[var(--accent)]" />
            </motion.span>
          </span>
        )
      })}
    </div>
  )
}

// A thick progress bar toward the next reward.
function RewardProgress({ points, goal }: { points: number; goal: number }) {
  const barMotion = useMotionProps({ width: "0%" }, { width: `${(points / goal) * 100}%` })
  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--accent)_18%,white)]">
          <motion.div className="h-full rounded-full bg-[var(--accent)]" {...barMotion} transition={{ duration: 1.3, ease: EASE }} />
        </div>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[var(--accent)] shadow-sm">
          <Gift className="size-5" />
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        <strong className="font-semibold text-navy">{(goal - points).toLocaleString("en-US")} pts</strong> to the next reward
      </p>
    </div>
  )
}

// Icon chips that pop in one after another.
function Chips({ items }: { items: [Icon, string][] }) {
  const { play, reduce } = usePlay()
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map(([ItemIcon, label], i) => (
        <motion.span
          key={label}
          className="flex items-center gap-1.5 rounded-full bg-white py-1.5 pr-3 pl-2 text-xs font-semibold text-navy shadow-sm"
          initial={reduce ? false : { opacity: 0, y: 10, scale: 0.9 }}
          animate={play ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 380, damping: 20, delay: reduce ? 0 : 0.2 + i * 0.15 }}
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,white)] text-[var(--accent)]">
            <ItemIcon className="size-3.5" />
          </span>
          {label}
        </motion.span>
      ))}
    </div>
  )
}

// Upcoming services as icons joined by a line that draws across.
function ComingSoon({ items }: { items: [Icon, string][] }) {
  const { play, reduce } = usePlay()
  const lineMotion = useMotionProps({ scaleX: 0 }, { scaleX: 1 })
  return (
    <div className="relative flex w-full justify-between">
      <motion.span
        className="absolute top-6 right-8 left-8 h-0.5 origin-left bg-[color-mix(in_oklab,var(--accent)_30%,white)]"
        {...lineMotion}
        transition={{ duration: 1, ease: EASE }}
      />
      {items.map(([ItemIcon, label], i) => (
        <motion.div
          key={label}
          className="relative flex w-20 flex-col items-center gap-2 text-center text-[11px] leading-tight font-semibold text-navy"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.2 + i * 0.25, ease: EASE }}
        >
          <span className="relative flex size-12 items-center justify-center rounded-full bg-[var(--accent)] text-white">
            {i === 0 && !reduce && (
              <motion.span
                className="absolute inset-0 rounded-full bg-[var(--accent)]"
                animate={{ scale: [1, 1.6], opacity: [0.35, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <ItemIcon className="relative size-5" />
          </span>
          {label}
        </motion.div>
      ))}
    </div>
  )
}

/* ── Showcase ──────────────────────────────────── */

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`

export function ServiceChartsShowcase() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={Wifi}
          name="Instanet"
          color={accent.instanet}
          stat={<CountUp to={4280} format={(n) => `+${usd(n)}`} />}
          caption="Extra income a month from resident internet"
        >
          <RisingLine />
        </ServiceCard>

        <ServiceCard
          icon={ShieldCheck}
          name="Renter's Insurance"
          color={accent.insurance}
          stat={<CountUp to={3} format={(n) => `${Math.round(n)}×`} />}
          caption="More liability coverage than a typical policy"
        >
          <CompareBars theirs={33} ours={100} />
        </ServiceCard>

        <ServiceCard
          icon={Bug}
          name="On-Demand Pest Control"
          color={accent.pest}
          stat={<>&lt; 5 min</>}
          caption="Until a resident hears back from us"
        >
          <Stopwatch />
        </ServiceCard>

        <ServiceCard
          icon={AirVent}
          name="Air Filter Delivery"
          color={accent.filter}
          stat={<CountUp to={40} format={(n) => `−${Math.round(n)}%`} />}
          caption="Lower HVAC maintenance costs"
        >
          <ShrinkBars after={60} />
        </ServiceCard>

        <ServiceCard
          icon={BadgeDollarSign}
          name="Credit Reporting"
          color={accent.credit}
          stat={<CountUp to={95} format={(n) => `${Math.round(n)}%`} />}
          caption="Of residents pay rent on time"
        >
          <DotGrid filled={19} />
        </ServiceCard>

        <ServiceCard
          icon={House}
          name="Utility Valet"
          color={accent.valet}
          stat={<CountUp to={4.9} format={(n) => n.toFixed(1)} />}
          caption="Average move-in rating from residents"
        >
          <StarRow rating={4.9} />
        </ServiceCard>

        <ServiceCard
          icon={Award}
          name="Rewards Program"
          color={accent.rewards}
          stat={<CountUp to={3250} />}
          caption="Points a resident earned for paying on time"
        >
          <RewardProgress points={3250} goal={5000} />
        </ServiceCard>

        <ServiceCard
          icon={Tag}
          name="Exclusive Deals"
          color={accent.deals}
          stat={<CountUp to={612} format={usd} />}
          caption="Saved per resident each year"
        >
          <Chips
            items={[
              [ShoppingCart, "Groceries"],
              [Car, "Auto"],
              [Utensils, "Dining"],
            ]}
          />
        </ServiceCard>

        <ServiceCard
          icon={Sparkles}
          name="Other Services Coming"
          color={accent.coming}
          stat={<CountUp to={3} />}
          caption="New services on the way to lift NOI"
        >
          <ComingSoon
            items={[
              [PiggyBank, "Cost savings"],
              [ShieldPlus, "Insurance"],
              [Users, "Staffing"],
            ]}
          />
        </ServiceCard>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border bg-mist px-5 py-4 text-xs text-muted-foreground">
        <span className="font-heading font-medium tracking-wide text-navy">Service accents</span>
        {Object.entries(accent).map(([name, hex]) => (
          <span key={name} className="flex items-center gap-2 capitalize">
            <span className="size-3.5 rounded-full" style={{ background: hex }} />
            {name} <code className="text-royal normal-case">{hex}</code>
          </span>
        ))}
      </div>
    </div>
  )
}
