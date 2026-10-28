import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-sm">
        <div>
          <div className="font-semibold text-lg mb-3">SignalArc</div>
          <p className="text-muted leading-relaxed">
            Observability and incident-response software for small product teams.
            SignalArc is a fictional company built for this course.
          </p>
        </div>
        <div>
          <div className="font-medium mb-3">Product</div>
          <ul className="space-y-2 text-muted">
            <li><Link href="/platform">Platform</Link></li>
            <li><Link href="/solutions/nextjs-observability">Next.js observability</Link></li>
            <li><Link href="/faq">Pricing and policy FAQ</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-3">Resources</div>
          <ul className="space-y-2 text-muted">
            <li><Link href="/guides">Technical guides</Link></li>
            <li><Link href="/troubleshooting">Troubleshooting</Link></li>
            <li><Link href="/about">Authors and company</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="max-w-6xl mx-auto px-6 py-5 text-xs text-muted flex justify-between">
          <span>© SignalArc, fictional course company</span>
          <span>Portland, Oregon</span>
        </div>
      </div>
    </footer>
  );
}
