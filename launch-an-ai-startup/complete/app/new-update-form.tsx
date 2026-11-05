"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function NewUpdateForm({ month }: { month: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setPending(true);
    setError(null);

    const res = await fetch("/api/updates", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ month, notes: new FormData(form).get("notes") }),
    });

    setPending(false);
    if (!res.ok) {
      setError((await res.json().catch(() => null))?.error ?? "Something went wrong. Try again.");
      return;
    }
    form.reset();
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-6">
      <label htmlFor="notes" className="text-sm font-medium">
        Notes for {month}
      </label>
      <textarea
        id="notes"
        name="notes"
        rows={4}
        placeholder="Best month yet. Lost one customer. Hiring in December."
        className="mt-2 w-full rounded-md border border-zinc-300 p-3 text-sm"
      />
      {error && <p className="mt-2 text-sm text-red-700">{error}</p>}
      <button
        disabled={pending}
        className="mt-3 rounded-md bg-zinc-900 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save notes"}
      </button>
    </form>
  );
}
