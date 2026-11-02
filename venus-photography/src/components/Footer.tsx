"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { nav, services, site } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".ftr__giant span", {
        yPercent: 100,
        stagger: 0.07,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ftr__giant", start: "top 95%", once: true },
      });
      gsap.from(".ftr__col", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: { trigger: ".ftr__cols", start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <footer className="ftr" ref={ref}>
      <div className="container">
        <div className="ftr__cols">
          <div className="ftr__col ftr__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/venus-logo.jpg" alt="Venus — The Photography Company" width={150} height={150} />
            <p>
              Premium Indian wedding photography and films, based in Chennai and travelling wherever love
              takes us.
            </p>
          </div>
          <div className="ftr__col">
            <h4>Explore</h4>
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(n.href);
                }}
              >
                {n.label}
              </a>
            ))}
          </div>
          <div className="ftr__col">
            <h4>Services</h4>
            {services.slice(0, 6).map((s) => (
              <span key={s.no}>{s.title}</span>
            ))}
          </div>
          <div className="ftr__col">
            <h4>Studio</h4>
            <span>{site.studio}</span>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <div className="ftr__social">
              {site.socials.map((s) => (
                <a key={s.label} href={s.href}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ftr__giant" aria-hidden="true">
          {"VENUS".split("").map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>

        <div className="ftr__base">
          <span>© 2026 Venus — The Photography Company. All rights reserved.</span>
          <span>Photographs courtesy of Pexels contributors (placeholder).</span>
          <button onClick={() => scrollToTarget(0)}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  );
}
