# Utility Valet — UI Design Guide

Version 0.1 · foundations only. The values below come from the current theme stylesheet on utilityvalet.io (`themes/utility-valet/dist/assets/main-*.css`) and its Typekit kit. The redesign starts from them.

Live reference: run `npm run dev` and open **`/styleguide`**.

---

## 1. Stack

| Layer | Choice |
| --- | --- |
| Framework | Astro 5 (Cloudflare Workers adapter) |
| Components | [shadcn/ui](https://ui.shadcn.com) (new-york style, Radix primitives) as React islands |
| Styling | Tailwind CSS v4, tokens in `src/styles/app.css` |
| Icons | `lucide-react` for interface icons; brand illustrations in `public/brand/icons` |
| Fonts | `@fontsource-variable/unbounded`, `@fontsource-variable/dm-sans` (self-hosted) |

Add a component with `npx shadcn@latest add <name>`. It lands in `src/components/ui/`. Interactive shadcn components need a `client:*` directive when you use them in `.astro` files.

---

## 2. Logo

Files are in `public/brand/logo/`.

| File | Use |
| --- | --- |
| `utility-valet-logo.png` | Primary. Navy wordmark on white or light backgrounds |
| `utility-valet-logo-white.png` | Reversed. White wordmark on gradients, photos, or navy |
| `utility-valet-mark.png` | House mark alone. Favicons, app icons, avatars, tight spaces |
| `favicon-32.png`, `apple-touch-icon.png` | Browser icons |

- Leave clear space around the logo at least equal to the height of the house's roof.
- Don't recolor, stretch, or place the navy wordmark on mid-tone blues. Use the reversed version there.
- **Missing:** we only have raster PNGs. Ask the brand owner for SVG versions before launch.

---

## 3. Color

### Brand palette

Each color is available as a Tailwind utility (`bg-navy`, `text-royal`, `border-cyan`, …).

| Token | Hex | Source var on live site | Role |
| --- | --- | --- | --- |
| `navy` | `#050A4A` | `--light-black` | Headings, body text, secondary (dark) buttons |
| `ink` | `#181A33` | `--dark` | Text on cyan buttons, dark surfaces |
| `cyan` | `#2CCCFB` | `--primary` | Primary action, focus ring, highlights |
| `cyan-hover` | `#2CA8FB` | `--primary-hover` | Primary button hover |
| `royal` | `#0E6DF9` | `--royal` | Links on light backgrounds, eyebrows, icons |
| `sky` | `#3399FF` | `--bright-blue` | Supporting blue |
| `steel` | `#708BB2` | `--med-blue` | Muted blue accents |
| `violet` | `#CD3EF9` | `--pink2` | Logo gradient start; use sparingly |
| `lavender` | `#D1A2FC` | `--accent` | Alternate button (`variant="accent"`) |
| `ice` | `#DFF7FE` | — | Tinted panels, icon tiles, hover backgrounds |
| `ice-strong` | `#BEF0FE` | — | Stronger tint |
| `cloud` | `#F4F4F4` | `--offwhite` | Muted section backgrounds |
| `mist` | `#F6F8FC` | — | Cool off-white; the copy half of split heroes |
| `gray` | `#838486` | `--medium` | Decorative only |

### Semantic (shadcn) tokens

Components use semantic tokens, never raw brand colors, so the theme can change in one place.

| Token | Light | Dark (`.dark`) |
| --- | --- | --- |
| `background` / `foreground` | white / navy | navy / white |
| `primary` / `primary-foreground` | cyan / ink | cyan / ink |
| `secondary` / `secondary-foreground` | navy / white | white / navy |
| `muted` / `muted-foreground` | cloud / `#5A5E7A` | `#11164F` / `#AAB3D6` |
| `accent` / `accent-foreground` | ice / navy | `#141B63` / white |
| `border` · `input` · `ring` | `#EEEEEE` · `#D3D3D3` · cyan | white 12% · white 20% · cyan |
| `destructive` | `#DC2626` | `#F87171` |

The `.dark` scope is for **dark sections** (navy bands, gradient CTAs), not a site-wide dark mode. Add `class="dark"` to a section to flip its components.

### Accessibility rules

- **Never use cyan for text on white.** It measures about 1.9:1. Use `royal` for links on light backgrounds. Cyan text is fine on navy.
- Cyan buttons always take `ink`/`navy` text, never white.
- `gray` (#838486) fails WCAG AA for body text on white. Use `muted-foreground` (#5A5E7A) for secondary copy. This is a deliberate change from the live site.

---

## 4. Gradients

| Utility | Definition | Use |
| --- | --- | --- |
| `bg-gradient-sky` | pale blue → cyan → deep blue, left to right | Signature hero background (recreated from `bg1-05.png`) |
| `bg-gradient-deep` | royal glow at top fading to navy | Dark bands, CTA cards, footer (recreated from `home-dark-bg.jpg`) |
| `bg-gradient-logo` / `text-gradient-logo` | violet → royal, 135° | Small accents only; it echoes the logo mark |

The sky and deep gradients are CSS approximations of raster backgrounds on the live site. The originals are kept in `public/brand/backgrounds/` in case exact matching matters.

---

## 5. Typography

| Role | Font | Weight | Size (mobile → ≥768px) | Line height |
| --- | --- | --- | --- | --- |
| H1 | Unbounded | 500 | 32 → 48px | 1.2 |
| H2 | Unbounded | 500 | 24 → 36px | 1.2 |
| H3 | Unbounded | 500 | 20 → 28px | 1.2 |
| H4 | Unbounded | 500 | 16 → 20px | 1.2 |
| H5–H6 | Unbounded | 500 | 16px | 1.2 |
| Eyebrow | Unbounded | 500 | 12px, uppercase, `tracking-widest`, `text-royal` | — |
| Lead | DM Sans | 400 | 18px | 1.8 |
| Body | DM Sans | 400 | 16px | 1.8 |
| Small / help | DM Sans | 400 | 14px | 1.6 |
| Buttons | DM Sans | 600 | 14–16px depending on size | 1 |

- Tailwind: `font-heading` for Unbounded, `font-sans` (default) for DM Sans.
- Heading sizes are applied in the base layer, so plain `<h1>`–`<h6>` are already styled.
- Default text color is `navy`, not black.
- The live site loads both fonts from Adobe Typekit (kit `epm0cac`). We self-host the Google Fonts versions of the same families instead, so the redesign doesn't depend on that kit.

---

## 6. Shape, spacing, layout

- **Base radius: 12px** (`--radius`, from the site's `--object-radius`). Scale: `sm` 8 · `md` 10 · `lg` 12 · `xl` 16 (cards) · `2xl` 24 (large media).
- **Buttons are always pills** (`rounded-full`).
- **Container:** `max-w-site` = 1350px, with a 16px gutter on mobile and 32px from `md` up.
- **Breakpoint** that matters most: 768px (`md`), where the site's type scale steps up.
- Section rhythm on the styleguide is `py-16 md:py-20`. Treat that as a starting point, not a rule yet.
- Shadows: the site hardly uses them. Keep surfaces flat and separate them with borders or tints (`ice`, `cloud`).

---

## 7. Components (shadcn/ui, customised)

> **Warning:** `button.tsx` and `slider.tsx` are customized. Never pass `--overwrite` to `shadcn add`: it silently replaces registry dependencies such as Button. After any `shadcn add`, check that the new files import `cn` from `@/lib/utils` and not from an npm package called `cn`.

Installed: accordion, carousel, navigation-menu, sheet, slider, alert, avatar, badge, button, card, checkbox, dialog, input, label, radio-group, select, separator, switch, tabs, textarea, tooltip.

Changes from shadcn defaults:

**Button: "switch-on"** (`src/components/ui/button.tsx`)

The concept comes from the tagline, *"Turning on every American home."* A button can carry a round **knob**. On hover or keyboard focus the knob floods outward to fill the button, like a switch turning on. The brand arrow (`valet-arrow`) slides out of the knob and a new one slides in. Pressing gives a spring scale-down using [Motion](https://motion.dev). Labels are DM Sans 600 in sentence case.

| Variant | Rest | Flood on hover | Use |
| --- | --- | --- | --- |
| `hero` | Navy, rotating logo-gradient border, cyan glow | Cyan | The **one** most important action on a page |
| `default` | Navy + cyan knob | Cyan | Primary actions |
| `secondary` | Cyan + navy knob | Navy | Secondary / header CTA |
| `outline` | Navy outline | Navy | Tertiary, next to a primary |
| `accent` | Lavender | Navy | Sparingly; campaign or partner actions |
| `ghost` | Transparent | Ice | Low-emphasis actions |
| `destructive` | Red | Dark red | Destructive actions |
| `link` | Royal text | Underline draws in | Inline "Learn more" |

Inside a `.dark` section, `default`, `secondary`, `outline` and `ghost` switch to light treatments automatically.

Props:
- `icon="arrow"` adds the knob with the animated brand arrow. Pass any node (for example `<Phone />`) for a custom knob icon. Without `icon`, the flood grows from the center.
- `loading` swaps a spinner into the knob (or over the label). It sets `aria-busy` and blocks clicks without changing the button's width.
- `href` renders an `<a>` with the same styling and motion. `asChild` still works for Radix triggers; press feedback falls back to CSS there.
- Sizes: `sm` 40px · `default` 48px · `lg` 56px, plus `icon-sm`, `icon` and `icon-lg`. There is no size below 40px, to keep touch targets comfortable.
- Animations are disabled under `prefers-reduced-motion`.

```tsx
<Button variant="hero" size="lg" icon="arrow">Book a Demo</Button>
<Button icon="arrow" loading={isSubmitting}>Schedule setup</Button>
<Button variant="link" icon="arrow" href="/residents">Learn more</Button>
```

**Input / Select / Textarea**
- 44px tall, 12px radius, 16px horizontal padding. The site's forms use 48px min-height with 12px radius.

Everything else uses the stock shadcn styling on top of the brand tokens.

---

## 8. Page patterns

**Site nav** (`src/components/site/SiteNav.tsx`)
- Sticky and translucent, with the logo on the left, a centered menu, and actions on the right. Desktop menus use shadcn `navigation-menu`. The Solutions and Products menus have a featured card on the deep gradient.
- Groups: **Solutions** (Property Managers, Residents, Revenue Sharing), **Products** (Revenue Valet, Instanet; featured card for Revenue Valet), **Company** (About Us, Work With Us), plus a **Resources** link. These keep the live site's URLs.
- Right side: the phone number (shown from `xl` up) and an outline "Get in touch" pill. Below `lg`, a hamburger opens a sheet with an accordion and full-width CTAs.

**Split hero** (`src/components/site/Hero.astro`)
- Two halves from `lg` up. The left is copy on `mist`. The right is a `bg-gradient-sky grain` panel holding product UI. On mobile they stack, copy first.
- Headline: Unbounded **400** (lighter than section headings) with tight tracking. The closing phrase is set in `steel`.
- The product visual (`HeroVisual.tsx`) is decorative: it's `aria-hidden` and `inert`, and every figure in it is sample data. The resident phone switches utilities on one by one to echo the button concept. It shows the finished state under reduced motion.
- `grain` utility: film-grain overlay for gradient panels. The parent must be positioned.

**Homepage sections** (`src/pages/index.astro`, in order)

| Section | File | Notes |
| --- | --- | --- |
| Hero | `site/Hero.astro` | Split hero |
| Partner logos | `site/PartnerMarquee.astro` | CSS marquee with a light-blue duotone, and a pause control |
| Why partner with us | `site/WhyPartner.astro` | 3 benefits, plus a YouTube facade (loads only on play, via youtube-nocookie) |
| Revenue calculator | `site/RevenueCalculator.tsx` | Same formulas as the live site: $20/door/month with InstaNet, and doors × 25% churn × 70% conversion × $75 ÷ 12 without |
| All-in-One Utility Setup | `site/AllInOne.astro` | Diagram rebuilt in SVG and HTML, scaled with container units; stacks on mobile |
| How it works | `site/HowItWorks.tsx` | Partners/Residents switch inside the heading |
| Testimonials | `site/Testimonials.tsx` | 18 reviews (verbatim, in `src/data/testimonials.ts`) and 13 video stories |
| Blog | `site/Blog.astro` | 3 latest posts |
| CTA and footer | `site/Footer.astro` | Rendered by `SiteLayout` on every page; pass `cta={false}` to hide the banner |

Inset panels (`rounded-[2rem]` with a 12–16px side margin) carry over the live site's framed sections. Use `bg-mist` for light panels and `#0B1142` for dark ones.

## 9. Assets

All pulled from utilityvalet.io into `public/brand/`:

| Folder | Contents |
| --- | --- |
| `logo/` | Primary, reversed, and mark logos, plus favicons |
| `icons/` | 6 feature illustrations (`feature-*.svg`), `valet-arrow.svg`, `white-arrow.svg`, `quote.svg`, `utility-graphic.svg` |
| `backgrounds/` | Hero house-frame photo, sky and deep gradient rasters (`bg1.png`, `bg2.png`, `home-dark-bg.jpg`), `fill.png` |
| `photos/` | `team.jpg`, `living-room.png` |
| `testimonials/` | 13 video-review stills (`review-*.jpg`). The MP4s are still hosted on the live site |
| `partners/` | 25 property-management partner logos |

**Brand motif:** the house-shaped photo frame (`hero-house-photo.png`) is the most distinctive visual on the current site. It's a good candidate to rebuild as an SVG mask so any photo can use it.

**Before launch:**
- `partners/compass.png` is a white logo. Always show it on a dark tile.
- Confirm we have the rights to reuse the partner logos and testimonial footage on the new site.

---

## 10. Open questions

1. Can we get vector (SVG) logos?
2. Should the redesign keep the lavender/violet accents, or narrow the palette to blues?
3. Should dark sections use the deep gradient or flat navy?
4. Is there a brand voice and copy guide to pair with this doc?
5. Should the hero mockups use real product screens? They're illustrative until then.
