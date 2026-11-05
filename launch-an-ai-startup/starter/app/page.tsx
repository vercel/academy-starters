import { founders, latestMetrics } from "@/lib/sample-data";

const dollars = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function Home() {
  const founder = founders[0];
  const metrics = latestMetrics(founder);

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Up and to the Right</h1>
      <p className="mt-2 text-zinc-600">
        Your monthly investor update, drafted from your notes and your numbers.
      </p>

      <section className="mt-10 rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="font-medium">
          {founder.startup} <span className="text-zinc-500">· {metrics.month}</span>
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <Stat label="MRR" value={dollars(metrics.mrr)} />
          <Stat label="Customers" value={metrics.customers.toString()} />
          <Stat label="Burn" value={dollars(metrics.burn)} />
          <Stat label="Runway" value={`${metrics.runwayMonths} mo`} />
        </dl>
        <p className="mt-6 text-sm text-zinc-700">{founder.notes}</p>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-zinc-500">{label}</dt>
      <dd className="mt-1 font-mono text-lg">{value}</dd>
    </div>
  );
}
