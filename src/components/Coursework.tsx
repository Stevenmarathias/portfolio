"use client";

import { useRef, useState } from "react";
import { coursework } from "@/lib/coursework";
import Link from "next/link";
import Arrow from "@/components/Arrow";

export default function Coursework() {
  const [active, setActive] = useState(coursework.findIndex((c) => c.title.startsWith("Alone")));
  const item = coursework[active];
  const strip = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !strip.current) return;
    drag.current = { down: true, x: e.clientX, left: strip.current.scrollLeft, moved: false };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.down || !strip.current) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) {
      d.moved = true;
      strip.current.classList.add("dragging");
    }
    strip.current.scrollLeft = d.left - dx;
  };
  const onUp = () => {
    drag.current.down = false;
    strip.current?.classList.remove("dragging");
  };

  return (
    <>
      <div
        className="strip"
        ref={strip}
        role="group"
        aria-label="Coursework and side projects"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
      >
        {coursework.map((c, i) => (
          <button
            key={c.title}
            type="button"
            className="strip-card"
            aria-pressed={i === active}
            onClick={(e) => {
              if (drag.current.moved) {
                e.preventDefault();
                drag.current.moved = false;
                return;
              }
              setActive(i);
            }}
          >
            <span className="course">{c.course}</span>
            <span className="title">{c.title}</span>
            <span className="who">{c.who}</span>
          </button>
        ))}
      </div>
      <p className="strip-hint">Drag or scroll the strip, then pick a card.</p>
      <div className="strip-detail" aria-live="polite">
        <h3>{item.title}</h3>
        <p className="sub">{item.course} · {item.who}</p>
        <p>{item.body}</p>
        {item.table && (
          <div className="mini-wrap">
            <table className="mini">
              <thead>
                <tr>{item.table.head.map((h) => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {item.table.rows.map((r) => (
                  <tr key={r[0]}>{r.map((v, j) => <td key={j}>{v}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="detail-links">
          {item.caseHref && (
            <Link className="detail-link" href={item.caseHref}>
              Read the case study <Arrow />
            </Link>
          )}
          {item.link && (
            <a className="detail-link quiet" href={item.link} target="_blank" rel="noopener">
              See the code <Arrow dir="out" />
            </a>
          )}
        </div>
      </div>
    </>
  );
}
