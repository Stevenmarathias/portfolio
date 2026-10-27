import Image from "next/image";
import Link from "next/link";
import Arrow from "@/components/Arrow";
import DiscoverButton from "@/components/block/discover-button";

export const cases = [
  { slug: "elaion", title: "Elaion Olive Oil" },
  { slug: "catch-radius-pressure", title: "Catch Radius Pressure" },
  { slug: "defense-rankings", title: "NFL Pass Defense Rankings" },
  { slug: "catch-point-analytics", title: "Catch Point Analytics" },
  { slug: "sentry", title: "Sentry" },
  { slug: "coverage-shadow", title: "Coverage Shadow" },
  { slug: "alone-exit-themes", title: "Why Survivalists Tap Out" },
  { slug: "financial-predictor", title: "Financial Performance Predictor" },
];

type Props = {
  slug: string;
  title: string;
  dek: string;
  meta: [string, string][];
  links?: { href: string; label: string }[];
  glance?: { problem: string; approach: string; outcome: string };
  children: React.ReactNode;
};

export default function CaseLayout({ slug, title, dek, meta, links, glance, children }: Props) {
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
              {links.map((l, j) => {
                const internal = l.href.startsWith("/");
                if (j === 0) return <DiscoverButton key={l.href} label={l.label} href={l.href} external={!internal} dir={internal ? "right" : "out"} />;
                return internal ? (
                  <Link key={l.href} className="btn" href={l.href}>
                    {l.label} <Arrow />
                  </Link>
                ) : (
                  <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener">
                    {l.label} <Arrow dir="out" />
                  </a>
                );
              })}
            </div>
          )}
          <dl className="case-meta">
            {meta.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </header>
      {glance && (
        <div className="wrap">
          <dl className="glance">
            <div><dt>Problem</dt><dd>{glance.problem}</dd></div>
            <div><dt>Approach</dt><dd>{glance.approach}</dd></div>
            <div><dt>Outcome</dt><dd>{glance.outcome}</dd></div>
          </dl>
        </div>
      )}
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

/** A real figure from the project. Charts exported on white keep a paper frame so they read on the dark site. */
export function Fig({
  src,
  alt,
  w,
  h,
  caption,
  paper = true,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  caption: string;
  paper?: boolean;
}) {
  return (
    <figure className={paper ? "figure fig-paper" : "figure"}>
      <Image src={src} alt={alt} width={w} height={h} sizes="(max-width: 860px) 100vw, 760px" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

/** A live chart that draws itself when it scrolls into view. */
export function ChartFig({ caption, children }: { caption: string; children: React.ReactNode }) {
  return (
    <figure className="figure chart-fig" data-chart="">
      {children}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
