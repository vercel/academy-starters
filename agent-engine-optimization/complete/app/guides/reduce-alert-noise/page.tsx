import Link from "next/link";

export const metadata = {
  title: "Reduce alert noise without hiding incidents",
  description: "A six-step process for defining severity, grouping duplicates, assigning owners, and testing alert rules.",
};

const steps = [
  ["Inventory the current alerts", "Export two weeks of alerts and label each one as actionable, informational, duplicate, or unclear."],
  ["Define actionable severity", "Write one observable condition for critical, warning, and informational events. Avoid severity based only on the emitting service."],
  ["Group duplicates", "Choose a grouping window that combines repeated events without merging separate incidents."],
  ["Assign an owner", "Map each service and severity to a team or on-call schedule. An alert without an owner is a dashboard entry."],
  ["Replay recent incidents", "Test the proposed rules against recent incidents and confirm that every actionable failure would still notify someone."],
  ["Enable and review", "Roll out the policy, record missed and noisy alerts, and review the rules after one week."],
];

export default function ReduceAlertNoisePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Reduce alert noise without hiding incidents",
    description: metadata.description,
    datePublished: "2026-06-10",
    dateModified: "2026-07-18",
    author: { "@type": "Person", name: "Mina Patel", url: "https://signalarc.example.com/about#mina-patel" },
    publisher: { "@type": "Organization", name: "SignalArc" },
  };

  return (
    <article className="max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <header className="mb-10">
        <p className="text-sm text-accent font-medium mb-3">Incident response guide</p>
        <h1 className="text-5xl font-semibold mb-5">Reduce alert noise without hiding incidents</h1>
        <p className="text-xl text-muted mb-5">
          Separate actionable incidents from informational events, group
          duplicates, and route each severity to an explicit owner. Test the
          proposed policy against recent incidents before enabling it.
        </p>
        <p className="text-sm text-muted">
          By <Link href="/about#mina-patel">Mina Patel</Link> · Published 2026-06-10 · Reviewed 2026-07-18
        </p>
      </header>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">Prerequisites</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Telemetry already reaches SignalArc</li>
          <li>Production services have named owners</li>
          <li>Recent incident history is available</li>
          <li>At least one escalation destination is configured</li>
        </ul>
      </section>

      {steps.map(([title, body], index) => (
        <section key={title} className="mb-9">
          <p className="text-sm text-accent font-medium">Step {index + 1}</p>
          <h2 className="text-3xl font-semibold mb-3">{title}</h2>
          <p>{body}</p>
        </section>
      ))}

      <section className="bg-accent-soft rounded-xl p-7 mb-10">
        <h2 className="text-2xl font-semibold mb-3">Validation</h2>
        <p>
          Compare which notifications would have fired before and after the
          change. Fewer notifications are useful only when actionable failures
          still reach the correct owner.
        </p>
      </section>

      <p>See <Link href="/platform/alert-routing">Alert Routing capabilities and limitations</Link>.</p>
    </article>
  );
}
