export function GET() {
  const content = `# SignalArc

> SignalArc is a fictional observability and incident-response platform for small software teams.

## Product

- [Platform](https://signalarc.example.com/platform): Capability index
- [Error Monitoring](https://signalarc.example.com/platform/error-monitoring): Error grouping, releases, and source maps
- [Log Management](https://signalarc.example.com/platform/log-management): Structured log ingestion and retention
- [Distributed Tracing](https://signalarc.example.com/platform/distributed-tracing): OpenTelemetry-compatible traces
- [Uptime Monitoring](https://signalarc.example.com/platform/uptime-monitoring): External HTTP checks
- [Alert Routing](https://signalarc.example.com/platform/alert-routing): Ownership and escalation
- [Status Pages](https://signalarc.example.com/platform/status-pages): Incident communication

## Solutions and guides

- [Next.js observability](https://signalarc.example.com/solutions/nextjs-observability)
- [Reduce alert noise](https://signalarc.example.com/guides/reduce-alert-noise)
- [Missing source maps](https://signalarc.example.com/troubleshooting/missing-source-maps)
- [FAQ](https://signalarc.example.com/faq)
- [About and authors](https://signalarc.example.com/about)

This file is an experimental machine-readable index. The linked pages remain the source of truth.
`;

  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
