export const metadata = {
  title: "Data and security",
  description: "SignalArc data-region, deletion, and compliance policy for the fictional course company.",
};

export default function SecurityPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-5xl font-semibold mb-6">Data and security</h1>
      <div className="space-y-8">
        <section><h2 className="text-3xl font-semibold mb-3">Data regions</h2><p>Developer and Startup data is stored in the United States. Enterprise customers can request the European Union region during contracting.</p></section>
        <section><h2 className="text-3xl font-semibold mb-3">Deletion</h2><p>Workspace owners can delete a project and its telemetry. Active deletion begins immediately; removal from backups completes within 30 days.</p></section>
        <section><h2 className="text-3xl font-semibold mb-3">Compliance</h2><p>SignalArc is fictional and has no real compliance certification or audit report. A real company should publish only current, verifiable compliance claims.</p></section>
      </div>
    </article>
  );
}
