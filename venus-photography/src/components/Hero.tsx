"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DESKTOP, MOBILE, gsap, SplitText, useGSAP } from "@/lib/gsap";
import { onLoaded, scrollToTarget } from "@/lib/scroll";
import { heroSlides } from "@/lib/data";

const EXPOSURES = [
  ["ISO 200", "f/1.8", "1/250s", "85mm"],
  ["ISO 400", "f/2.0", "1/160s", "50mm"],
  ["ISO 100", "f/1.4", "1/500s", "105mm"],
  ["ISO 320", "f/2.2", "1/200s", "35mm"],
  ["ISO 800", "f/1.8", "1/125s", "50mm"],
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((v) => (v + 1) % heroSlides.length), 5500);
    return () => clearInterval(t);
  }, []);

  useGSAP(
    () => {
      const split = SplitText.create(".hero__title", { type: "words", mask: "words", wordsClass: "w" });
      const intro = gsap
        .timeline({ paused: true, delay: 0.35 })
        .from(".hero__slides", { scale: 1.25, duration: 2.4, ease: "expo.out" })
        .from(split.words, { yPercent: 115, duration: 1.4, stagger: 0.07, ease: "expo.out" }, 0.2)
        .from(".hero__eyebrow, .hero__sub, .hero__actions", { y: 24, opacity: 0, stagger: 0.12, duration: 1 }, 0.7)
        .from(".hero__corner", { scale: 1.6, opacity: 0, stagger: 0.06, duration: 1 }, 0.4)
        .from(".hero__readout, .hero__reticle, .hero__scroll", { opacity: 0, duration: 1, stagger: 0.08 }, 0.9);
      const off = onLoaded(() => intro.play());

      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "+=100%", scrub: 0.8, pin: true },
            defaults: { ease: "none" },
          })
          .fromTo(
            ".hero__frame",
            { clipPath: "inset(96px 28px 28px 28px round 28px)" },
            { clipPath: "inset(0px 0px 0px 0px round 0px)" },
            0,
          )
          .to(".hero__content", { yPercent: -35, opacity: 0 }, 0)
          .to(".hero__corner--tl", { x: -20, y: -80 }, 0)
          .to(".hero__corner--tr", { x: 20, y: -80 }, 0)
          .to(".hero__corner--bl", { x: -20, y: 20 }, 0)
          .to(".hero__corner--br", { x: 20, y: 20 }, 0)
          .to(".hero__reticle", { scale: 2.4, opacity: 0 }, 0)
          .to(".hero__slides", { scale: 1.06 }, 0);
      });
      mm.add(MOBILE, () => {
        gsap.to(".hero__content", {
          yPercent: -20,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      return off;
    },
    { scope: root },
  );

  const exposure = EXPOSURES[active];

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__frame">
        <div className="hero__slides">
          {heroSlides.map((s, i) => (
            <div key={s.src} className={`hero__slide${i === active ? " is-active" : ""}`}>
              <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" />
            </div>
          ))}
        </div>
        <div className="hero__shade" />

        <div className="hero__hud" aria-hidden="true">
          <span className="hero__corner hero__corner--tl" />
          <span className="hero__corner hero__corner--tr" />
          <span className="hero__corner hero__corner--bl" />
          <span className="hero__corner hero__corner--br" />
          <div className="hero__readout hero__readout--tl">
            <i className="hero__rec" /> RAW · 45.7 MP
          </div>
          <div className="hero__readout hero__readout--tr" key={active}>
            {exposure.map((e) => (
              <span key={e}>{e}</span>
            ))}
          </div>
          <div className="hero__readout hero__readout--br">
            <span>{String(active + 1).padStart(2, "0")}</span> / {String(heroSlides.length).padStart(2, "0")} —{" "}
            {heroSlides[active].place}
          </div>
          <div className="hero__reticle">
            <span />
          </div>
        </div>

        <div className="hero__content">
          <p className="hero__eyebrow">Indian wedding photography & films · Chennai</p>
          <h1 className="hero__title">
            Heirlooms of silk, <em>sindoor</em> & gold
          </h1>
          <p className="hero__sub">
            Premium candid photography and cinematic films for Tamil and Indian weddings — told with
            restraint, colour and soul.
          </p>
          <div className="hero__actions">
            <a
              href="#inquire"
              className="btn btn--light"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#inquire");
              }}
            >
              Reserve your muhurtham
            </a>
            <a
              href="#album"
              className="btn btn--ghost-light"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#album");
              }}
            >
              Turn the album
            </a>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>Scroll to focus</span>
          <i />
        </div>
      </div>
    </section>
  );
}
