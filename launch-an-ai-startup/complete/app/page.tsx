import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ensureDemoMetrics, getFounder } from "@/lib/session";
import { getMetrics, listUpdates } from "@/lib/updates";
import { AgentPanel } from "./agent-panel";
import { DraftPanel } from "./draft-panel";
import { NewUpdateForm } from "./new-update-form";

const dollars = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function Home() {
  // Set per environment in Project Settings. Read at build time, so a change
  // needs a redeploy to show up.
  const envLabel = process.env.ENV_LABEL;

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-16">
      {envLabel && (
        <p className="mb-6 rounded-md bg-amber-100 px-3 py-2 text-sm text-amber-900">
          You&apos;re looking at <strong>{envLabel}</strong>.
        </p>
      )}
      <h1 className="text-3xl font-semibold tracking-tight">Up and to the Right</h1>
      <p className="mt-2 text-zinc-600">
        Your monthly investor update, drafted from your notes and your numbers.
      </p>

      <Suspense fallback={<p className="mt-10 text-sm text-zinc-500">Loading your numbers...</p>}>
        <Dashboard />
      </Suspense>
    </main>
  );
}

async function Dashboard() {
  // Reading the session cookie makes this a request-time read, so it lives
  // behind the Suspense boundary above.
  const founder = await getFounder(await headers());
  if (!founder) redirect("/sign-in");

  await ensureDemoMetrics(founder.id);
  const [metrics, updates] = await Promise.all([getMetrics(founder.id), listUpdates(founder.id)]);
  const latest = metrics.at(-1)!;

  return (
    <>
      <p className="mt-6 text-sm text-zinc-500">Signed in as {founder.name}</p>
      <section className="mt-4 rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="font-medium">
          This month <span className="text-zinc-500">· {latest.month}</span>
        </h2>
        <dl className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <Stat label="MRR" value={dollars(latest.mrr)} />
          <Stat label="Customers" value={latest.customers.toString()} />
          <Stat label="Burn" value={dollars(latest.burn)} />
          <Stat label="Runway" value={`${latest.runwayMonths} mo`} />
        </dl>
        <NewUpdateForm month={latest.month} />
      </section>

      <AgentPanel month={latest.month} />

      <section className="mt-10">
        <h2 className="font-medium">Saved notes</h2>
        {updates.length === 0 && <p className="mt-2 text-sm text-zinc-500">Nothing saved yet.</p>}
        <ul className="mt-4 space-y-3">
          {updates.map((u) => (
            <li key={u.id} className="rounded-lg border border-zinc-200 bg-white p-4 text-sm">
              <div className="flex justify-between text-zinc-500">
                <span>{u.month}</span>
                <span>{u.status}</span>
              </div>
              <p className="mt-2">{u.notes}</p>
              {u.highlights && (
                <p className="mt-3 font-mono text-xs text-zinc-600">
                  MRR {u.highlights.mrrGrowthPercent ?? "?"}% · +{u.highlights.newCustomers ?? "?"} customers ·
                  burn multiple {u.highlights.burnMultiple ?? "n/a"}
                </p>
              )}
              {u.status === "ready" && <DraftPanel updateId={u.id} />}
            </li>
          ))}
        </ul>
      </section>
    </>
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
