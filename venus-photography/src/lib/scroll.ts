"use client";

import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, offset: 0 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}

export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.classList.toggle("is-locked", locked);
}

// The preloader announces when the shutter has opened so intro animations
// can start on cue instead of playing hidden behind it.
let loaded = false;
const listeners = new Set<() => void>();

export function markLoaded() {
  loaded = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onLoaded(fn: () => void) {
  if (loaded) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
