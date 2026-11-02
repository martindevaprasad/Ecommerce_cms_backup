"use client";

import { useRef } from "react";
import Image from "next/image";
import { DESKTOP, gsap, useGSAP } from "@/lib/gsap";
import { services } from "@/lib/data";

// Pinned horizontal gallery of services on desktop; swipeable rail on mobile.
export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        const track = ref.current!.querySelector<HTMLElement>(".svc__track")!;
        const distance = () => track.scrollWidth - window.innerWidth + 64;

        const scroll = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".svc__progress i", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(".svc__card").forEach((card) => {
          gsap.fromTo(
            card.querySelector(".svc__img img"),
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: scroll,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
          gsap.from(card.querySelectorAll(".svc__no, .svc__title, .svc__text, .svc__tags"), {
            y: 30,
            opacity: 0,
            stagger: 0.08,
            duration: 0.9,
            scrollTrigger: { trigger: card, containerAnimation: scroll, start: "left 85%", once: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section className="svc" id="services" ref={ref}>
      <div className="svc__head container">
        <div>
          <p className="eyebrow">
            <span className="eyebrow__line" />
            What we craft
          </p>
          <h2 className="svc__heading">
            Services, <em>tailored</em>
            <br /> to every ritual
          </h2>
        </div>
        <p className="svc__intro">
          From a quiet Nichayathartham to a four-day destination celebration, every package is built
          around your ceremonies — never a template.
        </p>
      </div>

      <div className="svc__track">
        {services.map((s) => (
          <article key={s.no} className="svc__card" data-cursor="Explore">
            <div className="svc__img">
              <Image src={s.img} alt={s.title} fill sizes="(max-width: 900px) 80vw, 30vw" />
            </div>
            <div className="svc__body">
              <span className="svc__no">{s.no}</span>
              <h3 className="svc__title">{s.title}</h3>
              <p className="svc__text">{s.text}</p>
              <ul className="svc__tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        <div className="svc__end">
          <p>
            Something <em>bespoke</em> in mind?
          </p>
          <a href="#inquire" className="btn btn--red">
            Talk to us
          </a>
        </div>
      </div>

      <div className="svc__progress container" aria-hidden="true">
        <i />
      </div>
    </section>
  );
}
