"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { testimonials } from "@/lib/data";

// Portraits framed in a temple-arch (jharokha) window, one couple at a time.
export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const [{ active, prev }, setIdx] = useState({ active: 0, prev: 0 });
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  const setActive = (next: (v: number) => number) => setIdx((s) => ({ active: next(s.active), prev: s.active }));

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIdx((s) => ({ active: (s.active + 1) % n, prev: s.active })), 7000);
    return () => clearTimeout(t);
  }, [active, paused, n]);

  useGSAP(
    () => {
      const img = ref.current!.querySelectorAll(".testi__img")[active];
      gsap.fromTo(img, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" });
      gsap.fromTo(img.querySelector("img"), { scale: 1.25 }, { scale: 1, duration: 1.8, ease: "expo.out" });

      const split = SplitText.create(".testi__quote", { type: "words", mask: "words", wordsClass: "w" });
      gsap
        .timeline()
        .from(split.words, { yPercent: 110, duration: 1, stagger: 0.025, ease: "expo.out" })
        .from(".testi__names, .testi__place", { opacity: 0, y: 14, stagger: 0.1, duration: 0.8 }, "<0.3");
    },
    { dependencies: [active], scope: ref, revertOnUpdate: true },
  );

  const go = (dir: number) => {
    setPaused(true);
    setActive((v) => (v + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[active];

  return (
    <section className="testi section" ref={ref} aria-roledescription="carousel" aria-label="Kind words">
      <div className="container testi__grid">
        <div className="testi__arch">
          {testimonials.map((x, i) => (
            <div
              key={x.src}
              className={`testi__img${i === active ? " is-active" : ""}`}
              style={{ zIndex: i === active ? 3 : i === prev ? 2 : 1 }}
            >
              <Image src={x.src} alt={x.names} fill sizes="(max-width: 900px) 80vw, 34vw" />
            </div>
          ))}
          <svg className="testi__archline" viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden="true">
            <path d="M10 400V150C10 70 80 10 150 10S290 70 290 150V400" />
          </svg>
        </div>

        <div className="testi__body">
          <p className="eyebrow">
            <span className="eyebrow__line" />
            Kind words
          </p>
          <span className="testi__mark" aria-hidden="true">
            “
          </span>
          <blockquote className="testi__quote" key={active}>
            {t.quote}
          </blockquote>
          <p className="testi__names">{t.names}</p>
          <p className="testi__place">{t.place}</p>

          <div className="testi__nav">
            <button onClick={() => go(-1)} aria-label="Previous testimonial">
              ←
            </button>
            <span>
              <strong>{String(active + 1).padStart(2, "0")}</strong> / {String(testimonials.length).padStart(2, "0")}
            </span>
            <button onClick={() => go(1)} aria-label="Next testimonial">
              →
            </button>
            <span className="testi__timer" key={`${active}-${paused}`} data-paused={paused} />
          </div>
        </div>
      </div>
    </section>
  );
}
