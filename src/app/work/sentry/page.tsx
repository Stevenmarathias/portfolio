import type { Metadata } from "next";
import CaseLayout, { Section } from "@/components/CaseLayout";
import { SentryFlow } from "@/components/charts";

export const metadata: Metadata = {
  title: "Sentry",
  description: "An AI study tool that turns lectures into transcripts, summaries, quizzes and concept maps.",
};

export default function Page() {
  return (
    <CaseLayout
      slug="sentry"
      title="Sentry"
      dek="I wanted a study partner that had actually sat through my lectures. Sentry records class, transcribes it, and turns each session into something you can study from."
      meta={[
        ["Role", "Solo: product and build"],
        ["Status", "Working prototype"],
        ["Started", "Spring 2026"],
        ["Stack", "Flask, Claude API, Whisper, D3"],
      ]}
      links={[{ href: "https://sentry-10k5.onrender.com", label: "Try the prototype" }]}
      glance={{
        problem: "Lecture notes are only as good as what you caught in the moment, and most study tools start from material you already have.",
        approach: "Capture the lecture itself, transcribe it with Whisper, and have Claude turn each session into a summary, a quiz and a concept map, organized by class.",
        outcome: "A deployed Flask web app with local and hosted versions. The next milestone is testing demand with classmates before building accounts.",
      }}
    >
      <Section title="The problem">
        <p>When I was taking notes in class, I was either listening or writing, rarely both. Afterward, every study tool I tried started from material I already had: my notes, a slide deck, a textbook. None of them started from the lecture itself, which is where most of the useful explanation actually happens.</p>
      </Section>

      <Section title="What it does">
        <p>Point Sentry at a lecture and it produces a <strong>summary</strong>, a <strong>quiz</strong>, and a <strong>concept map</strong> you can explore as a force-directed graph. Sessions are organized by class, so a semester of lectures stays in one place, and the interface can be customized.</p>
        <figure className="figure chart-fig" data-chart="">
          <SentryFlow />
          <figcaption>Three ways in: live capture from the webcam and mic, a YouTube link, or a pasted transcript. One pipeline turns each into study material.</figcaption>
        </figure>
      </Section>

      <Section title="From prototype to web app">
        <dl className="steps">
          <div><dt>Mar–Apr 2026</dt><dd><strong>Lecture AI</strong>, a Python desktop app. OpenCV captured the webcam, Claude&apos;s vision API read the board, and Whisper transcribed the audio. It proved the idea worked, but only on my laptop.</dd></div>
          <div><dt>Then</dt><dd><strong>Sentry</strong>, rebuilt as a Flask web app with a local version and a hosted one. It added YouTube import, quizzes, summaries, D3 concept maps and per-class sessions.</dd></div>
          <div><dt>Now</dt><dd>Deployed on Render as a working prototype, ahead of testing with classmates.</dd></div>
        </dl>
      </Section>

      <Section title="Decisions that shaped it">
        <h3>Make the reliable input the main one</h3>
        <p>YouTube blocks requests from cloud data-center IP addresses, so the hosted version can&apos;t reliably pull videos. Rather than fight it with workarounds, I made pasting a transcript the primary hosted input, because it always works. Live capture and YouTube import stay in the local version, where they run fine.</p>
        <h3>One codebase, two deployments</h3>
        <p>A single environment setting switches between the full local app and the hosted one. Both stay on one codebase, so a fix in one place fixes both.</p>
        <h3>Validate before scaling</h3>
        <p>The hosting platform&apos;s file system resets whenever the app restarts, so Sentry needs a real database before it can keep anyone&apos;s data long term. That&apos;s a known, scoped piece of work. I&apos;m deliberately holding it until classmates have tried the prototype and I know people want it, instead of building accounts for users who may not exist.</p>
      </Section>

      <Section title="How I built it">
        <p>I used an AI coding agent for implementation and a separate conversation as architect and reviewer: I set the direction, it wrote code, and I reviewed each change against the plan. Working that way let me ship a full-stack app solo in a few weeks, and it made me much more deliberate about writing down decisions before code existed.</p>
      </Section>

      <Section title="What's next">
        <ul>
          <li><strong>Demand test.</strong> Put it in front of classmates, watch how they use it, and decide whether it&apos;s worth turning into a product.</li>
          <li><strong>Persistence.</strong> Add the database migration and multi-user accounts if the test says go.</li>
          <li><strong>An instructor version.</strong> A tool that helps teachers see what a lecture actually covered is a second direction I&apos;m considering.</li>
        </ul>
      </Section>

      <Section title="What I learned">
        <p>Building the product turned out to be the easy part. The harder, more useful skill was deciding what not to build yet. Holding the database work until there&apos;s evidence of demand is the same call I&apos;d want a product team to make.</p>
      </Section>
    </CaseLayout>
  );
}
