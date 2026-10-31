import { Clock, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { ToConfirm } from "@/components/ui/Markers";

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 border-t border-line py-6 first:border-t-0 first:pt-0">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint-100 text-teal-800">{icon}</span>
      <div className="min-w-0">
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
        <div className="mt-1.5 text-[16px] leading-relaxed text-teal-950">{children}</div>
      </div>
    </div>
  );
}

export function Contact() {
  const { address } = site;
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Location & contact"
          title={
            <span id="contact-heading">
              Visit us in <Accent className="text-teal-700">Jadcherla.</Accent>
            </span>
          }
          lead="Easy to reach from across Jadcherla and the Mahabubnagar district."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="rounded-[28px] border border-line bg-ivory-50 p-7 sm:p-10 lg:col-span-5">
            <address className="not-italic">
              <Row icon={<MapPin className="size-5" aria-hidden />} label="Address">
                <span className="font-semibold">{site.name}</span>
                <br />
                {address.line1}, {address.line2},
                <br />
                {address.city}, {address.district} Dist., {address.state} {address.postalCode}
                <ToConfirm show={!address.confirmed} />
              </Row>
              <Row icon={<Phone className="size-5" aria-hidden />} label="Phone">
                <a href={`tel:${site.phone.tel}`} className="font-semibold underline-offset-4 hover:underline">
                  {site.phone.display}
                </a>
                <ToConfirm show={!site.phone.confirmed} />
              </Row>
              <Row icon={<Clock className="size-5" aria-hidden />} label="Opening hours">
                <dl className="grid gap-1">
                  {site.hours.rows.map((h) => (
                    <div key={h.days} className="flex flex-wrap justify-between gap-x-6">
                      <dt>{h.days}</dt>
                      <dd className="text-muted">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <ToConfirm show={!site.hours.confirmed} className="ml-0 mt-2" />
              </Row>
            </address>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ButtonLink href={site.maps.directions} target="_blank" rel="noopener noreferrer" icon={<Navigation className="size-4" aria-hidden />}>
                Get directions
              </ButtonLink>
              <ButtonLink
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon={<MessageCircle className="size-4" aria-hidden />}
              >
                WhatsApp us
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative min-h-[380px] overflow-hidden rounded-[28px] border border-line bg-mint-100 lg:col-span-7">
            <iframe
              title={`Map showing ${site.name}, Jadcherla`}
              src={site.maps.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full grayscale-[35%] contrast-[1.05]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
