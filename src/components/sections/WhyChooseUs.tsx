import Image from "next/image";
import { Building2, HeartPulse, MapPinned, MessagesSquare, Sofa, UsersRound } from "lucide-react";
import { reasons } from "@/content/site";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { SampleBadge, ToConfirm } from "@/components/ui/Markers";

const icons = [UsersRound, HeartPulse, MessagesSquare, Sofa, MapPinned, Building2];

export function WhyChooseUs() {
  return (
    <section
      id="facilities"
      aria-labelledby="why-heading"
      className="grain relative overflow-hidden bg-teal-950 py-24 text-ivory-50 sm:py-32"
    >
      <div aria-hidden className="absolute -right-48 top-0 size-[640px] rounded-full bg-teal-700/30 blur-3xl" />
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="light"
            eyebrow="Why families choose us"
            title={
              <span id="why-heading">
                Thoughtful care, <Accent className="text-gold-400">close to home.</Accent>
              </span>
            }
            lead="A specialist hospital built around the way families actually need care: calm, clear and convenient."
          />
          <Reveal delay={0.15} className="relative mt-12 hidden aspect-[5/4] overflow-hidden rounded-[28px] lg:block">
            <Image
              src="/images/stock/lounge.jpg"
              alt="Calm, plant-filled waiting space"
              fill
              sizes="40vw"
              className="object-cover"
            />
            <SampleBadge />
          </Reveal>
        </div>

        <ol className="grid content-start sm:grid-cols-2 lg:col-span-7">
          {reasons.map((r, i) => {
            const Icon = icons[i];
            return (
              <RevealItem key={r.title} delay={(i % 2) * 0.08} className="border-t border-white/10 py-8 sm:pr-8 sm:[&:nth-child(even)]:pl-8 sm:[&:nth-child(even)]:border-l">
                  <div className="flex items-center gap-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-white/[0.06] text-gold-400 ring-1 ring-inset ring-white/10">
                      <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                    </span>
                    <span className="font-serif text-xl italic text-mint-300/60">0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">
                    {r.title}
                    <ToConfirm show={!r.confirmed} />
                  </h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-mint-100/65">{r.body}</p>
              </RevealItem>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
