"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { rituals } from "@/lib/data";

function Row({ words, outline }: { words: string[]; outline?: boolean }) {
  // Content is rendered twice so a -50% loop is seamless.
  const items = [...words, ...words];
  return (
    <div className={`ticker__row${outline ? " ticker__row--outline" : ""}`}>
      <div className="ticker__track">
        {items.map((w, i) => (
          <span key={i} className="ticker__item">
            {w}
            <svg className="ticker__aperture" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2 L16 12 M22 12 L12 16 M12 22 L8 12 M2 12 L12 8" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

// Two counter-moving rows of ritual names whose speed follows scroll velocity.
export default function RitualTicker() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tracks = gsap.utils.toArray<HTMLElement>(".ticker__track");
      const loops = tracks.map((t, i) =>
        gsap.fromTo(
          t,
          { xPercent: i % 2 ? -50 : 0 },
          { xPercent: i % 2 ? 0 : -50, duration: 60, ease: "none", repeat: -1 },
        ),
      );

      const boost = { v: 1 };
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 400);
          gsap.to(boost, {
            v,
            duration: 0.25,
            overwrite: true,
            onUpdate: () => loops.forEach((l) => l.timeScale(boost.v)),
            onComplete: () => {
              gsap.to(boost, {
                v: 1,
                duration: 1.2,
                onUpdate: () => loops.forEach((l) => l.timeScale(boost.v)),
              });
            },
          });
        },
      });

      gsap.to(".ticker__inner", {
        rotate: -2,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: ref },
  );

  return (
    <section className="ticker" ref={ref} aria-label="Rituals we photograph">
      <div className="ticker__inner">
        <Row words={rituals.slice(0, 6).concat(rituals.slice(0, 6))} />
        <Row words={rituals.slice(6).concat(rituals.slice(6))} outline />
      </div>
    </section>
  );
}
