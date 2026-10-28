export const metadata = {
  title: "Support",
  description: "SignalArc support channels and the evidence required for a technical request.",
};

export default function SupportPage() {
  return (
    <article className="max-w-3xl">
      <h1 className="text-5xl font-semibold mb-6">Support</h1>
      <p className="text-xl text-muted mb-10">Developer includes community support. Startup includes email support on business days. Enterprise targets are defined in the signed agreement.</p>
      <h2 className="text-3xl font-semibold mb-4">Technical request checklist</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Framework and version</li>
        <li>Affected event ID and timestamps</li>
        <li>Release identifier</li>
        <li>Relevant logs with tokens and personal data removed</li>
      </ul>
    </article>
  );
}
