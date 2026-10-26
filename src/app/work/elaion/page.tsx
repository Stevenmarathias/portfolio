import type { Metadata } from "next";
import CaseLayout, { Section } from "@/components/CaseLayout";
import { ElaionMeters, elaionLab } from "@/components/charts";

export const metadata: Metadata = {
  title: "Elaion Olive Oil",
  description: "Marketing analytics for a family single-estate organic olive oil: lab data turned into customer-facing charts, a site rebuild and wholesale outreach.",
};

export default function Page() {
  return (
    <CaseLayout
      slug="elaion"
      eyebrow="Case study 04 · Marketing analytics"
      title="Elaion Olive Oil"
      dek="Every bottle on the shelf says extra virgin. My family's oil has a lab report that proves it. The job was turning that report into something a shopper can actually read."
      meta={[
        ["Role", "Marketing, data, outreach"],
        ["Product", "Single-estate organic EVOO"],
        ["Origin", "Groves outside Kalamata, Greece"],
        ["Tools", "Chart.js, Wix Studio"],
      ]}
      links={[{ href: "https://elaion-olive.com", label: "elaion-olive.com" }]}
    >
      <Section n="01" title="The business">
        <p>Elaion is my family&apos;s olive oil, from century-old groves in Parapougi, outside Kalamata. It&apos;s certified organic and sold in two sizes: 250 mL at $30 and 750 mL at $65. At that price, the oil has to prove it&apos;s worth more than the supermarket bottle next to it.</p>
      </Section>

      <Section n="02" title="Making the lab report readable">
        <p>Each harvest gets a full chemical analysis. Most shoppers will never read one, so I turned the 2025–26 results into charts for the website and social posts: a polyphenol comparison, a fatty acid profile, and an acidity spectrum.</p>
        <figure className="figure">
          <div className="big-num">335<small>mg/kg polyphenols</small></div>
          <p className="viz-label" style={{ marginTop: 22 }}>Share of the extra virgin limit used · lower is fresher</p>
          <ElaionMeters rows={elaionLab} />
          <figcaption>2025–26 harvest lab results against the International Olive Council&apos;s extra virgin limits. Every marker is inside the limit; K232 and K270 measure oxidation, and peroxide measures freshness.</figcaption>
        </figure>
        <div className="callouts">
          <div><b>79%</b><span>monounsaturated fat per serving, from the label&apos;s fat profile</span></div>
          <div><b>8</b><span>meq/kg peroxide, against a limit of 20</span></div>
          <div><b>−0.003</b><span>ΔK, well under the 0.01 limit</span></div>
        </div>
      </Section>

      <Section n="03" title="Website and wholesale">
        <ul>
          <li><strong>Site rebuild.</strong> I wrote a full rebuild plan for elaion-olive.com on Wix Studio, built around the lab story instead of stock product photos.</li>
          <li><strong>Wholesale outreach.</strong> I targeted family-run specialty grocers in Massachusetts where the family-business story fits: a warm introduction through a contact at one store, and a values-led pitch to an organic-focused market that matched the product&apos;s certifications.</li>
        </ul>
      </Section>

      <Section n="04" title="What I learned">
        <p>Data is a marketing asset when it answers a question the customer already has. &ldquo;Is this really extra virgin?&rdquo; is that question for olive oil, and four meters answer it faster than any tasting note.</p>
      </Section>
    </CaseLayout>
  );
}
