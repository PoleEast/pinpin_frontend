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

const GOOGLE_PLACE_TYPE_MAP: Record<GooglePlaceType, { label: string; items: string[] }> = Object.freeze({
  [GOOGLE_PLACE_TYPE.FOOD]: Object.freeze({ label: "美食", items: ["restaurant", "food", "point_of_interest"] }),
  [GOOGLE_PLACE_TYPE.DESSERT]: Object.freeze({
    label: "甜點",
    items: ["ice_cream_shop", "cafe", "dessert_restaurant", "confectionery", "point_of_interest"],
  }),
  [GOOGLE_PLACE_TYPE.ATTRACTIONS]: Object.freeze({ label: "景點", items: ["point_of_interest", "tourist_attraction"] }),
  [GOOGLE_PLACE_TYPE.HOTEL]: Object.freeze({ label: "住宿", items: ["lodging", "motel", "hotel ", "campground", "point_of_interest"] }),
  [GOOGLE_PLACE_TYPE.TRANSIT]: Object.freeze({
    label: "交通",
    items: ["airport", "bus_station", "subway_station", "train_station", "point_of_interest"],
  }),
  [GOOGLE_PLACE_TYPE.SHOPPING]: Object.freeze({ label: "購物", items: ["shopping_mall", "store", "market", "supermarket", "point_of_interest"] }),
  [GOOGLE_PLACE_TYPE.NIGHT_SNACK]: Object.freeze({ label: "宵夜", items: ["bar", "pub", "night_club"] }),
});

const GOOGLE_PLACE_TYPE_OPTIONS = objectToOptions(GOOGLE_PLACE_TYPE_MAP);

export { GOOGLE_PLACE_TYPE, GOOGLE_PLACE_TYPE_MAP, GOOGLE_PLACE_TYPE_OPTIONS };
export type { GooglePlaceType };
