import { useState, type FormEvent } from "react"
import { CheckCircle2, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PHONE } from "@/components/site/SiteNav"
import { Field } from "@/components/site/revenue-valet/DemoForm"
import { cn } from "@/lib/utils"

const TOPICS = ["Property management partnership", "Moving in as a resident", "Revenue sharing", "Something else"]

type Status = "idle" | "submitting" | "success" | "error"

/** General "Get in touch" form for the Contact page. Posts to /api/contact. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    setStatus("submitting")
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-10" role="status">
        <CheckCircle2 className="size-12 text-[#0f9d58]" />
        <h3 className="mb-0 text-2xl!">Thanks! We’ll be in touch soon.</h3>
        <p className="text-muted-foreground">
          A member of our team will get back to you shortly. Need us sooner? Call{" "}
          <a href={PHONE.href} className="font-semibold text-royal hover:underline">
            {PHONE.display}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required>
          <Input id="name" name="name" autoComplete="name" required />
        </Field>
        <Field id="company" label="Company">
          <Input id="company" name="company" autoComplete="organization" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" required>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field id="phone" label="Phone">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
      </div>

      <Field id="topic" label="What Can We Help With?" required>
        <div className="relative">
          <select
            id="topic"
            name="topic"
            required
            defaultValue=""
            className={cn(
              "h-11 w-full appearance-none rounded-lg border border-input bg-transparent pr-10 pl-4 text-base shadow-xs outline-none md:text-sm",
              "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 invalid:text-muted-foreground"
            )}
          >
            <option value="" disabled>
              Select a topic
            </option>
            {TOPICS.map((t) => (
              <option key={t} value={t} className="text-navy">
                {t}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-navy/60" />
        </div>
      </Field>

      <Field id="message" label="Message" required>
        <Textarea id="message" name="message" rows={5} className="min-h-32" required />
      </Field>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="hidden" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          Something went wrong sending your message. Please try again, or call us at{" "}
          <a href={PHONE.href} className="font-semibold underline">
            {PHONE.display}
          </a>
          .
        </p>
      )}

      <Button type="submit" size="lg" icon="arrow" loading={status === "submitting"} className="mt-2 w-full justify-between sm:w-auto sm:justify-self-start">
        Send message
      </Button>
    </form>
  )
}
