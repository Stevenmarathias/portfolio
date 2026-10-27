import type { Metadata } from "next";
import CaseLayout, { ChartFig, Section } from "@/components/CaseLayout";
import { CsForest, CsPlay, CsReliability } from "@/components/anim-charts";

export const metadata: Metadata = {
  title: "Coverage Shadow",
  description: "An NFL defender coverage metric, stress-tested for stability and predictive validity, including a pre-registered version that failed.",
};

export default function Page() {
  return (
    <CaseLayout
      slug="coverage-shadow"
      title="Coverage Shadow"
      dek="A metric that looks right and a metric that measures skill are not the same thing. The only way to tell them apart is to try to break your own work, so that's what this project does."
      meta={[
        ["Role", "Solo: design, model, validation"],
        ["Data", "14,107 plays · 272 games · 2023"],
        ["Context", "Side project · Sep 2026"],
        ["Methods", "Logistic regression, reliability, bootstrap"],
      ]}
      links={[{ href: "https://github.com/Stevenmarathias/coverage-shadow", label: "Code and write-up" }]}
      glance={{
        problem: "Defensive backs are graded on outcomes that depend on the quarterback and receiver. Can tracking data isolate how much a defender takes away?",
        approach: "Measure the catch window each defender closes at the throw, then test the metric the way a front office would: is it stable, and does it predict anything?",
        outcome: "Coverage Shadow is as stable as completion % allowed but doesn't forecast it, so I report it as a measure of involvement, not a coverage grade.",
      }}
    >
      <Section title="The question">
        <p>Coverage stats like completion percentage allowed mix the defender&apos;s work with everything around it: the quarterback&apos;s accuracy, the receiver&apos;s route, the scheme. I wanted a number for what the defender himself controls. This is the defensive companion to my <a href="/work/catch-radius-pressure">Catch Radius Pressure</a> work, which looks at the receiver&apos;s side of the same moment.</p>
      </Section>

      <Section title="Building the metric">
        <p>At the moment the ball is released, I estimate how long each player needs to reach the landing spot, from his position, speed and direction plus a 0.3-second reaction time. The <strong>catch window</strong> is how far ahead of the fastest defender the targeted receiver gets there. A defender&apos;s <strong>Shadow</strong> is how much that window would grow if he weren&apos;t on the field.</p>
        <ChartFig caption="One real play (week 4, 2023). Each defender's time to the landing spot comes from his position, speed and direction at release. Stephon Gilmore is the only one close enough to contest it, so removing him would widen the catch window by 2.76 seconds. He forced the incompletion.">
          <CsPlay />
        </ChartFig>
        <dl className="steps">
          <div><dt>v1</dt><dd><strong>Total and average Shadow.</strong> Season totals mostly rewarded corners who were targeted a lot, so the average per coverage snap became the main number.</dd></div>
          <div><dt>v2</dt><dd><strong>Shadow Over Expected (SOE).</strong> A logistic model turns the catch window into an expected completion probability; SOE counts completions a defender prevented beyond that. Adding throw depth improved held-out log loss from 0.5354 to 0.5217, better in all 6 of 6 folds. A squared depth term didn&apos;t clear the bar and was rejected.</dd></div>
          <div><dt>v3</dt><dd><strong>Involvement and Effect</strong>, split apart, with pass/fail criteria written down before running the test.</dd></div>
        </dl>
        <p>A first sanity check looked good. Throws where the closest defender had the most Shadow were completed 62.5% of the time, versus 75.0% for the least (3,443 throws each). But that gap is partly built in, since it uses the same plays the metric was built on. It isn&apos;t evidence of skill.</p>
      </Section>

      <Section title="Is it a skill? Stability">
        <p>If a number measures skill, a player&apos;s first half of the season should predict his second half. I split the 2023 season into odd and even weeks for cornerbacks and compared the two halves, with completion percentage allowed as the benchmark.</p>
        <ChartFig caption="Left: full-season reliability from odd-vs-even-week splits. Average Shadow is about as repeatable as completion % allowed; SOE is mostly noise. Right: average Shadow gets more reliable as sample size grows.">
          <CsReliability />
        </ChartFig>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Metric</th><th className="num">Half-season r</th><th className="num">Full-season reliability</th><th className="num">Players</th></tr></thead>
            <tbody>
              <tr><td>Average Shadow</td><td className="num">+0.43</td><td className="num">0.60</td><td className="num">120</td></tr>
              <tr><td>SOE per contest (with depth)</td><td className="num">+0.05</td><td className="num">0.10</td><td className="num">96</td></tr>
              <tr><td>Completion % allowed (benchmark)</td><td className="num">+0.44</td><td className="num">0.61</td><td className="num">89</td></tr>
            </tbody>
          </table>
        </div>
        <p>SOE&apos;s spread across players (0.060) was almost exactly what chance alone would produce (0.061), so I <strong>retired SOE</strong>. Its leaderboard was mostly luck.</p>
        <h3>Is it the player or his role?</h3>
        <p>Where a corner lines up shapes what he faces. Alignment alone explained about 30% of the spread in average Shadow, and slot share correlated at −0.44. After removing alignment, scheme and team effects play by play, split-half reliability fell from 0.60 to about 0.50. About a quarter of the apparent skill was role.</p>
      </Section>

      <Section title="Does it predict anything?">
        <p>Stability isn&apos;t enough; a stable number also has to forecast something. I used first-half numbers to predict second-half completion percentage allowed, in two different splits, comparing correlations with significance tests and bootstrapped intervals.</p>
        <ChartFig caption="Only completion % allowed clearly forecasts itself. Shadow is not significantly worse in one split (p = 0.35) and is worse in the other (p = 0.04). Nothing forecasts yards per target.">
          <CsForest />
        </ChartFig>
        <p>What Shadow <em>did</em> predict was <strong>involvement</strong>: first-half Shadow forecast how often a defender was targeted in the second half (r ≈ +0.23) and how often he was the closest defender (r ≈ +0.33). The metric was capturing who is around the ball, not who wins there.</p>
      </Section>

      <Section title="A pre-registered test that failed">
        <p>For v3 I split Shadow into <strong>Involvement</strong> (share of snaps as one of the two closest defenders) and <strong>Effect</strong> (how much window he takes away when involved), and wrote the bar down first: full-season reliability of at least 0.40, and not significantly worse than completion % allowed in both splits.</p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Component</th><th className="num">Reliability</th><th>Predicts better than baseline?</th><th>Verdict</th></tr></thead>
            <tbody>
              <tr><td>Effect</td><td className="num">0.22</td><td>Not significantly worse (p = 0.46, 0.10)</td><td>Fail: not reliable</td></tr>
              <tr><td>Involvement</td><td className="num">0.47</td><td>Worse (p = 0.04, 0.002)</td><td>Fail: doesn&apos;t predict</td></tr>
            </tbody>
          </table>
        </div>
        <p>Both halves failed, so I stopped. A fourth version would have been the start of tuning the test until something passed.</p>
      </Section>

      <Section title="Results">
        <div className="callouts">
          <div><b>0.60</b><span>full-season reliability for average Shadow, on par with completion % allowed (0.61)</span></div>
          <div><b>0.10</b><span>reliability for SOE, which I retired as mostly noise</span></div>
          <div><b>2 of 2</b><span>pre-registered v3 components failed, and I reported both</span></div>
        </div>
        <p>Coverage Shadow now appears on <a href="/work/catch-point-analytics">Catch Point Analytics</a> as an <strong>involvement</strong> measure, not a coverage grade. By average Shadow, Deonte Banks, Josh Jobe and Emmanuel Forbes led 2023 among defenders with 100+ snaps.</p>
      </Section>

      <Section title="Limitations">
        <ul>
          <li>It&apos;s a snapshot at release: a tight-window completion and a pass breakup look identical.</li>
          <li>Only the closest defender gets credit in v1 and v2.</li>
          <li>One season of tracking data, so no cross-season test. For context, completion % allowed itself correlates only +0.18 from 2023 to 2024.</li>
          <li>Depth and cushion are partly the corner&apos;s choice, so removing them may remove some real skill. About 100 corners also limits statistical power.</li>
        </ul>
      </Section>

      <Section title="What I learned">
        <p>The most valuable result here is a negative one. It would have been easy to publish the v1 leaderboard; it looked right. Testing for stability and prediction showed what the metric really measures, and that&apos;s the question a team would ask before trusting any number for decisions.</p>
      </Section>
    </CaseLayout>
  );
}
