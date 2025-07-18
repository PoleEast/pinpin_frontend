import { objectToOptions } from "@/utils";

type GooglePlaceType = (typeof GOOGLE_PLACE_TYPE)[keyof typeof GOOGLE_PLACE_TYPE];

const GOOGLE_PLACE_TYPE = {
  FOOD: "FOOD",
  ATTRACTIONS: "ATTRACTIONS",
  HOTEL: "HOTEL",
  TRANSIT: "TRANSIT",
  SHOPPING: "SHOPPING",
  NIGHT_SNACK: "NIGHT_SNACK",
  DESSERT: "DESSERT",
} as const;

const GOOGLE_PLACE_TYPE_MAP: Record<GooglePlaceType, { label: string; autocompleteItems: string[]; textSearchItem?: string }> = Object.freeze({
  [GOOGLE_PLACE_TYPE.FOOD]: Object.freeze({
    label: "美食",
    autocompleteItems: ["restaurant", "food", "point_of_interest"],
    textSearchItem: "restaurant",
  }),
  [GOOGLE_PLACE_TYPE.DESSERT]: Object.freeze({
    label: "甜點",
    autocompleteItems: ["dessert_restaurant", "cafe", "ice_cream_shop", "confectionery", "point_of_interest"],
  }),
  [GOOGLE_PLACE_TYPE.ATTRACTIONS]: Object.freeze({
    label: "觀光景點",
    autocompleteItems: ["tourist_attraction", "point_of_interest"],
    textSearchItem: "tourist_attraction",
  }),
  [GOOGLE_PLACE_TYPE.HOTEL]: Object.freeze({
    label: "住宿",
    autocompleteItems: ["lodging", "motel", "hotel", "campground", "point_of_interest"],
  }),
  [GOOGLE_PLACE_TYPE.TRANSIT]: Object.freeze({
    label: "交通",
    autocompleteItems: ["airport", "bus_station", "subway_station", "train_station", "point_of_interest"],
  }),
  [GOOGLE_PLACE_TYPE.SHOPPING]: Object.freeze({
    label: "購物",
    autocompleteItems: ["shopping_mall", "store", "market", "supermarket", "point_of_interest"],
  }),
  [GOOGLE_PLACE_TYPE.NIGHT_SNACK]: Object.freeze({ label: "宵夜", autocompleteItems: ["bar", "pub", "night_club", "bar_and_grill"] }),
});

const GOOGLE_PLACE_TYPE_OPTIONS = objectToOptions(GOOGLE_PLACE_TYPE_MAP);

export { GOOGLE_PLACE_TYPE, GOOGLE_PLACE_TYPE_MAP, GOOGLE_PLACE_TYPE_OPTIONS };
export type { GooglePlaceType };
