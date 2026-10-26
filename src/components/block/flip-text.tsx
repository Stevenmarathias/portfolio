// Adapted from ObsidianUI's flip-text (MIT, obsidianui.dev).
// Changes: flips once per hover instead of looping forever, renders as a span so it can sit inside headings
// and links, exposes the whole phrase to screen readers, and its styles live in flip-text.css.
import type { CSSProperties } from "react";
import "./flip-text.css";

type Props = { children: string; className?: string; duration?: number };

export default function FlipText({ children, className, duration = 0.9 }: Props) {
  const total = Math.max(1, children.replace(/ /g, "").length);
  let i = 0;
  return (
    <span className={["flip-text", className].filter(Boolean).join(" ")}>
      <span className="sr-only">{children}</span>
      {children.split(" ").map((word, w, words) => (
        <span key={w} className="flip-word" aria-hidden="true">
          {word.split("").map((ch, c) => {
            const delay = Math.sin((i++ / total) * (Math.PI / 2)) * duration * 0.35;
            return (
              <span
                key={c}
                className="flip-char"
                data-char={ch}
                style={{ "--flip-duration": `${duration}s`, "--flip-delay": `${delay}s` } as CSSProperties}
              >
                {ch}
              </span>
            );
          })}
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
