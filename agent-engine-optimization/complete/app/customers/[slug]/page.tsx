import { notFound } from "next/navigation";
import storiesData from "@/data/customer-stories.json";
import type { CustomerEvidence } from "@/lib/customer-stories";

const stories = Object.values(storiesData as Record<string, CustomerEvidence[]>)
  .flat()
  .filter((story) => story.approved);

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.sourceUrl.split("/").pop()! }));
}

export default async function CustomerStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories.find((item) => item.sourceUrl.endsWith(`/${slug}`));
  if (!story) notFound();

  return (
    <article className="max-w-3xl">
      <p className="text-sm text-accent font-medium mb-3">Fictional customer evidence</p>
      <h1 className="text-5xl font-semibold mb-5">{story.customer}</h1>
      <p className="text-xl text-muted mb-8">{story.useCase}</p>
      <blockquote className="border-l-2 border-accent pl-6 text-2xl mb-8">“{story.quote}”</blockquote>
      <p className="mb-4"><strong>Role:</strong> {story.role}</p>
      <p className="mb-4"><strong>Observed outcome:</strong> {story.outcome}</p>
      <p className="text-sm text-muted">Approved {story.date}. This is fictional data created for the course.</p>
    </article>
  );
}
