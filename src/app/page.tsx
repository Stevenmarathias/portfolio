import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import CountUp from "@/components/CountUp";
import Coursework from "@/components/Coursework";
import CopyEmail from "@/components/CopyEmail";
import { AucChart, ElaionMeters, Formation, SentryFlow } from "@/components/charts";

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="wrap">
        <div className="stats" data-reveal>
          <div className="stat"><b><CountUp value={14108} /></b><span>passing plays behind Catch Radius Pressure</span></div>
          <div className="stat"><b><CountUp value={0.855} decimals={3} /></b><span>test AUC, leverage-adjusted catch model</span></div>
          <div className="stat"><b><CountUp value={7222} /></b><span>NFL games of starters pulled from ESPN</span></div>
          <div className="stat"><b><CountUp value={27} /></b><span>seasons live on Catch Point Analytics</span></div>
        </div>
      </div>

      <section className="block wrap" id="work">
        <div data-reveal>
          <p className="eyebrow">Selected work</p>
          <h2 className="display">Four projects. Four kinds of question.</h2>
          <p className="intro">A new metric, a product built on top of it, an AI tool, and a family business with real lab data. Every chart uses the project&apos;s actual numbers. Click through for the full story.</p>
        </div>

        <div className="work-list">
          <Link className="work" href="/work/catch-radius-pressure" data-reveal>
            <div className="work-text">
              <div className="work-num">01<span className="pill live-pill">Research</span><span className="pill">Big Data Bowl 2026</span></div>
              <h3>Catch Radius Pressure</h3>
              <p>A new NFL metric for how much defensive pressure a receiver faces at the catch point, built from defender proximity and closing speed on every 2023 pass.</p>
              <p className="result">Adding receiver leverage lifted the catch model&apos;s test AUC from 0.793 to 0.855 and cut log loss 19%.</p>
              <div className="tags"><span>Python</span><span>scikit-learn</span><span>Tracking data</span></div>
              <span className="read">Read the case study →</span>
            </div>
            <div className="work-viz">
              <p className="viz-label">Catch model · test AUC by version</p>
              <AucChart />
            </div>
          </Link>

          <Link className="work" href="/work/catch-point-analytics" data-reveal>
            <div className="work-text">
              <div className="work-num">02<span className="pill live-pill">Live</span><span className="pill">Solo build</span></div>
              <h3>Catch Point Analytics</h3>
              <p>A public NFL stats site with CRP built in: win-probability replays, starting lineups drawn in real formation, and player pages for every game since 1999.</p>
              <p className="result">ETL from ESPN and other sources matches about 99% of 22,500+ starter records to unique player IDs.</p>
              <div className="tags"><span>React</span><span>FastAPI</span><span>DuckDB</span><span>ETL</span></div>
              <span className="read">Read the case study →</span>
            </div>
            <div className="work-viz">
              <p className="viz-label">Game page · starting offense in formation</p>
              <Formation />
            </div>
          </Link>

          <Link className="work" href="/work/sentry" data-reveal>
            <div className="work-text">
              <div className="work-num">03<span className="pill wip">Working prototype</span><span className="pill">Startup track</span></div>
              <h3>Sentry</h3>
              <p>An AI study tool that records a lecture, transcribes it with Whisper, and uses Claude to turn it into a summary, a quiz and an explorable concept map.</p>
              <p className="result">Deployed as a Flask web app; next step is testing demand with classmates.</p>
              <div className="tags"><span>Flask</span><span>Claude API</span><span>Whisper</span><span>D3.js</span></div>
              <span className="read">Read the case study →</span>
            </div>
            <div className="work-viz">
              <p className="viz-label">What one lecture becomes</p>
              <SentryFlow />
            </div>
          </Link>

          <Link className="work" href="/work/elaion" data-reveal>
            <div className="work-text">
              <div className="work-num">04<span className="pill live-pill">Ongoing</span><span className="pill">Marketing analytics</span></div>
              <h3>Elaion Olive Oil</h3>
              <p>Growth for my family&apos;s single-estate organic olive oil from Kalamata, Greece: lab data turned into customer-facing charts, a site rebuild, and wholesale outreach.</p>
              <p className="result">Every freshness marker sits inside the extra virgin limits, and the charts show shoppers exactly where.</p>
              <div className="tags"><span>Chart.js</span><span>Brand strategy</span><span>B2B outreach</span></div>
              <span className="read">Read the case study →</span>
            </div>
            <div className="work-viz">
              <p className="viz-label">2025–26 harvest · lab results</p>
              <div className="big-num">335<small>mg/kg polyphenols</small></div>
              <p className="viz-label" style={{ marginTop: 22 }}>Share of extra virgin limit used</p>
              <ElaionMeters />
            </div>
          </Link>
        </div>
      </section>

      <section className="block wrap" id="coursework">
        <div data-reveal>
          <p className="eyebrow">More projects</p>
          <h2 className="display">Coursework and side projects.</h2>
          <p className="intro">Team and solo work from the MSBA, plus a second NFL metric.</p>
        </div>
        <div data-reveal>
          <Coursework />
        </div>
      </section>

      <section className="block wrap" id="about">
        <div className="about" data-reveal>
          <div>
            <p className="eyebrow">About</p>
            <Image className="headshot" src="/headshot.jpg" alt="Steven Marathias" width={640} height={640} priority={false} />
            <dl className="facts">
              <div><dt>Based in</dt><dd>Boston, MA</dd></div>
              <div><dt>School</dt><dd>BU Questrom, MSBA</dd></div>
              <div><dt>Focus</dt><dd>Sports · Marketing · Business</dd></div>
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

      <section className="block wrap" id="resume">
        <div data-reveal>
          <p className="eyebrow">Résumé</p>
          <h2 className="display">The path so far.</h2>
          <p className="intro"><a href="/Steven_Marathias_Resume.pdf" target="_blank" rel="noopener">Open the full résumé (PDF) ↗</a></p>
        </div>
        <div className="timeline" data-reveal>
          <div className="tl"><span className="yr">2025 – Jan 2027</span><div><h4>M.S. Business Analytics</h4><p>Boston University, Questrom School of Business</p></div><span className="kind">School</span></div>
          <div className="tl"><span className="yr">Oct 2025 – now</span><div><h4>Catch Radius Pressure</h4><p>NFL Big Data Bowl 2026, University Track · practicum proposal earned a perfect score</p></div><span className="kind">Research</span></div>
          <div className="tl"><span className="yr">Apr 2024 – Aug 2025</span><div><h4>Business Analyst · Maratech NMR Solutions</h4><p>Cut operating costs 10% through financial and vendor analysis; built weekly stakeholder dashboards; translated three departments&apos; needs into requirements</p></div><span className="kind work-k">Work</span></div>
          <div className="tl"><span className="yr">May 2023 – Apr 2024</span><div><h4>Associate Business Analyst · Flask Scientific</h4><p>Pricing model from a ten-competitor analysis lifted Q1 sales 12%; co-launched an e-commerce site with 1,000+ visits in month one</p></div><span className="kind work-k">Work</span></div>
          <div className="tl"><span className="yr">Aug – Dec 2022</span><div><h4>Operations &amp; Strategy Intern · Neftwerk</h4><p>Business planning that moved a product launch up two months; cost reports behind a 15% expense reduction</p></div><span className="kind work-k">Work</span></div>
          <div className="tl"><span className="yr">May 2023</span><div><h4>BBA, Entrepreneurship &amp; Innovation Management</h4><p>Temple University, Fox School of Business</p></div><span className="kind">School</span></div>
        </div>
        <div className="skills" data-reveal>
          <div><h4>Analysis &amp; modeling</h4><p>Python (pandas, NumPy, scikit-learn, matplotlib), SQL (PostgreSQL, BigQuery, DuckDB), predictive modeling, clustering, A/B testing and causal inference, pricing and competitor analysis</p></div>
          <div><h4>Building &amp; shipping</h4><p>FastAPI, Flask, React, Next.js, Streamlit, ETL pipelines, D3.js, Chart.js, Claude API, Whisper, Git, Linux</p></div>
          <div><h4>Data &amp; tools</h4><p>NFL tracking and nflverse, WRDS Compustat, yfinance, Tableau, Excel, SPSS · Google Cybersecurity Professional Certificate, CompTIA</p></div>
        </div>
      </section>

      <section className="contact wrap" id="contact">
        <div data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="display">Let&apos;s talk <em>data.</em></h2>
          <p className="intro" style={{ marginBottom: 0 }}>I&apos;m looking for analyst roles in sports, marketing and business analytics starting January 2027, in Boston or remote. Happy to talk even if you&apos;re just exploring.</p>
          <CopyEmail email="stevenm5@bu.edu" />
          <div className="social">
            <a href="https://www.linkedin.com/in/steven-marathias/" target="_blank" rel="noopener">LinkedIn ↗</a>
            <a href="https://github.com/Stevenmarathias" target="_blank" rel="noopener">GitHub ↗</a>
            <a href="/Steven_Marathias_Resume.pdf" target="_blank" rel="noopener">Résumé ↗</a>
          </div>
        </div>
      </section>
    </main>
  );
}
