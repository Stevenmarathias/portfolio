import type { Metadata } from "next";
import CaseLayout, { Section } from "@/components/CaseLayout";
import { Formation, PointPipeline, ShapeFix, TierLadder } from "@/components/charts";

export const metadata: Metadata = {
  title: "Catch Point Analytics",
  description: "A public NFL analytics site covering 1999–2025, with win-probability replays, formation lineups and Catch Radius Pressure built in.",
};

export default function Page() {
  return (
    <CaseLayout
      slug="catch-point-analytics"
      title="Catch Point Analytics"
      dek="Research nobody can click on doesn't change how anyone watches football. So I built a public stats site around Catch Radius Pressure, covering every game from 1999 to 2025."
      meta={[
        ["Role", "Solo: data, backend, frontend"],
        ["Coverage", "27 seasons, 7,000+ games"],
        ["Status", "Live"],
        ["Stack", "Python, FastAPI, DuckDB, React"],
      ]}
      links={[{ href: "https://catch-point-analytics.fly.dev", label: "Visit the site" }]}
      glance={{
        problem: "Advanced NFL metrics live in notebooks and papers. Fans, analysts and recruiters can't explore them game by game.",
        approach: "A Python ETL pipeline from four sources into DuckDB, served by FastAPI to a React site, with every number labeled by where it came from.",
        outcome: "A live site covering 27 seasons, with about 99% of 22,500+ starter records matched to player IDs and zero malformed lineups.",
      }}
    >
      <Section title="Why build it">
        <p>The idea came from a Celtics live win-probability dashboard my brother built for his MSBA research. I wanted the football version, powered by my own metric, and I wanted it to go deeper than one season: a full stats site with standard numbers, advanced metrics, and room for new ones.</p>
        <p>That set two requirements. The site had to cover every game back to 1999, long before player tracking existed. And it had to be honest about which numbers are measured and which are inferred, because the data gets thinner the further back you go.</p>
      </Section>

      <Section title="What's on the site">
        <ul>
          <li><strong>Game pages</strong> with win-probability replays, comeback tracking, and per-play expected catch probability from the Catch Radius Pressure model.</li>
          <li><strong>Starting lineups in real formation</strong> for offense, defense and special teams, drawn as clickable player cards.</li>
          <li><strong>Player pages</strong> with contract details and each receiver&apos;s finishing, archetype and leverage numbers.</li>
          <li><strong>Leaderboards</strong>: a catch-rate-over-expected board with six views, plus a receiver archetype quadrant with a small-sample toggle.</li>
        </ul>
      </Section>

      <Section title="Architecture">
        <figure className="figure chart-fig" data-chart="">
          <PointPipeline />
          <figcaption>Python scrapers and derive scripts write to DuckDB. A FastAPI backend serves it to the React front end. The research stays in its own repository, and the site syncs a snapshot of its outputs.</figcaption>
        </figure>
        <h3>Design by era</h3>
        <p>Play-by-play data covers 1999 to today, but player tracking only exists for 2023 in this project. Instead of limiting the site to one season, I tiered it by era. Tracking-based plays are badged as <strong>verified positions</strong>. For older seasons, play animations are rebuilt from play-by-play facts (down and distance, pass location and depth, credited defenders) with interpolated motion, and labeled <strong>schematic</strong>.</p>
        <h3>Research and product stay separate</h3>
        <p>The Catch Radius Pressure repository is the version cited in my practicum paper, so I kept it stable. The site imports its outputs as an upstream snapshot through a sync script, then derives its own tables for catch probability, leverage plays, downfield CROE and archetypes.</p>
      </Section>

      <Section title="The hard part: who started?">
        <p>Showing 22 starters for every game since 1999 sounds simple. No single free source covers every season, and the sources that exist disagree. I built a <strong>tiered resolver</strong>: each game takes its lineup from the most trustworthy source available, and every player card records which tier it came from.</p>
        <figure className="figure chart-fig" data-chart="">
          <TierLadder />
          <figcaption>Lineup sources in priority order. Lineups rebuilt from play-by-play credits get a dashed border on the site, so a visitor can always tell a verified starter from an inferred one.</figcaption>
        </figure>
        <h3>Getting the data</h3>
        <ul>
          <li><strong>Pro Football Reference</strong> blocked direct scraping, so I pulled all 518 boxscores from 1999–2000 through the Wayback Machine. That produced 22,525 starter rows, about 99% matched to player IDs, with roughly 274 rare backups logged for manual review.</li>
          <li>Extending that to every season kept failing. Wayback blocked the front door by IP, so I added a mode that looks snapshots up through its CDX index, with backoff that respects the server&apos;s retry instructions and a cap on denials.</li>
          <li>The long runs still died silently. A per-game watchdog, retry logging and full tracebacks exposed the real cause: uncaught network timeouts were ending the whole run. Every failure became a skip for that one game instead.</li>
          <li>Then I found a better source. <strong>ESPN&apos;s API</strong> covers 1999–2025 with 22 starters per game and no bot-blocking. One 2.4-hour scrape pulled 7,222 games with only 43 server errors to retry, and it became the top tier. The Wayback data stayed on as a second source to verify against.</li>
        </ul>
      </Section>

      <Section title="Making lineups look like football">
        <p>A list of 22 names isn&apos;t a lineup. The layout is fully data-driven: rows adapt to the real personnel (3-4, 4-3, nickel), receivers split out wide beside the line, and the quarterback and backs line up behind the center by construction. Unknown position codes route to the nearest group, and a small assignment step gives every player a distinct slot label without ever dropping one.</p>
        <figure className="figure chart-fig" data-chart="">
          <Formation />
          <figcaption>Schematic of the formation layout. Each box is a clickable player card on the live site.</figcaption>
        </figure>
        <h3>Data quality passes</h3>
        <ul>
          <li><strong>Position-aware backfill.</strong> Solo positions like QB and kicker never duplicate across sources, groups only fill in when they&apos;re short, and a missing player shows as missing instead of being padded with the wrong position.</li>
          <li><strong>Specialists in the wrong group.</strong> Reclassifying the &ldquo;H&rdquo; code as the holder on special teams fixed 99% of those cases.</li>
          <li><strong>Missing quarterbacks.</strong> Recovering them from play-by-play credits cut the gaps from 306 games to 26. The rest can&apos;t be recovered from the data, so they stay honestly blank.</li>
        </ul>
        <figure className="figure chart-fig" data-chart="">
          <ShapeFix />
          <figcaption>Games with a malformed starting lineup, before and after the position-aware pass.</figcaption>
        </figure>
      </Section>

      <Section title="A bug worth telling">
        <p>For a day, pages worked in the terminal and failed in the browser. The same endpoint returned 200 and then 500 seconds apart. The cause turned out to be lock contention in DuckDB from leftover database connections, not the front end at all. Fixing connection handling brought the leaders page and every dropdown back, and taught me to check the data layer first when a symptom looks random.</p>
      </Section>

      <Section title="Results">
        <div className="callouts">
          <div><b>27</b><span>seasons live, 1999 through 2025</span></div>
          <div><b>~99%</b><span>of 22,500+ starter records matched to unique player IDs</span></div>
          <div><b>1,433 → 0</b><span>games with lineup shape errors</span></div>
        </div>
      </Section>

      <Section title="What I learned">
        <p>Most of the work in an analytics product is data plumbing, and most of the trust comes from being honest about where each number came from. Labeling source tiers and schematic plays costs almost nothing, and it makes the verified data more believable.</p>
        <p>I also learned when to stop fighting a source. Weeks of scraper hardening were worth it for what they taught me about failure handling, but the right move in the end was finding a better source.</p>
      </Section>
    </CaseLayout>
  );
}
