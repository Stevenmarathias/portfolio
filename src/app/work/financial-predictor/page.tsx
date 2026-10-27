import type { Metadata } from "next";
import CaseLayout, { Section } from "@/components/CaseLayout";
import { FinImportance } from "@/components/charts";

export const metadata: Metadata = {
  title: "Financial Performance Predictor",
  description: "A machine learning dashboard that predicts whether any US company's return on assets will improve next year, combining WRDS Compustat history with live Yahoo Finance data.",
};

export default function Page() {
  return (
    <CaseLayout
      slug="financial-predictor"
      title="Financial Performance Predictor"
      dek="Will this company be more profitable next year? Our team trained a model on fifteen years of company financials. I built the live dashboard that answers the question for any US stock in a few seconds."
      meta={[
        ["Role", "Built the live dashboard, team of 3"],
        ["Course", "BA870 Financial Analytics · BU"],
        ["Data", "WRDS Compustat 2010–2024 + Yahoo Finance"],
        ["Stack", "Python, scikit-learn, Streamlit, Plotly"],
      ]}
      links={[
        { href: "https://financial-analytics-dashboard-cxfbfgqfjpnsjmgpgav5wu.streamlit.app/", label: "Open the dashboard" },
        { href: "https://github.com/Stevenmarathias/financial-analytics-dashboard", label: "Code" },
      ]}
      glance={{
        problem: "Judging whether a company's profitability will improve is manual, slow and subjective, and most people can't run a model on Compustat data themselves.",
        approach: "Train random forests on company-years from WRDS Compustat, then rebuild the same seven features live from Yahoo Finance for any ticker.",
        outcome: "A deployed Streamlit app that predicts next year's ROA direction at 62% balanced accuracy, with the reasons and context shown alongside.",
      }}
    >
      <Section title="The question">
        <p>Return on assets (ROA) is a standard measure of how profitably a company uses what it owns. The question we set was narrow and useful: <strong>will a company&apos;s ROA go up or down next year?</strong> Investors answer that by hand from financial statements. We wanted a model that could answer it for any US stock, and a tool anyone could use without touching the data.</p>
        <p>The team split the work into three sections: data and features, model training, and the live dashboard. I built the dashboard.</p>
      </Section>

      <Section title="The model">
        <p>The team pulled company-year financials from WRDS Compustat for fiscal years 2010 to 2024, about 155,000 raw records, and cleaned them to 70,165 company-years. Each one gets seven features:</p>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Feature</th><th>What it captures</th></tr></thead>
            <tbody>
              <tr><td>P/E ratio</td><td>Price relative to earnings</td></tr>
              <tr><td>Return on equity</td><td>Profit relative to shareholders&apos; equity</td></tr>
              <tr><td>ROA, prior year</td><td>Where profitability is starting from</td></tr>
              <tr><td>Earnings growth</td><td>Year-over-year change in net income</td></tr>
              <tr><td>Company size</td><td>Log of total assets</td></tr>
              <tr><td>Price-to-sales</td><td>Market value relative to revenue</td></tr>
              <tr><td>Debt ratio</td><td>Long-term debt relative to assets</td></tr>
            </tbody>
          </table>
        </div>
        <p>Two random forests use them: a classifier for the direction (improve or decline) and a regressor for next year&apos;s ROA. The split is by time: train on 2010–2021, test on 2022–2024. That way the model is always judged on years it hasn&apos;t seen, the way it would be used in practice.</p>
        <figure className="figure chart-fig" data-chart="">
          <FinImportance />
          <figcaption>Which features the classifier leans on. Valuation (P/E) and return on equity carry the most weight; leverage carries the least.</figcaption>
        </figure>
        <p>The classifier reached <strong>62% balanced accuracy</strong> on the held-out years. That&apos;s well above a coin flip, but far from certain, and the dashboard says so plainly.</p>
      </Section>

      <Section title="What I built: the live dashboard">
        <p>Type a ticker and click Analyze. The app returns:</p>
        <ul>
          <li>A <strong>prediction card</strong>, green for improve and red for decline, with the company&apos;s current ROA, the model&apos;s confidence and probability, and a predicted ROA for next year.</li>
          <li>The <strong>exact inputs</strong> the model used, each labeled with where it came from and whether it was adjusted.</li>
          <li>Five interactive charts: price history with a 20-day moving average, volume against daily returns, the company&apos;s ratios against its industry median, actual versus predicted ROA over the test years, and how many companies in its industry improved.</li>
          <li>Pages explaining the app, the model details, the training code and the model comparison.</li>
        </ul>
      </Section>

      <Section title="The hard part: making live data match the training data">
        <p>The model learned from Compustat. The dashboard feeds it Yahoo Finance. If the two don&apos;t speak the same language, the predictions are quietly wrong.</p>
        <h3>Units</h3>
        <p>Compustat reports in millions of dollars; Yahoo reports raw dollars. A company&apos;s size feature (log of assets) would have been off by a factor of a million. Every dollar value from Yahoo is converted to millions before any feature is built.</p>
        <h3>Missing history</h3>
        <p>Two features need last year&apos;s numbers, which Yahoo doesn&apos;t always have. Instead of failing, the app falls back to the training median and <strong>labels that input as estimated</strong>, so the user knows exactly what the prediction rests on.</p>
        <h3>Out-of-range values</h3>
        <p>Live companies can have ratios far outside anything in training. Each input is capped to the training range before predicting, and the app flags which ones were capped.</p>
        <h3>A deployment break</h3>
        <p>The saved model file stopped loading after a Python and scikit-learn version change on the hosting platform. Rather than pin old versions, I changed the app to <strong>retrain the models once at startup</strong> from the stored features and cache them, so it can&apos;t break that way again.</p>
      </Section>

      <Section title="What the model taught us">
        <p>The most interesting output was a surprising one. Strong companies often get a <strong>decline</strong> prediction. The model has learned mean reversion: unusually high profitability tends to drift back toward average. It predicts the direction of change, not company quality, and the app explains that so users don&apos;t misread a decline as a bad company.</p>
      </Section>

      <Section title="What I'd improve next">
        <ul>
          <li>Two live features are defined slightly differently from training: Yahoo&apos;s debt figure includes short-term debt, and its P/E comes from Yahoo&apos;s own calculation. Rebuilding both from the raw statements would match training exactly.</li>
          <li>The industry comparison for ROA needs its own benchmark column; it currently reuses another ratio&apos;s median as a stand-in.</li>
          <li>Show baseline models (logistic regression, ridge) side by side, so the forest&apos;s lift over simpler models is visible.</li>
        </ul>
      </Section>

      <Section title="What I learned">
        <p>A model is only as good as the pipeline that feeds it in production. The training work happened once; making live data trustworthy, and being open about where it&apos;s estimated, is what made the tool usable.</p>
      </Section>
    </CaseLayout>
  );
}
