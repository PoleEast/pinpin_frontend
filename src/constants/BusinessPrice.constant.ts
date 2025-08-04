import { objectToOptions } from "@/utils";
import {
  GOOGLE_MAPS_PLACE_PRICE_LEVEL,
  type GoogleMapsPlacePriceLevel,
} from "pinpin_library";

const BUSSINESS_PRICE_MAP: Record<
  GoogleMapsPlacePriceLevel,
  { label: string; index?: number }
> = Object.freeze({
  [GOOGLE_MAPS_PLACE_PRICE_LEVEL.INEXPENSIVE]: Object.freeze({
    label: "$",
    index: 0,
  }),
  [GOOGLE_MAPS_PLACE_PRICE_LEVEL.MODERATE]: Object.freeze({
    label: "$$",
    index: 1,
  }),
  [GOOGLE_MAPS_PLACE_PRICE_LEVEL.EXPENSIVE]: Object.freeze({
    label: "$$$",
    index: 2,
  }),
  [GOOGLE_MAPS_PLACE_PRICE_LEVEL.VERY_EXPENSIVE]: Object.freeze({
    label: "$$$$",
    index: 3,
  }),
  [GOOGLE_MAPS_PLACE_PRICE_LEVEL.UNKNOWN]: Object.freeze({ label: "?" }),
});

const BUSSINESS_PRICE_OPTIONS = objectToOptions(BUSSINESS_PRICE_MAP);

export { BUSSINESS_PRICE_OPTIONS, BUSSINESS_PRICE_MAP };
