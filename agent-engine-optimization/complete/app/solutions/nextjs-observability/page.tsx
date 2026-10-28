import Link from "next/link";

export const metadata = {
  title: "Observability for Next.js applications",
  description: "A practical SignalArc setup for small teams operating browser and server workloads in Next.js.",
};

const requirements = [
  ["De-minified browser and server errors", "Error Monitoring", "/platform/error-monitoring", "Source-map setup guide"],
  ["Searchable structured application logs", "Log Management", "/platform/log-management", "Log ingestion documentation"],
  ["External checks for important routes", "Uptime Monitoring", "/platform/uptime-monitoring", "Probe configuration"],
  ["Owned and tested escalation paths", "Alert Routing", "/platform/alert-routing", "Escalation policy documentation"],
];

export default function NextjsObservabilityPage() {
  return (
    <article className="max-w-5xl">
      <header className="mb-12 max-w-3xl">
        <p className="text-sm text-accent font-medium mb-3">Use case</p>
        <h1 className="text-5xl font-semibold mb-5">Observability for a Next.js product team</h1>
        <p className="text-xl text-muted">
          For teams running browser and server workloads with structured logs
          and a shared on-call rotation.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-5">Requirements and evidence</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead><tr className="text-left border-b border-line"><th className="py-3 pr-4">Requirement</th><th className="py-3 pr-4">Capability</th><th className="py-3">Evidence</th></tr></thead>
            <tbody>
              {requirements.map(([requirement, name, href, evidence]) => (
                <tr key={requirement} className="border-b border-line">
                  <td className="py-4 pr-4">{requirement}</td>
                  <td className="py-4 pr-4"><Link href={href}>{name}</Link></td>
                  <td className="py-4">{evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-5">Data path</h2>
        <ol className="list-decimal pl-6 space-y-3">
          <li>The browser and Next.js server send errors, logs, and trace context to SignalArc.</li>
          <li>SignalArc groups errors and indexes structured log fields.</li>
          <li>Alert rules evaluate events against service and severity policies.</li>
          <li>Alert Routing sends actionable incidents to the current service owner.</li>
        </ol>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="border border-line bg-panel rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Good fit</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>A small team wants errors, logs, uptime, and routing in one workflow</li>
            <li>The application uses a supported JavaScript runtime</li>
            <li>Thirty days of searchable log retention is sufficient</li>
          </ul>
        </section>
        <section className="border border-line bg-panel rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">Consider another setup</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You need an unsupported data region</li>
            <li>Your controls exceed SignalArc's documented posture</li>
            <li>You need a year of hot log retention</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
