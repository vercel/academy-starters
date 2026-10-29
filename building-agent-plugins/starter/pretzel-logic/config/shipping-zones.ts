// IMPORTANT: app/shipping/[zone]/page.tsx reads this array through
// generateStaticParams and sets dynamicParams = false. In `next dev`, a new
// zone works as soon as you visit it. In a deployed build, the list is fixed
// at `next build`, and any zone code that isn't in it 404s. To add a zone,
// edit this file AND redeploy.
export const SHIPPING_ZONES = [
  { code: "us-west", name: "US West", flatRateCents: 800 },
  { code: "us-central", name: "US Central", flatRateCents: 700 },
  { code: "us-east", name: "US East", flatRateCents: 600 },
  { code: "canada", name: "Canada", flatRateCents: 1500 },
] as const;

export type ShippingZone = (typeof SHIPPING_ZONES)[number];
export type ShippingZoneCode = ShippingZone["code"];
