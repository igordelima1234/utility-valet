import { useState, type ReactNode } from "react"
import { Info, Phone, Plug, TriangleAlert, Zap } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

function Demo({ title, children, dark = false }: { title: string; children: ReactNode; dark?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="border-b bg-muted px-5 py-2.5 font-heading text-xs font-medium tracking-wide text-muted-foreground">
        {title}
      </div>
      <div className={dark ? "dark bg-gradient-deep p-6 text-foreground" : "p-6"}>{children}</div>
    </div>
  )
}

function LoadingDemo() {
  const [loading, setLoading] = useState(false)
  const run = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2200)
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button icon="arrow" loading={loading} onClick={run}>
        {loading ? "Scheduling…" : "Schedule setup"}
      </Button>
      <Button variant="secondary" loading={loading} onClick={run}>
        Submit
      </Button>
      <span className="text-sm text-muted-foreground">Click either to trigger the loading state</span>
    </div>
  )
}

function Spec({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-sm text-muted-foreground">{children}</p>
}

export function ButtonShowcase() {
  return (
    <div className="grid gap-6">
      <Demo title="Hero · one per page, for the single most important action">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="hero" size="lg" icon="arrow">
            Book a Demo
          </Button>
          <Button variant="hero" icon="arrow">
            Get Started
          </Button>
        </div>
        <Spec>Rotating logo-gradient border with a cyan glow. The knob floods on hover.</Spec>
      </Demo>

      <Demo title="Variants with knob">
        <div className="flex flex-wrap items-center gap-3">
          <Button icon="arrow">Book a Demo</Button>
          <Button variant="secondary" icon="arrow">
            Get in Touch
          </Button>
          <Button variant="outline" icon="arrow">
            For Residents
          </Button>
          <Button variant="accent" icon="arrow">
            Revenue Sharing
          </Button>
          <Button variant="ghost" icon="arrow">
            See how it works
          </Button>
        </div>
        <Spec>Hover over one: the knob expands to fill the button, like a switch turning on. Keyboard focus triggers it too.</Spec>
      </Demo>

      <Demo title="Plain & custom icons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Get in Touch</Button>
          <Button variant="secondary">Sign up</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">Skip</Button>
          <Button variant="destructive">Remove service</Button>
          <Button variant="secondary" icon={<Phone />}>
            469-930-3672
          </Button>
          <Button variant="link" icon="arrow">
            Learn more
          </Button>
        </div>
        <Spec>Without a knob, the flood grows from the center.</Spec>
      </Demo>

      <Demo title="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm" icon="arrow">
            Small · 40
          </Button>
          <Button icon="arrow">Default · 48</Button>
          <Button size="lg" icon="arrow">
            Large · 56
          </Button>
          <Button size="icon-sm" variant="outline" aria-label="Call us">
            <Phone />
          </Button>
          <Button size="icon" aria-label="Call us">
            <Phone />
          </Button>
          <Button size="icon-lg" variant="secondary" aria-label="Call us">
            <Phone />
          </Button>
        </div>
      </Demo>

      <div className="grid gap-6 lg:grid-cols-2">
        <Demo title="Loading">
          <LoadingDemo />
        </Demo>
        <Demo title="Disabled">
          <div className="flex flex-wrap items-center gap-3">
            <Button icon="arrow" disabled>
              Book a Demo
            </Button>
            <Button variant="outline" disabled>
              Cancel
            </Button>
          </div>
        </Demo>
      </div>

      <Demo title="On dark / gradient backgrounds (.dark)" dark>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="hero" icon="arrow">
            Get Started
          </Button>
          <Button icon="arrow">Book a Demo</Button>
          <Button variant="secondary" icon="arrow">
            Get in Touch
          </Button>
          <Button variant="outline">Learn more</Button>
          <Button variant="ghost">Skip</Button>
          <Button variant="link" icon="arrow">
            Read the story
          </Button>
        </div>
      </Demo>

      <Demo title="As a link">
        <div className="flex flex-wrap items-center gap-3">
          <Button href="#buttons" variant="outline" icon="arrow">
            Anchor with href
          </Button>
        </div>
        <Spec>Pass href to render an &lt;a&gt; with the same styling and motion.</Spec>
      </Demo>
    </div>
  )
}

export function FormShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Demo title="Text fields">
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="sg-name">Full name</Label>
            <Input id="sg-name" placeholder="Jordan Smith" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sg-email">Email</Label>
            <Input id="sg-email" type="email" placeholder="you@company.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sg-invalid">Phone (error state)</Label>
            <Input id="sg-invalid" aria-invalid defaultValue="469-930" />
            <p className="text-sm text-destructive">Enter a 10-digit phone number.</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sg-disabled">Disabled</Label>
            <Input id="sg-disabled" disabled placeholder="Not editable" />
          </div>
        </div>
      </Demo>
      <Demo title="Select, textarea">
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label>I am a…</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="resident">Resident</SelectItem>
                <SelectItem value="pm">Property manager</SelectItem>
                <SelectItem value="agent">Real estate agent</SelectItem>
                <SelectItem value="builder">Builder</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sg-msg">Message</Label>
            <Textarea id="sg-msg" placeholder="Tell us about your move…" />
          </div>
        </div>
      </Demo>
      <Demo title="Choice controls">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-3">
            <div className="flex items-center gap-3">
              <Checkbox id="sg-c1" defaultChecked />
              <Label htmlFor="sg-c1">Electricity</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="sg-c2" />
              <Label htmlFor="sg-c2">Internet</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="sg-c3" disabled />
              <Label htmlFor="sg-c3">Water (disabled)</Label>
            </div>
          </div>
          <RadioGroup defaultValue="asap">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="asap" id="sg-r1" />
              <Label htmlFor="sg-r1">As soon as possible</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="date" id="sg-r2" />
              <Label htmlFor="sg-r2">On move-in date</Label>
            </div>
          </RadioGroup>
        </div>
      </Demo>
      <Demo title="Switch">
        <div className="grid gap-3">
          <div className="flex items-center gap-3">
            <Switch id="sg-s1" defaultChecked />
            <Label htmlFor="sg-s1">Text me updates</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="sg-s2" />
            <Label htmlFor="sg-s2">Email me updates</Label>
          </div>
        </div>
      </Demo>
    </div>
  )
}

export function DisplayShowcase() {
  return (
    <TooltipProvider>
      <div className="grid gap-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <Demo title="Badges">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge className="bg-lavender text-navy">Lavender</Badge>
              <Badge className="bg-ice text-navy">Ice</Badge>
            </div>
          </Demo>
          <Demo title="Avatars, tooltip, separator">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar className="size-12">
                <AvatarImage src="/brand/testimonials/review-1-keirra.jpg" alt="Keirra" className="object-cover" />
                <AvatarFallback>KE</AvatarFallback>
              </Avatar>
              <Avatar className="size-12">
                <AvatarFallback className="bg-ice font-heading text-navy">UV</AvatarFallback>
              </Avatar>
              <Separator orientation="vertical" className="h-10!" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    Hover me
                  </Button>
                </TooltipTrigger>
                <TooltipContent>We set up every utility for free</TooltipContent>
              </Tooltip>
            </div>
          </Demo>
        </div>

        <Demo title="Alerts">
          <div className="grid gap-4 lg:grid-cols-2">
            <Alert>
              <Info />
              <AlertTitle>Your services are scheduled</AlertTitle>
              <AlertDescription>Electricity and internet will be on by your move-in date.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <TriangleAlert />
              <AlertTitle>We couldn't verify your address</AlertTitle>
              <AlertDescription>Check the unit number and try again.</AlertDescription>
            </Alert>
          </div>
        </Demo>

        <Demo title="Cards">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-ice text-royal">
                  <Zap />
                </div>
                <CardTitle className="font-heading text-lg font-medium">For Residents</CardTitle>
                <CardDescription>One call connects electricity, water, internet and more.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="link" icon="arrow">
                  Learn more
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-lg bg-ice text-royal">
                  <Plug />
                </div>
                <CardTitle className="font-heading text-lg font-medium">For Property Managers</CardTitle>
                <CardDescription>Automated utility setup for every new lease.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="link" icon="arrow">
                  Learn more
                </Button>
              </CardFooter>
            </Card>
            <Card className="dark border-0 bg-gradient-deep text-foreground">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-medium">Ready to move?</CardTitle>
                <CardDescription>Talk to a Utility Valet specialist today.</CardDescription>
              </CardHeader>
              <CardContent className="flex-1" />
              <CardFooter>
                <Button variant="secondary" icon="arrow">
                  Get in Touch
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Demo>

        <div className="grid gap-6 lg:grid-cols-2">
          <Demo title="Tabs">
            <Tabs defaultValue="residents">
              <TabsList>
                <TabsTrigger value="residents">Residents</TabsTrigger>
                <TabsTrigger value="managers">Property managers</TabsTrigger>
              </TabsList>
              <TabsContent value="residents" className="pt-3 text-muted-foreground">
                Tell us your new address and we handle every provider.
              </TabsContent>
              <TabsContent value="managers" className="pt-3 text-muted-foreground">
                Give every resident a concierge move-in experience.
              </TabsContent>
            </Tabs>
          </Demo>
          <Demo title="Dialog">
            <Dialog>
              <DialogTrigger asChild>
                <Button icon="arrow">Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-heading font-medium">Book a demo</DialogTitle>
                  <DialogDescription>Pick a time and we'll walk you through the platform.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-2">
                  <Label htmlFor="sg-dialog-email">Work email</Label>
                  <Input id="sg-dialog-email" placeholder="you@company.com" />
                </div>
                <DialogFooter>
                  <Button>Continue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Demo>
        </div>

        <Demo title="Accordion">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="a">
              <AccordionTrigger>Is Utility Valet free for residents?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Placeholder answer. Copy will come from the content audit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Which utilities do you connect?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Placeholder answer. Copy will come from the content audit.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Demo>
      </div>
    </TooltipProvider>
  )
}
