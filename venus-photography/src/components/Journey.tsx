"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { journey } from "@/lib/data";
import SectionHead from "./SectionHead";

const ICONS: Record<(typeof journey)[number]["icon"], React.ReactNode> = {
  chat: (
    <>
      <path d="M6 10h36v24H20l-10 8v-8H6z" />
      <path d="M14 19h20M14 26h12" />
    </>
  ),
  plan: (
    <>
      <path d="M7 11h34v31H7z" />
      <path d="M7 19h34M15 6v9M33 6v9M14 27h6M14 34h12" />
    </>
  ),
  camera: (
    <>
      <path d="M5 15h9l4-6h12l4 6h9v25H5z" />
      <circle cx="24" cy="27" r="8" />
      <circle cx="24" cy="27" r="3" />
    </>
  ),
  rings: (
    <>
      <circle cx="18" cy="29" r="10" />
      <circle cx="30" cy="29" r="10" />
      <path d="M24 6l4 4-4 4-4-4z" />
    </>
  ),
  reel: (
    <>
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="14" r="4" />
      <circle cx="24" cy="34" r="4" />
      <circle cx="14" cy="24" r="4" />
      <circle cx="34" cy="24" r="4" />
      <circle cx="24" cy="24" r="1.5" />
    </>
  ),
  book: (
    <>
      <path d="M5 10c7-3 13-3 19 2 6-5 12-5 19-2v29c-7-3-13-3-19 2-6-5-12-5-19-2z" />
      <path d="M24 12v29" />
    </>
  ),
};

// The path from first call to heirloom album, drawn as you scroll.
export default function Journey() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".journey__draw",
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          ease: "none",
          scrollTrigger: { trigger: ".journey__wrap", start: "top 65%", end: "bottom 65%", scrub: 0.5 },
        },
      );

      gsap.utils.toArray<HTMLElement>(".step").forEach((step) => {
        gsap
          .timeline({ scrollTrigger: { trigger: step, start: "top 75%", once: true } })
          .from(step.querySelector(".step__icon"), { scale: 0.6, opacity: 0, duration: 0.8, ease: "back.out(2)" })
          .fromTo(step.querySelectorAll(".step__icon path, .step__icon circle"), { drawSVG: "0%" }, { drawSVG: "100%", duration: 1.4, stagger: 0.1, ease: "power2.inOut" }, 0.1)
          .from(step.querySelectorAll(".step__no, .step__title, .step__text"), { y: 24, opacity: 0, stagger: 0.08, duration: 0.9 }, 0.2);
      });
    },
    { scope: ref },
  );

  return (
    <section className="journey section" ref={ref}>
      <div className="container">
        <SectionHead
          eyebrow="Your journey with Venus"
          title="From hello"
          script="to heirloom"
          text="Six unhurried steps between your first message and the album on your coffee table."
        />
        <div className="journey__wrap">
          <svg className="journey__path" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
            <path className="journey__ghost" d="M50 0 C90 80 90 170 50 250 S10 420 50 500 S90 670 50 750 S10 920 50 1000" />
            <path className="journey__draw" d="M50 0 C90 80 90 170 50 250 S10 420 50 500 S90 670 50 750 S10 920 50 1000" />
          </svg>
          <ol className="journey__steps">
            {journey.map((s, i) => (
              <li className={`step step--${i % 2 ? "right" : "left"}`} key={s.title}>
                <span className="step__icon" aria-hidden="true">
                  <svg viewBox="0 0 48 48">{ICONS[s.icon]}</svg>
                </span>
                <div className="step__body">
                  <span className="step__no">Step {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="step__title">{s.title}</h3>
                  <p className="step__text">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
