export const metadata = {
  title: "Observability tools for startups: an honest comparison",
  description: "A vendor-authored comparison for product teams of 5–30 engineers, with explicit criteria, source notes, and trade-offs.",
};

const tools = [
  {
    name: "SignalArc",
    bestFor: "Small web product teams that want errors, logs, uptime, and routing in one workflow",
    strengths: "Legible entry pricing and a narrower operating model",
    limitation: "Shorter retention and a smaller integration catalog than mature platforms",
    source: "SignalArc product pages",
    sourceUrl: "/platform",
  },
  {
    name: "Sentry",
    bestFor: "Teams prioritizing application errors and developer workflows",
    strengths: "Established error-monitoring workflow and broad framework support",
    limitation: "Evaluate adjacent observability needs and current plan limits separately",
    source: "Vendor documentation and pricing, reviewed 2026-08-01",
    sourceUrl: "https://docs.sentry.io/",
  },
  {
    name: "Datadog",
    bestFor: "Teams needing broad infrastructure and application observability",
    strengths: "Wide product and integration coverage",
    limitation: "The breadth and pricing model may require more administration than a small team wants",
    source: "Vendor documentation and pricing, reviewed 2026-08-01",
    sourceUrl: "https://docs.datadoghq.com/getting_started/",
  },
  {
    name: "New Relic",
    bestFor: "Teams comparing a broad telemetry platform with published entry usage",
    strengths: "Multiple telemetry types and a mature platform",
    limitation: "Buyers should model current data volume and retention against the published plan",
    source: "Vendor documentation and pricing, reviewed 2026-08-01",
    sourceUrl: "https://docs.newrelic.com/docs/accounts/accounts-billing/new-relic-one-pricing-billing/new-relic-one-pricing-billing/",
  },
];

export default function ComparisonGuidePage() {
  return (
    <article className="max-w-5xl">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm text-accent font-medium mb-3">Vendor-authored comparison</p>
        <h1 className="text-5xl font-semibold mb-5">Observability tools for a startup product team</h1>
        <p className="text-xl text-muted mb-5">
          For teams of 5–30 engineers operating a web application without a
          dedicated observability group.
        </p>
        <p className="text-sm bg-accent-soft rounded-lg p-4">
          SignalArc publishes this guide and appears in it. Treat its product
          claims as first-party claims and verify every vendor against current
          documentation before making a buying decision.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Criteria</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Time to a useful first signal</li>
          <li>Coverage of errors, logs, uptime, and alert routing</li>
          <li>Searchable retention on the entry plan</li>
          <li>Support for common JavaScript frameworks</li>
          <li>Pricing legibility and operational burden</li>
        </ul>
      </section>

      <div className="space-y-6">
        {tools.map((tool) => (
          <section key={tool.name} className="border border-line bg-panel rounded-xl p-7">
            <h2 className="text-3xl font-semibold mb-4">{tool.name}</h2>
            <dl className="space-y-3">
              <div><dt className="font-semibold">Best for</dt><dd>{tool.bestFor}</dd></div>
              <div><dt className="font-semibold">Relevant strength</dt><dd>{tool.strengths}</dd></div>
              <div><dt className="font-semibold">Reason to look elsewhere</dt><dd>{tool.limitation}</dd></div>
              <div>
                <dt className="font-semibold">Source note</dt>
                <dd><a href={tool.sourceUrl}>{tool.source}</a></dd>
              </div>
            </dl>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold mb-3">What this comparison does not test</h2>
        <p>
          This course project does not run performance benchmarks, security
          reviews, support evaluations, or a total-cost analysis. Replace these
          summaries with linked, current source research before publishing a
          real comparison.
        </p>
      </section>
    </article>
  );
}
