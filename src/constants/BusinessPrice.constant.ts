import { objectToOptions } from "@/utils";
import { GOOGLE_MAPS_PLACE_PRICE_LEVEL, type GoogleMapsPlacePriceLevel } from "pinpin_library";

const BUSSINESS_PRICE_MAP: Record<GoogleMapsPlacePriceLevel, { label: string }> = Object.freeze({
  [GOOGLE_MAPS_PLACE_PRICE_LEVEL.INEXPENSIVE]: Object.freeze({ label: "$" }),
  [GOOGLE_MAPS_PLACE_PRICE_LEVEL.MODERATE]: Object.freeze({ label: "$$" }),
  [GOOGLE_MAPS_PLACE_PRICE_LEVEL.EXPENSIVE]: Object.freeze({ label: "$$$" }),
  [GOOGLE_MAPS_PLACE_PRICE_LEVEL.VERY_EXPENSIVE]: Object.freeze({ label: "$$$$" }),
  [GOOGLE_MAPS_PLACE_PRICE_LEVEL.UNKNOWN]: Object.freeze({ label: "?" }),
});

const BUSSINESS_PRICE_OPTIONS = objectToOptions(BUSSINESS_PRICE_MAP);

export { BUSSINESS_PRICE_OPTIONS, BUSSINESS_PRICE_MAP };
