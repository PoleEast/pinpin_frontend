interface ITextSearchOption {
  keyword: string;
  priceLevel?: string[];
  primaryType?: string;
  nextPageToken?: string;
  pageSize?: number;
  maxImageHeight?: number;
  rating?: number;
}

export type { ITextSearchOption };
