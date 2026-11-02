"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { px } from "@/lib/data";

const BLADES = Array.from({ length: 8 }, (_, i) => i);

// A sticky, "fixed" photograph seen through a lens aperture that opens as you scroll.
export default function ApertureReveal() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".aperture__quote", { type: "words", mask: "words", wordsClass: "w" });
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
        })
        .fromTo(".aperture__photo", { clipPath: "circle(9% at 50% 50%)" }, { clipPath: "circle(80% at 50% 50%)", duration: 0.55 }, 0)
        .fromTo(".aperture__photo img", { scale: 1.45 }, { scale: 1, duration: 0.8 }, 0)
        .to(".aperture__ring", { scale: 7, rotate: 140, opacity: 0, duration: 0.5 }, 0)
        .to(".aperture__intro", { opacity: 0, y: -40, duration: 0.2 }, 0)
        .from(".aperture__script", { opacity: 0, y: 40, duration: 0.15 }, 0.5)
        .from(split.words, { yPercent: 110, stagger: 0.02, duration: 0.15 }, 0.58)
        .from(".aperture__meta", { opacity: 0, duration: 0.1 }, 0.75)
        .to({}, { duration: 0.15 });
    },
    { scope: ref },
  );

  return (
    <section className="aperture" ref={ref} aria-label="The Muhurtham">
      <div className="aperture__sticky">
        <div className="aperture__intro">
          <p className="eyebrow eyebrow--center">
            <span className="eyebrow__line" />
            f/1.4 — wide open
          </p>
          <p className="aperture__hint">Keep scrolling to open the aperture</p>
        </div>

        <svg className="aperture__ring" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="96" />
          <circle cx="100" cy="100" r="80" />
          {BLADES.map((i) => (
            <path key={i} d="M100 20 Q140 60 152 100" transform={`rotate(${i * 45} 100 100)`} />
          ))}
        </svg>

        <div className="aperture__photo">
          <Image src={px(27635496)} alt="Indian bride in red amidst floral decor" fill sizes="100vw" />
          <div className="aperture__shade" />
          <div className="aperture__copy">
            <span className="aperture__script">Muhurtham</span>
            <p className="aperture__quote">The auspicious moment arrives once. We make sure it stays forever.</p>
            <p className="aperture__meta">Kapaleeshwarar Temple · 06:42 AM · 1/320s</p>
          </div>
        </div>
      </div>
    </section>
  );
}
