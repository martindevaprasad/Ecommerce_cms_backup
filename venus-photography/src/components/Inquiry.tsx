"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { inquiryServices, px } from "@/lib/data";

// A kolam (rice-flour threshold pattern) drawn from a 5×5 dot grid.
const DOTS = Array.from({ length: 25 }, (_, i) => ({ x: 40 + (i % 5) * 40, y: 40 + Math.floor(i / 5) * 40 }));
const loop = (x: number, y: number, r: number) =>
  `M${x} ${y - r} Q${x + r} ${y - r} ${x + r} ${y} Q${x + r} ${y + r} ${x} ${y + r} Q${x - r} ${y + r} ${x - r} ${y} Q${x - r} ${y - r} ${x} ${y - r}Z`;

function Kolam() {
  return (
    <svg className="kolam" viewBox="0 0 240 240" aria-hidden="true">
      {DOTS.map((d, i) => (
        <circle key={`d${i}`} className="kolam__dot" cx={d.x} cy={d.y} r="2" />
      ))}
      {DOTS.map((d, i) => (
        <path key={`l${i}`} className="kolam__line" d={loop(d.x, d.y, 16)} transform={`rotate(45 ${d.x} ${d.y})`} />
      ))}
      <path className="kolam__line" d="M120 6 C190 6 234 50 234 120 C234 190 190 234 120 234 C50 234 6 190 6 120 C6 50 50 6 120 6Z" />
      <path className="kolam__line" d="M120 22 L218 120 L120 218 L22 120Z" />
    </svg>
  );
}

export default function Inquiry() {
  const ref = useRef<HTMLElement>(null);
  const [chosen, setChosen] = useState<string[]>(["Candid Photography"]);
  const [sent, setSent] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        ".kolam__line",
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          stagger: 0.03,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "center 50%", scrub: 0.6 },
        },
      );
      gsap.from(".kolam__dot", {
        scale: 0,
        transformOrigin: "center",
        stagger: { each: 0.02, from: "center" },
        duration: 0.6,
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      gsap.from(".inq__field, .inq__chips, .inq__submit", {
        y: 26,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        scrollTrigger: { trigger: ".inq__form", start: "top 80%", once: true },
      });
      gsap.fromTo(
        ".inq__photo img",
        { scale: 1.2 },
        { scale: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: ref },
  );

  const toggle = (s: string) => setChosen((c) => (c.includes(s) ? c.filter((x) => x !== s) : [...c, s]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hook this up to email/CRM (e.g. a route handler or Formspree) before launch.
    setSent(true);
  };

  return (
    <section className="inq section" id="inquire" ref={ref}>
      <div className="container inq__grid">
        <div className="inq__aside">
          <div className="inq__photo">
            <Image src={px(16523921)} alt="Smiling bride holding a floral garland" fill sizes="(max-width: 900px) 90vw, 40vw" />
          </div>
          <Kolam />
        </div>

        <div className="inq__main">
          <p className="eyebrow">
            <span className="eyebrow__line" />
            Reserve your date
          </p>
          <h2 className="inq__title">
            Let&apos;s begin your <em>story</em>
          </h2>
          <p className="inq__intro">
            Tell us a little about your celebration. We reply within a day with availability and a
            proposal tailored to your rituals.
          </p>

          {sent ? (
            <div className="inq__sent" role="status">
              <span className="inq__sent-script">Nandri!</span>
              <p>Your inquiry is with us. Expect a call from the Venus team within 24 hours.</p>
            </div>
          ) : (
            <form className="inq__form" onSubmit={submit}>
              <label className="inq__field">
                <input name="name" required placeholder=" " autoComplete="name" />
                <span>Your names</span>
              </label>
              <label className="inq__field">
                <input name="phone" type="tel" required placeholder=" " autoComplete="tel" />
                <span>Phone / WhatsApp</span>
              </label>
              <label className="inq__field">
                <input name="email" type="email" placeholder=" " autoComplete="email" />
                <span>Email</span>
              </label>
              <label className="inq__field">
                <input name="date" type="date" required placeholder=" " />
                <span>Muhurtham date</span>
              </label>
              <label className="inq__field">
                <input name="city" required placeholder=" " />
                <span>City / venue</span>
              </label>
              <label className="inq__field">
                <select name="budget" defaultValue="" required>
                  <option value="" disabled>
                    Select
                  </option>
                  <option>₹3 – 5 lakh</option>
                  <option>₹5 – 10 lakh</option>
                  <option>₹10 – 20 lakh</option>
                  <option>₹20 lakh +</option>
                </select>
                <span>Investment</span>
              </label>

              <fieldset className="inq__chips">
                <legend>What would you like?</legend>
                {inquiryServices.map((s) => (
                  <button
                    type="button"
                    key={s}
                    className={`chip${chosen.includes(s) ? " is-on" : ""}`}
                    aria-pressed={chosen.includes(s)}
                    onClick={() => toggle(s)}
                  >
                    {s}
                  </button>
                ))}
              </fieldset>

              <label className="inq__field inq__field--full">
                <textarea name="message" rows={3} placeholder=" " />
                <span>Tell us about your wedding</span>
              </label>

              <button type="submit" className="btn btn--red inq__submit">
                Send inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
