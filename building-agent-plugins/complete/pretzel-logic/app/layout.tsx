import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pretzel Logic",
  description: "Monthly pretzel subscriptions, twisted to order.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-pretzel-200 bg-pretzel-50">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <a href="/" className="font-bold tracking-tight text-pretzel-900">
              Pretzel Logic
            </a>
            <nav className="flex gap-6 text-sm text-pretzel-700">
              <a href="/">Plans</a>
              <a href="/checkout">Checkout</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
