"use client";

// Sticky-scroll project list: the text blocks scroll on the left while the chart panel on the right
// stays pinned and swaps to the project in view. Phones get each chart inline instead.
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Arrow from "@/components/Arrow";

export type WorkItem = {
  href: string;
  cta?: string;
  title: string;
  pills: ReactNode;
  body: ReactNode;
  result: ReactNode;
  tags: string[];
  vizLabel: string;
  viz: ReactNode;
};

export default function WorkScroll({ items }: { items: WorkItem[] }) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState(false);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);

  // charts in the pinned panel only start drawing once the section is on screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-42% 0px -42% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="ws" ref={root}>
      <div className="ws-list">
        {items.map((it, i) => (
          <article
            key={it.href}
            className={i === active ? "ws-item on" : "ws-item"}
            data-index={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
          >
            <div className="work-num">{it.pills}</div>
            <h3>
              <Link href={it.href}>{it.title}</Link>
            </h3>
            <p>{it.body}</p>
            <p className="result"><span className="result-k">Result</span>{it.result}</p>
            <div className="tags">{it.tags.map((t) => <span key={t}>{t}</span>)}</div>
            <div className="ws-inline" data-chart="">
              <p className="viz-label">{it.vizLabel}</p>
              {it.viz}
            </div>
            <Link className="read" href={it.href}>
              {it.cta ?? "Read the case study"} <Arrow dir={it.href.startsWith("/#") ? "down" : "right"} />
            </Link>
          </article>
        ))}
      </div>
      <div className="ws-panel">
        <div className="ws-stage">
          {items.map((it, i) => (
            <div
              key={it.href}
              className={["ws-viz", i === active ? "on" : "", i === active && seen ? "play" : ""].join(" ")}
              data-chart="manual"
              aria-hidden={i !== active}
            >
              <p className="viz-label">{it.vizLabel}</p>
              {it.viz}
            </div>
          ))}
          <div className="ws-dots" aria-hidden="true">
            {items.map((it, i) => <span key={it.href} className={i === active ? "on" : ""} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
