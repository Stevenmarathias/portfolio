import type { Metadata } from "next";
import CaseLayout, { ChartFig, Section } from "@/components/CaseLayout";
import { DefDroe, DefQuadrant } from "@/components/anim-charts";

export const metadata: Metadata = {
  title: "NFL Pass Defense Rankings",
  description: "All 32 NFL pass defenses ranked by what they do at the catch point, using player tracking data from the 2023 season.",
};

export default function Page() {
  return (
    <CaseLayout
      slug="defense-rankings"
      title="NFL Pass Defense Rankings"
      dek="Pass defense rankings usually measure what happened: yards, completions, points. I ranked all 32 defenses by what they actually did when the ball arrived."
      meta={[
        ["Role", "Solo: metric, rankings, analysis"],
        ["Data", "13,770 passes · 32 defenses · 2023"],
        ["Builds on", "Catch Radius Pressure"],
        ["Stack", "Python, pandas, matplotlib"],
      ]}
      links={[
        { href: "https://github.com/Stevenmarathias/nfl-defense-rankings", label: "Code" },
        { href: "/work/catch-radius-pressure", label: "The pressure metric" },
      ]}
      glance={{
        problem: "Two defenses can both allow 65% completions, one because it was never near the ball and one because it fought every catch. Outcome stats can't tell them apart.",
        approach: "Score every pass by catch-point pressure, then compare each defense's completions allowed with what its pressure level should have produced.",
        outcome: "A 32-team ranking whose top five matched 2023's best pass defenses, and which tracks EPA allowed (r = −0.64) without using it.",
      }}
    >
      <Section title="The question">
        <p>Standard pass defense rankings rely on outcomes: yards allowed, completion rate, EPA. They tell you <strong>what happened</strong>, but not <strong>what the defense was doing</strong>. I wanted to rank defenses by behavior: how often, and how hard, do their defenders close on the ball when it arrives?</p>
      </Section>

      <Section title="Method">
        <p>For every pass, I scored catch-point pressure: every defender within 3 yards of the landing spot adds pressure, more if he&apos;s close and more if he&apos;s still closing. (The full metric is in the <a href="/work/catch-radius-pressure">Catch Radius Pressure</a> case study.) That gives each defense an average pressure level across its 350 to 514 qualifying pass plays.</p>
        <h3>DROE: defensive rate over expected</h3>
        <p>More pressure means fewer completions, but not one for one. So for each pass I estimated an <strong>expected completion rate</strong> from the league-wide relationship between pressure and completion, using a rolling average over plays sorted by pressure. A team&apos;s DROE is its expected completion rate minus the rate it actually allowed. Positive means the defense finished plays better than its pressure alone would predict.</p>
      </Section>

      <Section title="Defensive identity">
        <ChartFig caption="All 32 defenses, split at the league medians. Up is better: fewer completions allowed. Teams at the top right both crowd the catch point and win there; teams at the bottom left rarely get there.">
          <DefQuadrant />
        </ChartFig>
        <p>Pressure and completions allowed are only loosely related at the team level (r = −0.33), which is the point: pressure is a style, not a guarantee. <strong>Miami</strong> generated the most catch-point pressure in the league and still allowed 74.3% completions. <strong>Cleveland</strong> and the <strong>Rams</strong> were below the median in pressure and still among the hardest teams to complete passes against.</p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Profile</th><th>Teams</th></tr></thead>
            <tbody>
              <tr><td>High pressure, few completions</td><td>ATL, BAL, DAL, KC, NO, NYG, NYJ, PHI, PIT</td></tr>
              <tr><td>Pressure, but still beaten</td><td>ARI, CIN, DET, HOU, JAX, MIA, WAS</td></tr>
              <tr><td>Bend, don&apos;t break</td><td>CAR, CLE, IND, LAR, LAC, NE, TB</td></tr>
              <tr><td>Little pressure, many completions</td><td>BUF, CHI, DEN, GB, LV, MIN, SEA, SF, TEN</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="The ranking">
        <ChartFig caption="DROE for all 32 defenses: completion rate expected from their pressure, minus the rate they actually allowed. Dallas finished plays 5.0 points better than expected; Arizona 6.6 points worse.">
          <DefDroe />
        </ChartFig>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Rank</th><th>Defense</th><th className="num">DROE</th><th className="num">Completions allowed</th><th className="num">Expected</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>Dallas</td><td className="num">+5.0</td><td className="num">65.7%</td><td className="num">70.8%</td></tr>
              <tr><td>2</td><td>Cleveland</td><td className="num">+4.4</td><td className="num">66.3%</td><td className="num">70.7%</td></tr>
              <tr><td>3</td><td>Kansas City</td><td className="num">+4.0</td><td className="num">66.2%</td><td className="num">70.2%</td></tr>
              <tr><td>4</td><td>LA Rams</td><td className="num">+3.9</td><td className="num">67.2%</td><td className="num">71.2%</td></tr>
              <tr><td>5</td><td>Pittsburgh</td><td className="num">+3.8</td><td className="num">66.7%</td><td className="num">70.6%</td></tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Does it hold up?">
        <p>Dallas, Cleveland, Kansas City, the Rams and Pittsburgh were widely regarded as top pass defenses in 2023, and DROE found them using only tracking-data behavior and completions.</p>
        <p>As a harder check, I compared DROE with EPA allowed per pass, a separate outcome measure the ranking never sees. Teams with better DROE allowed less EPA: <strong>r = −0.64</strong> across the 32 defenses. Raw pressure, by contrast, had almost no relationship with EPA allowed (r = −0.07). Pressure describes a defense&apos;s style; DROE says whether that style is working.</p>
        <div className="callouts">
          <div><b>32</b><span>defenses ranked from 13,770 completed or incomplete passes</span></div>
          <div><b>−0.64</b><span>correlation between DROE and EPA allowed, which DROE never uses</span></div>
          <div><b>5 of 5</b><span>top DROE teams were consensus top pass defenses in 2023</span></div>
        </div>
      </Section>

      <Section title="Limitations">
        <ul>
          <li>One season, so there&apos;s no test yet of whether DROE carries over from year to year.</li>
          <li>Expected completion depends only on pressure. Pass depth, down and distance, and quarterback quality also matter, and the later Catch Radius Pressure models add them.</li>
          <li>Team-level only: DROE credits a whole defense, not individual defenders. <a href="/work/coverage-shadow">Coverage Shadow</a> is my attempt at the individual version.</li>
        </ul>
      </Section>

      <Section title="What I learned">
        <p>A good metric separates style from success. Pressure alone told me how teams play; comparing it to an expectation told me which teams were good at it. That same idea, measuring against what should have happened, runs through all of my sports work.</p>
      </Section>
    </CaseLayout>
  );
}
