/** One drawn arrow, rotated per direction, so every link uses the same stroke. */
const angle = { right: 0, down: 90, left: 180, out: -45 } as const;

export default function Arrow({ dir = "right" }: { dir?: keyof typeof angle }) {
  return (
    <svg
      className="arrow-icon"
      width="0.95em"
      height="0.95em"
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ transform: `rotate(${angle[dir]}deg)` }}
    >
      <path d="M2.5 8h10M8.5 3.5 13 8l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
