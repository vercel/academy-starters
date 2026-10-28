import Link from "next/link";
import { capabilities } from "@/lib/capabilities";

export const metadata = {
  title: "Platform",
  description: "SignalArc capabilities for application health, telemetry, availability, and incident response.",
};

export default function PlatformPage() {
  return (
    <div>
      <header className="mb-12 max-w-3xl">
        <p className="text-sm text-accent font-medium mb-3">Platform</p>
        <h1 className="text-5xl font-semibold mb-4">One incident workflow for a small product team</h1>
        <p className="text-muted">
          Inspect each capability's setup, availability, retention, supported
          frameworks, and known limitations.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {capabilities.map((capability) => (
          <article key={capability.slug} className="bg-panel border border-line rounded-xl p-6">
            <p className="text-xs uppercase tracking-wide text-muted mb-2">{capability.category}</p>
            <h2 className="text-2xl font-semibold mb-3">
              <Link href={`/platform/${capability.slug}`}>{capability.name}</Link>
            </h2>
            <p className="text-muted mb-4">{capability.shortDescription}</p>
            <p className="text-sm"><strong>Best for:</strong> {capability.bestFor}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
