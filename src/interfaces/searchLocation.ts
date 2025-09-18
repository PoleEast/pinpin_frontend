import type { TimeOfDay } from "pinpin_library";

interface TextSearchOption {
  keyword: string;
  priceLevel?: string[];
  primaryType?: string;
  nextPageToken?: string;
  pageSize?: number;
  maxImageHeight?: number;
  rating?: number;
}

interface OpeningHours {
  open: TimeOfDay;
  close: TimeOfDay;
  day: string[];
}

export type { TextSearchOption, OpeningHours };
