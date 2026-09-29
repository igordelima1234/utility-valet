import { useState, type ReactNode } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Audience = "partners" | "residents"
type Step = { title: string; body: ReactNode; icon: string }

const steps: Record<Audience, Step[]> = {
  partners: [
    {
      title: "Sign Up",
      icon: "feature-41",
      body: (
        <>
          Complete the{" "}
          <a href="/property-managers" className="font-semibold text-royal underline-offset-4 hover:underline">
            sign up form
          </a>{" "}
          on our Property Managers page.
        </>
      ),
    },
    {
      title: "Onboarding",
      icon: "feature-43",
      body: "Our onboarding team will organize a call with you and coordinate required documentation and integrations.",
    },
    {
      title: "We Start Connecting",
      icon: "feature-36",
      body: "Once leads are integrated, we start reaching out and getting your residents connected.",
    },
  ],
  residents: [
    { title: "Book A Call", icon: "feature-41", body: "Fill out a quick form with your new property info." },
    {
      title: "We Reach Out",
      icon: "feature-43",
      body: "We’ll contact you at your requested time to go over your best options.",
    },
    {
      title: "Get Connected in Minutes",
      icon: "feature-36",
      body: "We handle the setup while you focus on your move, and we send all the confirmations, so you can move in with the lights on, the WiFi ready, and no last-minute surprises!",
    },
  ],
}

function Dots() {
  return (
    <div className="flex flex-col items-center gap-1.5 py-2" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-1.5 rounded-full bg-cyan" />
      ))}
    </div>
  )
}

export default function HowItWorks() {
  const [audience, setAudience] = useState<Audience>("partners")
  const reduce = useReducedMotion()

  return (
    <section className="px-3 md:px-4">
      <div className="mx-auto max-w-[1440px] rounded-[2rem] bg-mist px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-heading text-xs font-medium tracking-widest text-royal uppercase">Getting started</p>
          <h2 className="mb-0 flex flex-wrap items-baseline justify-center gap-x-[0.3em]">
            <span>How it works for</span>
            <Select value={audience} onValueChange={(v) => setAudience(v as Audience)}>
              <SelectTrigger
                aria-label="Show steps for"
                className="h-auto! gap-2 rounded-none border-0 border-b-[3px] border-cyan bg-transparent! px-0 py-0 font-heading text-[length:inherit] leading-[inherit] font-[inherit] text-royal shadow-none focus-visible:rounded-md focus-visible:ring-offset-4 [&_svg]:size-[0.6em]! [&_svg]:text-royal! [&_svg]:opacity-100"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="partners" className="py-2.5 font-heading text-base">
                  Partners
                </SelectItem>
                <SelectItem value="residents" className="py-2.5 font-heading text-base">
                  Residents
                </SelectItem>
              </SelectContent>
            </Select>
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-2xl md:mt-16">
          <div className="flex justify-center" aria-hidden>
            <span className="size-5 rounded-full bg-cyan shadow-[0_0_0_6px_rgb(44_204_251/0.2)]" />
          </div>
          <Dots />
          <AnimatePresence mode="wait" initial={false}>
            <motion.ol
              key={audience}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {steps[audience].map((step, i) => (
                <li key={step.title}>
                  {i > 0 && <Dots />}
                  <div className="group flex flex-col gap-5 rounded-3xl bg-white p-6 ring-1 ring-navy/6 transition-shadow duration-300 hover:shadow-[0_24px_50px_-28px_rgb(5_10_74/0.35)] sm:flex-row sm:items-start sm:gap-8 md:p-8">
                    <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-ice/60 transition-colors group-hover:bg-ice">
                      <img src={`/brand/icons/${step.icon}.svg`} alt="" className="size-14" loading="lazy" />
                    </div>
                    <div>
                      <p className="font-heading text-xs font-medium tracking-widest text-royal uppercase">Step {i + 1}</p>
                      <h3 className="mt-2 mb-2 text-xl! md:text-2xl!">{step.title}</h3>
                      <p className="text-navy/75">{step.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </motion.ol>
          </AnimatePresence>
          <Dots />
          <div className="flex justify-center" aria-hidden>
            <span className="size-5 rounded-full bg-cyan shadow-[0_0_0_6px_rgb(44_204_251/0.2)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
