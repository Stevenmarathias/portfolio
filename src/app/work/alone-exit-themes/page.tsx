import type { Metadata } from "next";
import CaseLayout, { Fig, Section } from "@/components/CaseLayout";

export const metadata: Metadata = {
  title: "Why Survivalists Tap Out",
  description: "Unsupervised text analysis of why contestants leave the survival show Alone, turning short exit notes into five exit themes.",
};

export default function Page() {
  return (
    <CaseLayout
      slug="alone-exit-themes"
      title="Why Survivalists Tap Out"
      dek="On the survival show Alone, every contestant who leaves gets a one-line reason. I turned those notes into a small set of exit themes that producers, safety teams and future contestants could actually use."
      meta={[
        ["Role", "Exit-theme analysis, team of 4"],
        ["Course", "BA820 Unsupervised ML · BU"],
        ["Data", "94 contestants · tap-out notes"],
        ["Methods", "TF-IDF, NMF, LDA, embeddings, KMeans"],
      ]}
      links={[{ href: "https://github.com/MikaIsmayilov/B02_Alone_TVShow_Unsupervised_Project", label: "Team repo" }]}
      glance={{
        problem: "Contestants leave for many reasons, but the show records each one as a short free-text note. Is there structure in why people quit?",
        approach: "Compare keyword topic models with sentence embeddings for very short text, fix what broke, and check the resulting themes against how long people lasted.",
        outcome: "Five exit themes covering 84 contestants. Weight-loss exits came latest, at 53.5 days on average, versus about 28–29 for illness and injury.",
      }}
    >
      <Section title="The question">
        <p>Our team studied the survival show <em>Alone</em> with unsupervised learning. My part was the question of <strong>why contestants leave</strong>: do the tap-out reasons fall into a few repeatable exit themes? If they do, casting can screen for mental readiness, safety teams can plan for the most common failure modes, and future contestants know what tends to break people first.</p>
      </Section>

      <Section title="The data was shorter than expected">
        <p>The source is a table of 94 contestants with a free-text <em>reason tapped out</em> field. I expected story-like explanations. Instead:</p>
        <ul>
          <li>10 contestants had no reason recorded.</li>
          <li>The rest averaged <strong>3.75 words</strong> (median 3, longest 11), and 23 were exact duplicates, like &ldquo;Starvation&rdquo;.</li>
          <li>82 of 94 were under five words after cleaning, which left only 12 longer notes for keyword methods.</li>
        </ul>
        <p>That reframed the project from narrative analysis to <strong>short-text theme discovery</strong>, and it shaped every method choice after that.</p>
      </Section>

      <Section title="Approach 1: keyword topic models">
        <p>I started with TF-IDF and two topic models, NMF and LDA, using both single words and two-word phrases. Phrases mattered, because exit reasons are often short pairs like &ldquo;missed family&rdquo; or &ldquo;low BMI&rdquo; that single words split apart.</p>
        <p>The topic models found a few real themes (weight loss and low BMI, missing family, &ldquo;wasn&apos;t worth it&rdquo;), but beyond the first three topics they mostly repeated the same terms. LDA produced several near-identical topics. A KMeans pass on the same features scored a high silhouette (0.88 at five clusters), but on only 12 duplicate-heavy notes, with clusters of 2 to 4. I treated that as a warning sign, not a result.</p>
      </Section>

      <Section title="Approach 2: sentence embeddings">
        <p>Keyword methods depend on exact wording, but the same reason gets written in different ways. So I switched to <strong>sentence embeddings</strong> (all-MiniLM-L6-v2), which place notes with similar meaning close together, and clustered them with KMeans into five groups to stay comparable with the first approach.</p>
        <h3>The first run had a fake theme</h3>
        <p>Clustering all 94 contestants produced one cluster made entirely of <strong>empty notes</strong>: missing data showing up as structure. I removed the 10 empty notes and re-ran on the remaining 84, then labeled each cluster from the notes closest to its center.</p>
      </Section>

      <Section title="Results">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Exit theme</th><th className="num">Contestants</th><th className="num">Share</th><th className="num">Avg days lasted</th></tr></thead>
            <tbody>
              <tr><td>Injury or exhaustion</td><td className="num">28</td><td className="num">33.3%</td><td className="num">29.3</td></tr>
              <tr><td>Starvation</td><td className="num">19</td><td className="num">22.6%</td><td className="num">39.0</td></tr>
              <tr><td>Missing family</td><td className="num">15</td><td className="num">17.9%</td><td className="num">32.3</td></tr>
              <tr><td>Illness or food poisoning</td><td className="num">12</td><td className="num">14.3%</td><td className="num">28.4</td></tr>
              <tr><td>Low BMI or weight loss</td><td className="num">10</td><td className="num">11.9%</td><td className="num">53.5</td></tr>
            </tbody>
          </table>
        </div>
        <Fig
          src="/work/alone/days-by-theme.webp"
          alt="Box plot of days lasted by exit theme; low BMI or weight loss has the highest median at about 59 days"
          w={839}
          h={442}
          caption="Days lasted by exit theme, 84 contestants with a recorded reason. Weight-loss exits cluster late; injury and illness exits can happen at any point."
        />
        <p>The themes line up with different kinds of exit. <strong>Weight loss</strong> looks like late-stage decline: those contestants lasted longest. <strong>Injury and illness</strong> are acute and can end a run on day one. <strong>Missing family</strong> is a non-survival reason that still ends runs, which matters for casting and preparation. This is descriptive, not causal.</p>
        <p>The themes became one of the supporting pieces of evidence in our team&apos;s final presentation.</p>
      </Section>

      <Section title="Limitations">
        <ul>
          <li>94 contestants and very short notes limit how deep any text method can go.</li>
          <li>The clusters are looser than their labels. A few notes, like &ldquo;Fear of bears&rdquo; landing under starvation, don&apos;t fit their theme well.</li>
          <li>I didn&apos;t compute a separate quality score for the embedding clusters or test the days-lasted differences for significance.</li>
        </ul>
      </Section>

      <Section title="My role">
        <p>I owned the exit-theme question end to end: cleaning, both modeling approaches, the empty-note fix, labeling, and the days-lasted comparison. Teammates handled episode ratings, contestant gear and contestant profiles; one also ran a version of the tap-out analysis inside our combined pipeline.</p>
      </Section>

      <Section title="What I learned">
        <p>Look at the data before picking the method. The text turned out to read more like coded summaries than narratives, and that one observation decided everything downstream. And a suspiciously clean result, like a 0.88 silhouette on 12 notes or a cluster of blanks, is usually telling you something about the data, not the method.</p>
      </Section>
    </CaseLayout>
  );
}
