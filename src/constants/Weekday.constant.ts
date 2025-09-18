import { objectToOptions } from "@/utils";

const WEEKDAY = {
  MONDAY: "MONDAY",
  TUESDAY: "TUESDAY",
  WEDNESDAY: "WEDNESDAY",
  THURSDAY: "THURSDAY",
  FRIDAY: "FRIDAY",
  SATURDAY: "SATURDAY",
  SUNDAY: "SUNDAY",
} as const;

type WeekdayType = keyof typeof WEEKDAY;

const WEEKDAY_MAP: Record<WeekdayType, { label: string; index: number }> = Object.freeze({
  [WEEKDAY.SUNDAY]: Object.freeze({
    index: 0,
    label: "禮拜天",
  }),
  [WEEKDAY.MONDAY]: Object.freeze({
    index: 1,
    label: "禮拜一",
  }),
  [WEEKDAY.TUESDAY]: Object.freeze({
    index: 2,
    label: "禮拜二",
  }),
  [WEEKDAY.WEDNESDAY]: Object.freeze({
    index: 3,
    label: "禮拜三",
  }),
  [WEEKDAY.THURSDAY]: Object.freeze({
    index: 4,
    label: "禮拜四",
  }),
  [WEEKDAY.FRIDAY]: Object.freeze({
    index: 5,
    label: "禮拜五",
  }),
  [WEEKDAY.SATURDAY]: Object.freeze({
    index: 6,
    label: "禮拜六",
  }),
} as const);

const WEEKDAY_OPTIONS = objectToOptions(WEEKDAY_MAP);

export { WEEKDAY, WEEKDAY_MAP, WEEKDAY_OPTIONS };
export type { WeekdayType };
