export type CourseProject = {
  course: string;
  title: string;
  who: string;
  body: string;
  link?: string;
  caseHref?: string;
  table?: { head: string[]; rows: string[][] };
};

export const coursework: CourseProject[] = [
  {
    course: "BA870 · Financial Analytics",
    title: "Financial Performance Predictor",
    who: "Team · built the dashboard",
    body: "Predicts whether any US company's return on assets will improve next year. I built the live Streamlit dashboard: it rebuilds the model's seven features from Yahoo Finance to match WRDS Compustat, flags estimated inputs, and shows the prediction alongside price, industry and model charts. The classifier reached 62% balanced accuracy on held-out years.",
    link: "https://github.com/Stevenmarathias/financial-analytics-dashboard",
    caseHref: "/work/financial-predictor",
  },
  {
    course: "BA860 · Marketing Analytics",
    title: "Sponsored Search ROI and Attribution",
    who: "Coursework",
    body: "Difference-in-differences ROI analysis of a sponsored search ad case, power calculations for experiment design, first-touch, last-touch and linear attribution models, and social media analytics for Delta Air Lines.",
  },
  {
    course: "MK852 · Data-Driven Marketing",
    title: "Client Project: ALOUD Live Translator",
    who: "Team · in progress",
    body: "A semester-long project for a real client, an iPhone translation app. The work covers qualitative research, survey design and SPSS analysis to turn customer data into marketing decisions.",
  },
  {
    course: "BA810 · Supervised ML",
    title: "Boston Airbnb Price and Booking",
    who: "Team project · Fall 2025",
    body: "Supervised learning models that predict nightly price and 30-day booking probability for Boston Airbnb listings.",
    link: "https://github.com/MikaIsmayilov/Boston_AirBnB_Price_Analytics_BA810_A07",
  },
  {
    course: "BA820 · Unsupervised ML",
    title: "Alone: Why Survivalists Tap Out",
    who: "Team of 4 · led exit-theme analysis",
    body: "On a four-person team studying the survival show Alone, I owned the question of why contestants leave. The tap-out notes average under four words, so keyword topic models (NMF and LDA) struggled. I switched to sentence embeddings (all-MiniLM-L6-v2) clustered with KMeans, removed a fake cluster made of empty notes, and labeled five exit themes for the 84 contestants with a recorded reason, then compared them with how long people lasted.",
    link: "https://github.com/MikaIsmayilov/B02_Alone_TVShow_Unsupervised_Project",
    caseHref: "/work/alone-exit-themes",
    table: {
      head: ["Exit theme", "Exits", "Share", "Avg days"],
      rows: [
        ["Injury or exhaustion", "28", "33%", "29.3"],
        ["Starvation", "19", "23%", "39.0"],
        ["Missing family", "15", "18%", "32.3"],
        ["Illness or food poisoning", "12", "14%", "28.4"],
        ["Low BMI or weight loss", "10", "12%", "53.5"],
      ],
    },
  },
  {
    course: "BA830 · Business Experimentation",
    title: "A/B Testing and Causal Inference",
    who: "Coursework",
    body: "Designing and analyzing randomized experiments, estimating treatment effects and choosing the right causal tool when randomization isn't available.",
  },
  {
    course: "Side project · Sep 2026",
    title: "Coverage Shadow",
    who: "Solo · NFL defensive metric",
    body: "A tracking metric for how much catch window a defender takes away at the moment of release, built on 14,107 plays from the 2023 Big Data Bowl data. Throws into the top quartile of Shadow were completed 62.5% of the time versus 75.0% in the bottom quartile. I also pre-registered stability and predictive tests: average Shadow is about as repeatable as completion % allowed (split-half r = 0.43), but it doesn't forecast future coverage results, so I report it as a measure of involvement rather than quality.",
    link: "https://github.com/Stevenmarathias/coverage-shadow",
    caseHref: "/work/coverage-shadow",
    table: {
      head: ["Closest-defender Shadow", "Throws", "Completion %"],
      rows: [
        ["Top quartile (≥ 1.03 s)", "3,443", "62.5%"],
        ["Bottom quartile (≤ 0.26 s)", "3,443", "75.0%"],
      ],
    },
  },
];
