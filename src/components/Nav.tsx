import Link from "next/link";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/">
          Steven <b>Marathias</b>
        </Link>
        <nav className="navlinks" aria-label="Main">
          <Link href="/#work">Work</Link>
          <Link className="hide-sm" href="/#about">About</Link>
          <Link className="hide-sm" href="/#resume">Résumé</Link>
          <Link className="cta-link" href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
