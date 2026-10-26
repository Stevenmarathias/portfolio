"use client";

import { useState } from "react";
import { coursework } from "@/lib/coursework";

export default function Coursework() {
  const [active, setActive] = useState(3);
  const item = coursework[active];

  return (
    <>
      <div className="strip" role="group" aria-label="Coursework projects">
        {coursework.map((c, i) => (
          <button
            key={c.title}
            type="button"
            className="strip-card"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            <span className="course">{c.course}</span>
            <h4>{c.title}</h4>
            <span className="who">{c.who}</span>
          </button>
        ))}
      </div>
      <div className="strip-detail" aria-live="polite">
        <h4>
          {item.title} · {item.course}
        </h4>
        <p>{item.body}</p>
        {item.table && (
          <div className="mini-wrap">
            <table className="mini">
              <thead>
                <tr>
                  {item.table.head.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.table.rows.map((r) => (
                  <tr key={r[0]}>
                    {r.map((v, j) => (
                      <td key={j}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {item.link && (
          <a className="detail-link" href={item.link} target="_blank" rel="noopener">
            See the code →
          </a>
        )}
      </div>
    </>
  );
}
