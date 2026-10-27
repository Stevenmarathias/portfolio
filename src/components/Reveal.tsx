"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Fades in every [data-reveal] element, and plays every [data-chart], as it scrolls into view. */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));

    // charts draw themselves once most of the figure is on screen
    const charts = Array.from(document.querySelectorAll<HTMLElement>("[data-chart]:not(.play):not([data-chart='manual'])"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) charts.forEach((c) => c.classList.add("play"));
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("play");
            co.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    if (!reduce) charts.forEach((c) => co.observe(c));
    return () => {
      io.disconnect();
      co.disconnect();
    };
  }, [pathname]);

  return null;
}
