"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";
import { Draggable } from "gsap/Draggable";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(
    ScrollTrigger,
    SplitText,
    Flip,
    Draggable,
    DrawSVGPlugin,
    InertiaPlugin,
    useGSAP,
  );
  gsap.defaults({ ease: "power3.out" });
}

export { gsap, ScrollTrigger, SplitText, Flip, Draggable, useGSAP };

export const DESKTOP = "(min-width: 900px)";
export const MOBILE = "(max-width: 899px)";
