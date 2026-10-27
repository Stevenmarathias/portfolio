/* Small SVG figures drawn from each project's real numbers. Colors come from the theme tokens. */

const mono = "IBM Plex Mono, monospace";

/** Catch-probability model test AUC by version. Axis 0.70–0.90. */
export function AucChart() {
  const x = (v: number) => 110 + (v - 0.7) * 1050;
  const rows = [
    { label: "Calibrated v2", v: 0.792, y: 34 },
    { label: "+ arrival sep.", v: 0.793, y: 70 },
    { label: "+ leverage", v: 0.855, y: 106, hl: true },
  ];
  return (
    <svg viewBox="0 0 340 168" role="img" aria-label="Test AUC: calibrated model 0.792, with arrival separation 0.793, with receiver leverage 0.855">
      <g fontFamily={mono} fontSize="10" fill="var(--chalk-faint)" textAnchor="middle">
        {[0.7, 0.75, 0.8, 0.85, 0.9].map((t) => (
          <g key={t}>
            <line x1={x(t)} y1="14" x2={x(t)} y2="128" stroke="var(--rule)" />
            <text x={x(t)} y="144">{t.toFixed(2)}</text>
          </g>
        ))}
        <text x="215" y="162">test AUC</text>
      </g>
      {rows.map((r) => (
        <g key={r.label}>
          <text x="0" y={r.y + 4} fontSize="11" fill={r.hl ? "var(--chalk)" : "var(--chalk-dim)"} fontFamily={mono} fontWeight={r.hl ? 500 : 400}>
            {r.label}
          </text>
          <line x1="110" y1={r.y} x2={x(r.v)} y2={r.y} stroke={r.hl ? "var(--lamp)" : "var(--rule-strong)"} strokeWidth="2" />
          <circle cx={x(r.v)} cy={r.y} r={r.hl ? 6.5 : 5} fill={r.hl ? "var(--lamp)" : "var(--turf)"} />
          <text x={x(r.v) + 10} y={r.y + 4} fontFamily={mono} fontSize="10.5" fill="var(--chalk)">
            {r.v.toFixed(3)}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Schematic of a starting offense as Catch Point renders it. */
export function Formation() {
  const boxes: [number, number, number, string, boolean?][] = [
    [6, 72, 36, "WR"], [94, 72, 26, "LT"], [122, 72, 26, "LG"], [150, 72, 26, "C", true],
    [178, 72, 26, "RG"], [206, 72, 26, "RT"], [234, 72, 26, "TE"], [278, 72, 36, "WR"],
    [150, 104, 26, "QB"], [150, 136, 26, "RB"],
  ];
  return (
    <svg viewBox="0 0 320 172" role="img" aria-label="A starting offense in formation: two receivers split wide, five linemen, a tight end, quarterback and running back">
      <line x1="0" y1="64" x2="320" y2="64" stroke="var(--lamp)" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="2" y="56" fontFamily={mono} fontSize="9" fill="var(--chalk-faint)">line of scrimmage</text>
      {boxes.map(([bx, by, w, l, hl]) => (
        <g key={l + bx + by}>
          <rect x={bx} y={by} width={w} height="24" rx="3" fill="var(--ground-2)" stroke={hl ? "var(--lamp)" : "var(--turf)"} strokeWidth="1.2" />
          <text x={bx + w / 2} y={by + 15.5} textAnchor="middle" fontFamily={mono} fontSize="9" fill="var(--chalk)">{l}</text>
        </g>
      ))}
      <text x="318" y="168" textAnchor="end" fontFamily={mono} fontSize="9" fill="var(--chalk-faint)">source tier: espn_starter</text>
    </svg>
  );
}

export function SentryFlow() {
  return (
    <div className="flow">
      <div className="flow-row"><span className="chip in">Webcam + mic</span><span className="chip in">YouTube link</span><span className="chip in">Pasted transcript</span></div>
      <div className="flow-row"><span className="arrow">↓</span><span className="chip">Whisper transcription</span></div>
      <div className="flow-row"><span className="arrow">↓</span><span className="chip">Claude, per class session</span></div>
      <div className="flow-row"><span className="arrow">↓</span><span className="chip out">Summary</span><span className="chip out">Quiz</span><span className="chip out">Concept map</span></div>
    </div>
  );
}

/** Lab values as a share of the IOC extra virgin limit (lower is fresher). */
export const elaionLab = [
  { name: "Acidity", value: 0.76, limit: 0.8, unit: "% FFA", d: 2 },
  { name: "Peroxide", value: 8, limit: 20, unit: "meq/kg", d: 0 },
  { name: "K232", value: 1.49, limit: 2.5, unit: "", d: 2 },
  { name: "K270", value: 0.16, limit: 0.22, unit: "", d: 2 },
];

export function ElaionMeters({ rows = elaionLab.slice(1) }: { rows?: typeof elaionLab }) {
  return (
    <>
      {rows.map((r) => (
        <div className="meter" key={r.name}>
          <span>{r.name}</span>
          <div className="track"><div className="fill" style={{ width: `${(r.value / r.limit) * 100}%` }} /></div>
          <code>{r.value.toFixed(r.d)} / {r.limit.toFixed(r.d)}</code>
        </div>
      ))}
    </>
  );
}

/** Before/after bar: games with lineup shape errors. */
export function ShapeFix() {
  return (
    <svg viewBox="0 0 340 120" role="img" aria-label="Games with lineup shape errors fell from 1,433 to 0 after the position-aware backfill">
      <g fontFamily={mono} fontSize="11">
        <text x="0" y="34" fill="var(--chalk-dim)">Before</text>
        <rect x="70" y="20" width="250" height="20" rx="2" fill="var(--flag)" opacity="0.8" />
        <text x="314" y="34" textAnchor="end" fill="var(--ground)" fontWeight="500">1,433 games</text>
        <text x="0" y="78" fill="var(--chalk)">After</text>
        <rect x="70" y="64" width="2" height="20" fill="var(--turf)" />
        <text x="80" y="78" fill="var(--turf)" fontWeight="500">0 games</text>
        <line x1="70" y1="10" x2="70" y2="96" stroke="var(--rule-strong)" />
        <text x="70" y="114" fill="var(--chalk-faint)" fontSize="10">games with a malformed starting lineup</text>
      </g>
    </svg>
  );
}

/** Data-source tiers used to resolve starting lineups. */
export function TierLadder() {
  const tiers = [
    ["espn_starter", "ESPN API · 1999–2025 · 22 starters per game", "var(--lamp)"],
    ["pfr_official", "Pro Football Reference via Wayback · 1999–2000", "var(--turf)"],
    ["depth_chart", "nflverse depth charts · 2001+", "var(--turf)"],
    ["pbp_credit", "rebuilt from play-by-play credits · last resort", "var(--chalk-faint)"],
  ];
  return (
    <svg viewBox="0 0 360 196" role="img" aria-label="Four lineup source tiers in priority order: ESPN starters, PFR official starters, depth charts, play-by-play credits">
      {tiers.map(([k, d, c], i) => (
        <g key={k} transform={`translate(0 ${i * 48})`}>
          <rect x="0" y="4" width="360" height="38" rx="4" fill="var(--ground-3)" stroke="var(--rule)" />
          <rect x="0" y="4" width="4" height="38" fill={c} />
          <text x="16" y="20" fontFamily={mono} fontSize="11" fill="var(--chalk)">{i + 1}. {k}</text>
          <text x="16" y="35" fontFamily={mono} fontSize="9.5" fill="var(--chalk-dim)">{d}</text>
        </g>
      ))}
    </svg>
  );
}

/** Red zone vs midfield contested-catch pressure, as relative multiples. */
export function RedZone() {
  return (
    <svg viewBox="0 0 340 130" role="img" aria-label="Within the same pass-depth bands, red-zone CRP is 1.5 to 2 times midfield, and the contested rate is about 2 times">
      <g fontFamily={mono} fontSize="11">
        <text x="0" y="22" fill="var(--chalk-faint)" fontSize="10">relative to midfield (= 1×)</text>
        <text x="0" y="56" fill="var(--chalk-dim)">CRP</text>
        <rect x="90" y="44" width="100" height="18" fill="var(--rule-strong)" />
        <rect x="190" y="44" width="50" height="18" fill="var(--lamp)" opacity="0.45" />
        <rect x="190" y="44" width="100" height="18" fill="none" stroke="var(--lamp)" strokeDasharray="3 3" />
        <text x="296" y="57" fill="var(--chalk)">1.5–2×</text>
        <text x="0" y="96" fill="var(--chalk-dim)">Contested</text>
        <rect x="90" y="84" width="100" height="18" fill="var(--rule-strong)" />
        <rect x="190" y="84" width="100" height="18" fill="var(--lamp)" opacity="0.75" />
        <text x="296" y="97" fill="var(--chalk)">~2×</text>
        <line x1="190" y1="36" x2="190" y2="110" stroke="var(--chalk-faint)" strokeDasharray="2 3" />
        <text x="190" y="124" textAnchor="middle" fill="var(--chalk-faint)" fontSize="10">midfield</text>
      </g>
    </svg>
  );
}

/** Business results from Steven's résumé, as percentage changes on one 0–20% scale. */
export function ImpactChart() {
  const x = (v: number) => 150 + v * 9; // 1% = 9px, 20% = 180px
  const rows = [
    { label: "Q1 sales", sub: "pricing model · Flask", v: 12, sign: "+", c: "var(--lamp)" },
    { label: "Operating costs", sub: "vendor analysis · Maratech", v: 10, sign: "−", c: "var(--turf)" },
    { label: "Expenses", sub: "cost reports · Neftwerk", v: 15, sign: "−", c: "var(--turf)" },
  ];
  return (
    <svg viewBox="0 0 350 196" role="img" aria-label="Sales up 12% after a new pricing model; operating costs down 10% from vendor analysis; expenses down 15% from cost reports">
      <g fontFamily={mono} fontSize="10" fill="var(--chalk-faint)" textAnchor="middle">
        {[0, 5, 10, 15, 20].map((t) => (
          <g key={t}>
            <line x1={x(t)} y1="8" x2={x(t)} y2="160" stroke="var(--rule)" />
            <text x={x(t)} y="176">{t}%</text>
          </g>
        ))}
      </g>
      {rows.map((r, i) => {
        const y = 22 + i * 50;
        return (
          <g key={r.label}>
            <text x="0" y={y + 6} fontFamily={mono} fontSize="11" fill="var(--chalk)">{r.label}</text>
            <text x="0" y={y + 21} fontFamily={mono} fontSize="9" fill="var(--chalk-faint)">{r.sub}</text>
            <rect x={x(0)} y={y - 4} width={x(r.v) - x(0)} height="16" rx="2" fill={r.c} opacity={i === 0 ? 1 : 0.75} />
            <text x={x(r.v) + 8} y={y + 8} fontFamily={mono} fontSize="11" fill="var(--chalk)">{r.sign}{r.v}%</text>
          </g>
        );
      })}
      <text x="150" y="192" fontFamily={mono} fontSize="9" fill="var(--chalk-faint)">size of change</text>
    </svg>
  );
}
