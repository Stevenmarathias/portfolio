"use client";

// Adapted from ObsidianUI's smooth-scroll (MIT, obsidianui.dev).
// Changes: in-page anchor links glide with an offset for the fixed nav, and Lenis restarts per route.
import { type ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import "lenis/dist/lenis.css";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let generation = 0;
    let instance: Lenis | null = null;
    let frame: number | null = null;

    const stop = () => {
      generation++;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      instance?.destroy();
      instance = null;
    };

    const update = async () => {
      stop();
      if (disposed || preference.matches) return;
      const current = generation;
      try {
        const LenisClass = (await import("lenis")).default;
        if (disposed || preference.matches || current !== generation) return;
        instance = new LenisClass({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          anchors: { offset: -72 },
          allowNestedScroll: true,
        });
        const raf = (time: number) => {
          if (disposed || !instance || current !== generation) return;
          instance.raf(time);
          frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);
      } catch {
        // Native scrolling still works if Lenis fails to load.
      }
    };

    void update();
    preference.addEventListener("change", update);
    return () => {
      disposed = true;
      preference.removeEventListener("change", update);
      stop();
    };
  }, [pathname]);

  return <>{children}</>;
}
