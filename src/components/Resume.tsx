import TimelineRail from "@/components/TimelineRail";

// Résumé timeline. Each row opens to the full résumé detail using native <details>, so it works without JavaScript
// and with the keyboard. Copy comes from Steven's résumé.

type Entry = {
  yr: string;
  title: string;
  org: string;
  summary: string;
  kind: "School" | "Research" | "Work";
  details: string[];
};

const entries: Entry[] = [
  {
    yr: "Graduated May 2023",
    title: "BBA, Entrepreneurship & Innovation Management",
    org: "Temple University, Fox School of Business · Philadelphia, PA",
    summary: "Undergraduate degree",
    kind: "School",
    details: ["Bachelor of Business Administration, Entrepreneurship and Innovation Management."],
  },
  {
    yr: "Aug – Dec 2022",
    title: "Operations & Strategy Intern",
    org: "Neftwerk Inc · Philadelphia, PA",
    summary: "Moved a product launch up two months",
    kind: "Work",
    details: [
      "Accelerated product launch timelines by two months through structured business-planning support.",
      "Developed cost-saving reports that contributed to a 15% reduction in expenses.",
    ],
  },
  {
    yr: "May 2023 – Apr 2024",
    title: "Associate Business Analyst",
    org: "Flask Scientific · Cambridge, MA",
    summary: "New pricing model lifted first-quarter sales 12%",
    kind: "Work",
    details: [
      "Analyzed pricing across ten competitors and implemented a new pricing model that increased first-quarter sales by 12%.",
      "Designed and launched an e-commerce site with a three-person team, generating over 1,000 visits in the first month.",
      "Coordinated the rollout with five clients and adjusted delivery timelines based on structured feedback.",
    ],
  },
  {
    yr: "Apr 2024 – Aug 2025",
    title: "Business Analyst",
    org: "Maratech NMR Solutions · Cambridge, MA",
    summary: "Cut operating costs 10% through financial and vendor analysis",
    kind: "Work",
    details: [
      "Reduced operational costs by 10% through financial and vendor analysis.",
      "Built dashboards delivering weekly performance updates to stakeholders, improving transparency and coordination.",
      "Partnered with three departments to translate business needs into requirements and align workflows with company goals.",
      "Improved client material-transfer workflows, increasing efficiency across two departments.",
    ],
  },
  {
    yr: "Oct 2025 – now",
    title: "Catch Radius Pressure",
    org: "NFL Big Data Bowl 2026, University Track",
    summary: "A new metric for defensive pressure at the catch point",
    kind: "Research",
    details: [
      "Built a new metric quantifying defensive pressure at the catch point from player tracking data across 14,108 passing plays.",
      "Trained and evaluated a leverage-adjusted catch probability model (AUC 0.855) and produced player and team defense rankings.",
      "Extended the work into Analytics Practicum research predicting pressure from pre-snap alignment; the research proposal earned a perfect score.",
    ],
  },
  {
    yr: "2025 – Jan 2027",
    title: "M.S. Business Analytics",
    org: "Boston University, Questrom School of Business · Boston, MA",
    summary: "Expected January 2027",
    kind: "School",
    details: [
      "Machine learning: supervised and unsupervised methods, model evaluation",
      "Business experimentation: A/B testing and causal inference",
      "Marketing, financial and pricing analytics; data ethics; storytelling with data",
      "Analytics Practicum (research track): Catch Radius Pressure",
    ],
  },
];

// Every skill here is backed by a job, project or course on this site.
const skills: { area: string; items: string[] }[] = [
  {
    area: "Programming & data",
    items: ["Python", "pandas", "NumPy", "scikit-learn", "SQL", "PostgreSQL", "BigQuery", "DuckDB", "Jupyter / Colab", "Git & GitHub", "Linux"],
  },
  {
    area: "Machine learning",
    items: ["Random forests", "Gradient boosting", "Logistic & ridge regression", "Two-stage (hurdle) models", "Clustering (KMeans)", "Dimensionality reduction (SVD)", "Cross-validation", "Probability calibration", "Feature importance", "Model evaluation (AUC, log loss)"],
  },
  {
    area: "Statistics & experimentation",
    items: ["A/B testing", "Causal inference", "Difference-in-differences", "Power analysis", "Reliability testing", "Bootstrapping", "Hypothesis testing", "Pre-registered analysis"],
  },
  {
    area: "NLP & AI",
    items: ["Text analysis (TF-IDF)", "Topic modeling (NMF, LDA)", "Sentence embeddings", "Claude API", "Whisper transcription", "Generative AI products", "AI coding agents"],
  },
  {
    area: "Business & marketing analytics",
    items: ["Pricing & competitor analysis", "Financial & vendor analysis", "Financial statement ratios", "Marketing analytics", "Attribution modeling", "Survey research & SPSS", "Requirements gathering", "Stakeholder reporting", "Wholesale & B2B outreach"],
  },
  {
    area: "Data engineering & apps",
    items: ["ETL pipelines", "Web scraping", "REST APIs", "FastAPI", "Flask", "Streamlit", "React", "Next.js", "Deployment (Vercel, Render, Fly.io)"],
  },
  {
    area: "Visualization & BI",
    items: ["Tableau", "Excel", "Plotly", "matplotlib", "D3.js", "Chart.js", "Interactive dashboards", "Data storytelling"],
  },
  {
    area: "Data sources",
    items: ["NFL player tracking (Big Data Bowl)", "nflverse", "ESPN API", "WRDS Compustat", "Yahoo Finance", "Inside Airbnb"],
  },
  {
    area: "IT & security",
    items: ["Network & hardware troubleshooting", "OS configuration", "Security fundamentals"],
  },
];

const groups = [
  {
    title: "Certifications & activities",
    count: "2 certifications · 1 conference",
    rows: [
      ["Certification", "Google Cybersecurity Professional Certificate"],
      ["Certification", "CompTIA"],
      ["Conference", "MIT Sloan Sports Analytics Conference, attendee 2026"],
    ],
  },
];

export default function Resume() {
  return (
    <>
      <TimelineRail>
        {entries.map((e) => (
          <details className="tl" key={e.title + e.yr}>
            <summary>
              <span className="yr">{e.yr}</span>
              <span className="tl-main">
                <h3>{e.title}</h3>
                <span className="tl-org">{e.org}</span>
                <span className="tl-sum">{e.summary}</span>
              </span>
              <span className={e.kind === "Work" ? "kind work-k" : "kind"}>{e.kind}</span>
              <span className="tl-toggle" aria-hidden="true" />
            </summary>
            <ul className="tl-details">
              {e.details.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </details>
        ))}
      </TimelineRail>
      <details className="more skills-all">
        <summary>
          <h3>Skills</h3>
          <span className="more-count">{skills.reduce((n, g) => n + g.items.length, 0)} skills across {skills.length} areas</span>
          <span className="tl-toggle" aria-hidden="true" />
        </summary>
        <div className="skill-grid">
          {skills.map((g) => (
            <div key={g.area}>
              <h4>{g.area}</h4>
              <ul className="skill-tags">
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </details>
      <div className="more-groups">
        {groups.map((g) => (
          <details className="more" key={g.title}>
            <summary>
              <h3>{g.title}</h3>
              <span className="more-count">{g.count}</span>
              <span className="tl-toggle" aria-hidden="true" />
            </summary>
            <dl>
              {g.rows.map(([k, v]) => (
                <div key={k + v}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </details>
        ))}
      </div>
    </>
  );
}
