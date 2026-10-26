import Coursework from "@/components/Coursework";
import CopyEmail from "@/components/CopyEmail";

export default function Home() {
  return (
    <>
      <nav>
        <div className="wrap">
          <a className="brand" href="#top">Steven Marathias</a>
          <div className="navlinks">
            <a href="#work">Work</a><a href="#coursework">Coursework</a><a href="#about">About</a><a href="#resume">Résumé</a><a href="#contact">Contact</a><a href="/Steven_Marathias_Resume.pdf" target="_blank" rel="noopener">Résumé PDF ↗</a>
            <a href="https://github.com/Stevenmarathias" target="_blank" rel="noopener">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/steven-marathias/" target="_blank" rel="noopener">LinkedIn ↗</a>
          </div>
        </div>
      </nav>

      <main className="wrap" id="top">
        <header className="hero">
          <div>
            <div className="kicker"><span className="dot-live"></span>Open to work · Jan 2027 start · Boston or remote</div>
            <h1>I build metrics for the moments <em>box scores miss.</em></h1>
            <p className="lede">Business analyst and MSBA candidate at Boston University. I turn messy tracking, transaction and survey data into models people can use, with a soft spot for football and for the products that ship the answer.</p>
            <div className="cta">
              <a className="btn primary" href="#work">See the work</a>
              <a className="btn" href="/Steven_Marathias_Resume.pdf" target="_blank" rel="noopener">Résumé ↗</a>
            </div>
          </div>

          <figure className="diagram" aria-label="Schematic of Catch Radius Pressure: two defenders closing on a receiver's catch radius as the ball arrives">
            <svg viewBox="0 0 320 240" role="img">
              <title>Catch Radius Pressure schematic</title>

              <g stroke="var(--line)" strokeWidth="1">
                <line x1="40" y1="0" x2="40" y2="240"/><line x1="120" y1="0" x2="120" y2="240"/>
                <line x1="200" y1="0" x2="200" y2="240"/><line x1="280" y1="0" x2="280" y2="240"/>
              </g>
              <g stroke="var(--line)" strokeWidth="1">
                <line x1="76" y1="78" x2="84" y2="78"/><line x1="156" y1="78" x2="164" y2="78"/><line x1="236" y1="78" x2="244" y2="78"/>
                <line x1="76" y1="162" x2="84" y2="162"/><line x1="156" y1="162" x2="164" y2="162"/><line x1="236" y1="162" x2="244" y2="162"/>
              </g>

              <circle cx="180" cy="118" r="56" fill="none" stroke="var(--field)" strokeWidth="1" strokeDasharray="3 4" opacity={0.55}/>
              <circle cx="180" cy="118" r="34" fill="var(--accent-soft)" stroke="var(--accent)" strokeWidth="1.5" className="ring-hot"/>

              <path d="M 22 214 Q 90 40 180 118" fill="none" stroke="var(--muted)" strokeWidth="1.2" strokeDasharray="2 4"/>
              <ellipse cx="180" cy="114" rx="5" ry="3.4" fill="var(--ink)" transform="rotate(-30 180 114)"/>

              <circle cx="180" cy="118" r="8" fill="var(--field)"/>
              <text x="180" y="146" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="var(--ink)">WR</text>

              <g className="defL"><g transform="translate(152,96)">
                <line x1="-7" y1="-7" x2="7" y2="7" stroke="var(--def)" strokeWidth="3" strokeLinecap="round"/>
                <line x1="7" y1="-7" x2="-7" y2="7" stroke="var(--def)" strokeWidth="3" strokeLinecap="round"/>
              </g></g>
              <g className="defR"><g transform="translate(214,128)">
                <line x1="-7" y1="-7" x2="7" y2="7" stroke="var(--def)" strokeWidth="3" strokeLinecap="round"/>
                <line x1="7" y1="-7" x2="-7" y2="7" stroke="var(--def)" strokeWidth="3" strokeLinecap="round"/>
              </g></g>
              <text x="236" y="70" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="var(--muted)">catch radius</text>
              <line x1="234" y1="73" x2="208" y2="94" stroke="var(--muted)" strokeWidth=".8"/>
            </svg>
            <figcaption><span>Catch Radius Pressure · defender proximity × closing speed</span><span>2023 NFL tracking</span></figcaption>
          </figure>
        </header>

        <div className="stats">
          <div className="stat"><b>14,108</b><span>passing plays modeled for CRP</span></div>
          <div className="stat"><b>0.855</b><span>test AUC, catch-probability model</span></div>
          <div className="stat"><b>7,222</b><span>NFL games of starting lineups scraped</span></div>
          <div className="stat"><b>27</b><span>seasons in Catch Point Analytics (1999–2025)</span></div>
        </div>

        <section id="work">
          <p className="eyebrow">Selected work</p>
          <h2>Four projects, four kinds of question.</h2>
          <p className="section-intro">A new metric, a product built on it, a tool people use, and a marketing problem with real lab data. Every chart below uses the project's actual numbers.</p>

          <div className="cases">

            <article className="case">
              <div>
                <div className="case-meta"><span className="pill status">Research · complete</span><span className="pill">Big Data Bowl 2026 · University Track</span></div>
                <h3>Catch Radius Pressure</h3>
                <p>A new NFL metric that measures how much defensive pressure a receiver faces at the catch point, built from defender proximity and closing velocity on 14,108 passing plays from the 2023 season. It produces CROE for receivers and DROE for team defenses.</p>
                <p>I extended it with a two-stage hurdle model that predicts whether a target gets contested and how badly, comparing what's knowable pre-snap against what's knowable at the throw. Peer feedback drove four more passes: coordinate standardization, receiver leverage, a release-vs-arrival decomposition and a red-zone study.</p>
                <p className="result">Adding receiver leverage lifted test AUC from 0.793 to 0.855 and cut log loss by 19%.</p>
                <div className="tags"><span>Python</span><span>pandas</span><span>scikit-learn</span><span>Big Data Bowl tracking</span><span>Jupyter</span></div>
                <div className="links">
                  <a href="https://github.com/Stevenmarathias/catch-radius-pressure" target="_blank" rel="noopener">Code →</a>
                  <a href="https://github.com/Stevenmarathias/nfl-defense-rankings" target="_blank" rel="noopener">Defense rankings →</a>
                </div>
              </div>
              <div className="viz">
                <p className="viz-label">Catch-probability model · test AUC by version</p>
                <svg viewBox="0 0 340 168" role="img" aria-label="Test AUC: calibrated model 0.792, plus arrival separation 0.793, plus receiver leverage 0.855">

                  <g fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--muted)" textAnchor="middle">
                    <line x1="110" y1="14" x2="110" y2="128" stroke="var(--line)"/><text x="110" y="144">0.70</text>
                    <line x1="162.5" y1="14" x2="162.5" y2="128" stroke="var(--line)"/><text x="162.5" y="144">0.75</text>
                    <line x1="215" y1="14" x2="215" y2="128" stroke="var(--line)"/><text x="215" y="144">0.80</text>
                    <line x1="267.5" y1="14" x2="267.5" y2="128" stroke="var(--line)"/><text x="267.5" y="144">0.85</text>
                    <line x1="320" y1="14" x2="320" y2="128" stroke="var(--line)"/><text x="320" y="144">0.90</text>
                    <text x="215" y="162">test AUC</text>
                  </g>
                  <g fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="var(--ink)">
                    <text x="0" y="38">Calibrated v2</text>
                    <text x="0" y="74">+ arrival sep.</text>
                    <text x="0" y="110" fontWeight="600">+ leverage</text>
                  </g>
                  <g strokeWidth="2" stroke="var(--line)">
                    <line x1="110" y1="34" x2="206.6" y2="34"/>
                    <line x1="110" y1="70" x2="207.7" y2="70"/>
                    <line x1="110" y1="106" x2="272.8" y2="106" stroke="var(--accent)"/>
                  </g>
                  <circle cx="206.6" cy="34" r="5" fill="var(--field)"/>
                  <circle cx="207.7" cy="70" r="5" fill="var(--field)"/>
                  <circle cx="272.8" cy="106" r="6.5" fill="var(--accent)"/>
                  <g fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="var(--ink)">
                    <text x="216" y="38">0.792</text><text x="217" y="74">0.793</text><text x="283" y="110" fontWeight="500">0.855</text>
                  </g>
                </svg>
              </div>
            </article>


            <article className="case">
              <div>
                <div className="case-meta"><span className="pill status">Live</span><span className="pill">Solo build</span></div>
                <h3>Catch Point Analytics</h3>
                <p>A public NFL analytics site with CRP built in. Every game from 1999 to 2025 gets a win-probability replay, starting lineups drawn in real formation, player pages with career and contract data, and a 2×2 receiver archetype view from the CRP research.</p>
                <p>The hard part was the data. ETL pipelines pull 7,000+ games from ESPN's API and other sources, match about 99% of 22,500+ starter records to unique player IDs, and label every lineup with the source tier it came from.</p>
                <p className="result">Lineup shape errors went from 1,433 games to zero after a position-aware backfill pass.</p>
                <div className="tags"><span>React</span><span>FastAPI</span><span>DuckDB</span><span>nflverse</span><span>ETL</span></div>
                <div className="links"><a href="https://catch-point-analytics.fly.dev" target="_blank" rel="noopener">Visit the site →</a></div>
              </div>
              <div className="viz">
                <p className="viz-label">Game page · starting offense in formation</p>
                <svg viewBox="0 0 320 170" role="img" aria-label="Schematic of a starting offense: five linemen, a tight end, two wide receivers split wide, a quarterback and running back behind">
                  <line x1="0" y1="64" x2="320" y2="64" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="5 4"/>
                  <text x="4" y="58" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="var(--muted)">line of scrimmage</text>
                  <g fontFamily="IBM Plex Mono, monospace" fontSize="9" textAnchor="middle">
                    <g fill="var(--surface)" stroke="var(--field)" strokeWidth="1.2">
                      <rect x="6" y="72" width="36" height="24" rx="3"/>
                      <rect x="94" y="72" width="26" height="24" rx="3"/><rect x="122" y="72" width="26" height="24" rx="3"/>
                      <rect x="150" y="72" width="26" height="24" rx="3" stroke="var(--accent)"/>
                      <rect x="178" y="72" width="26" height="24" rx="3"/><rect x="206" y="72" width="26" height="24" rx="3"/>
                      <rect x="234" y="72" width="26" height="24" rx="3"/>
                      <rect x="278" y="72" width="36" height="24" rx="3"/>
                      <rect x="150" y="104" width="26" height="24" rx="3"/>
                      <rect x="150" y="136" width="26" height="24" rx="3"/>
                    </g>
                    <g fill="var(--ink)">
                      <text x="24" y="87">WR</text><text x="107" y="87">LT</text><text x="135" y="87">LG</text><text x="163" y="87">C</text>
                      <text x="191" y="87">RG</text><text x="219" y="87">RT</text><text x="247" y="87">TE</text><text x="296" y="87">WR</text>
                      <text x="163" y="119">QB</text><text x="163" y="151">RB</text>
                    </g>
                  </g>
                  <text x="316" y="164" textAnchor="end" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="var(--muted)">source tier: espn_starter</text>
                </svg>
              </div>
            </article>


            <article className="case">
              <div>
                <div className="case-meta"><span className="pill status build">Working prototype</span><span className="pill">Solo build · startup track</span></div>
                <h3>Sentry</h3>
                <p>An AI study tool for lectures. It records class through the webcam and mic, transcribes with Whisper, and uses Claude to turn each session into a summary, a quiz and a concept map you can explore as a force-directed graph. Sessions are organized by class.</p>
                <p>It started in spring 2026 as Lecture AI, a desktop prototype, and grew into a Flask web app with local and hosted versions. Next step is putting it in front of classmates to test demand before building multi-user infrastructure.</p>
                <div className="tags"><span>Flask</span><span>Claude API</span><span>Whisper</span><span>D3.js</span><span>Render</span></div>
                <div className="links"><a href="https://sentry-10k5.onrender.com" target="_blank" rel="noopener">Try the prototype →</a></div>
              </div>
              <div className="viz">
                <p className="viz-label">What one lecture becomes</p>
                <div className="flow">
                  <div className="flow-row"><span className="chip in">Webcam + mic</span><span className="chip in">YouTube link</span><span className="chip in">Pasted transcript</span></div>
                  <div className="flow-row"><span className="arrow">↓</span><span className="chip">Whisper transcription</span></div>
                  <div className="flow-row"><span className="arrow">↓</span><span className="chip">Claude, per class session</span></div>
                  <div className="flow-row"><span className="arrow">↓</span><span className="chip out">Summary</span><span className="chip out">Quiz</span><span className="chip out">Concept map</span></div>
                </div>
              </div>
            </article>


            <article className="case">
              <div>
                <div className="case-meta"><span className="pill status">Ongoing</span><span className="pill">Family business · marketing analytics</span></div>
                <h3>Elaion Olive Oil</h3>
                <p>Marketing and growth for my family's single-estate organic extra virgin olive oil from groves outside Kalamata, Greece. I turned the harvest's lab analysis into customer-facing charts, planned the website rebuild, and run wholesale outreach to specialty grocers in Massachusetts.</p>
                <p>The charts let a shopper see what "extra virgin" means in numbers instead of taking the label's word for it.</p>
                <div className="tags"><span>Chart.js</span><span>Wix Studio</span><span>B2B outreach</span><span>Brand strategy</span></div>
                <div className="links"><a href="https://elaion-olive.com" target="_blank" rel="noopener">elaion-olive.com →</a></div>
              </div>
              <div className="viz">
                <p className="viz-label">2025–26 harvest · lab results</p>
                <div className="big">335<small>mg/kg polyphenols</small></div>
                <p className="viz-label" style={{marginTop: "16px"}}>Share of extra virgin limit used (lower is fresher)</p>
                <div className="meter"><span>Peroxide</span><div className="track"><div className="fill" style={{width: "40%"}}></div></div><code>8 / 20</code></div>
                <div className="meter"><span>K232</span><div className="track"><div className="fill" style={{width: "59.6%"}}></div></div><code>1.49 / 2.50</code></div>
                <div className="meter"><span>K270</span><div className="track"><div className="fill" style={{width: "72.7%"}}></div></div><code>0.16 / 0.22</code></div>
              </div>
            </article>
          </div>
        </section>

        <section id="coursework">
          <p className="eyebrow">Coursework</p>
          <h2>More projects.</h2>
          <p className="section-intro">Team and solo work from the MSBA. Scroll the strip and pick a card for details.</p>
          <Coursework />
        </section>

        <section id="about" className="about">
          <div>
            <p className="eyebrow">About</p>
            <h2>Business first, then the data.</h2>
            <img className="headshot" alt="Steven Marathias" width={640} height={640} src="/headshot.jpg" />
            <dl className="facts">
              <div><dt>Based in</dt><dd>Boston area</dd></div>
              <div><dt>School</dt><dd>BU Questrom, MSBA</dd></div>
              <div><dt>Focus</dt><dd>Sports · Marketing · Business</dd></div>
              <div><dt>Looking for</dt><dd>Analyst and data roles, Jan 2027</dd></div>
              <div><dt>Recently</dt><dd>MIT Sloan Sports Analytics Conf. 2026</dd></div>
            </dl>
          </div>
          <div>
            <p>I studied entrepreneurship and innovation management at Temple's Fox School of Business, then spent two years as a business analyst at two Cambridge scientific companies, Flask Scientific and Maratech NMR Solutions. There I rebuilt a pricing model that lifted first-quarter sales 12% and found vendor savings that cut operating costs 10%. I also hold cybersecurity certifications from Google and CompTIA.</p>
            <p>The MSBA at Boston University gave me the modeling side: supervised and unsupervised machine learning, experimentation and causal inference, financial and marketing analytics. I use it most on the two things I care about, sports and the businesses around me.</p>
            <p>Catch Radius Pressure started as my NFL Big Data Bowl 2026 entry. I turned it into my practicum research, and now it powers a public NFL stats site. That's how I like to work: find a question nobody's measuring, measure it, then ship something people can use.</p>
          </div>
        </section>

        <section id="resume">
          <p className="eyebrow">Résumé</p>
          <h2>The path so far.</h2>
          <p className="section-intro"><a href="/Steven_Marathias_Resume.pdf" target="_blank" rel="noopener">Open the full résumé (PDF) ↗</a></p>
          <div className="timeline">
            <div className="tl"><span className="yr">2025 – Jan 2027</span><div><h4>M.S. Business Analytics</h4><p>Boston University, Questrom School of Business · expected January 2027</p></div><span className="kind">School</span></div>
            <div className="tl"><span className="yr">Oct 2025 – now</span><div><h4>Catch Radius Pressure</h4><p>NFL Big Data Bowl 2026 University Track · practicum research proposal earned a perfect score</p></div><span className="kind">Research</span></div>
            <div className="tl"><span className="yr">Apr 2024 – Aug 2025</span><div><h4>Business Analyst</h4><p>Maratech NMR Solutions, Cambridge · cut operating costs 10% through financial and vendor analysis; built weekly stakeholder dashboards</p></div><span className="kind">Work</span></div>
            <div className="tl"><span className="yr">May 2023 – Apr 2024</span><div><h4>Associate Business Analyst</h4><p>Flask Scientific, Cambridge · new pricing model from a 10-competitor analysis lifted Q1 sales 12%; launched an e-commerce site with 1,000+ visits in month one</p></div><span className="kind">Work</span></div>
            <div className="tl"><span className="yr">Aug – Dec 2022</span><div><h4>Operations &amp; Strategy Intern</h4><p>Neftwerk Inc, Philadelphia · moved a product launch up two months; cost reports behind a 15% expense reduction</p></div><span className="kind">Work</span></div>
            <div className="tl"><span className="yr">May 2023</span><div><h4>BBA, Entrepreneurship and Innovation Management</h4><p>Temple University, Fox School of Business</p></div><span className="kind">School</span></div>
          </div>
          <div className="skills">
            <div><h4>Analysis &amp; modeling</h4><p>Python (pandas, NumPy, scikit-learn, matplotlib), SQL (PostgreSQL, BigQuery, DuckDB), predictive modeling, clustering, A/B testing and causal inference, pricing and competitor analysis, SPSS</p></div>
            <div><h4>Building &amp; shipping</h4><p>FastAPI, Flask, React, Streamlit, ETL pipelines, D3.js, Chart.js, Claude API, Whisper, Git and GitHub, Linux</p></div>
            <div><h4>Data &amp; tools</h4><p>NFL tracking and nflverse, WRDS Compustat, yfinance, Tableau, Excel · Google Cybersecurity Professional Certificate, CompTIA</p></div>
          </div>
        </section>

        <section id="contact" className="contact">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Let's talk about your data.</h2>
            <p className="section-intro" style={{margin: "0"}}>I'm looking for analyst roles in sports, marketing and business analytics starting January 2027, in Boston or remote.</p>
          </div>
          <div>
            <CopyEmail email="stevenm5@bu.edu" />
            <div className="links" style={{marginTop: "8px"}}><a href="https://www.linkedin.com/in/steven-marathias/" target="_blank" rel="noopener">LinkedIn ↗</a><a href="https://github.com/Stevenmarathias" target="_blank" rel="noopener">GitHub ↗</a></div>
          </div>
        </section>

        <footer><span>© 2026 Steven Marathias</span><span>Boston, MA</span></footer>
      </main>
    </>
  );
}
