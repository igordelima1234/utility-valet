import type { ComponentType, SVGProps } from "react"
import {
  BadgeDollarSign,
  Building2,
  Gift,
  Handshake,
  House,
  Menu,
  Phone,
  Users,
  Wifi,
} from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button, ValetArrow } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type Icon = ComponentType<SVGProps<SVGSVGElement>>
type NavLink = { title: string; href: string; description: string; icon: Icon }
type NavGroup = { label: string; links: NavLink[]; feature?: { eyebrow: string; title: string; href: string; cta: string } }

export const PHONE = { display: "469-930-3672", href: "tel:4699303672" }

// Same destinations as the current site so links keep working after launch.
export const groups: NavGroup[] = [
  {
    label: "Solutions",
    links: [
      {
        title: "For Property Managers",
        href: "/property-managers",
        description: "Hand off every utility setup and earn on each move-in.",
        icon: Building2,
      },
      {
        title: "For Residents",
        href: "/residents",
        description: "Move in with the lights on and the Wi-Fi ready.",
        icon: House,
      },
      {
        title: "Revenue Sharing",
        href: "/revenue-sharing",
        description: "A hassle-free revenue stream for your portfolio.",
        icon: BadgeDollarSign,
      },
    ],
    feature: {
      eyebrow: "Revenue sharing",
      title: "Partners earn about $75 per move-in without lifting a finger.",
      href: "/revenue-sharing",
      cta: "See how",
    },
  },
  {
    label: "Products",
    links: [
      {
        title: "Revenue Valet",
        href: "/revenue-valet",
        description: "A better way to do resident benefits.",
        icon: Gift,
      },
      {
        title: "Instanet",
        href: "/instanet",
        description: "Bulk internet. Zero CapEx. Higher NOI.",
        icon: Wifi,
      },
    ],
    feature: {
      eyebrow: "Revenue Valet",
      title: "Resident benefits with better pricing and better service.",
      href: "/revenue-valet",
      cta: "Explore",
    },
  },
  {
    label: "Company",
    links: [
      { title: "About Us", href: "/about-us", description: "The team turning on every American home.", icon: Users },
      { title: "Work With Us", href: "/work-with-us", description: "Partner with Utility Valet.", icon: Handshake },
    ],
  },
]

const trigger =
  "h-10 rounded-full bg-transparent px-4 text-[0.9375rem] font-medium text-navy hover:bg-accent focus:bg-accent data-[state=open]:bg-accent data-[state=open]:hover:bg-accent"

function MenuLink({ link }: { link: NavLink }) {
  const Icon = link.icon
  return (
    <NavigationMenuLink asChild>
      <a href={link.href} className="group/link flex-row items-start gap-4 rounded-xl p-3 hover:bg-mist focus:bg-mist">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ice text-royal transition-colors group-hover/link:bg-cyan group-hover/link:text-navy">
          <Icon className="size-5! text-current!" />
        </span>
        <span className="grid gap-0.5">
          <span className="font-semibold text-navy">{link.title}</span>
          <span className="text-sm leading-snug text-muted-foreground">{link.description}</span>
        </span>
      </a>
    </NavigationMenuLink>
  )
}

function DesktopNav() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="gap-1">
        {groups.map((group) => (
          <NavigationMenuItem key={group.label}>
            <NavigationMenuTrigger className={trigger}>{group.label}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className={cn("grid gap-2 p-2", group.feature ? "w-[640px] grid-cols-[1fr_240px]" : "w-[400px]")}>
                <ul className="grid gap-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <MenuLink link={link} />
                    </li>
                  ))}
                </ul>
                {group.feature && (
                  <NavigationMenuLink asChild>
                    <a
                      href={group.feature.href}
                      className="dark group/feature relative justify-end gap-3 overflow-hidden rounded-xl bg-gradient-deep p-5 text-white hover:bg-gradient-deep focus:bg-gradient-deep"
                    >
                      <span className="font-heading text-[0.6875rem] font-medium tracking-widest text-cyan uppercase">
                        {group.feature.eyebrow}
                      </span>
                      <span className="font-heading text-lg leading-snug font-medium text-white">{group.feature.title}</span>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-cyan">
                        {group.feature.cta}
                        <ValetArrow className="transition-transform duration-300 group-hover/feature:translate-x-1" />
                      </span>
                    </a>
                  </NavigationMenuLink>
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuLink href="/blog" className={cn(trigger, "flex-row items-center justify-center py-0")}>
            Resources
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto sm:max-w-sm">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle>
            <img src="/brand/logo/utility-valet-logo.png" alt="Utility Valet" className="h-11 w-auto" />
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Main" className="px-5">
          <Accordion type="single" collapsible>
            {groups.map((group) => (
              <AccordionItem key={group.label} value={group.label}>
                <AccordionTrigger className="py-4 font-heading text-base font-medium text-navy hover:no-underline">
                  {group.label}
                </AccordionTrigger>
                <AccordionContent className="grid gap-1 pb-4">
                  {group.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="group/link flex items-start gap-3.5 rounded-lg px-3 py-2.5 hover:bg-mist"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ice text-royal transition-colors group-hover/link:bg-cyan group-hover/link:text-navy">
                        <link.icon className="size-5" />
                      </span>
                      <span>
                        <span className="block font-semibold text-navy">{link.title}</span>
                        <span className="block text-sm text-muted-foreground">{link.description}</span>
                      </span>
                    </a>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <a href="/blog" className="block border-b py-4 font-heading text-base font-medium text-navy">
            Resources
          </a>
        </nav>
        <div className="mt-auto grid gap-3 p-5">
          <SheetClose asChild>
            <Button href="/contact" variant="secondary" icon="arrow" className="w-full justify-between">
              Get in touch
            </Button>
          </SheetClose>
          <Button href={PHONE.href} variant="outline" className="w-full">
            <Phone className="size-4" /> {PHONE.display}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/8 bg-white/85 backdrop-blur-lg">
      <div className="mx-auto grid h-18 grid-cols-[1fr_auto] items-center px-5 lg:h-20 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        <a href="/" className="flex items-center justify-self-start" aria-label="Utility Valet home">
          <img src="/brand/logo/utility-valet-logo.png" alt="Utility Valet" className="h-12 w-auto lg:h-14" width={154} height={56} />
        </a>

        <DesktopNav />

        <div className="flex items-center gap-2 justify-self-end">
          <a
            href={PHONE.href}
            className="hidden items-center gap-2 rounded-full px-4 py-2 text-[0.9375rem] font-medium text-navy transition-colors hover:bg-accent xl:inline-flex"
          >
            <Phone className="size-4 text-royal" />
            {PHONE.display}
          </a>
          <Button href="/contact" variant="outline" size="sm" className="hidden sm:inline-flex">
            Get in touch
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
