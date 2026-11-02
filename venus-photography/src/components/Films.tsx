"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { films } from "@/lib/data";
import { lockScroll } from "@/lib/scroll";

type Film = (typeof films)[number];

// Teaser player: a letterboxed Ken Burns sequence of stills. Replace with an
// embedded YouTube/Vimeo player once the real films are online.
function Teaser({ film, onClose }: { film: Film; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const frames = gsap.utils.toArray<HTMLElement>(".teaser__still");
      const tl = gsap.timeline({ repeat: -1 });
      frames.forEach((f, i) => {
        tl.fromTo(f, { opacity: 0, scale: 1.18 }, { opacity: 1, scale: 1.02, duration: 4.5, ease: "none" }, i * 3.6).to(
          f,
          { opacity: 0, duration: 0.9, ease: "none" },
          i * 3.6 + 3.6,
        );
      });
      gsap.from(".teaser__title > *", { y: 30, opacity: 0, stagger: 0.15, duration: 1.2, delay: 0.4 });
    },
    { scope: ref },
  );

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [onClose]);

  return (
    <div className="teaser" ref={ref} role="dialog" aria-modal="true" aria-label={film.title}>
      <div className="teaser__screen">
        {film.stills.map((s) => (
          <div className="teaser__still" key={s}>
            <Image src={s} alt="" fill sizes="100vw" />
          </div>
        ))}
        <div className="teaser__grain" />
        <div className="teaser__title">
          <span>{film.couple}</span>
          <strong>{film.title}</strong>
          <span>A Venus film · {film.place}</span>
        </div>
      </div>
      <button className="teaser__close" onClick={onClose}>
        Close ✕
      </button>
    </div>
  );
}

export default function Films() {
  const ref = useRef<HTMLElement>(null);
  const [playing, setPlaying] = useState<Film | null>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: ".films__screen", start: "top 85%", end: "center 45%", scrub: 0.8 },
        })
        .fromTo(".films__bar", { scaleY: 1 }, { scaleY: 0.26 }, 0)
        .fromTo(".films__screen img", { scale: 1.3 }, { scale: 1 }, 0)
        .from(".films__overlay", { opacity: 0, y: 30 }, 0.5);

      gsap.from(".film", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.1,
        scrollTrigger: { trigger: ".films__list", start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  const play = (f: Film) => {
    setPlaying(f);
    lockScroll(true);
  };
  const stop = () => {
    setPlaying(null);
    lockScroll(false);
  };

  const feature = films[0];

  return (
    <section className="films" id="films" ref={ref}>
      <div className="container films__head">
        <p className="eyebrow eyebrow--light">
          <span className="eyebrow__line" />
          Cinematic films
        </p>
        <h2 className="films__title">
          Your wedding, <em>in cinemascope</em>
        </h2>
        <p className="films__intro">
          Shot on cinema cameras, scored with care and graded like a feature — films your grandchildren
          will want to watch.
        </p>
      </div>

      <div className="container">
        <button className="films__screen" onClick={() => play(feature)} data-cursor="Play">
          <Image src={feature.stills[0]} alt={`${feature.title} — ${feature.couple}`} fill sizes="(max-width: 1200px) 100vw, 1200px" />
          <span className="films__bar films__bar--top" />
          <span className="films__bar films__bar--bottom" />
          <span className="films__overlay">
            <span className="films__play" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="films__now">
              Now showing · {feature.length}
              <strong>{feature.title}</strong>
              {feature.couple} — {feature.place}
            </span>
          </span>
        </button>
      </div>

      <div className="container films__list">
        {films.map((f, i) => (
          <button className="film" key={f.title} onClick={() => play(f)} data-cursor="Play">
            <span className="film__thumb">
              <Image src={f.stills[1]} alt={f.title} fill sizes="(max-width: 900px) 90vw, 30vw" />
              <span className="film__sprockets" aria-hidden="true" />
            </span>
            <span className="film__meta">
              <span className="film__no">Reel {String(i + 1).padStart(2, "0")}</span>
              <strong>{f.title}</strong>
              <span>
                {f.couple} · {f.place} · {f.length}
              </span>
            </span>
          </button>
        ))}
      </div>

      {playing && <Teaser film={playing} onClose={stop} />}
    </section>
  );
}
