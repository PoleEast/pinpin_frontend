import { objectToOptions } from "@/utils/object.utils";
import {
  GOOGLE_MAPS_PLACE_BUSINESS_STATUS,
  type GoogleMapsPlaceBusinessStatus,
} from "pinpin_library";

const BUSINESS_STATUS_MAP: Record<GoogleMapsPlaceBusinessStatus, { label: string; color: string }> =
  Object.freeze({
    [GOOGLE_MAPS_PLACE_BUSINESS_STATUS.OPEN]: Object.freeze({
      label: "營業中",
      color: "success",
    }),
    [GOOGLE_MAPS_PLACE_BUSINESS_STATUS.CLOSE]: Object.freeze({
      label: "休息中",
      color: "error",
    }),
    [GOOGLE_MAPS_PLACE_BUSINESS_STATUS.UNKNOWN]: Object.freeze({
      label: "未知",
      color: "warning",
    }),
  } as const);

const BUSINESS_STATUS_OPTIONS = objectToOptions(BUSINESS_STATUS_MAP);

export { BUSINESS_STATUS_OPTIONS, BUSINESS_STATUS_MAP };
