import type { Metadata } from "next";
import Link from "next/link";
import { TRUCK_NAME } from "@/lib/truck";
import "./globals.css";

export const metadata: Metadata = {
  title: `${TRUCK_NAME} | Lobster rolls, 150 a day`,
  description: "Find the truck, preorder a roll, or order lunch for the office.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="bg-harbor text-sand">
          <nav className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4">
            <Link href="/" className="text-lg font-bold">
              {TRUCK_NAME}
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/location">Where&apos;s the truck?</Link>
              <Link href="/preorder">Preorder</Link>
              <Link href="/order">Office lunch</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
