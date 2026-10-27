import type { Metadata } from "next";
import CaseLayout, { Section } from "@/components/CaseLayout";
import { ElaionMeters, PerMl, elaionLab } from "@/components/charts";

export const metadata: Metadata = {
  title: "Elaion Olive Oil",
  description: "Marketing analytics for a family single-estate organic olive oil: lab data turned into customer-facing charts, a site rebuild and wholesale outreach.",
};

export default function Page() {
  return (
    <CaseLayout
      slug="elaion"
      title="Elaion Olive Oil"
      dek="Every bottle on the shelf says extra virgin. My family's oil has a lab report that proves it. The job was turning that report into something a shopper can actually read."
      meta={[
        ["Role", "Marketing, data, outreach"],
        ["Product", "Single-estate organic EVOO"],
        ["Origin", "Groves outside Kalamata, Greece"],
        ["Tools", "Chart.js, Wix Studio"],
      ]}
      links={[{ href: "https://elaion-olive.com", label: "elaion-olive.com" }]}
      glance={{
        problem: "A premium, small-batch olive oil competes on shelves where every bottle makes the same claims, and shoppers can't verify any of them.",
        approach: "Turn the harvest's lab analysis into simple customer-facing charts, rebuild the website around that evidence, and pitch specialty grocers whose values match.",
        outcome: "Every freshness and quality marker sits inside the extra virgin limits, and the brand now shows it instead of just saying it.",
      }}
    >
      <Section title="The business">
        <p>Elaion is my family&apos;s olive oil: single-estate, certified organic extra virgin oil from century-old groves in Parapougi, outside Kalamata in Greece, pressed at a mill in the same village. It sells in two sizes.</p>
        <figure className="figure chart-fig" data-chart="">
          <PerMl />
          <figcaption>The 750 mL bottle costs about 28% less per milliliter than the 250 mL, which makes the small bottle the trial size and the large one the repeat purchase.</figcaption>
        </figure>
        <p>At $30 and $65, Elaion sits well above supermarket oil. That price only holds if a shopper believes the quality is different, and on the shelf every bottle uses the same words: extra virgin, cold pressed, premium.</p>
      </Section>

      <Section title="The insight">
        <p>Extra virgin isn&apos;t a marketing term. It&apos;s a chemical grade with published limits on acidity and oxidation. Most brands never show their numbers. Elaion has a full lab report for each harvest, so the strongest marketing it can do is simply to show the report in a form people can read.</p>
      </Section>

      <Section title="The 2025–26 harvest, in numbers">
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Marker</th><th>What it measures</th><th className="num">Elaion</th><th className="num">Extra virgin limit</th></tr>
            </thead>
            <tbody>
              <tr><td>Free fatty acids</td><td>Acidity: fruit quality and handling</td><td className="num">0.76%</td><td className="num">≤ 0.8%</td></tr>
              <tr><td>Peroxide value</td><td>Early oxidation, freshness</td><td className="num">8 meq/kg</td><td className="num">≤ 20</td></tr>
              <tr><td>K232</td><td>Early oxidation (UV absorbance)</td><td className="num">1.49</td><td className="num">≤ 2.50</td></tr>
              <tr><td>K270</td><td>Later oxidation (UV absorbance)</td><td className="num">0.16</td><td className="num">≤ 0.22</td></tr>
              <tr><td>ΔK</td><td>Signs of refining</td><td className="num">−0.003</td><td className="num">≤ 0.01</td></tr>
              <tr><td>Polyphenols</td><td>Antioxidants, bitterness, shelf life</td><td className="num">335 mg/kg</td><td className="num">no limit</td></tr>
            </tbody>
          </table>
        </div>
        <figure className="figure chart-fig" data-chart="">
          <ElaionMeters rows={elaionLab} />
          <figcaption>Share of each extra virgin limit used; lower is better. Lab analysis by Baker Wine &amp; Grape Analysis. Acidity is the marker closest to its limit, which is why the marketing leads with freshness and polyphenols rather than acidity.</figcaption>
        </figure>
        <p>The label&apos;s fat profile adds one more simple number: about <strong>79% of the fat is monounsaturated</strong> (11 g of 14 g per 15 mL serving).</p>
      </Section>

      <Section title="What I built">
        <h3>Customer-facing charts</h3>
        <p>I built three charts in Chart.js for the website and social posts: a polyphenol comparison, a fatty acid profile, and an acidity spectrum that places the oil on the scale from refined to extra virgin. Each answers one question a shopper might actually ask, in a single glance.</p>
        <h3>A website built around evidence</h3>
        <p>I wrote a full rebuild plan for elaion-olive.com on Wix Studio. The structure leads with origin and the lab story, uses the charts as proof points, and keeps buying one click away, instead of opening on stock photos of olive groves.</p>
        <h3>Wholesale outreach</h3>
        <p>For wholesale, I looked for family-run specialty grocers in Massachusetts where a family-business story would land. The first was reached through a warm introduction from a friend who had worked there. The second was a health- and organic-focused market, so the pitch led with values and certifications instead of the family story. Same product, two different reasons to care.</p>
      </Section>

      <Section title="What I learned">
        <p>Data is a marketing asset when it answers a question the customer already has. &ldquo;Is this really extra virgin?&rdquo; is that question for olive oil, and a simple chart answers it faster than any tasting note. Choosing what to lead with mattered too: showing every number honestly, then putting the strongest ones first.</p>
      </Section>
    </CaseLayout>
  );
}
