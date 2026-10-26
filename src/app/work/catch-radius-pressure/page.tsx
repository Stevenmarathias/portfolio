import type { Metadata } from "next";
import CaseLayout, { Section } from "@/components/CaseLayout";
import { AucChart, RedZone } from "@/components/charts";

export const metadata: Metadata = {
  title: "Catch Radius Pressure",
  description: "A new NFL tracking metric for defensive pressure at the catch point, extended into a leverage-adjusted catch probability model.",
};

export default function Page() {
  return (
    <CaseLayout
      slug="catch-radius-pressure"
      title="Catch Radius Pressure"
      dek="Box scores tell you whether a pass was caught. They don't tell you how hard the defense made it. I built a metric that measures the pressure on a receiver in the moment the ball arrives."
      meta={[
        ["Role", "Solo: idea, data, modeling"],
        ["Data", "14,108 passes, 2023 NFL"],
        ["Context", "Big Data Bowl 2026 · BU practicum"],
        ["Stack", "Python, pandas, scikit-learn"],
      ]}
      links={[
        { href: "https://github.com/Stevenmarathias/catch-radius-pressure", label: "Code" },
        { href: "https://github.com/Stevenmarathias/nfl-defense-rankings", label: "Defense rankings" },
      ]}
    >
      <Section n="01" title="The question">
        <p>Two receivers can both catch 70% of their targets and have completely different seasons. One is wide open on easy throws. The other is making catches with a defender draped on him. Standard stats treat them the same.</p>
        <p><strong>Catch Radius Pressure (CRP)</strong> measures how much defensive pressure lands inside a receiver&apos;s catch radius at the catch point, using each defender&apos;s proximity and closing velocity from NFL player tracking data.</p>
      </Section>

      <Section n="02" title="Building the metric">
        <p>I computed CRP for 14,108 passing plays from the 2023 season, then rolled it up two ways:</p>
        <ul>
          <li><strong>CROE</strong> (catch rate over expected) for receivers: who catches more than the pressure they face would predict.</li>
          <li><strong>DROE</strong> for team defenses: who creates more pressure at the catch point than expected.</li>
        </ul>
        <p>It started as my NFL Big Data Bowl entry, with a full pipeline, visualizations and a documented notebook. I then turned it into my Analytics Practicum research proposal, which earned a perfect score.</p>
      </Section>

      <Section n="03" title="Predicting pressure">
        <p>My instructor pushed me to add a predictive layer: can you see pressure coming before the ball is thrown? I built a <strong>two-stage hurdle model</strong>. Stage A predicts whether a target gets contested at all; Stage B predicts how severe the pressure is on contested targets. I ran both stages on a pre-snap feature set (alignment, cushion, personnel) and an at-throw feature set to see how much each moment explains.</p>
      </Section>

      <Section n="04" title="Four passes from peer feedback">
        <p>Peer review raised four sharp critiques. I treated each one as its own pass, with a test before and after.</p>
        <dl className="steps">
          <div><dt>Pass 1</dt><dd><strong>Fix inflated CROE.</strong> Short, easy catches made some receivers look elite. I standardized play-direction coordinates (with a regression test proving exact invariance) and built a calibrated catch-probability model conditioned on depth, position and separation. One receiver the old metric ranked 2nd fell to 20th; true contested-catch receivers rose.</dd></div>
          <div><dt>Pass 2</dt><dd><strong>Add receiver leverage.</strong> Distance and speed to the ball&apos;s arrival point, receiver versus defender. This was the biggest lift of the project.</dd></div>
          <div><dt>Pass 3</dt><dd><strong>Split release from arrival.</strong> Only about 6% of arrival pressure is already visible at release (correlation 0.55), which supports the paper&apos;s conclusion that pressure builds during the ball&apos;s flight. I used it to sort receivers into a 2×2 of archetypes, with a 15-contested-target minimum to keep small samples out.</dd></div>
          <div><dt>Pass 4</dt><dd><strong>Test the red zone.</strong> Pressure there is real, but leverage already captures most of it, so a red-zone flag added only +0.001 AUC. I kept it documented rather than claim a gain that wasn&apos;t there.</dd></div>
        </dl>
        <figure className="figure">
          <AucChart />
          <figcaption>Catch-probability model, test AUC. Arrival separation alone barely moved it (0.792 → 0.793). Receiver leverage lifted it to 0.855 and cut log loss 19%.</figcaption>
        </figure>
        <figure className="figure">
          <RedZone />
          <figcaption>Within the same pass-depth bands, red-zone CRP runs 1.5–2× midfield and the contested-catch rate roughly doubles.</figcaption>
        </figure>
      </Section>

      <Section n="05" title="Results">
        <div className="callouts">
          <div><b>0.855</b><span>final test AUC for the leverage-adjusted catch model</span></div>
          <div><b>−19%</b><span>log loss from adding receiver leverage</span></div>
          <div><b>14,108</b><span>passing plays scored from 2023 tracking data</span></div>
        </div>
        <p>The final CROE works as a <strong>finishing</strong> metric: it credits receivers for catches made under pressure after accounting for how open they got. Kyle Pitts, Garrett Wilson and Jaxon Smith-Njigba were among the notable risers once leverage was in the model.</p>
        <p>CRP, CROE, the archetypes and per-play catch probability now run live on <a href="/work/catch-point-analytics">Catch Point Analytics</a>.</p>
      </Section>

      <Section n="06" title="What I learned">
        <p>The most useful thing I did was take criticism literally. Each piece of feedback became a pass with its own test. Leverage turned out to be the biggest gain of the whole project, while the red-zone flag added almost nothing. Reporting the small result as plainly as the big one makes the big one easier to trust.</p>
      </Section>
    </CaseLayout>
  );
}
