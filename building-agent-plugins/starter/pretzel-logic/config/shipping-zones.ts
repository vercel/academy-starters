// IMPORTANT: This file is read at BUILD TIME via generateStaticParams in
// app/shipping/[zone]/page.tsx. Editing the array in dev will NOT add or
// remove shipping routes, the static params are locked once next build runs.
// To add a zone, edit this file AND redeploy. Local edits without rebuild
// look like nothing happened.
export const SHIPPING_ZONES = [
  { code: "us-west", name: "US West", flatRateCents: 800 },
  { code: "us-central", name: "US Central", flatRateCents: 700 },
  { code: "us-east", name: "US East", flatRateCents: 600 },
  { code: "canada", name: "Canada", flatRateCents: 1500 },
] as const;

export type ShippingZone = (typeof SHIPPING_ZONES)[number];
export type ShippingZoneCode = ShippingZone["code"];
