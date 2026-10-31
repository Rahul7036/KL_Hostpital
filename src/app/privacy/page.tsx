import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles information shared through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ivory-50">
      <div className="container-x max-w-3xl py-10">
        <Link href="/" aria-label="Back to home">
          <Logo />
        </Link>
        <Link href="/" className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 hover:text-teal-950">
          <ArrowLeft className="size-4" aria-hidden /> Back to home
        </Link>
        <h1 className="mt-6 text-4xl font-semibold text-teal-950 sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 rounded-xl border border-dashed border-gold-400/60 bg-gold-200/30 px-4 py-3 text-sm text-teal-900">
          Draft for review: this policy must be reviewed and approved by the hospital before the website is published.
        </p>
        <div className="mt-10 space-y-8 text-[16.5px] leading-relaxed text-muted [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-teal-950">
          <section>
            <h2>Information we collect</h2>
            <p>
              This website does not store personal information. When you use the appointment form, the details you enter
              (name, mobile number, department, preferred doctor, date and message) are used only to prepare a WhatsApp
              message on your own device. Nothing is sent until you press send in WhatsApp.
            </p>
          </section>
          <section>
            <h2>How your information is used</h2>
            <p>
              Messages you send to us through WhatsApp or phone are used only to respond to your enquiry and to arrange your
              appointment. We do not sell or share your information with third parties for marketing.
            </p>
          </section>
          <section>
            <h2>Third-party services</h2>
            <p>
              This website uses Google Maps to show our location and links to WhatsApp and Instagram. These services have
              their own privacy policies, which apply when you use them.
            </p>
          </section>
          <section>
            <h2>Medical disclaimer</h2>
            <p>
              Information on this website is for general awareness and is not a substitute for professional medical
              advice. In an emergency, please visit the nearest emergency department.
            </p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>
              For any questions about this policy, call us on{" "}
              <a href={`tel:${site.phone.tel}`} className="font-semibold text-teal-800">
                {site.phone.display}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
