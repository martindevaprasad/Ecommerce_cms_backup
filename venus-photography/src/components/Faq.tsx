"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { faqs, px } from "@/lib/data";
import SectionHead from "./SectionHead";

export default function Faq() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);

  useGSAP(
    () => {
      gsap.from(".faq__item", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        scrollTrigger: { trigger: ".faq__list", start: "top 80%", once: true },
      });
      gsap.fromTo(
        ".faq__visual img",
        { yPercent: -8, scale: 1.15 },
        { yPercent: 8, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: ref },
  );

  return (
    <section className="faq section" ref={ref}>
      <div className="container faq__grid">
        <div className="faq__aside">
          <SectionHead eyebrow="Questions" title="Before you" script="say yes" align="left" />
          <div className="faq__visual">
            <Image src={px(39797463)} alt="Floral mandap by the sea" fill sizes="(max-width: 900px) 90vw, 36vw" />
          </div>
        </div>
        <div className="faq__list">
          {faqs.map((f, i) => (
            <div className={`faq__item${open === i ? " is-open" : ""}`} key={f.q}>
              <button className="faq__q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span className="faq__no">{String(i + 1).padStart(2, "0")}</span>
                <span>{f.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </button>
              <div className="faq__a">
                <div>
                  <p>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
