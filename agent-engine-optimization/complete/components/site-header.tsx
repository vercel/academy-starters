import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-canvas/90 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="font-semibold text-xl no-underline text-ink">
          SignalArc
        </Link>
        <nav className="flex gap-7 text-sm">
          <Link href="/platform" className="no-underline text-ink hover:text-accent">Platform</Link>
          <Link href="/solutions/nextjs-observability" className="no-underline text-ink hover:text-accent">Solutions</Link>
          <Link href="/guides" className="no-underline text-ink hover:text-accent">Guides</Link>
          <Link href="/faq" className="no-underline text-ink hover:text-accent">FAQ</Link>
          <Link href="/about" className="no-underline text-ink hover:text-accent">About</Link>
        </nav>
      </div>
    </header>
  );
}
