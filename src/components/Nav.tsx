"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FlipText from "@/components/block/flip-text";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#coursework", label: "Projects" },
  { href: "/#resume", label: "Résumé" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  // close on Escape or when the window grows past phone width; menu links close it on click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 761px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className={open ? "nav open" : "nav"}>
      <div className="wrap">
        <Link className="brand" href="/" onClick={() => setOpen(false)}>
          <FlipText>Steven</FlipText> <b><FlipText>Marathias</FlipText></b>
        </Link>
        <nav className="navlinks" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} className="hide-sm" href={l.href}>{l.label}</Link>
          ))}
          <Link className="cta-link" href="/#contact" onClick={() => setOpen(false)}>Contact</Link>
          <button
            ref={button}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path className="l1" d="M3 7h16" />
              <path className="l2" d="M3 15h16" />
            </svg>
          </button>
        </nav>
      </div>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <div className="wrap">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
          ))}
          <a href="/Steven_Marathias_Resume.pdf" target="_blank" rel="noopener" onClick={() => setOpen(false)}>Résumé PDF</a>
        </div>
      </div>
    </header>
  );
}
