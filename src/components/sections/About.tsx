import Image from "next/image";
import { HeartHandshake, ShieldCheck, Smile } from "lucide-react";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { Accent, Eyebrow } from "@/components/ui/SectionHeading";
import { SampleBadge } from "@/components/ui/Markers";

const pillars = [
  {
    icon: HeartHandshake,
    title: "Patient-first",
    body: "Unhurried consultations where every question is welcome and every plan is explained.",
  },
  {
    icon: ShieldCheck,
    title: "Specialist skin care",
    body: "Dermatology led by a doctor with an MD in Dermatology, Venereology & Leprosy.",
  },
  {
    icon: Smile,
    title: "Made for children",
    body: "Paediatric care that is gentle with little ones and reassuring for parents.",
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative order-2 lg:order-1 lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-soft lg:aspect-[4/5]">
            <Image
              src="/images/stock/hands.jpg"
              alt="Hands held together in reassurance"
              fill
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="object-cover"
            />
            <SampleBadge className="right-3 top-3" />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden w-[46%] overflow-hidden rounded-[22px] border-[6px] border-ivory-50 shadow-lift sm:block lg:-right-10">
            <div className="relative aspect-square">
              <Image src="/images/stock/stethoscope.jpg" alt="" fill sizes="240px" className="object-cover" />
            </div>
          </div>
          <div className="absolute -left-4 top-8 hidden rounded-2xl bg-teal-900 px-5 py-4 text-ivory-50 shadow-lift sm:block lg:-left-8">
            <p className="font-serif text-3xl italic leading-none">2</p>
            <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-mint-200/80">Specialities, one roof</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <Reveal>
            <Eyebrow>About the hospital</Eyebrow>
            <h2 id="about-title" className="mt-5 text-[2.1rem] font-semibold leading-[1.08] text-teal-950 sm:text-5xl">
              Care that begins <br className="hidden sm:block" />
              with <Accent className="text-teal-700">listening.</Accent>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-muted">
              KL Skin &amp; Children&apos;s Hospital is a specialised dermatology and paediatric hospital in
              Jadcherla. We bring skin, hair and children&apos;s healthcare together under one roof, so families
              can find trusted specialist care close to home.
            </p>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">
              Whether it is a persistent skin concern, worries about hair fall or your child&apos;s fever at night,
              our focus is the same: listen carefully, examine thoroughly and explain clearly.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-8 border-t border-line pt-10 sm:grid-cols-3 sm:gap-6">
            {pillars.map((p, i) => (
              <RevealItem key={p.title} delay={0.1 + i * 0.08}>
                  <span className="grid size-11 place-items-center rounded-xl bg-mint-100 text-teal-800">
                    <p.icon className="size-5" aria-hidden strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-[17px] font-bold text-teal-950">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
              </RevealItem>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
