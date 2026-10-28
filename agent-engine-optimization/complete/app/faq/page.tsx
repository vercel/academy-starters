import Link from "next/link";
import faqsData from "@/data/faqs.json";

type FaqQuestion = { question: string; answer: string; source: string };
type FaqCategory = { category: string; questions: FaqQuestion[] };

const faqs = faqsData as FaqCategory[];

export const metadata = {
  title: "Frequently asked questions",
  description: "Direct answers about SignalArc pricing, data handling, integrations, setup, and support.",
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((category) =>
      category.questions.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      }))
    ),
  };

  return (
    <div className="max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <header className="mb-12">
        <p className="text-sm text-accent font-medium mb-3">Buyer questions</p>
        <h1 className="text-5xl font-semibold mb-4">Frequently asked questions</h1>
        <p className="text-muted">SignalArc is fictional. These answers model direct, owned product policy.</p>
      </header>
      <div className="space-y-12">
        {faqs.map((category) => (
          <section key={category.category}>
            <h2 className="text-3xl font-semibold mb-5">{category.category}</h2>
            <div className="space-y-6">
              {category.questions.map((item) => (
                <article key={item.question} className="border-l-2 border-accent pl-5">
                  <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                  <p className="mb-2">{item.answer}</p>
                  <p className="text-sm"><Link href={item.source}>Source of truth</Link></p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
