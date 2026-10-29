import Link from "next/link";
import { notFound } from "next/navigation";
import { capabilities, getCapabilityBySlug } from "@/lib/capabilities";
import { getEvidenceForCapability } from "@/lib/customer-stories";

export function generateStaticParams() {
  return capabilities.map((capability) => ({ slug: capability.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const capability = getCapabilityBySlug(slug);
  if (!capability) return {};
  return {
    title: capability.name,
    description: capability.shortDescription,
  };
}

export default async function CapabilityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const capability = getCapabilityBySlug(slug);
  if (!capability) notFound();

  const evidence = getEvidenceForCapability(slug);
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `SignalArc ${capability.name}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    description: capability.shortDescription,
    url: `https://signalarc.example.com/platform/${capability.slug}`,
    offers: {
      "@type": "Offer",
      price: "49",
      priceCurrency: "USD",
      category: "subscription",
      description: capability.pricingNote,
    },
  };

  return (
    <article className="max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd).replace(/</g, "\\u003c") }}
      />

      <header className="mb-12">
        <p className="text-sm text-accent font-medium mb-3">{capability.category}</p>
        <h1 className="text-5xl font-semibold mb-5">{capability.name}</h1>
        <p className="text-xl text-muted mb-5">{capability.shortDescription}</p>
        <p><strong>Best for:</strong> {capability.bestFor}</p>
      </header>

      <section aria-labelledby="specifications" className="mb-12">
        <h2 id="specifications" className="text-3xl font-semibold mb-6">Specifications</h2>
        <dl className="grid md:grid-cols-2 border border-line rounded-xl overflow-hidden">
          {[
            ["Availability", capability.availability],
            ["Pricing", capability.pricingNote],
            ["Retention", capability.retention],
            ["Typical setup", capability.setup],
            ["Supported frameworks", capability.supportedFrameworks.join(", ")],
          ].map(([label, value]) => (
            <div key={label} className="p-5 border-b border-line last:border-b-0 md:[&:nth-last-child(2)]:border-b-0">
              <dt className="text-xs uppercase tracking-wide text-muted mb-1">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-5">What it does</h2>
        <ul className="space-y-3 list-disc pl-6">
          {capability.features.map((feature) => <li key={feature}>{feature}</li>)}
        </ul>
      </section>

      <section className="mb-12 bg-accent-soft rounded-xl p-7">
        <h2 className="text-2xl font-semibold mb-4">Limitations</h2>
        <ul className="space-y-3 list-disc pl-6">
          {capability.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
        </ul>
      </section>

      <p className="mb-12">
        <Link href={capability.docsUrl}>Read the implementation documentation</Link>
      </p>

      {evidence.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6">Customer evidence</h2>
          <div className="space-y-5">
            {evidence.map((entry) => (
              <figure key={entry.customer} className="border border-line bg-panel rounded-xl p-6">
                <blockquote className="text-lg mb-4">“{entry.quote}”</blockquote>
                <figcaption className="text-sm text-muted mb-3">
                  {entry.customer} · {entry.role} · <time dateTime={entry.date}>{entry.date}</time>
                </figcaption>
                <p className="text-sm mb-3"><strong>Observed outcome:</strong> {entry.outcome}</p>
                <Link href={entry.sourceUrl}>Read the fictional case study</Link>
              </figure>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
