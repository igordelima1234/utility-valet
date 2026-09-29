import { useState, type FormEvent } from "react"
import { CheckCircle2, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PHONE } from "@/components/site/SiteNav"
import { cn } from "@/lib/utils"

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia",
  "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
]

type Status = "idle" | "submitting" | "success" | "error"

function Field({ id, label, required, children }: { id: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-navy">
        {label}
        {required && (
          <span className="text-destructive" aria-hidden>
            *
          </span>
        )}
      </Label>
      {children}
    </div>
  )
}

/** "Book a demo" form for Revenue Valet service pages. Posts to /api/demo-request. */
export default function DemoForm({ service }: { service: string }) {
  const [status, setStatus] = useState<Status>("idle")

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    setStatus("submitting")
    const data = Object.fromEntries(new FormData(form))
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, service, page: window.location.pathname }),
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
          A member of our team will reach out to schedule your {service} demo. Need us sooner? Call{" "}
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
      <Field id="company" label="Company Name" required>
        <Input id="company" name="company" autoComplete="organization" required />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required>
          <Input id="name" name="name" autoComplete="name" required />
        </Field>
        <Field id="phone" label="Phone" required>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" required />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" required>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field id="state" label="State" required>
          <div className="relative">
            <select
              id="state"
              name="state"
              autoComplete="address-level1"
              required
              defaultValue=""
              className={cn(
                "h-11 w-full appearance-none rounded-lg border border-input bg-transparent pr-10 pl-4 text-base shadow-xs outline-none md:text-sm",
                "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 invalid:text-muted-foreground"
              )}
            >
              <option value="" disabled>
                Select a state
              </option>
              {STATES.map((s) => (
                <option key={s} value={s} className="text-navy">
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-navy/60" />
          </div>
        </Field>
      </div>

      <Field id="source" label="How Did You Hear About Us?">
        <Textarea id="source" name="source" rows={4} className="min-h-28" />
      </Field>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div className="hidden" aria-hidden>
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          Something went wrong sending your request. Please try again, or call us at{" "}
          <a href={PHONE.href} className="font-semibold underline">
            {PHONE.display}
          </a>
          .
        </p>
      )}

      <Button type="submit" size="lg" icon="arrow" loading={status === "submitting"} className="mt-2 w-full justify-between sm:w-auto sm:justify-self-start">
        Submit
      </Button>
    </form>
  )
}
