"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["box scores", "stat sheets", "highlight reels"];

type V = { x: number; y: number };
type Play = {
  qb: V;
  wrStart: V;
  catchPt: V;
  defs: { start: V; end: V }[];
};

function rand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** A play in field units (yards): x runs downfield, y across. */
function makePlay(seed: number): Play {
  const r = rand(seed);
  const qb = { x: 4, y: 26 + r() * 4 };
  const catchPt = { x: 20 + r() * 12, y: 10 + r() * 30 };
  const wrStart = { x: 9, y: catchPt.y + (r() - 0.5) * 26 };
  const n = 2 + Math.floor(r() * 2);
  const tight = r(); // how tight coverage is on this play
  const defs = Array.from({ length: n }, (_, i) => {
    const ang = (i / n) * Math.PI * 2 + r() * 1.2;
    const dist = 1.2 + (1 - tight) * 4.5 + r() * 2;
    const end = { x: catchPt.x + Math.cos(ang) * dist, y: catchPt.y + Math.sin(ang) * dist };
    const start = { x: end.x + 6 + r() * 8, y: end.y + (r() - 0.5) * 16 };
    return { start, end };
  });
  return { qb, wrStart, catchPt, defs };
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => 1 - Math.pow(1 - t, 2.2);

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const [word, setWord] = useState(0);
  const [out, setOut] = useState(false);

  // rotating headline word
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t2: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setOut(true);
      t2 = setTimeout(() => {
        setWord((w) => (w + 1) % WORDS.length);
        setOut(false);
      }, 350);
    }, 2800);
    return () => {
      clearInterval(id);
      clearTimeout(t2);
    };
  }, []);

  // catch-point scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, dpr = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const PLAY = 3400, HOLD = 1500;
    let playNo = 1;
    let play = makePlay(7);
    let t0 = performance.now();
    let raf = 0;
    let running = true;

    const field = () => {
      const narrow = W < 760;
      const x0 = narrow ? W * 0.04 : W * 0.4;
      const x1 = W * 0.98;
      const y0 = H * (narrow ? 0.1 : 0.12);
      const y1 = H * (narrow ? 0.6 : 0.9);
      const u = (x1 - x0) / 40; // 40 yards across the frame
      const yards = (y1 - y0) / u;
      return { x0, x1, y0, y1, u, yards };
    };

    const draw = (now: number) => {
      const f = field();
      const P = (v: V) => ({ x: f.x0 + v.x * f.u, y: f.y0 + (v.y / 53) * (f.y1 - f.y0) });
      const el = now - t0;
      const t = Math.min(1, el / PLAY);

      ctx.clearRect(0, 0, W, H);

      // floodlights
      const g1 = ctx.createRadialGradient(W * 0.86, -H * 0.1, 0, W * 0.86, -H * 0.1, H * 1.1);
      g1.addColorStop(0, "rgba(255,214,140,0.16)");
      g1.addColorStop(1, "rgba(255,214,140,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, W, H);
      const g2 = ctx.createRadialGradient(W * 0.55, H * 1.1, 0, W * 0.55, H * 1.1, H * 0.9);
      g2.addColorStop(0, "rgba(76,195,138,0.10)");
      g2.addColorStop(1, "rgba(76,195,138,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, W, H);

      // yard lines + hashes
      ctx.lineWidth = 1;
      for (let yd = 0; yd <= 40; yd += 5) {
        const x = f.x0 + yd * f.u;
        ctx.strokeStyle = yd % 10 === 0 ? "rgba(238,242,247,0.10)" : "rgba(238,242,247,0.05)";
        ctx.beginPath();
        ctx.moveTo(x, f.y0 - 40);
        ctx.lineTo(x, f.y1 + 40);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(238,242,247,0.08)";
      for (let yd = 0; yd <= 40; yd++) {
        const x = f.x0 + yd * f.u;
        for (const fy of [0.37, 0.63]) {
          const y = f.y0 + fy * (f.y1 - f.y0);
          ctx.beginPath();
          ctx.moveTo(x, y - 3);
          ctx.lineTo(x, y + 3);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "rgba(238,242,247,0.06)";
      ctx.font = `800 ${Math.round(f.u * 2.6)}px "Big Shoulders Display", Impact, sans-serif`;
      ctx.textAlign = "center";
      [10, 20, 30].forEach((yd, i) => {
        ctx.fillText(["3 0", "4 0", "5 0"][i], f.x0 + yd * f.u, f.y1 - f.u * 0.6);
      });

      // positions
      const wrT = ease(t);
      const wr = { x: lerp(play.wrStart.x, play.catchPt.x, wrT), y: lerp(play.wrStart.y, play.catchPt.y, wrT) };
      const defs = play.defs.map((d) => {
        const dt = ease(Math.max(0, (t - 0.1) / 0.9));
        return { x: lerp(d.start.x, d.end.x, dt), y: lerp(d.start.y, d.end.y, dt) };
      });

      // pressure: proximity × closing, 0..1
      let crp = 0;
      play.defs.forEach((d, i) => {
        const dx = defs[i].x - wr.x, dy = defs[i].y - wr.y;
        const dist = Math.hypot(dx, dy);
        crp += Math.max(0, 1 - dist / 6) * 0.62;
      });
      crp = Math.min(0.99, crp);

      // trails
      ctx.setLineDash([3, 6]);
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = "rgba(76,195,138,0.55)";
      ctx.beginPath();
      let p = P(play.wrStart);
      ctx.moveTo(p.x, p.y);
      p = P(wr);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,122,92,0.4)";
      play.defs.forEach((d, i) => {
        ctx.beginPath();
        const a = P(d.start), b = P(defs[i]);
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // ball arc
      const bt = Math.max(0, (t - 0.28) / 0.72);
      const qbP = P(play.qb), cP = P(play.catchPt);
      const ctrl = { x: (qbP.x + cP.x) / 2, y: Math.min(qbP.y, cP.y) - f.u * 9 };
      if (t > 0.28) {
        ctx.strokeStyle = "rgba(238,242,247,0.18)";
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.moveTo(qbP.x, qbP.y);
        ctx.quadraticCurveTo(ctrl.x, ctrl.y, cP.x, cP.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // catch radius rings
      const wP = P(wr);
      const R = f.u * 2.2;
      const hot = crp;
      const ringCol = `rgba(${Math.round(lerp(76, 255, hot))},${Math.round(lerp(195, 194, hot))},${Math.round(lerp(138, 75, hot))},`;
      ctx.fillStyle = ringCol + (0.08 + hot * 0.14) + ")";
      ctx.beginPath();
      ctx.arc(wP.x, wP.y, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = ringCol + "0.85)";
      ctx.lineWidth = 1.6;
      ctx.stroke();
      ctx.strokeStyle = ringCol + "0.25)";
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.arc(wP.x, wP.y, R * 2.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // qb
      ctx.fillStyle = "rgba(238,242,247,0.55)";
      ctx.beginPath();
      ctx.arc(qbP.x, qbP.y, 4, 0, Math.PI * 2);
      ctx.fill();

      // defenders
      defs.forEach((d) => {
        const dp = P(d);
        ctx.strokeStyle = "#FF7A5C";
        ctx.lineWidth = 2.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(dp.x - 6, dp.y - 6);
        ctx.lineTo(dp.x + 6, dp.y + 6);
        ctx.moveTo(dp.x + 6, dp.y - 6);
        ctx.lineTo(dp.x - 6, dp.y + 6);
        ctx.stroke();
      });

      // receiver
      ctx.fillStyle = "#4CC38A";
      ctx.beginPath();
      ctx.arc(wP.x, wP.y, 7, 0, Math.PI * 2);
      ctx.fill();

      // ball
      if (t > 0.28) {
        const bx = (1 - bt) * (1 - bt) * qbP.x + 2 * (1 - bt) * bt * ctrl.x + bt * bt * cP.x;
        const by = (1 - bt) * (1 - bt) * qbP.y + 2 * (1 - bt) * bt * ctrl.y + bt * bt * cP.y;
        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(-0.5);
        ctx.fillStyle = "#EEF2F7";
        ctx.beginPath();
        ctx.ellipse(0, 0, 6, 3.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // label
      ctx.font = `500 ${W < 760 ? 11 : 12}px "IBM Plex Mono", monospace`;
      ctx.textAlign = "left";
      ctx.fillStyle = "rgba(238,242,247,0.9)";
      ctx.fillText(`CRP ${crp.toFixed(2)}`, wP.x + R + 8, wP.y - 4);
      if (t >= 1) {
        ctx.fillStyle = hot > 0.55 ? "#FFC24B" : "#4CC38A";
        ctx.fillText(hot > 0.55 ? "CONTESTED" : "OPEN", wP.x + R + 8, wP.y + 12);
      }

      if (readoutRef.current) {
        readoutRef.current.textContent = `Simulated play ${playNo} · catch radius pressure ${crp.toFixed(2)}`;
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      if (now - t0 > PLAY + HOLD) {
        playNo += 1;
        play = makePlay(playNo * 97 + 11);
        t0 = now;
      }
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    if (reduce) {
      t0 = performance.now() - PLAY;
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onResize = () => {
      resize();
      if (reduce) draw(t0 + PLAY);
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(([e]) => {
      if (reduce) return;
      if (e.isIntersecting && !running) {
        running = true;
        t0 = performance.now();
        raf = requestAnimationFrame(loop);
      } else if (!e.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(canvas);

    // redraw once fonts arrive so field numbers use the display face
    document.fonts?.ready.then(() => reduce && draw(t0 + PLAY));

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  return (
    <section className="hero" id="top">
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
      <div className="wrap hero-inner">
        <p className="kicker">
          <span className="live" />
          Boston, MA · MSBA, Boston University · Open to work Jan 2027
        </p>
        <h1>
          I build metrics for the moments{" "}
          <span className={out ? "flip out" : "flip"} aria-live="off">
            {WORDS[word]}
          </span>{" "}
          miss.
        </h1>
        <p className="lede">
          Business analyst turned sports and marketing analytics builder. I invented{" "}
          <strong>Catch Radius Pressure</strong>, a new NFL tracking metric, and turned it into a public stats site.
          Behind me: two years of pricing and operations analytics in Cambridge.
        </p>
        <div className="ctas">
          <a className="btn primary" href="#work">
            See the work ↓
          </a>
          <a className="btn" href="/Steven_Marathias_Resume.pdf" target="_blank" rel="noopener">
            Résumé ↗
          </a>
        </div>
      </div>
      <div className="hero-readout" ref={readoutRef} aria-hidden="true">
        Simulated play 1
      </div>
    </section>
  );
}
