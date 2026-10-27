import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saturday",
  description:
    "Saturday is an independent footwear label. Built for the part of the week that isn't a meeting.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-line">
          <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link href="/" className="font-mono text-lg tracking-tight">
              SATURDAY
            </Link>
            <nav className="flex gap-6 text-sm">
              <Link href="/" className="hover:text-accent transition-colors">
                Shop
              </Link>
              <Link
                href="/drops"
                className="hover:text-accent transition-colors"
              >
                Drops
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line">
          <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-stone flex items-center justify-between">
            <span className="font-mono">SATURDAY / 2026</span>
            <span>An independent footwear label.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
