import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SignalArc · Observability for small teams",
    template: "%s · SignalArc",
  },
  description:
    "SignalArc is a fictional observability and incident-response platform for small software teams.",
  metadataBase: new URL("https://signalarc.example.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="max-w-6xl mx-auto px-6 py-12">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
