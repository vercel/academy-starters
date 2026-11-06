import { connection } from "next/server";
import { TRUCK_NAME, todaysSpot } from "@/lib/truck";

// The page the rival truck scrapes every five minutes so it can park across the street.
export default async function LocationPage() {
  await connection();
  const spot = todaysSpot();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-shell">Where&apos;s {TRUCK_NAME}?</p>
      <h1 className="mt-1 text-4xl font-bold">{spot.place}</h1>
      {spot.hours && <p className="mt-2 text-lg">{spot.hours}</p>}
      <p className="mt-6 text-sm">Updated {new Date().toLocaleTimeString("en-US", { timeZone: "America/New_York" })} Eastern.</p>
    </div>
  );
}
