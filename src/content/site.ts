/**
 * Single source of truth for all hospital content.
 *
 * Every fact that has NOT been confirmed by the hospital carries `confirmed: false`.
 * While placeholders are enabled (see `showPlaceholders`), the UI marks those
 * items with a small "To confirm" tag so nothing unverified is presented as fact.
 *
 * Research sources (October 2026):
 *  - Instagram @klhospital bio: "KL skin nd children hospital · Specialized Dermatology
 *    and pediatric hospital · Dr.M.Naresh MBBS MD DVL"
 *  - Brief supplied by the client (address, phone, Dr. Laxmi reference)
 *  - Justdial listing could not be read (blocked); verify its details manually.
 */

export type Verifiable<T> = { value: T; confirmed: boolean };

export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false";

export const site = {
  name: "KL Skin & Children's Hospital",
  shortName: "KL Hospital",
  tagline: "Specialised Dermatology & Paediatric Hospital",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://klhospital.in",

  phone: {
    display: "+91 93924 64811",
    tel: "+919392464811",
    confirmed: false,
  },
  whatsapp: {
    // wa.me format: country code + number, digits only
    number: "919392464811",
    confirmed: false,
  },

  address: {
    line1: "Road No. 5, Vijaya Nagar Colony",
    line2: "Opp. Pooja Enterprises, Azad Nagar",
    city: "Jadcherla",
    district: "Mahabubnagar",
    state: "Telangana",
    postalCode: "509301",
    confirmed: false,
  },

  maps: {
    query: "KL Skin and Children Hospital, Vijaya Nagar Colony, Jadcherla",
    embed:
      "https://www.google.com/maps?q=KL+Skin+and+Children+Hospital+Vijaya+Nagar+Colony+Jadcherla&output=embed",
    directions:
      "https://www.google.com/maps/search/?api=1&query=KL+Skin+and+Children+Hospital+Jadcherla",
  },

  hours: {
    confirmed: false,
    rows: [
      { days: "Monday – Saturday", time: "To be confirmed" },
      { days: "Sunday", time: "To be confirmed" },
    ],
  },

  social: {
    instagram: { handle: "@klhospital", url: "https://www.instagram.com/klhospital/" },
    justdial:
      "https://www.justdial.com/Mahabubnagar/Kl-Skin-And-Childrens-Hospital-Opposite-Pooja-Enterprises-Azad-Nagar/9999P8542-8542-241110033907-S1R7_BZDET",
  },
} as const;

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#doctors", label: "Our Doctors" },
  { href: "#specialities", label: "Specialities" },
  { href: "#facilities", label: "Facilities" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
] as const;

export type DepartmentId = "dermatology" | "hair" | "paediatrics";

export const departments: { id: DepartmentId; label: string }[] = [
  { id: "dermatology", label: "Dermatology & Skin Care" },
  { id: "hair", label: "Hair & Scalp Care" },
  { id: "paediatrics", label: "Paediatrics / Children's Care" },
];

export type Doctor = {
  id: string;
  name: string;
  initials: string;
  qualifications: Verifiable<string>;
  speciality: string;
  departments: DepartmentId[];
  bio: Verifiable<string>;
  availability: Verifiable<string>;
  /** Path under /public. Leave null until a real, approved photo is supplied. */
  photo: string | null;
  nameConfirmed: boolean;
};

export const doctors: Doctor[] = [
  {
    id: "naresh",
    name: "Dr. M. Naresh",
    initials: "MN",
    // Source: Instagram bio "Dr.M.Naresh MBBS MD DVL"
    qualifications: { value: "MBBS, MD (DVL)", confirmed: true },
    speciality: "Dermatology, Venereology & Leprosy",
    departments: ["dermatology", "hair"],
    bio: {
      value:
        "Dr. Naresh holds an MD in Dermatology, Venereology & Leprosy and consults on skin, hair, scalp and nail concerns for adults and children at KL Skin & Children's Hospital.",
      confirmed: false,
    },
    availability: { value: "Consultation timings to be confirmed", confirmed: false },
    photo: null,
    nameConfirmed: true,
  },
  {
    id: "laxmi",
    name: "Dr. Laxmi",
    initials: "L",
    qualifications: { value: "Qualifications to be confirmed", confirmed: false },
    speciality: "Paediatrics",
    departments: ["paediatrics"],
    bio: {
      value:
        "Paediatric consultations for newborns, infants and children. Full name, qualifications and profile to be confirmed by the hospital.",
      confirmed: false,
    },
    availability: { value: "Consultation timings to be confirmed", confirmed: false },
    photo: null,
    nameConfirmed: false,
  },
];

export type Speciality = {
  id: DepartmentId;
  index: string;
  title: string;
  kicker: string;
  intro: string;
  image: string;
  imageAlt: string;
  /** Consultation areas: within the normal scope of the speciality. */
  services: Verifiable<string>[];
  more: string;
};

export const specialities: Speciality[] = [
  {
    id: "dermatology",
    index: "01",
    title: "Dermatology & Skin Care",
    kicker: "Skin",
    intro:
      "Specialist consultations for everyday and long-standing skin concerns, with care plans explained clearly and tailored to your skin.",
    image: "/images/stock/skin-ritual.jpg",
    imageAlt: "Skin care serum bottle on linen with eucalyptus leaves",
    services: [
      { value: "Acne & acne marks", confirmed: false },
      { value: "Pigmentation & uneven tone", confirmed: false },
      { value: "Eczema, psoriasis & allergies", confirmed: false },
      { value: "Skin infections", confirmed: false },
      { value: "Nail disorders", confirmed: false },
      { value: "Cosmetic dermatology procedures", confirmed: false },
    ],
    more:
      "Your consultation begins with a careful look at your skin and history. Where a procedure may help, the doctor will explain the options, expected results and aftercare before anything is planned. The full list of procedures available at the hospital will be published here once confirmed.",
  },
  {
    id: "hair",
    index: "02",
    title: "Hair & Scalp Care",
    kicker: "Hair",
    intro:
      "Understanding the cause before treating the symptom: assessment and guidance for hair fall, thinning and scalp conditions.",
    image: "/images/stock/hair-care.jpg",
    imageAlt: "Woman with long hair, hands resting on her scalp",
    services: [
      { value: "Hair fall & thinning", confirmed: false },
      { value: "Dandruff & scalp conditions", confirmed: false },
      { value: "Patchy hair loss", confirmed: false },
      { value: "Hair & scalp treatments", confirmed: false },
    ],
    more:
      "Hair concerns often have more than one cause, from nutrition and hormones to scalp health. The consultation looks at the whole picture so that the advice you receive is specific to you. Specific hair treatments offered will be listed after confirmation from the hospital.",
  },
  {
    id: "paediatrics",
    index: "03",
    title: "Paediatric Care",
    kicker: "Children",
    intro:
      "Gentle, attentive care for newborns, infants and growing children, and clear answers for the parents who look after them.",
    image: "/images/stock/kids-play.jpg",
    imageAlt: "Toddler playing with a colourful toy in a bright children's room",
    services: [
      { value: "Newborn & infant care", confirmed: false },
      { value: "Childhood illnesses & fevers", confirmed: false },
      { value: "Growth & development checks", confirmed: false },
      { value: "Vaccinations", confirmed: false },
      { value: "Childhood skin conditions", confirmed: false },
    ],
    more:
      "Children are not small adults, and their care should never feel rushed. Paediatric consultations focus on listening to parents, examining calmly and explaining what to watch for at home. Vaccination services and schedules will be listed once confirmed by the hospital.",
  },
];

export const reasons = [
  {
    title: "Two specialities, one roof",
    body: "Skin and children's healthcare in a single hospital, so the whole family can be seen in one familiar place.",
    confirmed: true,
  },
  {
    title: "Specialist-led skin care",
    body: "Dermatology consultations with an MD in Dermatology, Venereology & Leprosy.",
    confirmed: true,
  },
  {
    title: "Patient-first consultations",
    body: "Time to listen, examine and explain, with care plans built around you rather than a template.",
    confirmed: true,
  },
  {
    title: "Comfortable for children",
    body: "A calm, welcoming setting designed to make visits easier for little patients and their parents.",
    confirmed: false,
  },
  {
    title: "Convenient in Jadcherla",
    body: "Easy to reach from across Jadcherla and the Mahabubnagar district, with simple WhatsApp appointment requests.",
    confirmed: true,
  },
  {
    title: "Modern facilities",
    body: "Details of the hospital's infrastructure and equipment will be added once confirmed.",
    confirmed: false,
  },
] as const;

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  category: "Hospital" | "Care" | "Children";
  /** true = stock photo standing in for a real hospital photograph */
  sample: boolean;
  span?: "tall" | "wide";
};

export const gallery: GalleryItem[] = [
  { src: "/images/stock/reception.jpg", alt: "Bright hospital reception desk", caption: "Reception", category: "Hospital", sample: true, span: "wide" },
  { src: "/images/stock/kids-play.jpg", alt: "Child playing in a colourful room", caption: "Kids' corner", category: "Children", sample: true, span: "tall" },
  { src: "/images/stock/skin-treatment.jpg", alt: "Patient relaxing during a facial skin treatment", caption: "Skin care", category: "Care", sample: true },
  { src: "/images/stock/ward.jpg", alt: "Clean, well-lit hospital beds", caption: "Patient rooms", category: "Hospital", sample: true },
  { src: "/images/stock/hands.jpg", alt: "Hands held in reassurance", caption: "Compassionate care", category: "Care", sample: true, span: "tall" },
  { src: "/images/stock/hero-care.jpg", alt: "Doctor's white coat and stethoscope", caption: "Specialist consultations", category: "Care", sample: true },
  { src: "/images/stock/child-joy.jpg", alt: "Smiling young child outdoors", caption: "Happy, healthy kids", category: "Children", sample: true },
  { src: "/images/stock/lounge.jpg", alt: "Calm waiting lounge with plants", caption: "Waiting area", category: "Hospital", sample: true, span: "wide" },
];

/** Leave empty until genuine, consented reviews are collected. */
export const testimonials: { quote: string; name: string; context: string }[] = [];
