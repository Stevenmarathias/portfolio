import type { Metadata } from "next";
import CaseLayout, { Fig, Section } from "@/components/CaseLayout";
import { AucChart } from "@/components/charts";

export const metadata: Metadata = {
  title: "Catch Radius Pressure",
  description: "A new NFL tracking metric for defensive pressure at the catch point, extended into a leverage-adjusted catch probability model and a pre-snap prediction study.",
};

export default function Page() {
  return (
    <CaseLayout
      slug="catch-radius-pressure"
      title="Catch Radius Pressure"
      dek="Box scores tell you whether a pass was caught. They don't tell you how hard the defense made it. I built a metric that measures the pressure on a receiver at the moment the ball arrives."
      meta={[
        ["Role", "Solo: idea, data, modeling"],
        ["Data", "14,108 passes · 272 games · 2023"],
        ["Context", "Big Data Bowl 2026 · BU practicum"],
        ["Stack", "Python, pandas, scikit-learn"],
      ]}
      links={[
        { href: "https://github.com/Stevenmarathias/catch-radius-pressure", label: "Code" },
        { href: "https://github.com/Stevenmarathias/nfl-defense-rankings", label: "Defense rankings" },
      ]}
      glance={{
        problem: "Two receivers with the same catch rate can have very different seasons. Standard stats can't tell the wide-open catch from the contested one.",
        approach: "Score defensive pressure at the catch point from player tracking data, model expected catch rate around it, and test how much of that pressure is predictable before the throw.",
        outcome: "A leverage-adjusted catch model with 0.855 test AUC, receiver and team rankings, and a finding that most pressure only becomes visible after the snap.",
      }}
    >
      <Section title="The question">
        <p>A completion percentage treats every target the same. A receiver who catches 70% of balls thrown to wide-open spots and one who catches 70% with a defender on his hip are having very different seasons. Teams scout for the second kind, but the box score can&apos;t see the difference.</p>
        <p>I wanted one number for <strong>how hard the defense made a catch</strong>, measured at the moment that decides it: when the ball arrives.</p>
      </Section>

      <Section title="Data">
        <p>I used the NFL Big Data Bowl 2026 tracking data: every player&apos;s position, speed and direction ten times a second, for weeks 1–18 of the 2023 season. That covers <strong>14,108 passing plays across 272 games</strong>. The completion models use the 13,770 completed or incomplete passes (interceptions are excluded). Weeks 17–18 are held out untouched as a final test set.</p>
        <p>Plays run in both directions, so I first standardized coordinates so every play moves the same way. A unit test proves the metric gives exactly the same value either way.</p>
      </Section>

      <Section title="Building the metric">
        <p>At the ball&apos;s arrival frame, every defender within <strong>3 yards</strong> of the landing spot adds pressure. Closer defenders add more, and so do defenders still closing on the ball:</p>
        <p><strong>CRP = Σ (1 − distance / 3) × (1 + closing speed)</strong></p>
        <p>Most throws face no one: <strong>57% of plays score zero</strong>, and only 3.7% score above 1.0. When pressure does show up, it matters. Completion rate falls from <strong>79.6%</strong> on open throws to <strong>37.5%</strong> in the extreme tier.</p>
        <Fig
          src="/work/crp/crp-vs-completion.webp"
          alt="Bar chart: completion rate falls steadily as Catch Radius Pressure rises, from about 78% in the lowest bin to about 23% in the highest"
          w={1334}
          h={734}
          paper={false}
          caption="Completion rate by pressure bin. Each step up in pressure costs completions, which is the signal the rest of the project builds on."
        />
        <p>I rolled it up two ways. <strong>CROE</strong> (catch rate over expected) credits receivers for catching more than the pressure they faced would predict. <strong>DROE</strong> does the same for team defenses: completions allowed versus what their pressure should have produced.</p>
      </Section>

      <Section title="Can you see pressure coming?">
        <p>My practicum instructor pushed for a predictive layer. Since 57% of plays have zero pressure, a single regression would mostly learn to predict zero, so I built a <strong>two-stage hurdle model</strong>. Stage A predicts whether a throw gets contested at all. Stage B predicts how severe the pressure is when it does.</p>
        <p>The key design choice was <strong>timing</strong>. I ran both stages twice: once with only what&apos;s knowable before the snap (alignment, cushion, personnel), and once with what&apos;s knowable when the ball is thrown. Features were gated by when they become known, so nothing from the future leaked in.</p>
        <Fig
          src="/work/crp/presnap-vs-throw.webp"
          alt="Two line charts: Stage A AUC rises from 0.608 pre-snap to 0.811 at the throw; composite R squared rises from 0.031 to 0.253"
          w={1600}
          h={756}
          paper={false}
          caption="Held-out weeks 17–18 (1,559 plays). Before the snap, the model barely beats a coin flip at spotting contested throws. At the throw, it's strong."
        />
        <div className="table-wrap">
          <table>
            <thead><tr><th>Test set</th><th className="num">Pre-snap</th><th className="num">At throw</th></tr></thead>
            <tbody>
              <tr><td>Stage A AUC (contested or not)</td><td className="num">0.608</td><td className="num">0.811</td></tr>
              <tr><td>Stage A accuracy (baseline 0.598)</td><td className="num">0.609</td><td className="num">0.733</td></tr>
              <tr><td>Stage B R² (how severe)</td><td className="num">+0.004</td><td className="num">+0.107</td></tr>
              <tr><td>Combined R², expected pressure</td><td className="num">0.031</td><td className="num">0.253</td></tr>
            </tbody>
          </table>
        </div>
        <p>One feature carries most of the at-throw signal: <strong>how far the nearest defender is from the receiver when the ball is released</strong>. In plain terms, pressure is mostly decided after the snap, by coverage execution, not by how the defense lines up.</p>
        <Fig
          src="/work/crp/importance.webp"
          alt="Permutation importance chart where distance to the nearest defender at release dwarfs every other feature"
          w={1600}
          h={721}
          paper={false}
          caption="Permutation importance for the at-throw model. Separation at release dominates; closing speed and air yards follow far behind."
        />
      </Section>

      <Section title="Four passes from peer feedback">
        <p>Peer review raised four sharp critiques. I treated each one as its own pass, with a measured result before and after.</p>
        <dl className="steps">
          <div><dt>Pass 1</dt><dd><strong>Short catches inflated CROE.</strong> In the first version, checkdown backs like Taysom Hill and Samaje Perine topped the board. I rebuilt expected catch rate as a gradient-boosted model with depth, position and separation, calibrated on out-of-fold predictions. Hill fell to 45th.</dd></div>
          <div><dt>Pass 2</dt><dd><strong>Add receiver leverage</strong>: how much closer the receiver is to the ball than the nearest defender at arrival. It was the biggest gain of the project.</dd></div>
          <div><dt>Pass 3</dt><dd><strong>Split pressure at release from pressure that arrives late</strong>, and sort receivers into four archetypes with a 15-contested-target minimum.</dd></div>
          <div><dt>Pass 4</dt><dd><strong>Test the red zone.</strong> Within the same pass depth, red-zone pressure runs 1.55–1.91× midfield. But leverage already captures it: the flag moved a simple model&apos;s AUC only from 0.7874 to 0.7887 and changed the final model not at all.</dd></div>
        </dl>
        <figure className="figure">
          <AucChart />
          <figcaption>Catch-probability model, test AUC by version. Arrival separation alone barely moved it. Leverage lifted it to 0.855 and cut log loss 19%.</figcaption>
        </figure>
        <Fig
          src="/work/crp/leverage.webp"
          alt="Line chart: catch rate climbs from about 17% at negative leverage to over 90% at high leverage"
          w={1075}
          h={763}
          paper={false}
          caption="Catch rate by receiver leverage margin, in equal-sized groups of about 690 plays. Below zero yards of leverage, most balls fall incomplete."
        />
      </Section>

      <Section title="Results">
        <div className="callouts">
          <div><b>0.855</b><span>test AUC for the leverage-adjusted catch model, up from 0.793</span></div>
          <div><b>−19%</b><span>test log loss from adding receiver leverage</span></div>
          <div><b>0.811</b><span>AUC spotting contested throws at release, vs 0.608 pre-snap</span></div>
        </div>
        <h3>Receivers</h3>
        <p>The final CROE leaders were DJ Moore (+11.7 points over expected on 104 targets), Tanner Hudson and Nico Collins. The archetype quadrant is the most useful view for scouting, because it separates <strong>who gets contested often</strong> from <strong>who wins when they are</strong>.</p>
        <Fig
          src="/work/crp/archetypes.webp"
          alt="Scatter plot of receivers by contested-target rate and contested CROE, split into four colored quadrants"
          w={1321}
          h={1006}
          paper={false}
          caption="Receivers with at least 15 contested targets. Michael Thomas and Puka Nacua are trusted contested winners; Amon-Ra St. Brown and Mike Evans win by separating; Quentin Johnston is contested often and rarely wins."
        />
        <h3>Defenses</h3>
        <p>By DROE, Dallas, Cleveland, Kansas City, the Rams and Pittsburgh allowed the fewest completions relative to the pressure they created. Miami and the Jets created the most catch-point pressure overall.</p>
        <p>All of it now runs live on <a href="/work/catch-point-analytics">Catch Point Analytics</a>.</p>
      </Section>

      <Section title="Limitations">
        <ul>
          <li>One season only, so there&apos;s no cross-season check yet on whether CROE is a stable skill.</li>
          <li>Severity is hard to predict even at the throw (R² 0.11). The rest of the signal lives in the ball&apos;s flight, after the decision is made.</li>
          <li>The archetypes check matched expectations for 2 of 4 named receivers. DeAndre Hopkins&apos; miss reflects a down 2023 season, and Deshaun Watson&apos;s small sample is flagged.</li>
          <li>I left the at-throw model uncalibrated on purpose: isotonic calibration made its calibration error worse (0.018 to 0.028).</li>
        </ul>
      </Section>

      <Section title="What I learned">
        <p>The most useful thing I did was take criticism literally. Each critique became a pass with its own test. Leverage turned out to be the biggest gain of the whole project, while the red-zone flag added almost nothing, and I reported both the same way. Being plain about the small result is what makes the big one believable.</p>
      </Section>
    </CaseLayout>
  );
}
