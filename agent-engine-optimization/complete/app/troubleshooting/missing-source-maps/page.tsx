import Link from "next/link";

export const metadata = {
  title: "Why production source maps are missing",
  description: "Diagnose minified JavaScript stack traces using build output, upload logs, release identifiers, and deployment paths.",
};

const causes = [
  {
    title: "Source maps were not generated",
    evidence: "The production build output contains no .map files.",
    fix: "Enable source-map generation for the production build, then rebuild locally.",
    verify: "Confirm that each JavaScript bundle has a corresponding map before uploading.",
  },
  {
    title: "The upload ran before the production build",
    evidence: "Upload logs predate the final build or reference a different output directory.",
    fix: "Move the upload step after the production build and fail CI when the upload command exits unsuccessfully.",
    verify: "Check that the upload log lists files from the final build.",
  },
  {
    title: "Release identifiers do not match",
    evidence: "The affected event's release field differs from the release used during upload.",
    fix: "Generate one release identifier in CI and pass it to both the application build and upload command.",
    verify: "Trigger a test error and compare its release field with the uploaded release.",
  },
  {
    title: "Deployment paths differ from uploaded paths",
    evidence: "Bundle URLs in the event include a prefix or asset path absent from the upload metadata.",
    fix: "Configure the upload path prefix to match the deployed asset URLs.",
    verify: "Open a new event and confirm that SignalArc resolves the deployed bundle to the uploaded map.",
  },
];

export default function MissingSourceMapsPage() {
  return (
    <article className="max-w-3xl">
      <header className="mb-10">
        <p className="text-sm text-accent font-medium mb-3">Troubleshooting</p>
        <h1 className="text-5xl font-semibold mb-5">Production stack traces remain minified</h1>
        <p className="text-xl text-muted mb-5">
          First confirm that the build generated source maps and that the
          upload used the same release identifier as the deployed code. Do not
          make source maps public merely to test the integration.
        </p>
        <p className="text-sm text-muted">Reviewed by <Link href="/about#mina-patel">Mina Patel</Link> · 2026-07-22</p>
      </header>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">Quick checks</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Confirm the build produced .map files</li>
          <li>Compare the deployed commit with the uploaded release</li>
          <li>Check the upload command's exit status</li>
          <li>Confirm the affected runtime is supported</li>
          <li>Inspect the release metadata on one affected event</li>
        </ul>
      </section>

      {causes.map((cause) => (
        <section key={cause.title} className="mb-9 border-t border-line pt-7">
          <h2 className="text-3xl font-semibold mb-4">{cause.title}</h2>
          <p className="mb-2"><strong>Confirm:</strong> {cause.evidence}</p>
          <p className="mb-2"><strong>Fix:</strong> {cause.fix}</p>
          <p><strong>Verify:</strong> {cause.verify}</p>
        </section>
      ))}

      <section className="bg-accent-soft rounded-xl p-7">
        <h2 className="text-2xl font-semibold mb-3">Escalate with evidence</h2>
        <p>
          Include framework and version, build and upload commands with secrets
          removed, release identifier, one event ID, timestamps, and upload
          logs. Never post tokens or complete environment files.
        </p>
      </section>
    </article>
  );
}
