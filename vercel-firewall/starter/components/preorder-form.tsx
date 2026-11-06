"use client";

import { useState } from "react";
import { MENU, type RollStyle } from "@/lib/truck";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "confirmed"; confirmation: string }
  | { state: "error"; message: string };

export function PreorderForm({ initialRollsLeft }: { initialRollsLeft: number }) {
  const [rollsLeft, setRollsLeft] = useState(initialRollsLeft);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "sending" });
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/preorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        phone: form.get("phone"),
        style: form.get("style"),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setRollsLeft(data.rollsLeft);
      setStatus({ state: "confirmed", confirmation: data.confirmation });
      return;
    }

    // TODO (3.1): A 429 means the rate limit caught this request. Tell the
    // customer to try again in a few minutes instead of "Something went wrong."
    // TODO (3.2, Advanced): Our own 429 for a reused phone number carries
    // { reason: "phone" }. Show its message.

    setStatus({ state: "error", message: "Something went wrong. Try again." });
  }

  if (status.state === "confirmed") {
    return (
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <p className="text-2xl font-bold">You&apos;re in.</p>
        <p className="mt-2">
          Show <span className="font-mono font-bold">{status.confirmation}</span> at the window.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <p className="font-semibold text-shell">{rollsLeft} rolls left today</p>
      <label className="block">
        <span className="text-sm font-semibold">Name</span>
        <input name="name" required className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Phone</span>
        <input name="phone" type="tel" required className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <fieldset>
        <legend className="text-sm font-semibold">Style</legend>
        {Object.entries(MENU).map(([style, roll]) => (
          <label key={style} className="mt-2 flex items-center gap-2">
            <input type="radio" name="style" value={style as RollStyle} required defaultChecked={style === "connecticut"} />
            {roll.name} (${roll.price})
          </label>
        ))}
      </fieldset>
      <button
        type="submit"
        disabled={status.state === "sending" || rollsLeft <= 0}
        className="rounded-lg bg-shell px-5 py-3 font-semibold text-white hover:bg-shell-dark disabled:opacity-50"
      >
        {rollsLeft <= 0 ? "Sold out" : status.state === "sending" ? "Holding your roll..." : "Hold my roll"}
      </button>
      {status.state === "error" && <p className="text-shell-dark">{status.message}</p>}
    </form>
  );
}
