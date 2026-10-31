import { doctors, site } from "@/content/site";

/**
 * schema.org JSON-LD for local SEO.
 *
 * Deliberately NOT rendered until the hospital has confirmed its legal name,
 * address, phone and opening hours. Set `structuredDataEnabled` to true once
 * every field in `site.ts` used below is marked `confirmed: true`.
 */
const structuredDataEnabled = false;

export function StructuredData() {
  if (!structuredDataEnabled) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: site.name,
    url: site.url,
    telephone: site.phone.tel,
    medicalSpecialty: ["Dermatology", "Pediatric"],
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    },
    areaServed: ["Jadcherla", "Mahabubnagar"],
    sameAs: [site.social.instagram.url],
    employee: doctors
      .filter((d) => d.nameConfirmed && d.qualifications.confirmed)
      .map((d) => ({ "@type": "Physician", name: d.name, medicalSpecialty: d.speciality })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
