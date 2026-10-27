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
