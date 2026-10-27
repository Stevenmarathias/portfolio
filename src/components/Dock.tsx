"use client";

// Floating bottom dock: the main section navigation. A gold marker slides to the section you're reading,
// icons swell under the pointer on desktop, and on touch screens the dock tucks away while you scroll down.
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Download, FileText, House, Layers, LayoutGrid, Mail, User } from "lucide-react";

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

type Item = { id: string; label: string; href: string; icon: ReactNode; external?: boolean; desktopOnly?: boolean };

const ic = { size: 20, strokeWidth: 1.8, "aria-hidden": true } as const;
const groups: Item[][] = [
  [{ id: "top", label: "Home", href: "/#top", icon: <House {...ic} />, desktopOnly: true }],
  [
    { id: "work", label: "Work", href: "/#work", icon: <Layers {...ic} /> },
    { id: "about", label: "About", href: "/#about", icon: <User {...ic} /> },
    { id: "coursework", label: "Projects", href: "/#coursework", icon: <LayoutGrid {...ic} /> },
    { id: "resume", label: "Résumé", href: "/#resume", icon: <FileText {...ic} /> },
    { id: "contact", label: "Contact", href: "/#contact", icon: <Mail {...ic} /> },
  ],
  [
    { id: "gh", label: "GitHub", href: "https://github.com/Stevenmarathias", icon: <GitHubIcon />, external: true },
    { id: "li", label: "LinkedIn", href: "https://www.linkedin.com/in/steven-marathias/", icon: <LinkedInIcon />, external: true },
  ],
  [{ id: "pdf", label: "Résumé PDF", href: "/Steven_Marathias_Resume.pdf", icon: <Download {...ic} />, external: true, desktopOnly: true }],
];
const sectionIds = ["top", "work", "about", "coursework", "resume", "contact"];

export default function Dock() {
  const pathname = usePathname();
  const onCase = pathname.startsWith("/work");
  const [scrollActive, setActive] = useState<string | null>("top");
  const active = onCase ? "work" : scrollActive;
  const [hidden, setHidden] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);

  // which section is under the reading line
  useEffect(() => {
    let raf = 0;
    let lastY = window.scrollY;
    const touch = window.matchMedia("(hover: none), (max-width: 640px)");
    const update = () => {
      raf = 0;
      const probe = window.innerHeight * 0.45;
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      if (!onCase) setActive(current);
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 80;
      if (touch.matches) {
        if (y > lastY + 6 && y > 200 && !nearBottom) setHidden(true);
        else if (y < lastY - 6 || nearBottom) setHidden(false);
      } else setHidden(false);
      lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname, onCase]);

  // slide the gold marker under the active icon
  const placeMarker = useCallback(() => {
    const m = marker.current;
    const el = active ? bar.current?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
    if (!m) return;
    if (!el || el.offsetParent === null) {
      m.style.opacity = "0";
      return;
    }
    m.style.opacity = "1";
    m.style.transform = `translateX(${el.offsetLeft + el.offsetWidth / 2 - 9}px)`;
  }, [active]);
  useLayoutEffect(() => {
    placeMarker();
    window.addEventListener("resize", placeMarker);
    return () => window.removeEventListener("resize", placeMarker);
  }, [placeMarker]);

  // pointer magnification (fine pointers only)
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    bar.current?.querySelectorAll<HTMLElement>(".dock-item").forEach((el) => {
      const r = el.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      el.style.setProperty("--s", (1 + 0.42 * Math.max(0, 1 - d / 120)).toFixed(3));
    });
  };
  const onLeave = () => bar.current?.querySelectorAll<HTMLElement>(".dock-item").forEach((el) => el.style.setProperty("--s", "1"));

  return (
    <nav className={hidden ? "dock tucked" : "dock"} aria-label="Sections">
      <div className="dock-bar" ref={bar} onPointerMove={onMove} onPointerLeave={onLeave}>
        <span className="dock-marker" ref={marker} aria-hidden="true" />
        {groups.map((g, gi) => (
          <div className="dock-group" key={gi}>
            {g.map((it) => (
              <a
                key={it.id}
                data-id={it.id}
                className={[
                  "dock-item",
                  it.desktopOnly ? "desk-only" : "",
                  active === it.id ? "on" : "",
                ].join(" ")}
                href={it.href}
                aria-label={it.label}
                aria-current={active === it.id ? "location" : undefined}
                {...(it.external ? { target: "_blank", rel: "noopener" } : {})}
              >
                {it.icon}
                <span className="dock-tip" aria-hidden="true">{it.label}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
