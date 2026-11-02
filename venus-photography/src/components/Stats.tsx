"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { stats } from "@/lib/data";

const TICKS = Array.from({ length: 48 }, (_, i) => i);

// Achievements drawn as lens focus dials that wind up when they come into view.
export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".dial").forEach((dial, i) => {
        const num = dial.querySelector(".dial__num")!;
        const target = stats[i];
        const counter = { v: 0 };
        gsap
          .timeline({ scrollTrigger: { trigger: dial, start: "top 85%", once: true }, delay: i * 0.12 })
          .from(dial, { y: 40, opacity: 0, duration: 1 })
          .fromTo(dial.querySelector(".dial__arc"), { drawSVG: "0%" }, { drawSVG: `${target.pct * 100}%`, duration: 2, ease: "power2.inOut" }, 0.2)
          .from(dial.querySelector(".dial__ticks"), { rotate: -90, duration: 2, ease: "power2.inOut" }, 0.2)
          .to(
            counter,
            {
              v: target.value,
              duration: 2,
              ease: "power2.inOut",
              onUpdate: () => {
                num.textContent = Math.round(counter.v).toString();
              },
            },
            0.2,
          );
      });
    },
    { scope: ref },
  );

  return (
    <section className="stats section" ref={ref} aria-label="Venus in numbers">
      <div className="container">
        <p className="stats__kicker">
          Twelve years, <em>thousands</em> of rituals, one obsession — light.
        </p>
        <div className="stats__grid">
          {stats.map((s) => (
            <div className="dial" key={s.label}>
              <svg className="dial__svg" viewBox="0 0 200 200" aria-hidden="true">
                <g className="dial__ticks">
                  {TICKS.map((t) => (
                    <line key={t} x1="100" y1="4" x2="100" y2={t % 4 === 0 ? 16 : 10} transform={`rotate(${t * 7.5} 100 100)`} />
                  ))}
                </g>
                <circle className="dial__track" cx="100" cy="100" r="74" />
                <circle className="dial__arc" cx="100" cy="100" r="74" transform="rotate(-90 100 100)" />
              </svg>
              <div className="dial__value">
                <span className="dial__num">0</span>
                <span className="dial__suffix">{s.suffix}</span>
              </div>
              <p className="dial__label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
