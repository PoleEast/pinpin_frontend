import { objectToOptions } from "@/utils/object.utils";

type BusinessStatus = (typeof BUSINESS_STATUS)[keyof typeof BUSINESS_STATUS];

const BUSINESS_STATUS = {
  OPEN: "OPEN",
  CLOSE: "CLOSE",
  UNKNOWN: "UNKNOWN",
} as const;

const BUSINESS_STATUS_MAP: Record<BusinessStatus, { label: string; color: string }> = Object.freeze({
  [BUSINESS_STATUS.OPEN]: Object.freeze({ label: "營業中", color: "success" }),
  [BUSINESS_STATUS.CLOSE]: Object.freeze({ label: "休息中", color: "error" }),
  [BUSINESS_STATUS.UNKNOWN]: Object.freeze({ label: "未知", color: "warning" }),
} as const);

const BUSINESS_STATUS_OPTIONS = objectToOptions(BUSINESS_STATUS_MAP);

export { BUSINESS_STATUS_OPTIONS, BUSINESS_STATUS_MAP };
export type { BusinessStatus };
