"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { journal } from "@/lib/data";
import SectionHead from "./SectionHead";

// An index of stories; on desktop a preview print floats beside the cursor.
export default function Journal() {
  const ref = useRef<HTMLElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const movers = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGSAP(
    () => {
      const float = ref.current!.querySelector(".jr__float");
      movers.current = {
        x: gsap.quickTo(float, "x", { duration: 0.6, ease: "power3" }),
        y: gsap.quickTo(float, "y", { duration: 0.6, ease: "power3" }),
      };
      gsap.from(".jr__row", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: { trigger: ".jr__list", start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  const move = (e: React.PointerEvent) => {
    const box = ref.current!.getBoundingClientRect();
    movers.current?.x(e.clientX - box.left);
    movers.current?.y(e.clientY - box.top);
  };

  return (
    <section className="jr section" id="journal" ref={ref} onPointerMove={move}>
      <div className="container">
        <SectionHead eyebrow="The journal" title="Notes from" script="behind the lens" align="left" />
        <ul className="jr__list" onPointerLeave={() => setHover(null)}>
          {journal.map((j, i) => (
            <li key={j.title} className="jr__row" onPointerEnter={() => setHover(i)}>
              <a href="#journal" data-cursor="Read">
                <span className="jr__thumb">
                  <Image src={j.src} alt="" fill sizes="96px" />
                </span>
                <span className="jr__cat">{j.cat}</span>
                <span className="jr__title">{j.title}</span>
                <span className="jr__date">{j.date}</span>
                <span className="jr__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={`jr__float${hover !== null ? " is-visible" : ""}`} aria-hidden="true">
        {journal.map((j, i) => (
          <div key={j.src} className={`jr__float-img${hover === i ? " is-active" : ""}`}>
            <Image src={j.src} alt="" fill sizes="280px" />
          </div>
        ))}
      </div>
    </section>
  );
}
