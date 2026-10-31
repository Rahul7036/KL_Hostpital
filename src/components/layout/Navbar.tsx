"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, MessageCircle, Phone, X } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/whatsapp";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out-soft",
        scrolled || open
          ? "border-b border-teal-950/[0.06] bg-ivory-50/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "container-x flex items-center justify-between transition-[height] duration-500",
          scrolled ? "h-[68px]" : "h-[84px]",
        )}
      >
        <Link href="#home" aria-label={`${site.name}, home`} onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={active === link.href ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors",
                  active === link.href ? "text-teal-950" : "text-muted hover:text-teal-950",
                )}
              >
                {active === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-mint-100"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${site.phone.tel}`}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-[14px] font-semibold text-teal-900 transition-colors hover:text-teal-700 2xl:flex"
          >
            <Phone className="size-4" aria-hidden />
            {site.phone.display}
          </a>
          <a
            href="#appointment"
            className="group hidden h-11 items-center gap-2 rounded-full bg-teal-800 pl-5 pr-2 text-[14px] font-semibold text-ivory-50 shadow-[0_10px_30px_-12px_rgb(14_71_68/0.7)] transition-colors hover:bg-teal-900 sm:inline-flex"
          >
            Book Appointment
            <span className="grid size-7 place-items-center rounded-full bg-gold-400 text-teal-950 transition-transform duration-300 group-hover:rotate-12">
              <CalendarCheck className="size-3.5" aria-hidden />
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full text-teal-950 ring-1 ring-teal-950/10 transition hover:bg-mint-100 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise contain this fixed panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[45] overflow-y-auto bg-ivory-50 pt-[84px] lg:hidden"
          >
            <div className="container-x flex min-h-full flex-col pb-10 pt-6">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.045, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-4 font-display text-[26px] font-semibold tracking-tight text-teal-950"
                    >
                      {link.label}
                      <span className="font-sans text-xs font-medium text-muted">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto grid gap-3 pt-10"
              >
                <a
                  href="#appointment"
                  onClick={() => setOpen(false)}
                  className="flex h-14 items-center justify-center gap-2 rounded-full bg-teal-800 font-semibold text-ivory-50"
                >
                  <CalendarCheck className="size-5" aria-hidden /> Book an Appointment
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${site.phone.tel}`}
                    className="flex h-14 items-center justify-center gap-2 rounded-full font-semibold text-teal-900 ring-1 ring-teal-950/15"
                  >
                    <Phone className="size-4" aria-hidden /> Call
                  </a>
                  <a
                    href={whatsappLink(defaultWhatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 items-center justify-center gap-2 rounded-full font-semibold text-teal-900 ring-1 ring-teal-950/15"
                  >
                    <MessageCircle className="size-4" aria-hidden /> WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
