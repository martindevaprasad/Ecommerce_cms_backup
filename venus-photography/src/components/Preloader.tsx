"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { lockScroll, markLoaded } from "@/lib/scroll";

const TICKS = Array.from({ length: 72 }, (_, i) => i);

// A lens "focusing" (ring + counter), then a focal-plane shutter opening onto the site.
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      lockScroll(true);
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      const count = { v: 0 };
      const num = root.current!.querySelector(".pre__count")!;

      gsap
        .timeline({
          onComplete: () => {
            lockScroll(false);
            setDone(true);
            ScrollTrigger.refresh();
          },
        })
        .from(".pre__mark", { scale: 0.7, opacity: 0, duration: 1 })
        .from(".pre__ticks", { rotate: -120, opacity: 0, duration: 1.4 }, 0)
        .from(".pre__label", { y: 12, opacity: 0, stagger: 0.1, duration: 0.8 }, 0.2)
        .to(
          count,
          {
            v: 100,
            duration: 2.2,
            ease: "power2.inOut",
            onUpdate: () => {
              num.textContent = String(Math.round(count.v)).padStart(3, "0");
            },
          },
          0.2,
        )
        .fromTo(".pre__ring", { drawSVG: "0%" }, { drawSVG: "100%", duration: 2.2, ease: "power2.inOut" }, 0.2)
        .to(".pre__ticks", { rotate: 160, duration: 2.2, ease: "power2.inOut" }, 0.2)
        .to(".pre__lens", { scale: 0.92, duration: 0.12, ease: "power1.in" })
        .to(".pre__lens", { scale: 1, duration: 0.3, ease: "back.out(3)" })
        .add(() => markLoaded())
        .to(".pre__center", { opacity: 0, scale: 1.15, duration: 0.5, ease: "power2.in" }, "<")
        .to(".pre__curtain--top", { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "<0.15")
        .to(".pre__curtain--bottom", { yPercent: 100, duration: 1.2, ease: "expo.inOut" }, "<");
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre__curtain pre__curtain--top" />
      <div className="pre__curtain pre__curtain--bottom" />
      <div className="pre__center">
        <div className="pre__lens">
          <svg className="pre__svg" viewBox="0 0 200 200">
            <g className="pre__ticks">
              {TICKS.map((i) => (
                <line
                  key={i}
                  x1="100"
                  y1="6"
                  x2="100"
                  y2={i % 6 === 0 ? 18 : 12}
                  transform={`rotate(${i * 5} 100 100)`}
                />
              ))}
            </g>
            <circle className="pre__track" cx="100" cy="100" r="78" />
            <circle className="pre__ring" cx="100" cy="100" r="78" transform="rotate(-90 100 100)" />
          </svg>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pre__mark" src="/brand/venus-mark.jpg" alt="" />
        </div>
        <div className="pre__meta">
          <span className="pre__label">Focusing</span>
          <span className="pre__count">000</span>
          <span className="pre__label">Venus · The Photography Company</span>
        </div>
      </div>
    </div>
  );
}
