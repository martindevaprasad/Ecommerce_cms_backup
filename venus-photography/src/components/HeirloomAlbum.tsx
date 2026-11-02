"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { albumChapters, albumPages } from "@/lib/data";

type Face = (typeof albumPages)[number];

function PageFace({ face, side }: { face: Face; side: "front" | "back" }) {
  if (face.kind === "cover") {
    return (
      <div className={`leaf__face leaf__face--${side} leaf__cover`}>
        <div className="leaf__foil">
          <span className="leaf__cover-kicker">The Heirloom Album</span>
          <span className="leaf__cover-names">Meera &amp; Arjun</span>
          <span className="leaf__cover-date">XII · II · MMXXVI</span>
          <span className="leaf__cover-brand">VENUS</span>
        </div>
      </div>
    );
  }
  if (face.kind === "note") {
    return (
      <div className={`leaf__face leaf__face--${side} leaf__note`}>
        <p>{face.text}</p>
        <span>— M &amp; A</span>
      </div>
    );
  }
  return (
    <div className={`leaf__face leaf__face--${side} leaf__photo`}>
      <div className="leaf__print">
        <Image src={face.src} alt={face.caption} fill sizes="(max-width: 900px) 45vw, 380px" />
      </div>
      <p className="leaf__caption">{face.caption}</p>
    </div>
  );
}

// A hand-bound album whose pages turn in 3D as you scroll.
export default function HeirloomAlbum() {
  const ref = useRef<HTMLElement>(null);
  const leaves: [Face, Face][] = [];
  for (let i = 0; i < albumPages.length; i += 2) leaves.push([albumPages[i], albumPages[i + 1]]);

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".leaf");
      const chapters = gsap.utils.toArray<HTMLElement>(".album__chapter");
      els.forEach((el, i) => gsap.set(el, { zIndex: els.length - i }));
      // Closed, the cover sits centred; the book slides over as it opens.
      gsap.set(".album__book", { xPercent: -25 });
      gsap.set(chapters.slice(1), { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut" },
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (els.length + 0.6)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      els.forEach((el, i) => {
        const at = i;
        if (i === 0) tl.to(".album__book", { xPercent: 0, duration: 0.6 }, at);
        tl.to(el, { rotateY: -180, duration: 1 }, at)
          .set(el, { zIndex: i + 1 }, at + 0.5)
          .to(el.querySelector(".leaf__shade"), { opacity: 0.35, duration: 0.5, ease: "power1.in" }, at)
          .to(el.querySelector(".leaf__shade"), { opacity: 0, duration: 0.5, ease: "power1.out" }, at + 0.5);
        if (chapters[i + 1]) {
          tl.to(chapters[i], { opacity: 0, y: -20, duration: 0.3 }, at + 0.35).to(
            chapters[i + 1],
            { opacity: 1, y: 0, duration: 0.3 },
            at + 0.65,
          );
        }
      });
      tl.to({}, { duration: 0.6 });

      gsap.from(".album__book", {
        y: 80,
        rotateX: 25,
        opacity: 0,
        duration: 1.4,
        scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <section className="album" id="album" ref={ref}>
      <div className="album__head container">
        <p className="eyebrow eyebrow--center">
          <span className="eyebrow__line" />
          The heirloom album
        </p>
        <h2 className="album__title">
          Turn the pages of <em>forever</em>
        </h2>
      </div>

      <div className="album__stage">
        <div className="album__book">
          <div className="album__base album__base--right">
            <p className="album__fin">
              <em>fin.</em>
              Printed on archival cotton rag, bound by hand in Chennai.
            </p>
          </div>
          {leaves.map(([front, back], i) => (
            <div className="leaf" key={i}>
              <PageFace face={front} side="front" />
              <PageFace face={back} side="back" />
              <div className="leaf__shade" />
            </div>
          ))}
        </div>
      </div>

      <div className="album__chapters" aria-live="polite">
        {albumChapters.map((c) => (
          <p key={c} className="album__chapter">
            {c}
          </p>
        ))}
      </div>
    </section>
  );
}
