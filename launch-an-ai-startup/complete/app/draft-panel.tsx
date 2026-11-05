"use client";

import { useObject } from "@ai-sdk/react";
import { useState } from "react";
import { draftSchema } from "@/lib/draft-schema";

export function DraftPanel({ updateId }: { updateId: string }) {
  const [formatError, setFormatError] = useState(false);
  const { object, submit, isLoading, stop, error } = useObject({
    api: "/api/draft",
    schema: draftSchema,
    onFinish({ error }) {
      // The stream finished but the result doesn't match the schema.
      setFormatError(Boolean(error));
    },
  });

  return (
    <div className="mt-4 border-t border-zinc-100 pt-4">
      <div className="flex gap-2">
        <button
          onClick={() => {
            setFormatError(false);
            submit({ updateId });
          }}
          disabled={isLoading}
          className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs text-white disabled:opacity-50"
        >
          {isLoading ? "Drafting..." : object ? "Draft again" : "Draft update"}
        </button>
        {isLoading && (
          <button onClick={() => stop()} className="rounded-md border px-3 py-1.5 text-xs">
            Stop
          </button>
        )}
      </div>

      {error && <p className="mt-3 text-xs text-red-700">{friendly(error)}</p>}
      {formatError && (
        <p className="mt-3 text-xs text-red-700">
          We couldn&apos;t format this draft. Try again, or edit your notes first.
        </p>
      )}

      {object && (
        <article className="mt-4 space-y-3 text-sm">
          {object.subject && <h3 className="font-medium">{object.subject}</h3>}
          {object.summary && <p>{object.summary}</p>}
          <DraftList title="Wins" items={object.wins} />
          <DraftList title="Lowlights" items={object.lowlights} />
          <DraftList title="Asks" items={object.asks} />
        </article>
      )}
    </div>
  );
}

// useObject puts the response body in error.message. Our routes send
// { error } JSON for the failures a founder can act on.
function friendly(error: Error) {
  try {
    const body = JSON.parse(error.message);
    const message = body.error ?? "Something went wrong. Try again.";
    // The reference is the request ID, so support can find this exact request.
    return body.requestId ? `${message} Reference: ${body.requestId}` : message;
  } catch {
    return "Something went wrong. Try again.";
  }
}

function DraftList({ title, items }: { title: string; items?: (string | undefined)[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="text-xs font-medium uppercase tracking-wide text-zinc-500">{title}</h4>
      <ul className="mt-1 list-disc space-y-1 pl-5">
        {items.map((item, i) => item && <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}
