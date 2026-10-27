import Link from "next/link";
import FlipText from "@/components/block/flip-text";

// Top bar: name and the one action. Section navigation lives in the bottom dock.
export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/">
          <FlipText>Steven</FlipText> <b><FlipText>Marathias</FlipText></b>
        </Link>
        <div className="navlinks">
          <Link className="cta-link" href="/#contact">Contact</Link>
        </div>
      </div>
    </header>
  );
}
