import { authors } from "@/lib/authors";

export const metadata = {
  title: "About SignalArc",
  description: "SignalArc company facts, editorial policy, and technical reviewers.",
};

export default function AboutPage() {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SignalArc",
    url: "https://signalarc.example.com",
    description: "Observability and incident-response software for small product teams.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Portland",
      addressRegion: "OR",
      addressCountry: "US",
    },
    employee: authors.map((author) => ({
      "@type": "Person",
      name: author.name,
      jobTitle: author.jobTitle,
      url: `https://signalarc.example.com/about#${author.slug}`,
    })),
  };

  return (
    <div className="max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <header className="mb-12">
        <p className="text-sm text-accent font-medium mb-3">Company and authors</p>
        <h1 className="text-5xl font-semibold mb-5">About SignalArc</h1>
        <p className="text-xl text-muted">
          SignalArc is a fictional observability and incident-response company
          created for this course. Its public facts demonstrate how a software
          company can make ownership and editorial responsibility visible.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Company facts</h2>
        <dl className="grid md:grid-cols-2 gap-5">
          <div><dt className="font-semibold">Product</dt><dd>Observability and incident response for small product teams</dd></div>
          <div><dt className="font-semibold">Founded</dt><dd>2024</dd></div>
          <div><dt className="font-semibold">Location</dt><dd>Portland, Oregon, United States</dd></div>
          <div><dt className="font-semibold">Corrections</dt><dd>corrections@signalarc.example.com</dd></div>
        </dl>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Editorial policy</h2>
        <p>
          Product behavior is checked against the capability data and
          documentation owner. Technical procedures require an engineer or
          documentation lead to review prerequisites, commands, limitations,
          and validation steps. Review dates change only after that work.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Authors and reviewers</h2>
        <div className="space-y-6">
          {authors.map((author) => {
            const personJsonLd = {
              "@context": "https://schema.org",
              "@type": "Person",
              name: author.name,
              jobTitle: author.jobTitle,
              worksFor: { "@type": "Organization", name: "SignalArc" },
              description: author.bio,
              url: `https://signalarc.example.com/about#${author.slug}`,
            };
            return (
              <article key={author.slug} id={author.slug} className="border border-line bg-panel rounded-xl p-7">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
                <h3 className="text-2xl font-semibold mb-1">{author.name}</h3>
                <p className="text-accent mb-4">{author.jobTitle}</p>
                <p className="mb-4">{author.bio}</p>
                <p className="mb-3"><strong>Reviews:</strong> {author.reviewAreas.join(", ")}</p>
                <ul className="list-disc pl-5 text-sm text-muted">
                  {author.credentials.map((credential) => <li key={credential}>{credential}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
