"use client";

import { useRef, useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [msg, setMsg] = useState("");
  const ref = useRef<HTMLAnchorElement>(null);

  function selectText() {
    const el = ref.current;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setMsg("Selected. Press Ctrl+C or ⌘C to copy.");
  }

  function copy() {
    try {
      navigator.clipboard.writeText(email).then(() => setMsg("Email copied."), selectText);
    } catch {
      selectText();
    }
  }

  return (
    <>
      <div className="email-row">
        <a className="email" ref={ref} href={`mailto:${email}`}>
          {email}
        </a>
        <button className="btn" type="button" onClick={copy}>
          Copy
        </button>
      </div>
      <div className="copied" aria-live="polite">
        {msg}
      </div>
    </>
  );
}
