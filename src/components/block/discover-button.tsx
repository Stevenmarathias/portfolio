// Adapted from ObsidianUI's discover-button (MIT, obsidianui.dev).
// Changes: night-game tokens, square-cut corners to match the site's buttons, the site's own drawn arrow
// instead of lucide, external-link support, and a 52px minimum height.
import Arrow from "@/components/Arrow";
import "./discover-button.css";

type Props = {
  label: string;
  href: string;
  external?: boolean;
  dir?: "right" | "down" | "out";
  className?: string;
};

export default function DiscoverButton({ label, href, external, dir = "right", className }: Props) {
  return (
    <a
      className={["obsidian-discover-button", className].filter(Boolean).join(" ")}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      <span className="obsidian-discover-button__fill" aria-hidden="true" />
      <span className="obsidian-discover-button__icon" aria-hidden="true">
        <Arrow dir={dir} />
      </span>
      <span className="obsidian-discover-button__text">{label}</span>
    </a>
  );
}
