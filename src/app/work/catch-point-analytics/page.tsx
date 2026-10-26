import type { Metadata } from "next";
import CaseLayout, { Section } from "@/components/CaseLayout";
import { Formation, ShapeFix, TierLadder } from "@/components/charts";

export const metadata: Metadata = {
  title: "Catch Point Analytics",
  description: "A public NFL analytics site covering 1999–2025, with win-probability replays, formation lineups and Catch Radius Pressure built in.",
};

export default function Page() {
  return (
    <CaseLayout
      slug="catch-point-analytics"
      eyebrow="Case study 02 · Product and data engineering"
      title="Catch Point Analytics"
      dek="Research nobody can click on doesn't change how anyone watches football. So I built a public stats site around Catch Radius Pressure, covering every game from 1999 to 2025."
      meta={[
        ["Role", "Solo: data, backend, frontend"],
        ["Coverage", "27 seasons, 7,000+ games"],
        ["Status", "Live"],
        ["Stack", "Python, FastAPI, DuckDB, React"],
      ]}
      links={[{ href: "https://catch-point-analytics.fly.dev", label: "Visit the site" }]}
    >
      <Section n="01" title="What it does">
        <p>The idea came from a Celtics live win-probability dashboard my brother built for his own MSBA research. I wanted the football version, powered by my own metric.</p>
        <ul>
          <li><strong>Game pages</strong> with win-probability replays, comeback tracking, and per-play expected catch probability from the CRP model.</li>
          <li><strong>Starting lineups drawn in real formation</strong>, offense, defense and special teams, as player cards you can click into.</li>
          <li><strong>Player pages</strong> with contract details and each receiver&apos;s finishing, archetype and leverage numbers.</li>
          <li><strong>Leaderboards</strong> for CROE across six views, plus a receiver archetype quadrant.</li>
        </ul>
        <p>For seasons before player tracking existed, play animations are rebuilt from play-by-play facts and clearly labeled as schematic. Only the 2023 tracking-based plays are badged as verified positions.</p>
      </Section>

      <Section n="02" title="The hard part: who started?">
        <p>Showing 22 starters for every game since 1999 sounds simple. It isn&apos;t. No single free source covers every season, and the ones that exist disagree. I built a <strong>tiered resolver</strong>: each game takes its lineup from the most trustworthy source available, and every player card records which tier it came from.</p>
        <figure className="figure">
          <TierLadder />
          <figcaption>Lineup sources in priority order. Lineups rebuilt from play-by-play credits get a dashed border on the site, so a visitor can always tell a verified starter from an inferred one.</figcaption>
        </figure>
        <ul>
          <li><strong>ESPN API:</strong> one 2.4-hour scrape pulled 7,222 games across 1999–2025 with 22 starters each, leaving only 43 server errors to mop up.</li>
          <li><strong>Pro Football Reference:</strong> direct scraping was blocked, so I pulled all 518 boxscores from 1999–2000 through the Wayback Machine. That produced 22,525 starter rows, about 99% matched to player IDs, with the rest logged for manual review.</li>
          <li><strong>A scraper that survives the internet:</strong> the long runs kept dying silently. Adding a per-game watchdog, retry logging and tracebacks exposed the real cause, uncaught network timeouts, so every failure became a skip for that one game instead of the end of the run.</li>
        </ul>
      </Section>

      <Section n="03" title="Making lineups look like football">
        <p>A list of 22 names isn&apos;t a lineup. The layout is fully data-driven: rows adapt to the real personnel (3-4, 4-3, nickel), receivers split out wide beside the line, and the quarterback and backs line up behind the center by construction.</p>
        <figure className="figure">
          <Formation />
          <figcaption>Schematic of the formation layout. Each box is a clickable player card on the live site.</figcaption>
        </figure>
        <p>A position-aware backfill made sure solo positions like QB and kicker never duplicate, groups only fill in when short, and a missing player shows as missing instead of padding with the wrong position.</p>
        <figure className="figure">
          <ShapeFix />
          <figcaption>Games with a malformed lineup before and after the position-aware pass. A separate fix recovered missing quarterbacks from play-by-play credits, cutting those gaps from 306 games to 26.</figcaption>
        </figure>
      </Section>

      <Section n="04" title="Results">
        <div className="callouts">
          <div><b>27</b><span>seasons live, 1999 through 2025</span></div>
          <div><b>~99%</b><span>of 22,500+ starter records matched to unique player IDs</span></div>
          <div><b>1,433 → 0</b><span>games with lineup shape errors</span></div>
        </div>
      </Section>

      <Section n="05" title="What I learned">
        <p>Most of the work in an analytics product is data plumbing, and most of the trust comes from being honest about where each number came from. Labeling tiers and schematic plays on the page cost almost nothing and makes the verified data more believable.</p>
      </Section>
    </CaseLayout>
  );
}
