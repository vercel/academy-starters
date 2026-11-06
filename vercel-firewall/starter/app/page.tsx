import Link from "next/link";
import { connection } from "next/server";
import { getRollsLeft } from "@/lib/store";
import { DAILY_ROLLS, MENU, todaysSpot } from "@/lib/truck";

export default async function Home() {
  await connection();
  const spot = todaysSpot();
  const rollsLeft = getRollsLeft();

  return (
    <div className="space-y-10">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-shell">Today</p>
        <h1 className="mt-1 text-4xl font-bold">{spot.place}</h1>
        {spot.hours && <p className="mt-2 text-lg">{spot.hours}, or until the rolls run out.</p>}
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-5xl font-bold text-shell">
          {rollsLeft} <span className="text-2xl text-harbor">of {DAILY_ROLLS} rolls left</span>
        </p>
        <p className="mt-2">Preorders open at 11am. They go fast.</p>
        <Link
          href="/preorder"
          className="mt-4 inline-block rounded-lg bg-shell px-5 py-3 font-semibold text-white hover:bg-shell-dark"
        >
          Preorder a roll
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {Object.entries(MENU).map(([style, roll]) => (
          <div key={style} className="rounded-xl border-2 border-butter bg-white p-5">
            <h2 className="text-xl font-bold">{roll.name}</h2>
            <p className="mt-1">{roll.description}</p>
            <p className="mt-3 font-semibold">${roll.price}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
