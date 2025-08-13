const TEMPERATURE_RANGE_TYPE = {
  SUPERCOLD: "SUPERCOLD",
  COLD: "COLD",
  COOL: "COOL",
  COMFORTABLE: "COMFORTABLE",
  WARM: "WARM",
  HOT: "HOT",
  SUPERHOT: "SUPERHOT",
} as const;

type TemperatureRangeType = (typeof TEMPERATURE_RANGE_TYPE)[keyof typeof TEMPERATURE_RANGE_TYPE];

const TEMPERATURE_RANGE_TYPE_MAP: Record<
  TemperatureRangeType,
  {
    label: string;
    min: number;
    max: number;
    color: string;
  }
> = Object.freeze({
  [TEMPERATURE_RANGE_TYPE.SUPERCOLD]: Object.freeze({
    label: "結冰",
    min: -Infinity,
    max: 0,
    color: "#E3F2FD",
  }),
  [TEMPERATURE_RANGE_TYPE.COLD]: Object.freeze({
    label: "寒冷",
    min: 0,
    max: 15,
    color: "#4A90E2",
  }),
  [TEMPERATURE_RANGE_TYPE.COOL]: Object.freeze({
    label: "涼爽",
    min: 15,
    max: 20,
    color: "#26C6DA",
  }),
  [TEMPERATURE_RANGE_TYPE.COMFORTABLE]: Object.freeze({
    label: "舒適",
    min: 20,
    max: 25,
    color: "#66BB6A",
  }),
  [TEMPERATURE_RANGE_TYPE.WARM]: Object.freeze({
    label: "溫暖",
    min: 25,
    max: 30,
    color: "#FFA726",
  }),
  [TEMPERATURE_RANGE_TYPE.HOT]: Object.freeze({
    label: "炎熱",
    min: 30,
    max: 40,
    color: "#FF6B35",
  }),
  [TEMPERATURE_RANGE_TYPE.SUPERHOT]: Object.freeze({
    label: "極熱",
    min: 40,
    max: Infinity,
    color: "#FF1744",
  }),
} as const);

export { TEMPERATURE_RANGE_TYPE, TEMPERATURE_RANGE_TYPE_MAP };
export type { TemperatureRangeType };
