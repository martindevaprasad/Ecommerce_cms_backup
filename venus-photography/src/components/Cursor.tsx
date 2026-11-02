"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// A viewfinder-style cursor. Elements opt in to a label with data-cursor="View".
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });

    const move = (e: PointerEvent) => {
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      ring.current!.classList.add("is-visible");
    };

    const over = (e: PointerEvent) => {
      const target = e.target as Element;
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      const link = target.closest("a, button, [role='button'], label");
      ring.current!.classList.toggle("is-label", !!labelled);
      ring.current!.classList.toggle("is-link", !labelled && !!link);
      label.current!.textContent = labelled?.dataset.cursor ?? "";
    };

    const leave = () => ring.current!.classList.remove("is-visible");

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={ring} aria-hidden="true">
        <span className="cursor__bracket cursor__bracket--tl" />
        <span className="cursor__bracket cursor__bracket--tr" />
        <span className="cursor__bracket cursor__bracket--bl" />
        <span className="cursor__bracket cursor__bracket--br" />
        <span className="cursor__label" ref={label} />
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
