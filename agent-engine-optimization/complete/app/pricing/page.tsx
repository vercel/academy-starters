export const metadata = {
  title: "Pricing",
  description: "SignalArc plan prices, included usage, retention, and trial policy.",
};

const plans = [
  ["Developer", "$0", "One user, five uptime checks, and 14 days of error retention"],
  ["Startup", "$49 per month", "Five users, 50 GB monthly log ingestion, and 30 days of searchable log retention"],
  ["Enterprise", "Contact sales", "Custom retention, region selection, private collectors, and contracted support targets"],
];

export default function PricingPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-10">
        <h1 className="text-5xl font-semibold mb-4">Pricing</h1>
        <p className="text-muted">New workspaces receive a 14-day Startup trial without a credit card.</p>
      </header>
      <div className="grid md:grid-cols-3 gap-5">
        {plans.map(([name, price, detail]) => (
          <section key={name} className="border border-line bg-panel rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-2">{name}</h2>
            <p className="text-accent font-medium mb-3">{price}</p>
            <p className="text-sm text-muted">{detail}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">SignalArc and all prices on this page are fictional course data.</p>
    </div>
  );
}
