"use client";

import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

// A 36-exposure film counter that advances as you scroll the page.
export default function FrameCounter() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const num = ref.current!.querySelector(".frames__num")!;
    const bar = ref.current!.querySelector<HTMLElement>(".frames__bar i")!;
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        num.textContent = String(Math.max(1, Math.ceil(self.progress * 36))).padStart(2, "0");
        bar.style.transform = `scaleX(${self.progress})`;
      },
    });
  });

  return (
    <div className="frames" ref={ref} aria-hidden="true">
      <span className="frames__label">Frame</span>
      <span className="frames__num">01</span>
      <span className="frames__of">/36</span>
      <span className="frames__bar">
        <i />
      </span>
    </div>
  );
}
