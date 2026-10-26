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
      eyebrow="Case study 03 · AI product"
      title="Sentry"
      dek="I wanted a study partner that had actually sat through my lectures. Sentry records class, transcribes it, and turns each session into something you can study from."
      meta={[
        ["Role", "Solo: product and build"],
        ["Status", "Working prototype"],
        ["Started", "Spring 2026"],
        ["Stack", "Flask, Claude API, Whisper, D3"],
      ]}
      links={[{ href: "https://sentry-10k5.onrender.com", label: "Try the prototype" }]}
    >
      <Section n="01" title="What it does">
        <p>Point it at a lecture, and Sentry produces a <strong>summary</strong>, a <strong>quiz</strong>, and a <strong>concept map</strong> you can explore as a force-directed graph. Sessions are organized by class, so a semester of notes stays in one place.</p>
        <figure className="figure">
          <SentryFlow />
          <figcaption>Three ways in: live capture from the webcam and mic, a YouTube link, or a pasted transcript.</figcaption>
        </figure>
      </Section>

      <Section n="02" title="From prototype to web app">
        <dl className="steps">
          <div><dt>Mar–Apr 2026</dt><dd><strong>Lecture AI</strong>, a Python desktop app using OpenCV for webcam capture, Claude&apos;s vision API to read the board, and Whisper for transcription.</dd></div>
          <div><dt>Then</dt><dd><strong>Sentry</strong>, rebuilt as a Flask web app with a local version and a hosted one, adding YouTube import, quizzes, summaries, D3 concept maps and per-class sessions.</dd></div>
        </dl>
      </Section>

      <Section n="03" title="Decisions that shaped it">
        <ul>
          <li><strong>Paste-a-transcript is the main hosted input.</strong> YouTube blocks requests from cloud data-center IPs, so the hosted version can&apos;t reliably pull videos. Rather than fight it, I made the input that always works the primary one.</li>
          <li><strong>One flag for two deployments.</strong> A single environment setting switches between the local app (full capture) and the hosted app, so both stay on one codebase.</li>
          <li><strong>Validate before scaling.</strong> The hosting platform&apos;s file system resets on restart, so a database migration is needed before Sentry can keep data long term. I&apos;m holding that work until classmates have tried it and I know people want it.</li>
        </ul>
      </Section>

      <Section n="04" title="What's next">
        <p>Getting it in front of classmates to test demand, then multi-user accounts and a database. I&apos;m also exploring a version for instructors.</p>
      </Section>
    </CaseLayout>
  );
}
