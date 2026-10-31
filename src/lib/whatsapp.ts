import { site } from "@/content/site";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage =
  "Hello KL Skin & Children's Hospital, I would like to enquire about an appointment.";

/** Lets any "Book" button pre-select a department/doctor in the appointment form. */
export const PREFILL_EVENT = "kl:prefill";
export type PrefillDetail = { department?: string; doctor?: string };

export function requestAppointment(detail: PrefillDetail = {}) {
  window.dispatchEvent(new CustomEvent<PrefillDetail>(PREFILL_EVENT, { detail }));
  document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
