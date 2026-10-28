import { notFound } from "next/navigation";
import { capabilities, getCapabilityBySlug } from "@/lib/capabilities";

const extraDocs = {
  "data-deletion": {
    title: "Delete project telemetry",
    description: "Workspace owners can delete a project from Settings → Data. Active deletion begins immediately and backup removal completes within 30 days.",
    steps: ["Open the project settings", "Choose Data and retention", "Select Delete project data", "Confirm the project slug"],
  },
};

export function generateStaticParams() {
  return [...capabilities.map(({ slug }) => ({ slug })), { slug: "data-deletion" }];
}

export default async function DocumentationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const capability = getCapabilityBySlug(slug);
  const extra = extraDocs[slug as keyof typeof extraDocs];
  if (!capability && !extra) notFound();

  const title = capability ? `${capability.name} documentation` : extra.title;
  const description = capability ? capability.setup : extra.description;
  const steps = capability
    ? ["Confirm the plan and runtime requirements", capability.setup, "Send a test event", "Verify the event and metadata in SignalArc"]
    : extra.steps;

  return (
    <article className="max-w-3xl">
      <p className="text-sm text-accent font-medium mb-3">Documentation</p>
      <h1 className="text-5xl font-semibold mb-5">{title}</h1>
      <p className="text-xl text-muted mb-8">{description}</p>
      <ol className="list-decimal pl-6 space-y-3">
        {steps.map((step) => <li key={step}>{step}</li>)}
      </ol>
      {capability && (
        <section className="mt-10 bg-accent-soft rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-3">Known limitations</h2>
          <ul className="list-disc pl-5 space-y-2">
            {capability.limitations.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      )}
    </article>
  );
}
