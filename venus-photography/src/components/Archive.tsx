"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Flip, gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { gallery, galleryFilters, type GalleryFilter } from "@/lib/data";
import { lockScroll } from "@/lib/scroll";
import SectionHead from "./SectionHead";

export default function Archive() {
  const ref = useRef<HTMLElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState<GalleryFilter>("All");
  const [open, setOpen] = useState<number | null>(null);

  const visible = gallery.filter((g) => filter === "All" || g.cat === filter);

  const choose = (f: GalleryFilter) => {
    if (f === filter) return;
    flipState.current = Flip.getState(ref.current!.querySelectorAll(".arc__item"));
    setFilter(f);
  };

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".arc__item").forEach((item) => {
        gsap.from(item.querySelector(".arc__media"), {
          clipPath: "inset(18% 18% 18% 18%)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 92%", once: true },
        });
      });
    },
    { scope: ref },
  );

  useGSAP(
    () => {
      if (!flipState.current) return;
      Flip.from(flipState.current, {
        duration: 0.8,
        ease: "power3.inOut",
        absolute: true,
        stagger: 0.02,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, delay: 0.25 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.45 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
      flipState.current = null;
    },
    { dependencies: [filter], scope: ref },
  );

  const count = visible.length;
  const close = () => {
    setOpen(null);
    lockScroll(false);
  };
  const step = (dir: number) => setOpen((v) => (v === null ? v : (v + dir + count) % count));

  const isOpen = open !== null;
  useEffect(() => {
    if (!isOpen) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        lockScroll(false);
      }
      if (e.key === "ArrowRight") setOpen((v) => (v === null ? v : (v + 1) % count));
      if (e.key === "ArrowLeft") setOpen((v) => (v === null ? v : (v - 1 + count) % count));
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [isOpen, count]);

  const current = open !== null ? visible[open] : null;

  return (
    <section className="arc section" id="archive" ref={ref}>
      <div className="container">
        <SectionHead
          eyebrow="The archive"
          title="Frames we"
          script="still dream of"
          text="Filter by ceremony. Every frame here was a single breath in someone's forever."
        />

        <div className="arc__filters" role="tablist" aria-label="Filter the archive">
          {galleryFilters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`arc__filter${filter === f ? " is-active" : ""}`}
              onClick={() => choose(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="arc__grid">
          {gallery.map((g) => {
            const idx = visible.indexOf(g);
            return (
              <button
                key={g.src}
                className={`arc__item arc__item--${g.shape}${idx === -1 ? " is-hidden" : ""}`}
                data-cursor="View"
                onClick={() => {
                  setOpen(idx);
                  lockScroll(true);
                }}
                aria-label={`Open: ${g.alt}`}
              >
                <span className="arc__media">
                  <Image src={g.src} alt={g.alt} fill sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw" />
                </span>
                <span className="arc__cat">{g.cat}</span>
                <span className="arc__corners" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.alt} onClick={close}>
          <div className="lightbox__frame" onClick={(e) => e.stopPropagation()}>
            <Image key={current.src} src={current.src} alt={current.alt} fill sizes="90vw" className="lightbox__img" />
          </div>
          <p className="lightbox__caption">
            <span>{String((open ?? 0) + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}</span>
            {current.cat} — {current.alt}
          </p>
          <button className="lightbox__btn lightbox__btn--prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">
            ←
          </button>
          <button className="lightbox__btn lightbox__btn--next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">
            →
          </button>
          <button className="lightbox__close" onClick={close} aria-label="Close">
            Close ✕
          </button>
        </div>
      )}
    </section>
  );
}
