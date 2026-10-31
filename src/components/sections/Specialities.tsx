"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { specialities, type Speciality } from "@/content/site";
import { cn } from "@/lib/cn";
import { requestAppointment } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { SampleBadge, ToConfirm } from "@/components/ui/Markers";

const themes = {
  dermatology: { panel: "bg-ivory-200/70", dark: false },
  hair: { panel: "bg-mint-100", dark: false },
  paediatrics: { panel: "bg-teal-900", dark: true },
} as const;

function SpecialityBlock({ s, flip }: { s: Speciality; flip: boolean }) {
  const [open, setOpen] = useState(false);
  const { panel, dark } = themes[s.id];
  const anyUnconfirmed = s.services.some((x) => !x.confirmed);

  return (
    <Reveal>
      <article
        id={`speciality-${s.id}`}
        aria-labelledby={`${s.id}-title`}
        className={cn("grain overflow-hidden rounded-[32px]", panel)}
      >
        <div className={cn("grid lg:grid-cols-2", flip && "lg:[&>*:first-child]:order-2")}>
          <div className="relative min-h-[300px] overflow-hidden sm:min-h-[380px] lg:min-h-[560px]">
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.6s] ease-out-soft hover:scale-[1.04]"
            />
            <SampleBadge />
            <span
              aria-hidden
              className="absolute bottom-5 left-6 font-serif text-[88px] italic leading-none text-white/90 drop-shadow-sm sm:text-[120px]"
            >
              {s.index}
            </span>
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
            <p className={cn("text-[12px] font-semibold uppercase tracking-[0.18em]", dark ? "text-gold-400" : "text-gold-500")}>
              {s.kicker}
            </p>
            <h3
              id={`${s.id}-title`}
              className={cn("mt-3 text-3xl font-semibold leading-tight sm:text-[2.6rem]", dark ? "text-ivory-50" : "text-teal-950")}
            >
              {s.title}
            </h3>
            <p className={cn("mt-5 text-[17px] leading-relaxed", dark ? "text-mint-100/75" : "text-muted")}>{s.intro}</p>

            <div className="mt-8 flex items-center">
              <p className={cn("text-[12px] font-semibold uppercase tracking-[0.14em]", dark ? "text-mint-200/70" : "text-teal-800/70")}>
                Consultations for
              </p>
              <ToConfirm show={anyUnconfirmed} />
            </div>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {s.services.map((item) => (
                <li key={item.value} className={cn("flex items-start gap-3 text-[15px]", dark ? "text-ivory-50" : "text-teal-950")}>
                  <span
                    className={cn(
                      "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                      dark ? "bg-mint-200/15 text-mint-200" : "bg-white text-teal-700 shadow-soft",
                    )}
                  >
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  {item.value}
                </li>
              ))}
            </ul>

            <AnimatePresence initial={false}>
              {open && (
                <motion.p
                  id={`${s.id}-more`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={cn("overflow-hidden text-[15.5px] leading-relaxed", dark ? "text-mint-100/75" : "text-muted")}
                >
                  <span className="block pt-6">{s.more}</span>
                </motion.p>
              )}
            </AnimatePresence>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button variant={dark ? "light" : "primary"} onClick={() => requestAppointment({ department: s.id })}>
                Book a consultation
              </Button>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={`${s.id}-more`}
                className={cn(
                  "inline-flex h-12 items-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors",
                  dark ? "text-ivory-50 hover:bg-white/10" : "text-teal-900 hover:bg-white/70",
                )}
              >
                <Plus className={cn("size-4 transition-transform duration-300", open && "rotate-45")} aria-hidden />
                {open ? "Show less" : "Learn more"}
              </button>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Specialities() {
  return (
    <section id="specialities" aria-labelledby="specialities-heading" className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Medical specialities"
            title={
              <span id="specialities-heading">
                Focused expertise for <Accent className="text-teal-700">skin, hair</Accent> and{" "}
                <Accent className="text-teal-700">children.</Accent>
              </span>
            }
          />
          <Reveal delay={0.1} className="max-w-sm">
            <p className="text-[16px] leading-relaxed text-muted">
              Three areas of care, one approach: careful diagnosis and clear explanations before any treatment.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:mt-20 sm:gap-8">
          {specialities.map((s, i) => (
            <SpecialityBlock key={s.id} s={s} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
