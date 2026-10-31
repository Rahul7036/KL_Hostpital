import { Quote, Star } from "lucide-react";
import { showPlaceholders, site, testimonials } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Shows only genuine, consented reviews from `testimonials` in content/site.ts.
 * Until those exist, it shows clearly labelled placeholder slots (demo mode) or
 * a simple invitation to read public reviews (production).
 */
export function Testimonials() {
  const hasReviews = testimonials.length > 0;
  if (!hasReviews && !showPlaceholders) return <ReviewInvite />;

  const slots = hasReviews
    ? testimonials
    : Array.from({ length: 3 }, (_, i) => ({
        quote: "Space reserved for a genuine patient review, published only with the patient's consent.",
        name: `Review slot ${i + 1}`,
        context: "Awaiting verified review",
      }));

  return (
    <section aria-labelledby="reviews-heading" className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Patient stories"
            title={
              <span id="reviews-heading">
                Words from the families <Accent className="text-teal-700">we care for.</Accent>
              </span>
            }
          />
          <ReviewLinks />
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {slots.map((t, i) => (
            <RevealItem key={t.name} delay={i * 0.08} className="h-full">
              <figure
                className={
                  hasReviews
                    ? "flex h-full flex-col rounded-[24px] border border-line bg-ivory-50 p-8"
                    : "flex h-full flex-col rounded-[24px] border border-dashed border-gold-400/60 bg-ivory-50/60 p-8"
                }
              >
                <Quote className="size-8 text-gold-400" aria-hidden />
                <blockquote className={hasReviews ? "mt-5 text-[17px] leading-relaxed text-teal-950" : "mt-5 text-[16px] italic leading-relaxed text-muted"}>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-8">
                  <span className="grid size-10 place-items-center rounded-full bg-mint-100 font-display text-sm font-bold text-teal-800">
                    {t.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-teal-950">{t.name}</span>
                    <span className="block text-[13px] text-muted">{t.context}</span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ReviewLinks() {
  return (
    <Reveal delay={0.1} className="flex flex-wrap gap-3">
      <ButtonLink href={site.maps.directions} target="_blank" rel="noopener noreferrer" variant="secondary" icon={<Star className="size-4" aria-hidden />}>
        Google reviews
      </ButtonLink>
      <ButtonLink href={site.social.justdial} target="_blank" rel="noopener noreferrer" variant="secondary">
        Justdial
      </ButtonLink>
    </Reveal>
  );
}

function ReviewInvite() {
  return (
    <section aria-labelledby="reviews-heading" className="bg-white py-20">
      <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <h2 id="reviews-heading" className="text-3xl font-semibold text-teal-950">
          Read what patients say about us
        </h2>
        <ReviewLinks />
      </div>
    </section>
  );
}
