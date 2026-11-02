"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { px } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Ethos() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".ethos__lead", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".ethos__lead", start: "top 78%", end: "bottom 50%", scrub: true },
        },
      );

      const scrub = { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(".ethos__img--a", { yPercent: 10 }, { yPercent: -12, ease: "none", scrollTrigger: scrub });
      gsap.fromTo(".ethos__img--b", { yPercent: 30 }, { yPercent: -20, ease: "none", scrollTrigger: scrub });
      gsap.fromTo(".ethos__img img", { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: scrub });
      gsap.to(".ethos__badge svg", { rotate: 360, ease: "none", scrollTrigger: { ...scrub, scrub: 1 } });

      gsap.from(".ethos__img", {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1.6,
        stagger: 0.25,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ".ethos__media", start: "top 75%", once: true },
      });
      gsap.from(".ethos__sign, .ethos__role, .ethos .btn", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: { trigger: ".ethos__sign", start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section className="ethos section" id="stories" ref={ref}>
      <div className="container ethos__grid">
        <div className="ethos__text">
          <p className="eyebrow">
            <span className="eyebrow__line" />
            Our ethos
          </p>
          <p className="ethos__lead">
            We are storytellers of the Indian wedding — the hush before the thaali is tied, the riot of
            turmeric at the haldi, the grandmother who wipes away a tear she thinks no one saw. For twelve
            years Venus has photographed these moments exactly as they are: honest, luminous and made to
            outlive us all.
          </p>
          <div className="ethos__sig">
            <span className="ethos__sign">Venus</span>
            <span className="ethos__role">Founder & lead photographer · Chennai</span>
          </div>
          <a
            href="#services"
            className="btn btn--outline"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#services");
            }}
          >
            What we craft
          </a>
        </div>

        <div className="ethos__media">
          <figure className="ethos__img ethos__img--a" data-cursor="Venus">
            <Image src={px(17841215)} alt="South Indian bride in traditional attire, Chennai" fill sizes="(max-width: 900px) 70vw, 30vw" />
          </figure>
          <figure className="ethos__img ethos__img--b" data-cursor="Venus">
            <Image src={px(14311014)} alt="South Indian couple in traditional wedding attire" fill sizes="(max-width: 900px) 50vw, 22vw" />
          </figure>
          <div className="ethos__badge" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#badge-circle" textLength="486" lengthAdjust="spacingAndGlyphs">
                  VENUS · THE PHOTOGRAPHY COMPANY · EST. 2014 · CHENNAI ·
                </textPath>
              </text>
            </svg>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/venus-mark.jpg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
