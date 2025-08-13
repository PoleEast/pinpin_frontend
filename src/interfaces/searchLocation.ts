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
  dayRange: {
    start: string;
    end: string;
  };
  openingTime: {
    start: string;
    end: string;
  };
}

export type { TextSearchOption, OpeningHours };
