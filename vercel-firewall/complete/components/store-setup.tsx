export function StoreSetup() {
  return (
    <div className="rounded-xl border-2 border-butter bg-white p-6">
      <p className="text-2xl font-bold">The truck has no cooler yet.</p>
      <p className="mt-2">
        Rolls and orders live in Redis, and this deployment can&apos;t find it. From the project folder, run:
      </p>
      <pre className="mt-3 rounded-lg bg-harbor p-3 font-mono text-sm text-white">
        vercel install upstash/upstash-kv{"\n"}vercel deploy --prod
      </pre>
    </div>
  );
}
