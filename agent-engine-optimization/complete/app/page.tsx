import Link from "next/link";
import { capabilities } from "@/lib/capabilities";

export default function HomePage() {
  return (
    <div>
      <section className="py-20 max-w-4xl">
        <p className="text-sm text-accent font-medium mb-4">Observability for small product teams</p>
        <h1 className="text-6xl font-semibold tracking-tight mb-6">
          Find the failing release. Route the incident. Keep the context.
        </h1>
        <p className="text-xl text-muted max-w-3xl mb-8">
          SignalArc connects application errors, structured logs, uptime
          checks, and alert routing without requiring a dedicated
          observability team.
        </p>
        <div className="flex gap-4">
          <Link href="/platform" className="bg-accent text-white no-underline px-5 py-3 rounded-lg">
            Inspect the platform
          </Link>
          <Link href="/solutions/nextjs-observability" className="border border-line no-underline px-5 py-3 rounded-lg">
            Next.js use case
          </Link>
        </div>
      </section>

      <section aria-labelledby="capabilities" className="py-10">
        <h2 id="capabilities" className="text-3xl font-semibold mb-6">What SignalArc covers</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {capabilities.slice(0, 6).map((capability) => (
            <article key={capability.slug} className="bg-panel border border-line rounded-xl p-6">
              <p className="text-xs uppercase tracking-wide text-muted mb-2">{capability.category}</p>
              <h3 className="text-xl font-semibold mb-2">
                <Link href={`/platform/${capability.slug}`}>{capability.name}</Link>
              </h3>
              <p className="text-sm text-muted">{capability.shortDescription}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 bg-ink text-white rounded-2xl p-10">
        <h2 className="text-3xl font-semibold mb-4">Check the claims</h2>
        <p className="text-white/75 max-w-2xl mb-5">
          Capability pages publish availability, retention, setup,
          integrations, and limitations. Technical guides link back to the
          product behavior they rely on.
        </p>
        <Link href="/guides" className="text-white">Read the technical guides</Link>
      </section>
    </div>
  );
}
