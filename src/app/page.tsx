import Image from "next/image";
import Hero from "@/components/Hero";
import CountUp from "@/components/CountUp";
import Coursework from "@/components/Coursework";
import WorkScroll from "@/components/WorkScroll";
import Resume from "@/components/Resume";
import CopyEmail from "@/components/CopyEmail";
import Arrow from "@/components/Arrow";
import FlipText from "@/components/block/flip-text";
import { AucChart, ElaionMeters, Formation, ImpactChart, SentryFlow } from "@/components/charts";

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="wrap">
        <div className="stats">
          <div className="stat"><b><CountUp value={12} prefix="+" suffix="%" /></b><span>first-quarter sales after my new pricing model</span></div>
          <div className="stat"><b><CountUp value={10} prefix="−" suffix="%" /></b><span>operating costs, from financial and vendor analysis</span></div>
          <div className="stat"><b><CountUp value={0.855} decimals={3} /></b><span>test AUC on my NFL catch-probability model</span></div>
          <div className="stat"><b><CountUp value={7000} suffix="+" /></b><span>games run through my ETL pipelines</span></div>
        </div>
      </div>

      <section className="block wrap" id="work">
        <div>
          <h2 className="display">Selected work.</h2>
          <p className="intro">Pricing and operations work from industry, a marketing problem with real lab data, the sports analytics I build on my own, and an AI product. Every chart uses real numbers.</p>
        </div>

        <WorkScroll
          items={[
            {
              href: "/#resume",
              cta: "See the full résumé",
              title: "Pricing & Operations Analytics",
              pills: <><span className="pill live-pill">Industry</span><span className="pill">Flask Scientific · Maratech NMR</span></>,
              body: "Two years as a business analyst at two Cambridge scientific companies. I benchmarked pricing against ten competitors and built a new pricing model, ran financial and vendor analysis, and built the weekly dashboards stakeholders used to coordinate.",
              result: "First-quarter sales rose 12% under the new pricing model, and vendor analysis cut operating costs 10%.",
              tags: ["Pricing analysis", "Financial analysis", "Dashboards", "Requirements"],
              vizLabel: "Measured business impact",
              viz: <ImpactChart />,
            },
            {
              href: "/work/elaion",
              title: "Elaion Olive Oil",
              pills: <><span className="pill live-pill">Ongoing</span><span className="pill">Marketing analytics</span></>,
              body: "Growth for my family’s single-estate organic olive oil from Kalamata, Greece: lab data turned into customer-facing charts, a site rebuild, and wholesale outreach.",
              result: "Every freshness marker sits inside the extra virgin limits, and the charts show shoppers exactly where.",
              tags: ["Chart.js", "Brand strategy", "B2B outreach"],
              vizLabel: "2025–26 harvest · lab results",
              viz: (
                <>
                  <div className="big-num">335<small>mg/kg polyphenols</small></div>
                  <p className="viz-label" style={{ marginTop: 22 }}>Share of extra virgin limit used</p>
                  <ElaionMeters />
                </>
              ),
            },
            {
              href: "/work/catch-radius-pressure",
              title: "Catch Radius Pressure",
              pills: <><span className="pill live-pill">Research</span><span className="pill">Big Data Bowl 2026</span></>,
              body: "A new NFL metric for how much defensive pressure a receiver faces at the catch point, built from defender proximity and closing speed on every 2023 pass.",
              result: "Adding receiver leverage lifted the catch model’s test AUC from 0.793 to 0.855 and cut log loss 19%.",
              tags: ["Python", "scikit-learn", "Tracking data"],
              vizLabel: "Catch model · test AUC by version",
              viz: <AucChart />,
            },
            {
              href: "/work/catch-point-analytics",
              title: "Catch Point Analytics",
              pills: <><span className="pill live-pill">Live</span><span className="pill">Solo build</span></>,
              body: "A public NFL stats site with CRP built in: win-probability replays, starting lineups drawn in real formation, and player pages for every game since 1999.",
              result: "ETL from ESPN and other sources matches about 99% of 22,500+ starter records to unique player IDs.",
              tags: ["React", "FastAPI", "DuckDB", "ETL"],
              vizLabel: "Game page · starting offense in formation",
              viz: <Formation />,
            },
            {
              href: "/work/sentry",
              title: "Sentry",
              pills: <><span className="pill wip">Working prototype</span><span className="pill">Startup track</span></>,
              body: "An AI study tool that records a lecture, transcribes it with Whisper, and uses Claude to turn it into a summary, a quiz and an explorable concept map.",
              result: "Deployed as a Flask web app; next step is testing demand with classmates.",
              tags: ["Flask", "Claude API", "Whisper", "D3.js"],
              vizLabel: "What one lecture becomes",
              viz: <SentryFlow />,
            },
          ]}
        />
      </section>

      <section className="block wrap" id="about">
        <div className="about">
          <div>
            <Image className="headshot" src="/headshot.jpg" alt="Steven Marathias" width={640} height={640} priority={false} />
            <dl className="facts">
              <div><dt>Based in</dt><dd>Boston, MA</dd></div>
              <div><dt>School</dt><dd>BU Questrom, MSBA</dd></div>
              <div><dt>Focus</dt><dd>Analytics · Business · Sports</dd></div>
              <div><dt>Available</dt><dd>January 2027</dd></div>
              <div><dt>Recently</dt><dd>MIT Sloan Sports Analytics Conf.</dd></div>
            </dl>
          </div>
          <div className="about-text">
            <h2 className="display">Business first, then the data.</h2>
            <p>I came to analytics from the business side, and I still start every project with the decision someone needs to make.</p>
            <p>After a BBA in entrepreneurship from Temple&apos;s Fox School of Business, I spent two years as a business analyst at Flask Scientific and Maratech NMR Solutions in Cambridge. I rebuilt a pricing model from a ten-competitor analysis that lifted first-quarter sales 12%, and found vendor savings that cut operating costs 10%.</p>
            <p>The MSBA at Boston University gave me the modeling side: supervised and unsupervised machine learning, experimentation and causal inference, and financial and marketing analytics. I use it most on the two things I care about, football and the businesses around me.</p>
            <p>Catch Radius Pressure started as my Big Data Bowl entry, became my practicum research, and now powers a public NFL stats site. That&apos;s how I like to work: find something nobody&apos;s measuring, measure it, then ship something people can use.</p>
          </div>
        </div>
      </section>

      <section className="block wrap" id="coursework">
        <div>
          <h2 className="display">Coursework and side projects.</h2>
          <p className="intro">Team and solo work from the MSBA, plus a second NFL metric.</p>
        </div>
        <div>
          <Coursework />
        </div>
      </section>

      <section className="block wrap" id="resume">
        <div>
          <h2 className="display">The path so far.</h2>
          <p className="intro">Open any row for the full detail, or <a href="/Steven_Marathias_Resume.pdf" target="_blank" rel="noopener">download the résumé PDF <Arrow dir="out" /></a>.</p>
        </div>
        <Resume />
      </section>

      <section className="contact wrap" id="contact">
        <div>
          <h2 className="display"><FlipText>{"Let’s talk"}</FlipText> <em><FlipText>data.</FlipText></em></h2>
          <p className="intro" style={{ marginBottom: 0 }}>I&apos;m looking for analyst roles in business, marketing and sports analytics starting January 2027, in-office, hybrid or remote. Happy to talk even if you&apos;re just exploring.</p>
          <CopyEmail email="stevenm5@bu.edu" />
          <div className="social">
            <a href="https://www.linkedin.com/in/steven-marathias/" target="_blank" rel="noopener">LinkedIn <Arrow dir="out" /></a>
            <a href="https://github.com/Stevenmarathias" target="_blank" rel="noopener">GitHub <Arrow dir="out" /></a>
            <a href="/Steven_Marathias_Resume.pdf" target="_blank" rel="noopener">Résumé <Arrow dir="out" /></a>
          </div>
        </div>
      </section>
    </main>
  );
}
