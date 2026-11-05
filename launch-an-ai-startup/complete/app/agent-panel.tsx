"use client";

import { openInteractions } from "eve/events";
import { useEveAgent } from "eve/react";

export function AgentPanel({ month }: { month: string }) {
  const agent = useEveAgent();
  const busy = agent.status !== "idle";
  // Approvals the founder hasn't answered yet. Each one belongs to a single
  // postUpdate call with its exact text.
  const pending = openInteractions(agent.view).filter(
    (item) => item.request.kind !== "sign-in" && item.answer === undefined,
  );

  return (
    <section className="mt-10 rounded-lg border border-zinc-200 bg-white p-6">
      <h2 className="font-medium">Agent</h2>
      <p className="mt-1 text-sm text-zinc-500">
        Hands the whole job to an agent: it pulls your numbers and drafts the update.
      </p>
      <button
        onClick={() => void agent.send(`Draft my investor update for ${month}.`)}
        disabled={busy}
        className="mt-4 rounded-md bg-zinc-900 px-3 py-1.5 text-xs text-white disabled:opacity-50"
      >
        {busy ? "Working..." : `Draft ${month} with the agent`}
      </button>

      <div className="mt-4 space-y-3 text-sm">
        {agent.messages.map((message) => (
          <article key={message.id}>
            {message.parts.map((part, i) => {
              if (part.type === "text") {
                return (
                  <p key={i} className="whitespace-pre-wrap">
                    {part.text}
                  </p>
                );
              }
              if (part.type === "tool" && part.name === "chartRevenue" && part.state === "completed") {
                const svg = (part.output as { svg?: string } | undefined)?.svg;
                // Model-written SVG can carry <script>. An <img> never runs it;
                // dangerouslySetInnerHTML would.
                return svg ? (
                  // next/image can't optimize a data URL, and this one is tiny.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    alt="MRR by month"
                    className="w-full rounded border border-zinc-100"
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`}
                  />
                ) : null;
              }
              if (part.type === "tool") {
                return (
                  <p key={i} className="font-mono text-xs text-zinc-500">
                    {part.name}: {part.state}
                  </p>
                );
              }
              return null;
            })}
          </article>
        ))}
      </div>
      {pending.map((item) => (
        <div key={item.interactionId} className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm">
          <p className="whitespace-pre-wrap">{item.request.prompt}</p>
          <div className="mt-3 flex gap-2">
            {item.request.options?.map((option) => (
              <button
                key={option.id}
                onClick={() => void agent.respond([{ interactionId: item.interactionId, optionId: option.id }])}
                className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-xs"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ))}
      {agent.error && <p className="mt-3 text-xs text-red-700">Something went wrong. Try again.</p>}
    </section>
  );
}
