import Link from "next/link";
import FlipText from "@/components/block/flip-text";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/">
          <FlipText>Steven</FlipText> <b><FlipText>Marathias</FlipText></b>
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
