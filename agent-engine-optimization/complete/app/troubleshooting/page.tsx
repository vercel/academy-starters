import Link from "next/link";

export const metadata = {
  title: "Troubleshooting",
  description: "SignalArc diagnostic guides for common observability setup problems.",
};

export default function TroubleshootingPage() {
  return (
    <div>
      <header className="mb-12 max-w-3xl">
        <p className="text-sm text-accent font-medium mb-3">Diagnostics</p>
        <h1 className="text-5xl font-semibold mb-4">Troubleshooting</h1>
        <p className="text-muted">Start with the symptom, collect evidence, and prefer reversible checks.</p>
      </header>
      <article className="border border-line bg-panel rounded-xl p-7 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-3">
          <Link href="/troubleshooting/missing-source-maps">Production stack traces remain minified</Link>
        </h2>
        <p className="text-muted">Check build output, upload order, release identifiers, deployment paths, and runtime support.</p>
      </article>
    </div>
  );
}
