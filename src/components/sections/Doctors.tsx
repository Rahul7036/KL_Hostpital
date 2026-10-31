"use client";

import Image from "next/image";
import { CalendarClock, GraduationCap, Stethoscope } from "lucide-react";
import { doctors, showPlaceholders, type Doctor } from "@/content/site";
import { requestAppointment } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { ToConfirm } from "@/components/ui/Markers";

function Portrait({ doctor }: { doctor: Doctor }) {
  if (doctor.photo) {
    return (
      <Image
        src={doctor.photo}
        alt={`Portrait of ${doctor.name}`}
        fill
        sizes="(min-width: 768px) 280px, 100vw"
        className="object-cover object-top"
      />
    );
  }
  // Elegant monogram until a real, approved photograph is supplied
  return (
    <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-mint-100 via-mint-50 to-ivory-200">
      <svg aria-hidden viewBox="0 0 200 200" className="absolute inset-0 size-full text-teal-800/10" fill="none">
        {[90, 70, 50].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} stroke="currentColor" />
        ))}
      </svg>
      <span className="relative font-serif text-[88px] italic leading-none text-teal-800">{doctor.initials}</span>
      {showPlaceholders && (
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-muted backdrop-blur">
          Photograph to be supplied
        </span>
      )}
    </div>
  );
}

function DoctorCard({ doctor, delay }: { doctor: Doctor; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group grid h-full overflow-hidden rounded-[28px] border border-line bg-white shadow-soft transition-shadow duration-500 hover:shadow-lift md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:grid-cols-1 xl:grid-rows-[auto_1fr]">
        <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[400px] xl:aspect-[16/9] xl:min-h-0">
          <Portrait doctor={doctor} />
        </div>
        <div className="flex flex-col p-7 sm:p-9">
          <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-gold-500">
            <Stethoscope className="size-3.5" aria-hidden /> {doctor.speciality}
          </p>
          <h3 className="mt-3 text-[1.85rem] font-semibold leading-tight text-teal-950">
            {doctor.name}
            <ToConfirm show={!doctor.nameConfirmed} />
          </h3>
          <p className="mt-2 inline-flex items-center gap-2 text-[15px] font-medium text-teal-800">
            <GraduationCap className="size-4" aria-hidden />
            {doctor.qualifications.value}
            <ToConfirm show={!doctor.qualifications.confirmed && !doctor.qualifications.value.includes("confirmed")} className="ml-0" />
          </p>
          <p className="mt-5 text-[15.5px] leading-relaxed text-muted">
            {doctor.bio.value}
            <ToConfirm show={!doctor.bio.confirmed} />
          </p>
          <div className="mt-6 flex items-center gap-3 rounded-2xl bg-ivory-100 px-4 py-3 text-[14px] text-teal-900">
            <CalendarClock className="size-4 shrink-0 text-teal-700" aria-hidden />
            <span>{doctor.availability.value}</span>
          </div>
          <div className="mt-auto pt-8">
            <Button
              className="w-full sm:w-auto"
              onClick={() => requestAppointment({ department: doctor.departments[0], doctor: doctor.id })}
            >
              Book with {doctor.name}
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Doctors() {
  return (
    <section id="doctors" aria-labelledby="doctors-heading" className="bg-ivory-100 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Meet our doctors"
          title={
            <span id="doctors-heading">
              Specialists who treat you <Accent className="text-teal-700">like family.</Accent>
            </span>
          }
          lead="Consultations are with qualified specialists who take the time to understand you, your skin and your child."
        />
        <div className="mt-14 grid gap-6 xl:grid-cols-2">
          {doctors.map((d, i) => (
            <DoctorCard key={d.id} doctor={d} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
