"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/content/site";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

/** Floating WhatsApp button (desktop) and sticky Call / WhatsApp / Book bar (mobile). */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = whatsappLink(defaultWhatsappMessage);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group fixed bottom-8 right-8 z-40 hidden items-center gap-3 rounded-full bg-[#1f9e5a] py-3 pl-3 pr-3 text-white shadow-lift transition-[padding] duration-300 hover:pr-5 lg:flex"
          >
            <span className="relative grid size-10 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/25 [animation-duration:2.4s]" />
              <WhatsAppIcon className="relative size-6" />
            </span>
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-[14px] font-semibold transition-all duration-300 group-hover:max-w-40">
              Chat with us
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-teal-950/10 bg-ivory-50/90 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur-xl lg:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-[1fr_1fr_1.6fr] gap-2">
          <a
            href={`tel:${site.phone.tel}`}
            className="flex h-12 flex-col items-center justify-center rounded-2xl text-[11px] font-semibold text-teal-900 ring-1 ring-teal-950/10 active:bg-mint-100"
          >
            <Phone className="size-[18px]" aria-hidden />
            Call
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-col items-center justify-center rounded-2xl text-[11px] font-semibold text-[#178a4c] ring-1 ring-teal-950/10 active:bg-mint-100"
          >
            <WhatsAppIcon className="size-[18px]" />
            WhatsApp
          </a>
          <a
            href="#appointment"
            className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-teal-800 text-[14px] font-semibold text-ivory-50 active:bg-teal-900"
          >
            <CalendarCheck className="size-[18px]" aria-hidden />
            Book Appointment
          </a>
        </div>
      </nav>
    </>
  );
}
