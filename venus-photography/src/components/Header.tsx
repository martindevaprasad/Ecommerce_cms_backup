"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { lockScroll, onLoaded, scrollToTarget } from "@/lib/scroll";
import { nav, site } from "@/lib/data";

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const el = ref.current!;
          const y = self.scroll();
          el.classList.toggle("is-scrolled", y > 40);
          el.classList.toggle("is-hidden", self.direction === 1 && y > 500);
        },
      });

      const intro = gsap
        .timeline({ paused: true, delay: 0.5 })
        .from(".hdr__brand, .hdr__link, .hdr__cta, .hdr__burger", {
          y: -24,
          opacity: 0,
          stagger: 0.06,
          duration: 1,
        });
      return onLoaded(() => intro.play());
    },
    { scope: ref },
  );

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
      lockScroll(false);
    }
    scrollToTarget(href);
  };

  const toggle = () => {
    lockScroll(!open);
    setOpen(!open);
  };

  return (
    <header className={`hdr${open ? " is-open" : ""}`} ref={ref}>
      <div className="hdr__inner">
        <a href="#top" className="hdr__brand" onClick={go("#top")} aria-label="Venus — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/venus-mark.jpg" alt="" width={44} height={44} />
          <span className="hdr__word">
            VENUS
            <small>{site.tagline}</small>
          </span>
        </a>

        <nav className="hdr__nav" aria-label="Primary">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="hdr__link" onClick={go(n.href)}>
              <span data-text={n.label}>{n.label}</span>
            </a>
          ))}
        </nav>

        <a href="#inquire" className="btn btn--red hdr__cta" onClick={go("#inquire")}>
          Check your date
        </a>

        <button className="hdr__burger" onClick={toggle} aria-expanded={open} aria-label="Menu">
          <span />
          <span />
        </button>
      </div>

      <div className="menu" aria-hidden={!open}>
        <nav className="menu__nav">
          {[...nav, { label: "Inquire", href: "#inquire" }].map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={go(n.href)}
              style={{ transitionDelay: open ? `${0.15 + i * 0.05}s` : "0s" }}
            >
              <em>0{i + 1}</em>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot">
          <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </header>
  );
}
