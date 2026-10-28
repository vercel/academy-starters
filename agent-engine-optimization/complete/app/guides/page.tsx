import Link from "next/link";

export const metadata = {
  title: "Technical guides",
  description: "Reviewed SignalArc guides for observability, alerting, and production troubleshooting.",
};

const guides = [
  {
    title: "Reduce alert noise without hiding incidents",
    description: "Build an alert policy from service ownership, severity, grouping, and recent incident history.",
    href: "/guides/reduce-alert-noise",
    reviewed: "2026-07-18",
  },
  {
    title: "Choose the observability signals your team can maintain",
    description: "Decide when errors, logs, traces, and uptime checks provide enough operational context.",
    href: "/guides/choose-observability-signals",
    reviewed: "2026-07-11",
  },
  {
    title: "Observability tools for startups: an honest comparison",
    description: "Compare software for a 5–30 person engineering team using explicit criteria and source links.",
    href: "/guides/best-observability-tools-for-startups",
    reviewed: "2026-08-01",
  },
];

export default function GuidesPage() {
  return (
    <div>
      <header className="mb-12 max-w-3xl">
        <p className="text-sm text-accent font-medium mb-3">Source library</p>
        <h1 className="text-5xl font-semibold mb-4">Technical guides</h1>
        <p className="text-muted">Procedures, limitations, review dates, and accountable authors.</p>
      </header>
      <div className="space-y-5">
        {guides.map((guide) => (
          <article key={guide.href} className="border border-line bg-panel rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-2"><Link href={guide.href}>{guide.title}</Link></h2>
            <p className="text-muted mb-3">{guide.description}</p>
            <p className="text-xs text-muted">Reviewed {guide.reviewed}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
