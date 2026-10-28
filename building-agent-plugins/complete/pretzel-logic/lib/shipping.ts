import {
  SHIPPING_ZONES,
  type ShippingZone,
  type ShippingZoneCode,
} from "@/config/shipping-zones";

export function getShippingRate(zoneCode: ShippingZoneCode): number {
  const zone = SHIPPING_ZONES.find((z) => z.code === zoneCode);
  if (!zone) {
    throw new Error(`Unknown shipping zone: ${zoneCode}`);
  }
  return zone.flatRateCents;
}

export function listShippingZones(): readonly ShippingZone[] {
  return SHIPPING_ZONES;
}
