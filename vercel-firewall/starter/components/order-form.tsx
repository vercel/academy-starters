"use client";

import { useState } from "react";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "placed"; id: string }
  | { state: "error"; message: string };

export function OrderForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ state: "sending" });
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        rolls: Number(form.get("rolls")),
        pickup: form.get("pickup"),
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setStatus({ state: "placed", id: data.id });
    } else {
      setStatus({ state: "error", message: data.error ?? "Something went wrong. Try again." });
    }
  }

  if (status.state === "placed") {
    return (
      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <p className="text-2xl font-bold">Order placed.</p>
        <p className="mt-2">
          Order <span className="font-mono font-bold">{status.id}</span> is waiting on payment. We&apos;ll start
          buttering when it clears.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl bg-white p-6 shadow-sm">
      <label className="block">
        <span className="text-sm font-semibold">Name</span>
        <input name="name" required className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Work email</span>
        <input name="email" type="email" required className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold">How many rolls?</span>
        <input name="rolls" type="number" min={5} max={40} defaultValue={10} required className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Pickup time</span>
        <input name="pickup" type="time" min="11:00" max="14:00" defaultValue="12:00" required className="mt-1 w-full rounded-lg border px-3 py-2" />
      </label>
      <button
        type="submit"
        disabled={status.state === "sending"}
        className="rounded-lg bg-shell px-5 py-3 font-semibold text-white hover:bg-shell-dark disabled:opacity-50"
      >
        {status.state === "sending" ? "Placing order..." : "Place lunch order"}
      </button>
      {status.state === "error" && <p className="text-shell-dark">{status.message}</p>}
    </form>
  );
}
