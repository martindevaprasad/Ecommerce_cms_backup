"use client";

import { useRef } from "react";
import Image from "next/image";
import { DESKTOP, Draggable, gsap, useGSAP } from "@/lib/gsap";
import { stories } from "@/lib/data";
import SectionHead from "./SectionHead";

// Prints tumble onto a linen table; on desktop they can be picked up and rearranged.
export default function CoupleStories() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prints = gsap.utils.toArray<HTMLElement>(".print");
      gsap.from(prints, {
        y: () => -window.innerHeight * 0.6,
        rotate: () => gsap.utils.random(-40, 40),
        opacity: 0,
        duration: 1.3,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".stories__table", start: "top 70%", once: true },
      });

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        let z = prints.length + 1;
        const drags = Draggable.create(prints, {
          bounds: ref.current!.querySelector(".stories__table"),
          inertia: true,
          edgeResistance: 0.7,
          onPress() {
            (this.target as HTMLElement).style.zIndex = String(++z);
            gsap.to(this.target, { scale: 1.06, boxShadow: "0 40px 60px -20px rgba(20,14,10,.45)", duration: 0.25 });
          },
          onRelease() {
            gsap.to(this.target, { scale: 1, boxShadow: "0 18px 40px -18px rgba(20,14,10,.35)", duration: 0.4 });
          },
        });
        return () => drags.forEach((d) => d.kill());
      });
    },
    { scope: ref },
  );

  return (
    <section className="stories section" ref={ref}>
      <div className="container">
        <SectionHead
          eyebrow="Couple stories"
          title="Love, scattered"
          script="on the table"
          text="A handful of the couples who trusted us with their once-in-a-lifetime. Go on — pick up a print."
        />
      </div>
      <div className="stories__table container">
        {stories.map((s) => (
          <figure
            key={s.names}
            className="print"
            data-cursor="Drag"
            style={{ "--x": `${s.x}%`, "--y": `${s.y}%`, "--r": `${s.r}deg` } as React.CSSProperties}
          >
            <div className="print__img">
              <Image src={s.src} alt={`${s.names} — ${s.place}`} fill sizes="(max-width: 900px) 45vw, 260px" draggable={false} />
            </div>
            <figcaption>
              <span className="print__names">{s.names}</span>
              <span className="print__place">{s.place}</span>
            </figcaption>
          </figure>
        ))}
        <p className="stories__hint" aria-hidden="true">
          ← drag the prints →
        </p>
      </div>
    </section>
  );
}
