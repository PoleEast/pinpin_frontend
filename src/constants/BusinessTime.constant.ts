import { objectToOptions } from "@/utils/object.utils";

type BusinessTimes = (typeof BUSINESS_TIMES)[keyof typeof BUSINESS_TIMES];

const BUSINESS_TIMES = {
  UNLIMITED: "UNLIMITED",
  OPEN: "OPEN",
  SPECIFIC_DAYS: "SPECIFIC_DAYS",
  SPECIFIC_TIME: "SPECIFIC_TIME",
} as const;

const BUSINESS_TIME_MAP: Record<BusinessTimes, { label: string }> =
  Object.freeze({
    [BUSINESS_TIMES.UNLIMITED]: Object.freeze({ label: "不限" }),
    [BUSINESS_TIMES.OPEN]: Object.freeze({ label: "營業中" }),
    [BUSINESS_TIMES.SPECIFIC_DAYS]: Object.freeze({ label: "指定星期" }),
    [BUSINESS_TIMES.SPECIFIC_TIME]: Object.freeze({ label: "指定時間" }),
  } as const);

const BUSINESS_TIME_OPTIONS = objectToOptions(BUSINESS_TIME_MAP);

export { BUSINESS_TIME_MAP, BUSINESS_TIME_OPTIONS };
export type { BusinessTimes };
