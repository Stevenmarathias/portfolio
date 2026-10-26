import Link from "next/link";
import Arrow from "@/components/Arrow";
import DiscoverButton from "@/components/block/discover-button";

export const cases = [
  { slug: "catch-radius-pressure", title: "Catch Radius Pressure" },
  { slug: "catch-point-analytics", title: "Catch Point Analytics" },
  { slug: "sentry", title: "Sentry" },
  { slug: "elaion", title: "Elaion Olive Oil" },
];

type Props = {
  slug: string;
  title: string;
  dek: string;
  meta: [string, string][];
  links?: { href: string; label: string }[];
  children: React.ReactNode;
};

export default function CaseLayout({ slug, title, dek, meta, links, children }: Props) {
  const i = cases.findIndex((c) => c.slug === slug);
  const next = cases[(i + 1) % cases.length];
  return (
    <main>
      <header className="case-hero">
        <div className="wrap">
          <Link className="back" href="/#work"><Arrow dir="left" /> All work</Link>
          <h1>{title}</h1>
          <p className="dek">{dek}</p>
          {links && (
            <div className="ctas" style={{ marginBottom: 40 }}>
              {links.map((l, j) =>
                j === 0 ? (
                  <DiscoverButton key={l.href} label={l.label} href={l.href} external dir="out" />
                ) : (
                  <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener">
                    {l.label} <Arrow dir="out" />
                  </a>
                )
              )}
            </div>
          )}
          <dl className="case-meta">
            {meta.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </header>
      <div className="wrap case-body">{children}</div>
      <div className="wrap">
        <div className="next-case">
          <Link className="back" href="/#work" style={{ margin: 0 }}><Arrow dir="left" /> All work</Link>
          <Link className="nx" href={`/work/${next.slug}`}>
            <span>Next case study</span>
            <strong>{next.title} <Arrow /></strong>
          </Link>
        </div>
      </div>
    </main>
  );
}

export function Section({ title, children }: { n?: string; title: string; children: React.ReactNode }) {
  return (
    <section className="case-section">
      <h2>{title}</h2>
      <div className="prose">{children}</div>
    </section>
  );
}
