"use client";

// Draws a gold line down the résumé timeline as you scroll, and lights each row's marker as the line reaches it.
import { useEffect, useRef, type ReactNode } from "react";

export default function TimelineRail({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rows = () => Array.from(el.querySelectorAll<HTMLElement>(":scope > .tl"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      rows().forEach((r) => r.classList.add("lit"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const reach = window.innerHeight * 0.62 - rect.top; // how far the line has travelled, in px
      const p = Math.max(0, Math.min(1, reach / rect.height));
      el.style.setProperty("--p", p.toFixed(4));
      rows().forEach((r) => r.classList.toggle("lit", r.getBoundingClientRect().top - rect.top + 34 <= reach));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    el.addEventListener("toggle", onScroll, true); // rows change height when opened
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      el.removeEventListener("toggle", onScroll, true);
    };
  }, []);

  return (
    <div className="timeline" ref={ref}>
      <span className="tl-rail" aria-hidden="true" />
      {children}
    </div>
  );
}
