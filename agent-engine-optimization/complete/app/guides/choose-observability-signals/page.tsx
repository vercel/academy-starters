import Link from "next/link";

export const metadata = {
  title: "Choose observability signals your team can maintain",
  description: "A practical guide to deciding when errors, logs, traces, and uptime checks add useful context.",
};

export default function ChooseSignalsPage() {
  return (
    <article className="max-w-3xl">
      <header className="mb-10">
        <p className="text-sm text-accent font-medium mb-3">Observability guide</p>
        <h1 className="text-5xl font-semibold mb-5">Choose observability signals your team can maintain</h1>
        <p className="text-xl text-muted mb-5">
          Begin with the signal that answers your current operational question.
          Add another only when it closes a known diagnostic gap.
        </p>
        <p className="text-sm text-muted">By <Link href="/about#mina-patel">Mina Patel</Link> · Reviewed 2026-07-11</p>
      </header>

      <div className="space-y-10">
        <section><h2 className="text-3xl font-semibold mb-3">Errors: what failed?</h2><p>Use grouped application errors when the team needs stack traces, releases, and affected routes. Errors do not explain every slow request or dependency.</p></section>
        <section><h2 className="text-3xl font-semibold mb-3">Logs: what happened around it?</h2><p>Use structured logs for application state and business context. Define fields before ingestion so people can search without parsing free-form messages.</p></section>
        <section><h2 className="text-3xl font-semibold mb-3">Traces: where was the time spent?</h2><p>Add traces when a request crosses services and the team cannot locate latency or a failed downstream call. Incomplete instrumentation produces incomplete traces.</p></section>
        <section><h2 className="text-3xl font-semibold mb-3">Uptime: can an external user reach it?</h2><p>Use external checks for a small set of important routes. A successful probe does not prove that every application workflow is healthy.</p></section>
      </div>
    </article>
  );
}
