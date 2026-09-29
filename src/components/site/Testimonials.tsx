import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
import { REVIEW_COUNT, REVIEWS_URL, reviews, videoStories, type Review } from "@/data/testimonials"
import { cn } from "@/lib/utils"

const CLAMP_AT = 230 // characters before "Read more" appears

function useSelected(api: CarouselApi | undefined) {
  const [selected, setSelected] = useState(0)
  useEffect(() => {
    if (!api) return
    const update = () => setSelected(api.selectedScrollSnap())
    update()
    api.on("select", update).on("reInit", update)
    return () => {
      api.off("select", update).off("reInit", update)
    }
  }, [api])
  return selected
}

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#f5a524]" aria-label="5 out of 5 stars" role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-4 fill-current" aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, active }: { review: Review; active: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const long = review.quote.length > CLAMP_AT
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-3xl p-7 transition-all duration-500 md:p-9",
        active ? "bg-ice shadow-[0_30px_60px_-30px_rgb(14_109_249/0.35)]" : "bg-mist md:scale-[0.94] md:opacity-70"
      )}
    >
      <div className="flex items-center justify-between">
        <img src="/brand/icons/quote.svg" alt="" className="h-7 w-auto" />
        <Stars />
      </div>
      <blockquote className="mt-6 flex-1">
        <p className={cn("font-heading text-[1.0625rem] leading-snug text-navy md:text-lg", !expanded && long && "line-clamp-6")}>
          {review.quote}
        </p>
        {long && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-2 text-sm font-semibold text-royal underline-offset-4 hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-navy/10 pt-5">
        <span className="flex size-10 items-center justify-center rounded-full bg-white font-heading text-sm text-royal">
          {review.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </span>
        <span>
          <span className="block font-semibold text-navy">{review.name}</span>
          <span className="block text-sm text-muted-foreground">{review.state}</span>
        </span>
      </figcaption>
    </figure>
  )
}

function Controls({ api, label }: { api: CarouselApi | undefined; label: string }) {
  return (
    <div className="flex gap-3">
      <Button variant="outline" size="icon" onClick={() => api?.scrollPrev()} aria-label={`Previous ${label}`}>
        <ArrowLeft />
      </Button>
      <Button variant="outline" size="icon" onClick={() => api?.scrollNext()} aria-label={`Next ${label}`}>
        <ArrowRight />
      </Button>
    </div>
  )
}

function VideoStories() {
  const [api, setApi] = useState<CarouselApi>()
  const selected = useSelected(api)
  const [playing, setPlaying] = useState<number | null>(null)

  // Stop playback when the viewer moves to another story.
  useEffect(() => setPlaying(null), [selected])

  return (
    <div className="mt-20 md:mt-28">
      <div className="mx-auto flex max-w-site flex-wrap items-end justify-between gap-6 px-5 lg:px-8">
        <div>
          <p className="mb-3 font-heading text-xs font-medium tracking-widest text-royal uppercase">#RealLifeStories</p>
          <h3 className="mb-0 text-2xl! md:text-3xl!">Hear it from residents</h3>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
            {selected + 1} / {videoStories.length}
          </p>
          <Controls api={api} label="video" />
        </div>
      </div>

      <Carousel setApi={setApi} opts={{ loop: true, align: "center" }} className="mt-10" aria-label="Resident video stories">
        <CarouselContent className="-ml-4 md:-ml-6">
          {videoStories.map((story, i) => (
            <CarouselItem key={story.src} className="basis-[88%] pl-4 md:basis-[68%] md:pl-6 xl:basis-[58%]">
              <div
                className={cn(
                  "relative aspect-video overflow-hidden rounded-3xl bg-navy transition-opacity duration-500",
                  i !== selected && "opacity-50"
                )}
              >
                {playing === i ? (
                  <video
                    src={story.src}
                    poster={story.poster}
                    controls
                    autoPlay
                    playsInline
                    className="absolute inset-0 size-full bg-black object-contain"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      api?.scrollTo(i)
                      setPlaying(i)
                    }}
                    className="group absolute inset-0 focus-visible:outline-none"
                    aria-label={`Play ${story.name}'s story`}
                  >
                    <img src={story.poster} alt="" className="size-full object-cover" loading="lazy" />
                    <span className="absolute inset-0 bg-navy/10 transition-colors group-hover:bg-navy/0" />
                    <span className="absolute top-1/2 left-1/2 flex size-16 -translate-1/2 items-center justify-center rounded-full bg-cyan text-navy shadow-[0_0_0_10px_rgb(44_204_251/0.25)] transition-transform duration-300 group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-white md:size-20">
                      <Play className="ml-1 size-7 fill-current" />
                    </span>
                  </button>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>()
  const selected = useSelected(api)

  return (
    <section className="overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-site px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 font-heading text-xs font-medium tracking-widest text-royal uppercase">Testimonials</p>
          <h2 className="mb-4">Here’s what our residents say</h2>
          <p className="mb-0 text-lg text-muted-foreground">
            Over <span className="font-semibold text-navy">{REVIEW_COUNT} reviews</span> from residents across the country.
          </p>
        </div>
      </div>

      <Carousel setApi={setApi} opts={{ loop: true, align: "center" }} className="mt-12 md:mt-16" aria-label="Resident reviews">
        <CarouselContent className="-ml-4 items-stretch py-4 md:-ml-6">
          {reviews.map((review, i) => (
            <CarouselItem key={review.name} className="basis-[86%] pl-4 sm:basis-1/2 md:pl-6 lg:basis-[36%] xl:basis-[30%]">
              <ReviewCard review={review} active={i === selected} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-8 flex items-center justify-center gap-5">
        <Controls api={api} label="review" />
        <p className="w-14 text-sm text-muted-foreground tabular-nums" aria-live="polite">
          {selected + 1} / {reviews.length}
        </p>
      </div>

      <div className="mt-8 flex justify-center">
        <Button href={REVIEWS_URL} target="_blank" rel="noopener noreferrer" variant="outline" icon="arrow">
          Read all {REVIEW_COUNT} reviews
        </Button>
      </div>

      <VideoStories />
    </section>
  )
}
