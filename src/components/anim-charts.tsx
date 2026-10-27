/* Animated, data-driven charts. Each renders as plain SVG at its final state; when its figure
   scrolls into view the Reveal observer adds .play and CSS draws it in (see globals.css "chart motion").
   Data comes from Steven's project repos via src/data/charts.json. */
import type { CSSProperties } from "react";
import data from "@/data/charts.json";

const mono = "var(--font-mono), monospace";
const d = (i: number) => ({ "--i": i } as CSSProperties);

/* ───────────── Coverage Shadow ───────────── */

const PRED_ORDER = ["Avg Shadow", "Role-adjusted Shadow", "Cmp % allowed", "Yds/target allowed"];

function ForestPanel({ outcome, title }: { outcome: "cmp" | "yds"; title: string }) {
  const rows = data.csPredictive.filter((r) => r.outcome === outcome);
  const x = (v: number) => 150 + (v + 0.3) * 330; // -0.3..0.6
  return (
    <svg viewBox="0 0 470 300" role="img" aria-label={`${title}: correlation of each first-half metric with the second-half outcome, with 95% intervals`}>
      <text x="150" y="16" fontFamily={mono} fontSize="11" fill="var(--chalk)">{title}</text>
      {[-0.2, 0, 0.2, 0.4].map((t) => (
        <g key={t}>
          <path d={`M${x(t)} 30 V262`} stroke={t === 0 ? "var(--chalk-faint)" : "var(--rule)"} strokeDasharray={t === 0 ? "" : "2 4"} className="ch-draw" pathLength={1} style={d(0)} />
          <text x={x(t)} y="280" textAnchor="middle" fontFamily={mono} fontSize="10" fill="var(--chalk-faint)">{t.toFixed(1)}</text>
        </g>
      ))}
      {PRED_ORDER.map((p, i) => {
        const y = 62 + i * 58;
        const hl = p === "Cmp % allowed";
        return (
          <g key={p}>
            <text x="0" y={y + 9} fontFamily={mono} fontSize="10.5" fill={hl ? "var(--chalk)" : "var(--chalk-dim)"}>{p}</text>
            {(["wk", "oe"] as const).map((s, k) => {
              const r = rows.find((q) => q.pred === p && q.split === s)!;
              const yy = y + k * 16;
              const col = s === "wk" ? "var(--turf)" : "var(--lamp)";
              return (
                <g key={s}>
                  <rect className="ch-cx" style={d(i * 2 + k + 2)} x={x(r.lo)} y={yy - 1} width={x(r.hi) - x(r.lo)} height="2" fill={col} opacity="0.8" />
                  <circle className="ch-pop" style={d(i * 2 + k + 4)} cx={x(r.r)} cy={yy} r="5" fill={col} />
                </g>
              );
            })}
          </g>
        );
      })}
      <text x={x(0) + 4} y="296" fontFamily={mono} fontSize="9" fill="var(--chalk-faint)">right of 0 = predicts the right way</text>
    </svg>
  );
}

export function CsForest() {
  return (
    <>
      <div className="chart-pair">
        <ForestPanel outcome="cmp" title="2nd-half completion % allowed" />
        <ForestPanel outcome="yds" title="2nd-half yards per target" />
      </div>
      <div className="chart-key">
        <span><i style={{ background: "var(--turf)" }} />weeks 1–9 → 10–18</span>
        <span><i style={{ background: "var(--lamp)" }} />odd → even weeks</span>
        <span>dot = correlation · bar = 95% interval</span>
      </div>
    </>
  );
}

export function CsReliability() {
  const bars = [
    { l: "Avg Shadow", v: 0.6, c: "var(--turf)" },
    { l: "SOE per contest", v: 0.1, c: "var(--flag)" },
    { l: "Cmp % allowed", v: 0.61, c: "var(--chalk-dim)" },
  ];
  const x = (v: number) => 150 + v * 360;
  const gates = data.csGates;
  const gx = (i: number) => 40 + i * 92;
  const gy = (v: number) => 230 - (v - 0.5) * 520; // 0.5..0.8
  const line = gates.map((g, i) => `${i ? "L" : "M"}${gx(i)} ${gy(g.rel)}`).join(" ");
  return (
    <div className="chart-pair">
      <svg viewBox="0 0 470 210" role="img" aria-label="Full-season reliability: average Shadow 0.60, SOE 0.10, completion percentage allowed 0.61">
        <text x="0" y="16" fontFamily={mono} fontSize="11" fill="var(--chalk)">Full-season reliability, cornerbacks</text>
        {[0, 0.25, 0.5, 0.75].map((t) => (
          <g key={t}>
            <path d={`M${x(t)} 32 V168`} stroke="var(--rule)" strokeDasharray="2 4" />
            <text x={x(t)} y="186" textAnchor="middle" fontFamily={mono} fontSize="10" fill="var(--chalk-faint)">{t.toFixed(2)}</text>
          </g>
        ))}
        {bars.map((b, i) => (
          <g key={b.l}>
            <text x="0" y={62 + i * 44} fontFamily={mono} fontSize="10.5" fill="var(--chalk-dim)">{b.l}</text>
            <rect className="ch-bx" style={d(i * 2)} x="150" y={48 + i * 44} width={x(b.v) - 150} height="20" rx="2" fill={b.c} />
            <text className="ch-fade" style={d(i * 2 + 6)} x={x(b.v) + 8} y={62 + i * 44} fontFamily={mono} fontSize="11" fill="var(--chalk)">{b.v.toFixed(2)}</text>
          </g>
        ))}
        <text x="150" y="204" fontFamily={mono} fontSize="9" fill="var(--chalk-faint)">odd vs even weeks, scaled to a full season</text>
      </svg>
      <svg viewBox="0 0 470 270" role="img" aria-label="Average Shadow reliability rises with sample size, from 0.57 at 25 snaps per half to 0.76 at 150">
        <text x="0" y="16" fontFamily={mono} fontSize="11" fill="var(--chalk)">Avg Shadow reliability vs sample size</text>
        {[0.5, 0.6, 0.7, 0.8].map((t) => (
          <g key={t}>
            <path d={`M30 ${gy(t)} H430`} stroke="var(--rule)" strokeDasharray="2 4" />
            <text x="0" y={gy(t) + 3} fontFamily={mono} fontSize="10" fill="var(--chalk-faint)">{t.toFixed(1)}</text>
          </g>
        ))}
        <path className="ch-draw" style={d(1)} pathLength={1} d={line} fill="none" stroke="var(--turf)" strokeWidth="2.5" />
        {gates.map((g, i) => (
          <g key={g.gate}>
            <circle className="ch-pop" style={d(i + 4)} cx={gx(i)} cy={gy(g.rel)} r="5" fill="var(--turf)" />
            <text className="ch-fade" style={d(i + 6)} x={gx(i)} y={gy(g.rel) - 12} textAnchor="middle" fontFamily={mono} fontSize="10" fill="var(--chalk)">{g.rel.toFixed(2)}</text>
            <text x={gx(i)} y="252" textAnchor="middle" fontFamily={mono} fontSize="9.5" fill="var(--chalk-faint)">{g.gate.replace(">=", "≥").replace(" snaps/half", "")}</text>
          </g>
        ))}
        <text x="40" y="268" fontFamily={mono} fontSize="9" fill="var(--chalk-faint)">minimum coverage snaps per half</text>
      </svg>
    </div>
  );
}

/* ───────────── Catch Radius Pressure ───────────── */

export function CrpTiers() {
  const tiers = [
    { l: "Open", v: 79.6, n: "8,071" },
    { l: "Low", v: 65.4, n: "3,141" },
    { l: "Moderate", v: 51.1, n: "2,371" },
    { l: "High", v: 45.6, n: "454" },
    { l: "Extreme", v: 37.5, n: "71" },
  ];
  const cols = ["var(--turf)", "#8CC36B", "#D9C24F", "var(--lamp)", "var(--flag)"];
  const y = (v: number) => 210 - v * 2.2;
  return (
    <svg viewBox="0 0 520 260" role="img" aria-label="Completion rate by pressure tier: open 79.6%, low 65.4%, moderate 51.1%, high 45.6%, extreme 37.5%">
      {[0, 25, 50, 75].map((t) => (
        <g key={t}>
          <path d={`M44 ${y(t)} H510`} stroke="var(--rule)" strokeDasharray="2 4" />
          <text x="36" y={y(t) + 3} textAnchor="end" fontFamily={mono} fontSize="10" fill="var(--chalk-faint)">{t}%</text>
        </g>
      ))}
      {tiers.map((t, i) => {
        const x = 64 + i * 90;
        return (
          <g key={t.l}>
            <rect className="ch-by" style={d(i)} x={x} y={y(t.v)} width="62" height={210 - y(t.v)} rx="3" fill={cols[i]} />
            <text className="ch-fade" style={d(i + 5)} x={x + 31} y={y(t.v) - 8} textAnchor="middle" fontFamily={mono} fontSize="12" fill="var(--chalk)">{t.v}%</text>
            <text x={x + 31} y="228" textAnchor="middle" fontFamily={mono} fontSize="10.5" fill="var(--chalk)">{t.l}</text>
            <text x={x + 31} y="244" textAnchor="middle" fontFamily={mono} fontSize="9.5" fill="var(--chalk-faint)">{t.n} plays</text>
          </g>
        );
      })}
    </svg>
  );
}

export function CrpPresnap() {
  const panels = [
    { t: "Spotting contested throws (AUC)", a: 0.608, b: 0.811, lo: 0.45, hi: 0.9, floor: 0.5, fmt: (v: number) => v.toFixed(3) },
    { t: "Expected pressure, combined R²", a: 0.031, b: 0.253, lo: -0.02, hi: 0.3, floor: 0, fmt: (v: number) => v.toFixed(3) },
  ];
  return (
    <div className="chart-pair">
      {panels.map((p, k) => {
        const y = (v: number) => 200 - ((v - p.lo) / (p.hi - p.lo)) * 160;
        return (
          <svg key={p.t} viewBox="0 0 470 250" role="img" aria-label={`${p.t}: ${p.fmt(p.a)} before the snap, ${p.fmt(p.b)} at the throw`}>
            <text x="0" y="16" fontFamily={mono} fontSize="11" fill="var(--chalk)">{p.t}</text>
            <path d={`M60 ${y(p.floor)} H440`} stroke="var(--flag)" strokeDasharray="4 4" opacity="0.6" />
            <text x="440" y={y(p.floor) - 6} textAnchor="end" fontFamily={mono} fontSize="9.5" fill="var(--flag)">no-skill floor</text>
            <path className="ch-draw" style={d(k * 3 + 1)} pathLength={1} d={`M120 ${y(p.a)} L370 ${y(p.b)}`} stroke="var(--lamp)" strokeWidth="3" fill="none" />
            <circle className="ch-pop" style={d(k * 3)} cx="120" cy={y(p.a)} r="8" fill="var(--ground-2)" stroke="var(--lamp)" strokeWidth="3" />
            <circle className="ch-pop" style={d(k * 3 + 5)} cx="370" cy={y(p.b)} r="9" fill="var(--lamp)" />
            <text className="ch-fade" style={d(k * 3)} x="120" y={y(p.a) - 16} textAnchor="middle" fontFamily={mono} fontSize="13" fill="var(--chalk)">{p.fmt(p.a)}</text>
            <text className="ch-fade" style={d(k * 3 + 6)} x="370" y={y(p.b) - 18} textAnchor="middle" fontFamily={mono} fontSize="15" fontWeight="500" fill="var(--lamp)">{p.fmt(p.b)}</text>
            <text x="120" y="232" textAnchor="middle" fontFamily={mono} fontSize="11" fill="var(--chalk-dim)">Pre-snap</text>
            <text x="370" y="232" textAnchor="middle" fontFamily={mono} fontSize="11" fill="var(--chalk)">At the throw</text>
          </svg>
        );
      })}
    </div>
  );
}

export function CrpImportance() {
  const rows: [string, number][] = [
    ["Separation at release", 0.26],
    ["Closing velocity", 0.029],
    ["Air yards", 0.015],
    ["Every other feature", 0.006],
  ];
  const x = (v: number) => 210 + v * 960;
  return (
    <svg viewBox="0 0 520 190" role="img" aria-label="Permutation importance: separation at release 0.260, closing velocity 0.029, air yards 0.015, every other feature 0.006 or less">
      {rows.map(([l, v], i) => (
        <g key={l}>
          <text x="0" y={32 + i * 40} fontFamily={mono} fontSize="11" fill={i === 0 ? "var(--chalk)" : "var(--chalk-dim)"}>{l}</text>
          <rect className="ch-bx" style={d(i * 2)} x="210" y={18 + i * 40} width={Math.max(3, x(v) - 210)} height="20" rx="2" fill={i === 0 ? "var(--lamp)" : "var(--turf)"} opacity={i === 0 ? 1 : 0.75} />
          <text className="ch-fade" style={d(i * 2 + 4)} x={Math.max(x(v), 213) + 8} y={32 + i * 40} fontFamily={mono} fontSize="11" fill="var(--chalk)">{i === 3 ? "≤ 0.006" : v.toFixed(3)}</text>
        </g>
      ))}
      <text x="210" y="182" fontFamily={mono} fontSize="9.5" fill="var(--chalk-faint)">drop in test log loss when the feature is shuffled</text>
    </svg>
  );
}

export function CrpLeverage() {
  const pts = data.crpLeverage.points;
  const x = (v: number) => 50 + ((v + 3) / 16) * 440; // -3..13
  const y = (v: number) => 220 - v * 200;
  const line = pts.map((p, i) => `${i ? "L" : "M"}${x(p.x).toFixed(1)} ${y(p.y).toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 520 260" role="img" aria-label={`Catch rate rises with receiver leverage, from ${Math.round(pts[0].y * 100)}% at the lowest leverage to ${Math.round(pts[pts.length - 1].y * 100)}% at the highest; league average ${(data.crpLeverage.league * 100).toFixed(1)}%`}>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <g key={t}>
          <path d={`M50 ${y(t)} H500`} stroke="var(--rule)" strokeDasharray="2 4" />
          <text x="42" y={y(t) + 3} textAnchor="end" fontFamily={mono} fontSize="10" fill="var(--chalk-faint)">{Math.round(t * 100)}%</text>
        </g>
      ))}
      {[-2, 0, 2, 4, 6, 8, 10, 12].map((t) => (
        <text key={t} x={x(t)} y="238" textAnchor="middle" fontFamily={mono} fontSize="10" fill="var(--chalk-faint)">{t}</text>
      ))}
      <path d={`M${x(0)} 20 V220`} stroke="var(--chalk-faint)" opacity="0.5" />
      <path d={`M50 ${y(data.crpLeverage.league)} H500`} stroke="var(--lamp)" strokeDasharray="5 4" opacity="0.8" />
      <text x="500" y={y(data.crpLeverage.league) - 6} textAnchor="end" fontFamily={mono} fontSize="9.5" fill="var(--lamp)">league avg {(data.crpLeverage.league * 100).toFixed(1)}%</text>
      <path className="ch-draw" style={d(0)} pathLength={1} d={line} fill="none" stroke="var(--turf)" strokeWidth="2.5" />
      {pts.map((p, i) => (
        <circle key={i} className="ch-pop" style={d(i * 0.6 + 2)} cx={x(p.x)} cy={y(p.y)} r="4.5" fill="var(--turf)" />
      ))}
      <text x="275" y="256" textAnchor="middle" fontFamily={mono} fontSize="9.5" fill="var(--chalk-faint)">leverage margin (yards): receiver&apos;s head start on the nearest defender</text>
    </svg>
  );
}

const QUAD: Record<string, string> = {
  "Trusted contested winner": "var(--turf)",
  "Can't separate": "var(--flag)",
  "Efficient separator": "#6FA8DC",
  "Uncontested filler": "var(--chalk-faint)",
};

// hand-placed labels where neighbours would collide: [dx, dy, anchor]
const LABEL_POS: Record<string, [number, number, "start" | "middle" | "end"]> = {
  "Nico Collins": [-9, -6, "end"],
  "Ja'Marr Chase": [9, 4, "start"],
  "Terry McLaurin": [10, 14, "start"],
  "Cooper Kupp": [-8, -8, "end"],
  "A.J. Brown": [9, 12, "start"],
  "Amon-Ra St. Brown": [9, -7, "start"],
  "Mike Evans": [9, 12, "start"],
  "Quentin Johnston": [-10, 4, "end"],
};

export function CrpArchetypes() {
  const A = data.crpArchetypes;
  const x = (v: number) => 50 + ((v - 0.13) / 0.33) * 450; // 0.13..0.46
  const y = (v: number) => 30 + ((0.21 - v) / 0.38) * 330; // 0.21..-0.17
  const sorted = [...A.players].sort((a, b) => a.x - b.x);
  return (
    <>
      <svg viewBox="0 0 520 400" role="img" aria-label="Receivers plotted by how often they are contested and how much they beat expectations when contested, split into four archetypes">
        {[-0.1, 0, 0.1, 0.2].map((t) => (
          <g key={t}>
            <path d={`M50 ${y(t)} H500`} stroke="var(--rule)" strokeDasharray={t === 0 ? "" : "2 4"} />
            <text x="42" y={y(t) + 3} textAnchor="end" fontFamily={mono} fontSize="10" fill="var(--chalk-faint)">{t > 0 ? "+" : ""}{t.toFixed(1)}</text>
          </g>
        ))}
        {[0.15, 0.25, 0.35, 0.45].map((t) => (
          <text key={t} x={x(t)} y="378" textAnchor="middle" fontFamily={mono} fontSize="10" fill="var(--chalk-faint)">{Math.round(t * 100)}%</text>
        ))}
        <path className="ch-draw" style={d(0)} pathLength={1} d={`M${x(A.medRate)} 24 V366`} stroke="var(--chalk-dim)" strokeDasharray="5 4" />
        <path className="ch-draw" style={d(0)} pathLength={1} d={`M50 ${y(A.medCroe)} H500`} stroke="var(--chalk-dim)" strokeDasharray="5 4" />
        {sorted.map((p, i) => (
          <circle key={p.name} className="ch-pop" style={d(2 + i * 0.12)} cx={x(p.x)} cy={y(p.y)} r={3 + Math.min(5, p.t / 9)} fill={QUAD[p.q]} opacity="0.88" />
        ))}
        {A.players.filter((p) => p.label).map((p) => {
          const [dx, dy, anchor] = LABEL_POS[p.name] ?? [8, -6, "start"];
          return (
            <text key={p.name} className="ch-fade" style={d(12)} x={x(p.x) + dx} y={y(p.y) + dy} textAnchor={anchor} fontFamily={mono} fontSize="9.5" fill="var(--chalk)">{p.name}</text>
          );
        })}
        <text x="275" y="396" textAnchor="middle" fontFamily={mono} fontSize="9.5" fill="var(--chalk-faint)">share of targets that were contested →</text>
        <text x="12" y="200" transform="rotate(-90 12 200)" textAnchor="middle" fontFamily={mono} fontSize="9.5" fill="var(--chalk-faint)">catch rate over expected when contested →</text>
      </svg>
      <div className="chart-key">
        {Object.entries(QUAD).map(([k, c]) => (
          <span key={k}><i style={{ background: c }} />{k}</span>
        ))}
      </div>
    </>
  );
}

/* ───────────── Alone ───────────── */

export function AloneDays() {
  const rows = [
    { l: "Low BMI or weight loss", n: 10, v: 53.5 },
    { l: "Starvation", n: 19, v: 39.0 },
    { l: "Missing family", n: 15, v: 32.3 },
    { l: "Injury or exhaustion", n: 28, v: 29.3 },
    { l: "Illness or food poisoning", n: 12, v: 28.4 },
  ];
  const x = (v: number) => 210 + v * 5.4;
  return (
    <svg viewBox="0 0 540 260" role="img" aria-label="Average days lasted by exit theme: low BMI or weight loss 53.5, starvation 39.0, missing family 32.3, injury or exhaustion 29.3, illness or food poisoning 28.4">
      {[0, 20, 40, 60].map((t) => (
        <g key={t}>
          <path d={`M${x(t)} 10 V220`} stroke="var(--rule)" strokeDasharray="2 4" />
          <text x={x(t)} y="238" textAnchor="middle" fontFamily={mono} fontSize="10" fill="var(--chalk-faint)">{t}</text>
        </g>
      ))}
      {rows.map((r, i) => (
        <g key={r.l}>
          <text x="0" y={30 + i * 42} fontFamily={mono} fontSize="11" fill="var(--chalk)">{r.l}</text>
          <text x="0" y={45 + i * 42} fontFamily={mono} fontSize="9.5" fill="var(--chalk-faint)">{r.n} contestants</text>
          <rect className="ch-bx" style={d(i)} x="210" y={20 + i * 42} width={x(r.v) - 210} height="20" rx="2" fill={i === 0 ? "var(--lamp)" : "var(--turf)"} opacity={i === 0 ? 1 : 0.75} />
          <text className="ch-fade" style={d(i + 5)} x={x(r.v) + 8} y={34 + i * 42} fontFamily={mono} fontSize="11" fill="var(--chalk)">{r.v.toFixed(1)}</text>
        </g>
      ))}
      <text x="210" y="256" fontFamily={mono} fontSize="9.5" fill="var(--chalk-faint)">average days lasted</text>
    </svg>
  );
}

/* ───────────── Coverage Shadow: one play ───────────── */

// Game 2023100111, play 3683 (week 4). Times to ball are exact from outputs/shadow_plays_2023_season.csv.
// Positions at release are read off the repo's matplotlib figure (field yards; x = downfield, y = across), so they are approximate.
const PLAY = {
  passer: { x: 46.4, y: 29.5 },
  ball: { x: 60.6, y: 50.8 },
  target: { x: 62.0, y: 49.9, t: 0.762 },
  receivers: [
    { x: 63.1, y: 9.2 },
    { x: 62.7, y: 17.2 },
    { x: 60.5, y: 23.7 },
  ],
  defenders: [
    { n: "Gilmore", x: 62.5, y: 48.9, t: 0.863, key: true },
    { n: "Kearse", x: 55.9, y: 35.5, t: 3.621 },
    { n: "Bell", x: 63.6, y: 30.3, t: 4.875 },
    { n: "Vander Esch", x: 62.4, y: 24.1, t: 6.216 },
    { n: "Hooker", x: 72.4, y: 23.4, t: 6.905 },
    { n: "Lewis", x: 65.0, y: 18.5, t: 7.518 },
    { n: "Bland", x: 67.2, y: 10.2, t: 9.396 },
  ],
};

export function CsPlay() {
  // field view: across the field left→right, downfield bottom→top (offense moving up)
  const U = 11;
  const X0 = 40, X1 = 78; // downfield yards shown
  const sx = (y: number) => 18 + y * U; // across
  const sy = (x: number) => 18 + (X1 - x) * U; // downfield
  const P = PLAY;
  const ctrl = { x: (sx(P.passer.y) + sx(P.ball.y)) / 2 - 20, y: Math.min(sy(P.passer.x), sy(P.ball.x)) - 70 };
  const lines = [45, 50, 55, 60, 65, 70, 75];
  const num = (x: number) => (x <= 60 ? x - 10 : 110 - x);
  // timeline
  const tx = (t: number) => 120 + t * 32;
  const rows = [{ n: "Target receiver", t: P.target.t, kind: "target" as const }, ...P.defenders.map((df) => ({ n: df.n, t: df.t, kind: df.key ? ("key" as const) : ("def" as const) }))];
  return (
    <div className="play-pair">
      <svg viewBox={`0 0 ${36 + 53.3 * U} ${36 + (X1 - X0) * U}`} role="img" aria-label="Field diagram of the play: the pass travels from the quarterback to the right sideline, where Stephon Gilmore is the only defender close enough to contest it">
        <rect x="18" y="18" width={53.3 * U} height={(X1 - X0) * U} rx="4" fill="#0E2A1E" />
        {lines.map((x, i) => (
          <g key={x}>
            {i % 2 === 0 && <rect x="18" y={sy(x + 5)} width={53.3 * U} height={5 * U} fill="#113222" opacity="0.7" />}
          </g>
        ))}
        {lines.map((x) => (
          <g key={`l${x}`}>
            <path d={`M18 ${sy(x)} H${18 + 53.3 * U}`} stroke="rgba(238,242,247,0.16)" strokeWidth={x % 10 === 0 ? 1.4 : 0.8} />
            {x % 10 === 0 && (
              <>
                <text x={sx(6)} y={sy(x) + 4} textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="15" fill="rgba(238,242,247,0.22)">{num(x)}</text>
                <text x={sx(47.3)} y={sy(x) + 4} textAnchor="middle" fontFamily="var(--font-display), sans-serif" fontWeight="800" fontSize="15" fill="rgba(238,242,247,0.22)">{num(x)}</text>
              </>
            )}
          </g>
        ))}
        {Array.from({ length: X1 - X0 + 1 }, (_, k) => X0 + k).map((x) => (
          <g key={`h${x}`} stroke="rgba(238,242,247,0.14)">
            <path d={`M${sx(23.6) - 3} ${sy(x)} h6`} />
            <path d={`M${sx(29.7) - 3} ${sy(x)} h6`} />
          </g>
        ))}
        {/* paths to the landing spot */}
        {P.defenders.map((df, i) => (
          <path key={`p${df.n}`} className="ch-draw" style={d(4 + i * 0.8)} pathLength={1} d={`M${sx(df.y)} ${sy(df.x)} L${sx(P.ball.y)} ${sy(P.ball.x)}`} stroke={df.key ? "var(--lamp)" : "rgba(255,122,92,0.45)"} strokeWidth={df.key ? 2 : 1.2} strokeDasharray={df.key ? "" : "3 5"} fill="none" />
        ))}
        {/* ball flight */}
        <path className="ch-draw" style={d(1)} pathLength={1} d={`M${sx(P.passer.y)} ${sy(P.passer.x)} Q${ctrl.x} ${ctrl.y} ${sx(P.ball.y)} ${sy(P.ball.x)}`} stroke="var(--chalk)" strokeWidth="1.6" strokeDasharray="1 0" fill="none" opacity="0.85" />
        <g className="ch-pop" style={d(3)}>
          <circle cx={sx(P.ball.y)} cy={sy(P.ball.x)} r="16" fill="rgba(255,194,75,0.12)" stroke="var(--lamp)" strokeDasharray="3 3" />
          <path d={`M${sx(P.ball.y) - 5} ${sy(P.ball.x) - 5} l10 10 m0 -10 l-10 10`} stroke="var(--chalk)" strokeWidth="2.2" strokeLinecap="round" />
        </g>
        {/* players */}
        <rect className="ch-pop" style={d(0)} x={sx(P.passer.y) - 6} y={sy(P.passer.x) - 6} width="12" height="12" rx="2" fill="var(--chalk)" />
        <text className="ch-fade" style={d(0)} x={sx(P.passer.y)} y={sy(P.passer.x) + 22} textAnchor="middle" fontFamily={mono} fontSize="10" fill="var(--chalk-dim)">QB</text>
        {P.receivers.map((r, i) => (
          <circle key={`r${i}`} className="ch-pop" style={d(0.5 + i * 0.3)} cx={sx(r.y)} cy={sy(r.x)} r="6" fill="#7FA7D9" />
        ))}
        <circle className="ch-pop" style={d(2)} cx={sx(P.target.y)} cy={sy(P.target.x)} r="7.5" fill="var(--turf)" stroke="var(--ground)" strokeWidth="2" />
        {P.defenders.map((df, i) => (
          <g key={df.n}>
            {df.key && <circle className="ch-pop" style={d(9)} cx={sx(df.y)} cy={sy(df.x)} r="15" fill="none" stroke="var(--lamp)" strokeWidth="2" />}
            <circle className="ch-pop" style={d(0.8 + i * 0.4)} cx={sx(df.y)} cy={sy(df.x)} r={df.key ? 8 : 6.5} fill={df.key ? "var(--lamp)" : "var(--flag)"} />
            <text className="ch-fade" style={d(5 + i * 0.6)} x={sx(df.y) + (df.key ? -19 : 11)} y={sy(df.x) + (df.key ? -6 : 4)} textAnchor={df.key ? "end" : "start"} fontFamily={mono} fontSize="10" fill={df.key ? "var(--lamp)" : "var(--chalk-dim)"}>
              {df.n}
            </text>
          </g>
        ))}
        <text className="ch-fade" style={d(6)} x={sx(P.target.y) + 13} y={sy(P.target.x) - 10} fontFamily={mono} fontSize="10" fill="var(--turf)">target</text>
      </svg>

      <svg viewBox="0 0 470 430" role="img" aria-label="Race to the ball: the target arrives in 0.76 seconds and Gilmore in 0.86, a catch window of 0.10 seconds. Without Gilmore, the nearest defender is Kearse at 3.62 seconds, so the window would be 2.86 seconds. Gilmore's Shadow is 2.76 seconds.">
        <text x="0" y="16" fontFamily={mono} fontSize="11" fill="var(--chalk)">Race to the landing spot</text>
        <text x="0" y="32" fontFamily={mono} fontSize="9.5" fill="var(--chalk-faint)">seconds from release, at each player&apos;s speed and angle</text>
        {[0, 2, 4, 6, 8, 10].map((t) => (
          <g key={t}>
            <path d={`M${tx(t)} 46 V326`} stroke="var(--rule)" strokeDasharray="2 4" />
            <text x={tx(t)} y="342" textAnchor="middle" fontFamily={mono} fontSize="10" fill="var(--chalk-faint)">{t}s</text>
          </g>
        ))}
        {rows.map((r, i) => {
          const y = 58 + i * 34;
          const col = r.kind === "target" ? "var(--turf)" : r.kind === "key" ? "var(--lamp)" : "var(--flag)";
          return (
            <g key={r.n}>
              <text x="0" y={y + 4} fontFamily={mono} fontSize="10.5" fill={r.kind === "def" ? "var(--chalk-dim)" : "var(--chalk)"}>{r.n}</text>
              <rect className="ch-bx" style={d(2 + i * 0.7)} x="120" y={y - 6} width={tx(r.t) - 120} height="12" rx="2" fill={col} opacity={r.kind === "def" ? 0.55 : 1} />
              <text className="ch-fade" style={d(4 + i * 0.7)} x={tx(r.t) + 7} y={y + 4} fontFamily={mono} fontSize="10" fill="var(--chalk)">{r.t.toFixed(2)}</text>
            </g>
          );
        })}
        {/* window and shadow callouts */}
        <g className="ch-fade" style={d(11)}>
          <path d={`M${tx(P.target.t)} 360 V372 H${tx(0.863)} V360`} stroke="var(--lamp)" fill="none" strokeWidth="1.5" />
          <text x={tx(0.86) + 8} y="374" fontFamily={mono} fontSize="10.5" fill="var(--lamp)">catch window 0.10s</text>
        </g>
        <g className="ch-fade" style={d(14)}>
          <path d={`M${tx(0.863)} 394 V406 H${tx(3.621)} V394`} stroke="var(--turf)" fill="none" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x={tx(3.621) + 8} y="408" fontFamily={mono} fontSize="10.5" fill="var(--turf)">Shadow 2.76s</text>
          <text x="0" y="428" fontFamily={mono} fontSize="9.5" fill="var(--chalk-faint)">remove Gilmore and the next defender is 2.76s further away</text>
        </g>
      </svg>
    </div>
  );
}
