export const TRUCK_NAME = "Claw & Order";

export const DAILY_ROLLS = 150;

export type RollStyle = "connecticut" | "maine";

export const MENU: Record<RollStyle, { name: string; description: string; price: number }> = {
  connecticut: {
    name: "Connecticut-style",
    description: "Warm lobster, drawn butter, toasted split-top bun.",
    price: 28,
  },
  maine: {
    name: "Maine-style",
    description: "Cold lobster, a little mayo, celery, chives.",
    price: 26,
  },
};

const SPOTS = [
  { place: "Wharf St & Atlantic Ave", hours: "11am–2pm" },
  { place: "Behind the ferry terminal", hours: "11am–2pm" },
  { place: "Harbor Park, by the carousel", hours: "11am–3pm" },
  { place: "Brewery row, outside Low Tide Brewing", hours: "12pm–4pm" },
  { place: "Customs House plaza", hours: "11am–2pm" },
  { place: "Fish pier, north lot", hours: "10am–1pm" },
  { place: "Closed. We're on the boat.", hours: "" },
];

export function todaysSpot(now = new Date()) {
  return SPOTS[now.getDay()];
}
