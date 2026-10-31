# KL Skin & Children's Hospital — Website

Marketing website for **KL Skin & Children's Hospital, Jadcherla** (Mahabubnagar, Telangana).
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons.

> **Status: demo for hospital review.** Several facts still need confirmation from the hospital, and all
> photography is sample stock imagery. See [Before going live](#before-going-live).

---

## Running locally

Requires Node.js 20+.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

Optional environment variables (copy `.env.example` to `.env.local`):

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://klhospital.in` | Canonical URL, Open Graph, sitemap. Set to the real domain. |
| `NEXT_PUBLIC_SHOW_PLACEHOLDERS` | `true` | Shows "To confirm" tags and "Sample photo" badges. Set to `false` at launch. |

---

## Project structure

```
src/
  app/
    layout.tsx            Fonts, global SEO metadata, Open Graph
    page.tsx              Home page (assembles all sections)
    privacy/page.tsx      Privacy policy (draft, needs hospital approval)
    opengraph-image.tsx   Generated social share image
    icon.svg, robots.ts, sitemap.ts
    globals.css           Design tokens (colours, fonts, shadows)
  content/
    site.ts               ALL hospital content: contact, doctors, services, gallery, reviews
  components/
    layout/               Navbar, Footer, FloatingActions (WhatsApp + mobile bar), StructuredData
    sections/             Hero, About, Specialities, Doctors, WhyChooseUs, Gallery,
                          Testimonials, Appointment, Contact
    ui/                   Button, Reveal (scroll animation), SectionHeading, Logo, Markers, BrandIcons
  lib/
    whatsapp.ts           WhatsApp link builder + "Book" button pre-fill event
public/images/stock/      Sample photos (Unsplash licence) — to be replaced
```

**Almost every content change happens in `src/content/site.ts`.** Each unverified fact has a
`confirmed: false` flag; flipping it to `true` removes its "To confirm" tag.

---

## What was verified, and from where

Research done October 2026.

| Fact | Source | Status |
| --- | --- | --- |
| Name "KL skin nd children hospital" | Instagram @klhospital | Verified (site uses "KL Skin & Children's Hospital"; confirm preferred spelling) |
| "Specialized Dermatology and pediatric hospital" | Instagram bio | Verified |
| Dr. M. Naresh — MBBS, MD (DVL) | Instagram bio | Verified |
| Dr. Laxmi — paediatrics | Client brief only | **Unverified**: full name & qualifications needed |
| Address (Road No. 5, Vijaya Nagar Colony, opp. Pooja Enterprises) | Client brief / Justdial URL | **Unverified**: Justdial blocked automated access |
| Phone +91 93924 64811 | Client brief | **Unverified**: also assumed to be the WhatsApp number |
| Opening hours, services, facilities, reviews | — | **Not found**: placeholders shown |

Note: a web search also returned a separate Justdial listing, *"KL Eye Dental Skin Hospital"*, near the New Bus
Stand in Jadcherla. Please confirm whether it is related, so that listings are not mixed up.

---

## Before going live

### 1. Contact details — `src/content/site.ts → site`
- `phone`: confirm number, then set `confirmed: true`.
- `whatsapp.number`: digits only with country code (e.g. `919392464811`). Must be a WhatsApp-enabled number.
- `address`: confirm each line and PIN code, then set `confirmed: true`.
- `hours.rows`: enter real timings, then set `hours.confirmed: true`.
- `maps.embed` / `maps.directions`: ideally replace with the hospital's own Google Business Profile link
  (Google Maps → Share → *Embed a map* for `embed`; *Copy link* for `directions`).

### 2. Doctors — `doctors`
For each doctor: confirm full name (`nameConfirmed`), `qualifications`, `bio`, and `availability`.
To add a photo, put it in `public/images/doctors/` (portrait, ≥ 900px tall) and set
`photo: "/images/doctors/naresh.jpg"`. **Only use photographs the doctor has approved.**

### 3. Services — `specialities[].services`
Each listed consultation area is marked `confirmed: false`. Remove anything the hospital does not offer, add
confirmed procedures, then mark them `confirmed: true`. Do not list procedures that the hospital has not confirmed.

### 4. Photography — replace every sample photo
All images in `public/images/stock/` are licensed Unsplash stock photos that **do not show this hospital**.
They carry a visible "Sample photo" badge while placeholders are enabled. Replace them with real photographs
(Instagram posts can be used **with the hospital's permission**; ask for the original high-resolution files):

| Where | File / setting | Suggested real photo |
| --- | --- | --- |
| Hero | `Hero.tsx` (`child-joy.jpg`, `skin-ritual.jpg`) | Doctor with a young patient, or hospital exterior |
| About | `About.tsx` (`hands.jpg`, `stethoscope.jpg`) | Reception / consultation room |
| Specialities | `specialities[].image` | Skin clinic, hair consultation, kids' area |
| Why choose us | `WhyChooseUs.tsx` (`lounge.jpg`) | Waiting area |
| Gallery | `gallery[]` | Exterior, reception, rooms, staff, events. Set `sample: false` |

Gallery tips: `span: "wide"` and `span: "tall"` control tile size. Keep the grid balanced (wide/tall count as
2 cells, normal as 1; aim for a total divisible by 4).

### 5. Testimonials — `testimonials`
Leave the array empty until you have genuine reviews **with the patient's written consent**.
Then add `{ quote, name, context }` entries (e.g. first name + "Parent of a patient").
With placeholders off and no reviews, the section collapses into links to Google and Justdial reviews.

### 6. Logo — `src/components/ui/Logo.tsx` and `src/app/icon.svg`
The current monogram is an interim mark. Replace the SVG with the official logo when supplied.

### 7. Structured data — `src/components/layout/StructuredData.tsx`
schema.org `Hospital` JSON-LD is prepared but **disabled**. Enable it (`structuredDataEnabled = true`) only
once the legal name, address, phone and hours are confirmed.

### 8. Final switch
- Review and approve the privacy policy (`src/app/privacy/page.tsx`).
- Set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false` and `NEXT_PUBLIC_SITE_URL` to the real domain.
- `npm run build` and deploy (Vercel or any Node host).

---

## Appointment flow

The form validates name, a 10-digit Indian mobile number and department, then opens WhatsApp
(`wa.me`) with a pre-filled message to the hospital. **Nothing is stored on the website**, and the UI
explicitly says that the appointment is only confirmed when the hospital replies. "Book" buttons on the
speciality and doctor sections pre-select the matching department/doctor.

## Accessibility & performance notes
- Semantic landmarks, skip link, labelled form fields with inline errors, keyboard-navigable lightbox
  (Esc / ← / →, swipe on touch), visible focus rings.
- Animations respect `prefers-reduced-motion`.
- Images are served via `next/image` (AVIF/WebP, responsive sizes, lazy loading; hero preloaded).
- Map iframe is lazy-loaded.
