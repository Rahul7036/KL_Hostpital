"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, Baby, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";
import { doctors, specialities } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { SampleBadge } from "@/components/ui/Markers";

const lead = doctors[0];

const ease = [0.22, 1, 0.36, 1] as const;

const headline: { text: string; accent?: boolean }[][] = [
  [{ text: "Expert" }, { text: "Care." }],
  [{ text: "Healthier" }, { text: "Lives." }],
  [{ text: "Happier", accent: true }, { text: "Families.", accent: true }],
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.06]);

  let wordIndex = 0;

  return (
    <section
      id="home"
      ref={ref}
      aria-labelledby="hero-title"
      className="grain relative isolate overflow-hidden bg-ivory-100 pt-[84px]"
    >
      {/* Decorative backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 size-[720px] rounded-full bg-mint-200/60 blur-3xl" />
        <div className="absolute -bottom-60 left-[-10%] size-[520px] rounded-full bg-gold-200/40 blur-3xl" />
        <svg className="absolute right-[-8%] top-[12%] hidden h-[820px] w-[820px] text-teal-800/[0.07] lg:block" viewBox="0 0 800 800" fill="none">
          {[390, 320, 250].map((r) => (
            <circle key={r} cx="400" cy="400" r={r} stroke="currentColor" strokeWidth="1" />
          ))}
        </svg>
      </div>

      <div className="container-x grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:min-h-[calc(100svh-84px)] lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-8">
        {/* Copy */}
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-900/10 bg-white/60 py-1.5 pl-1.5 pr-4 text-[13px] font-medium text-teal-900 backdrop-blur"
          >
            <span className="grid size-6 place-items-center rounded-full bg-teal-800 text-ivory-50">
              <MapPin className="size-3.5" aria-hidden />
            </span>
            Jadcherla · Dermatology &amp; Paediatrics
          </motion.p>

          <h1
            id="hero-title"
            className="mt-7 text-[2.9rem] font-semibold leading-[1.02] text-teal-950 sm:text-[4.2rem] lg:text-[4rem] xl:text-[4.9rem]"
          >
            {headline.map((line, li) => (
              <span key={li} className="block whitespace-nowrap">
                {line.map((word) => {
                  const i = wordIndex++;
                  return (
                    <span key={word.text} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                      <motion.span
                        className={
                          word.accent
                            ? "inline-block font-serif font-normal italic tracking-normal text-teal-700"
                            : "inline-block"
                        }
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease }}
                      >
                        {word.text}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mt-7 max-w-[30rem] text-[18px] leading-relaxed text-muted sm:text-[19px]"
          >
            Compassionate skin and children&apos;s healthcare for you and your family in Jadcherla.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="#appointment" className="h-14 px-7">
              Book an Appointment
            </ButtonLink>
            <ButtonLink
              href="#specialities"
              variant="secondary"
              className="h-14 px-7"
              icon={<ArrowDownRight className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />}
            >
              Explore Our Services
            </ButtonLink>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-12 hidden max-w-lg grid-cols-3 divide-x divide-teal-900/10 border-t border-teal-900/10 pt-6 sm:grid"
          >
            {specialities.map((s) => (
              <div key={s.id} className="px-4 first:pl-0">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-500">{s.index}</dt>
                <dd className="mt-1.5 text-[14px] font-semibold leading-snug text-teal-950">{s.title}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Visual composition */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[480px] lg:ml-auto lg:mr-0">
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(100% 0 0 0 round 999px 999px 32px 32px)" }}
              animate={{ opacity: 1, clipPath: "inset(0% 0 0 0 round 999px 999px 32px 32px)" }}
              transition={{ duration: 1.3, delay: 0.2, ease }}
              className="relative aspect-[4/5] overflow-hidden rounded-b-[32px] rounded-t-[999px] bg-mint-100 shadow-lift"
            >
              <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-[-6%]">
                <Image
                  src="/images/stock/child-joy.jpg"
                  alt="A happy young child smiling outdoors"
                  fill
                  preload
                  sizes="(min-width: 1024px) 480px, 90vw"
                  className="object-cover object-[50%_35%]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/35 via-transparent to-transparent" />
              <SampleBadge className="bottom-4 right-4" />
            </motion.div>

            {/* Floating child portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease }}
              className="absolute -right-2 top-[8%] sm:-right-8"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative size-28 overflow-hidden rounded-full border-[5px] border-ivory-50 shadow-lift sm:size-36"
              >
                <Image src="/images/stock/skin-ritual.jpg" alt="" fill sizes="144px" className="object-cover" />
              </motion.div>
              <span className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-gold-400 px-3 py-1 text-[11px] font-semibold text-teal-950 shadow-soft">
                <Sparkles className="size-3.5" aria-hidden /> Skin care
              </span>
            </motion.div>

            {/* Doctor credential card — verified from public Instagram bio */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.05, ease }}
              className="absolute -left-3 bottom-[9%] w-[min(290px,78%)] rounded-2xl border border-white/60 bg-white/85 p-4 shadow-lift backdrop-blur-xl sm:-left-12"
            >
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-teal-800 font-display text-sm font-bold text-ivory-50">
                  {lead.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] font-bold text-teal-950">{lead.name}</p>
                  <p className="text-[12.5px] text-muted">{lead.qualifications.value} · Dermatologist</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[12.5px] font-medium text-teal-800">
                <Baby className="size-3.5 text-gold-500" aria-hidden />
                Skin care for adults &amp; children
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
