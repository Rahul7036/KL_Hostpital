"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { gallery, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { SampleBadge } from "@/components/ui/Markers";

const filters = ["All", "Hospital", "Care", "Children"] as const;
type Filter = (typeof filters)[number];

function Lightbox({ index, items, onClose, onNav }: {
  index: number;
  items: typeof gallery;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const item = items[index];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onNav]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo: ${item.caption}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex flex-col bg-teal-950/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 text-ivory-50 sm:px-8">
        <p className="text-sm">
          <span className="font-semibold">{item.caption}</span>
          <span className="ml-3 text-mint-200/60">
            {index + 1} / {items.length}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="grid size-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) onNav(1);
              else if (info.offset.x > 60) onNav(-1);
            }}
            className="absolute inset-4 sm:inset-x-24 sm:inset-y-4"
          >
            <Image src={item.src} alt={item.alt} fill sizes="100vw" className="pointer-events-none object-contain" />
            <SampleBadge className="left-1/2 top-2 -translate-x-1/2" />
          </motion.div>
        </AnimatePresence>
        {([-1, 1] as const).map((dir) => (
          <button
            key={dir}
            type="button"
            onClick={() => onNav(dir)}
            aria-label={dir === 1 ? "Next photo" : "Previous photo"}
            className={cn(
              "absolute top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-ivory-50 transition hover:bg-white/20 sm:grid",
              dir === 1 ? "right-6" : "left-6",
            )}
          >
            {dir === 1 ? <ChevronRight className="size-5" /> : <ChevronLeft className="size-5" />}
          </button>
        ))}
      </div>
      <p className="pb-5 text-center text-xs text-mint-200/50 sm:hidden">Swipe to browse</p>
    </motion.div>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = useMemo(
    () => (filter === "All" ? gallery : gallery.filter((g) => g.category === filter)),
    [filter],
  );

  const nav = useCallback(
    (dir: 1 | -1) => setOpenIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className="bg-ivory-50 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Gallery"
            title={
              <span id="gallery-heading">
                A look <Accent className="text-teal-700">inside.</Accent>
              </span>
            }
            lead="Bright, clean spaces designed to put patients and parents at ease."
          />
          <Reveal delay={0.1}>
            <div role="tablist" aria-label="Filter photos" className="inline-flex rounded-full bg-ivory-200 p-1">
              {filters.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors sm:px-5",
                    filter === f ? "text-ivory-50" : "text-muted hover:text-teal-950",
                  )}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="gallery-filter"
                      className="absolute inset-0 -z-0 rounded-full bg-teal-800"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.ul layout className="mt-12 grid grid-flow-row-dense auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.li
                layout
                key={g.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  g.span === "tall" && "row-span-2",
                  g.span === "wide" && "col-span-2",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Open photo: ${g.caption}`}
                  className="group relative size-full overflow-hidden rounded-[20px] bg-mint-100"
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-105"
                  />
                  <SampleBadge />
                  <span className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-teal-950/0 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute inset-x-4 bottom-4 flex items-center justify-between text-left text-ivory-50">
                    <span>
                      <span className="block text-[11px] uppercase tracking-[0.14em] text-mint-200/80">{g.category}</span>
                      <span className="block text-[15px] font-semibold">{g.caption}</span>
                    </span>
                    <span className="grid size-9 translate-y-2 place-items-center rounded-full bg-white/15 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <Expand className="size-4" aria-hidden />
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[24px] border border-line bg-white p-6 sm:flex-row sm:p-8">
          <div className="flex items-center gap-4">
            <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-400 via-[#d4768c] to-teal-700 text-white">
              <InstagramIcon className="size-5" />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-teal-950">Follow {site.social.instagram.handle}</p>
              <p className="text-[14px] text-muted">Hospital updates, kids&apos; special days and skin care tips.</p>
            </div>
          </div>
          <ButtonLink href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" variant="secondary">
            View on Instagram
          </ButtonLink>
        </Reveal>
      </div>

      <AnimatePresence>
        {openIndex !== null && <Lightbox index={openIndex} items={items} onClose={close} onNav={nav} />}
      </AnimatePresence>
    </section>
  );
}
