"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

type Props = {
  eyebrow: string;
  title: string;
  script?: string;
  text?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
};

export default function SectionHead({ eyebrow, title, script, text, align = "center", tone = "dark" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(".sh__title", { type: "words", mask: "words", wordsClass: "w" });
      const tl = gsap
        .timeline({ scrollTrigger: { trigger: ref.current, start: "top 82%", once: true } })
        .from(".sh__eyebrow", { opacity: 0, x: align === "center" ? 0 : -20, duration: 0.8 })
        .from(".sh__line", { scaleX: 0, duration: 1, ease: "expo.out" }, "<")
        .from(split.words, { yPercent: 110, duration: 1.1, stagger: 0.07, ease: "expo.out" }, "<0.1");
      if (text) tl.from(".sh__text", { opacity: 0, y: 16, duration: 0.9 }, "<0.3");
    },
    { scope: ref },
  );

  return (
    <div className={`sh sh--${align} sh--${tone}`} ref={ref}>
      <p className="sh__eyebrow">
        <span className="sh__line" />
        {eyebrow}
      </p>
      <h2 className="sh__title">
        {title} {script && <em>{script}</em>}
      </h2>
      {text && <p className="sh__text">{text}</p>}
    </div>
  );
}
