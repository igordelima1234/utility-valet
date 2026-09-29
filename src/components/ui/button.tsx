import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/*
 * "Switch-on" button.
 *
 * Every button can carry a round knob (the switch). On hover/focus the knob
 * floods outward and fills the button — the product literally "turns on"
 * utilities. Colors are driven per variant by four CSS variables:
 *   --btn-flood     colour that fills the button on hover
 *   --btn-knob      knob background (matches the flood so it merges in)
 *   --btn-knob-fg   icon colour inside the knob
 *   --btn-hover-fg  label colour once flooded
 *
 * NOTE: customised component. Don't run `shadcn add button --overwrite`
 * (or add a component with --overwrite that depends on button).
 */
const buttonVariants = cva(
  [
    "group/button relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
    "font-sans font-semibold tracking-[-0.01em] whitespace-nowrap select-none",
    "transition-[color,box-shadow] duration-300 ease-out outline-none",
    "hover:text-(--btn-hover-fg) focus-visible:text-(--btn-hover-fg)",
    "focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-45",
    "aria-busy:pointer-events-none aria-busy:cursor-progress",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-navy text-white",
          "[--btn-flood:var(--uv-cyan)] [--btn-knob:var(--uv-cyan)] [--btn-knob-fg:var(--uv-navy)] [--btn-hover-fg:var(--uv-navy)]",
          "dark:bg-white dark:text-navy",
        ],
        secondary: [
          "bg-cyan text-navy",
          "[--btn-flood:var(--uv-navy)] [--btn-knob:var(--uv-navy)] [--btn-knob-fg:#fff] [--btn-hover-fg:#fff]",
          "dark:[--btn-flood:#fff] dark:[--btn-knob:#fff] dark:[--btn-knob-fg:var(--uv-navy)] dark:[--btn-hover-fg:var(--uv-navy)]",
        ],
        hero: [
          "border-gradient-spin text-white shadow-[0_12px_40px_-12px_rgb(44_204_251/0.7)] hover:shadow-[0_16px_48px_-10px_rgb(44_204_251/0.9)]",
          "[--btn-flood:var(--uv-cyan)] [--btn-knob:var(--uv-cyan)] [--btn-knob-fg:var(--uv-navy)] [--btn-hover-fg:var(--uv-navy)]",
        ],
        outline: [
          "bg-transparent text-navy shadow-[inset_0_0_0_1.5px_var(--uv-navy)]",
          "[--btn-flood:var(--uv-navy)] [--btn-knob:var(--uv-navy)] [--btn-knob-fg:#fff] [--btn-hover-fg:#fff]",
          "dark:text-white dark:shadow-[inset_0_0_0_1.5px_rgb(255_255_255/0.45)]",
          "dark:[--btn-flood:#fff] dark:[--btn-knob:#fff] dark:[--btn-knob-fg:var(--uv-navy)] dark:[--btn-hover-fg:var(--uv-navy)]",
        ],
        accent: [
          "bg-lavender text-navy",
          "[--btn-flood:var(--uv-navy)] [--btn-knob:var(--uv-navy)] [--btn-knob-fg:#fff] [--btn-hover-fg:#fff]",
        ],
        ghost: [
          "bg-transparent text-navy",
          "[--btn-flood:var(--uv-ice)] [--btn-knob:var(--uv-ice)] [--btn-knob-fg:var(--uv-navy)] [--btn-hover-fg:var(--uv-navy)]",
          "dark:text-white dark:[--btn-flood:rgb(255_255_255/0.12)] dark:[--btn-knob:rgb(255_255_255/0.12)] dark:[--btn-knob-fg:#fff] dark:[--btn-hover-fg:#fff]",
        ],
        destructive: [
          "bg-destructive text-white",
          "[--btn-flood:#991b1b] [--btn-knob:#fff] [--btn-knob-fg:var(--destructive)] [--btn-hover-fg:#fff]",
        ],
        link: [
          "h-auto! rounded-none px-0! text-royal dark:text-cyan",
          "[--btn-hover-fg:var(--uv-navy)] dark:[--btn-hover-fg:#fff]",
        ],
      },
      size: {
        sm: "h-10 gap-3 px-4.5 text-sm [--knob-inset:0.25rem] [--knob:2rem]",
        default: "h-12 gap-4 px-6 text-[0.9375rem] [--knob-inset:0.375rem] [--knob:2.25rem]",
        lg: "h-14 gap-5 px-8 text-base [--knob-inset:0.375rem] [--knob:2.75rem]",
        icon: "size-12 [&_svg:not([class*='size-'])]:size-5",
        "icon-sm": "size-10 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-14 [&_svg:not([class*='size-'])]:size-6",
      },
      knob: {
        true: "pr-(--knob-inset)",
        false: "",
      },
    },
    compoundVariants: [
      { knob: true, size: "sm", className: "pl-4.5" },
      { knob: true, size: "default", className: "pl-6" },
      { knob: true, size: "lg", className: "pl-7" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      knob: false,
    },
  }
)

const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]"

/** The long-shaft arrow from the current utilityvalet.io buttons, redrawn to inherit colour. */
function ValetArrow({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 27 15" fill="none" stroke="currentColor" strokeWidth="2" className={cn("h-auto w-[1.15em]", className)} {...props}>
      <path d="M18.92.71l6.66 6.66-6.66 6.66" />
      <path d="M25.58 7.37H0" />
    </svg>
  )
}

/** Two arrows: on hover the first exits right while the second slides in from the left. */
function ArrowSwap({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex items-center justify-center overflow-hidden", className)}>
      <ValetArrow className={cn("transition-transform duration-500 group-hover/button:translate-x-[220%] motion-reduce:transition-none", EASE)} />
      <ValetArrow
        className={cn(
          "absolute -translate-x-[220%] transition-transform duration-500 group-hover/button:translate-x-0 motion-reduce:transition-none",
          EASE
        )}
      />
    </span>
  )
}

function Spinner() {
  return (
    <motion.span
      key="spinner"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-center"
    >
      <Loader2 className="size-[1.1em] animate-spin" aria-hidden />
    </motion.span>
  )
}

type NativeButtonProps = Omit<
  React.ComponentProps<"button">,
  "onClick" | "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
>

type ButtonProps = NativeButtonProps &
  Omit<VariantProps<typeof buttonVariants>, "knob"> & {
    asChild?: boolean
    /** `"arrow"` for the animated brand arrow, any node for a custom knob icon. */
    icon?: React.ReactNode | "arrow"
    loading?: boolean
    /** Renders an anchor instead of a button. */
    href?: string
    onClick?: React.MouseEventHandler<HTMLElement>
  }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  icon,
  loading = false,
  href,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion()
  const isIconOnly = size?.startsWith("icon") ?? false
  const isLink = variant === "link"
  const hasKnob = Boolean(icon) && !isIconOnly && !isLink
  const iconNode = icon === "arrow" ? <ArrowSwap /> : icon

  const classes = cn(buttonVariants({ variant, size, knob: hasKnob }), className)
  const shared = {
    "data-slot": "button",
    "data-variant": variant,
    "data-size": size,
    "aria-busy": loading || undefined,
    "aria-disabled": loading || undefined,
    onClick: loading ? undefined : onClick,
  }

  const flood = isLink ? null : hasKnob ? (
    // Starts as the knob, scales up to cover the button.
    <span
      aria-hidden
      className={cn(
        "absolute top-1/2 right-(--knob-inset) -z-10 size-(--knob) -translate-y-1/2 rounded-full bg-(--btn-flood)",
        "transition-transform duration-[650ms] group-hover/button:scale-[18] group-focus-visible/button:scale-[18] motion-reduce:transition-none",
        EASE
      )}
    />
  ) : (
    // No knob: a circle grows from the centre.
    <span
      aria-hidden
      className={cn(
        "absolute top-1/2 left-1/2 -z-10 aspect-square w-[125%] min-w-[125%] -translate-1/2 scale-0 rounded-full bg-(--btn-flood)",
        "transition-transform duration-[650ms] group-hover/button:scale-100 group-focus-visible/button:scale-100 motion-reduce:transition-none",
        isIconOnly && "w-[150%]",
        EASE
      )}
    />
  )

  const label = isLink ? (
    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1.5px] bg-[position:0_100%] bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover/button:bg-[length:100%_1.5px] motion-reduce:transition-none">
      {children}
    </span>
  ) : (
    <span className={cn("relative inline-flex items-center gap-2 transition-opacity", loading && !hasKnob && "opacity-0")}>
      {children}
    </span>
  )

  const knob = hasKnob ? (
    <span
      aria-hidden
      className="relative flex size-(--knob) items-center justify-center rounded-full bg-(--btn-knob) text-(--btn-knob-fg) [&_svg:not([class*='size-']):not([class*='w-'])]:size-[1.1em]"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {loading ? (
          <Spinner />
        ) : (
          <motion.span key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center">
            {iconNode}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  ) : isLink && iconNode ? (
    <span aria-hidden className="-ml-2 inline-flex">
      {iconNode}
    </span>
  ) : null

  const overlaySpinner = loading && !hasKnob ? <span className="absolute inset-0 flex items-center justify-center"><Spinner /></span> : null

  if (asChild) {
    // Slot can't be a motion component, so press feedback falls back to CSS.
    return (
      <Slot.Root className={cn(classes, "transition-[color,box-shadow,scale] active:scale-[0.97]")} {...shared} {...props}>
        {flood}
        <Slot.Slottable>{children}</Slot.Slottable>
        {knob}
      </Slot.Root>
    )
  }

  const press = reduceMotion || isLink ? undefined : { scale: 0.96 }
  const spring = { type: "spring", stiffness: 520, damping: 30, mass: 0.7 } as const
  const content = (
    <>
      {flood}
      {label}
      {knob}
      {overlaySpinner}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={loading ? undefined : href}
        className={classes}
        whileTap={press}
        transition={spring}
        {...shared}
        {...(props as React.ComponentProps<typeof motion.a>)}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type="button"
      className={classes}
      whileTap={press}
      transition={spring}
      {...shared}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {content}
    </motion.button>
  )
}

export { Button, buttonVariants, ValetArrow, type ButtonProps }
