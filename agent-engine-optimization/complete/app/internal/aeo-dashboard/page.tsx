import queriesData from "@/data/aeo-queries.json";

type AuditQuery = {
  category: string;
  query: string;
  targetPage: string;
  observation: string;
  notes: string;
};

const queries = queriesData as AuditQuery[];

export const metadata = {
  title: "AI-search visibility audit",
  description: "Internal query checklist.",
  robots: { index: false, follow: false },
};

export default function AuditDashboardPage() {
  const byCategory = queries.reduce<Record<string, AuditQuery[]>>((groups, query) => {
    groups[query.category] = groups[query.category] ?? [];
    groups[query.category].push(query);
    return groups;
  }, {});

  return (
    <div>
      <header className="mb-12 max-w-3xl">
        <p className="text-sm text-accent font-medium mb-3">Internal · noindex</p>
        <h1 className="text-5xl font-semibold mb-4">AI-search visibility audit</h1>
        <p className="text-muted">
          A fixed prompt set for recording answer outcomes, citations, source
          support, referrals, and crawler evidence without merging them into
          one score.
        </p>
      </header>

      <div className="space-y-10">
        {Object.entries(byCategory).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-3xl font-semibold mb-5">{category}</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <article key={item.query} className="grid md:grid-cols-3 gap-5 border border-line bg-panel rounded-xl p-6 text-sm">
                  <div><p className="text-xs uppercase tracking-wide text-muted mb-1">Prompt</p><p className="font-medium">“{item.query}”</p></div>
                  <div><p className="text-xs uppercase tracking-wide text-muted mb-1">Page under test</p><a href={item.targetPage}>{item.targetPage}</a></div>
                  <div><p className="text-xs uppercase tracking-wide text-muted mb-1">Record</p><p>{item.observation}</p></div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-14 border-t border-line pt-7 text-sm text-muted max-w-3xl">
        <p className="mb-3">
          Save date, product, model when shown, location, and search setting.
          Keep web-enabled and model-memory tests in separate cohorts.
        </p>
        <p>
          Record mentions, recommendations, ranks, citations, source support,
          referrals, and crawler requests in separate fields. Evaluate content
          releases across several comparable runs.
        </p>
        <p className="mt-3">
          Use Vercel Web Analytics for identifiable referral visits and Vercel
          Runtime Logs for the crawler messages emitted by <code>proxy.ts</code>.
        </p>
      </footer>
    </div>
  );
}
