import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { navLinks, site, specialities } from "@/content/site";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative overflow-hidden bg-teal-950 pb-28 pt-20 text-mint-100/70 lg:pb-10">
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end">
          <p className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ivory-50 sm:text-[2.6rem]">
            Expert care for healthier lives and{" "}
            <em className="font-serif font-normal italic tracking-normal text-gold-400">happier families.</em>
          </p>
          <a
            href="#appointment"
            className="inline-flex h-14 items-center justify-center rounded-full bg-gold-400 px-8 font-semibold text-teal-950 transition hover:bg-gold-200"
          >
            Book an Appointment
          </a>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed">
              {site.tagline} in Jadcherla, Mahabubnagar, Telangana.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KL Hospital on Instagram"
                className="grid size-11 place-items-center rounded-full ring-1 ring-white/15 transition hover:bg-white/10 hover:text-ivory-50"
              >
                <InstagramIcon className="size-[18px]" />
              </a>
              <a
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="grid size-11 place-items-center rounded-full ring-1 ring-white/15 transition hover:bg-white/10 hover:text-ivory-50"
              >
                <WhatsAppIcon className="size-[18px]" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory-50">Quick links</h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-ivory-50">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory-50">Specialities</h2>
            <ul className="mt-5 space-y-3 text-[15px]">
              {specialities.map((s) => (
                <li key={s.id}>
                  <a href={`#speciality-${s.id}`} className="transition hover:text-ivory-50">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ivory-50">Contact</h2>
            <ul className="mt-5 space-y-4 text-[15px]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                <span>
                  {site.address.line1}, {site.address.line2}, {site.address.city} {site.address.postalCode}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                <a href={`tel:${site.phone.tel}`} className="transition hover:text-ivory-50">
                  {site.phone.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition hover:text-ivory-50">
              Privacy Policy
            </Link>
            <span className="text-mint-100/40">Information on this site is not a substitute for medical advice.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
