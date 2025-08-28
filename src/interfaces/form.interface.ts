import type { GoogleMapsPlaceBusinessStatus, GoogleMapsPlacePriceLevel } from "pinpin_library";

interface RegisterFormData {
  account: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

interface AccountSettingFormData {
  account: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UserProfileSettingFromData {
  motto?: string;
  bio?: string;
  fullname?: string;
  nickname: string;
  isFullNameVisible?: boolean;
  avatar_public_id?: string;
  coverPhoto?: string;
  birthday?: Date;
  gender?: number;
  phone?: string;
  address?: string;
  originCountry?: number;
  visitedCountries?: number[];
  languages?: number[];
  currencies?: number[];
  travelInterests?: number[];
  travelStyles?: number[];
}

interface TextField {
  label?: string;
  model: string;
  required?: boolean;
  rule?: ((v: string) => boolean | string)[];
  icon?: string;
  readonly?: boolean;
  type?: string;
  placeholder?: string;
  hint?: string;
  errorMessages?: string;
}

interface FromBlock {
  title: string;
  textFields?: TextField[];
}

interface Label {
  text: string;
}
interface Chip {
  id?: number;
  text: string;
  color?: string;
  unicodeEmoji?: string;
  icon?: string;
  icon_type?: string;
  value?: string | string[] | number | number[];
}

interface InputChips {
  icon: string;
  label: Label;
  choosechips: Chip[];
  nochooseData: Chip[];
  type: "visitedCountries" | "languages" | "currencies" | "travelInterests" | "travelStyles";
}

interface LocationCard {
  placeName: string;
  rating: number;
  price: GoogleMapsPlacePriceLevel;
  primaryType: string;
  address: string;
  businessStatus: GoogleMapsPlaceBusinessStatus;
  phone: string;
  Id: string;
  photoURL: string;
  IconURL: string;
  userRatingCount: number;
}

export type {
  RegisterFormData,
  TextField,
  FromBlock,
  AccountSettingFormData,
  UserProfileSettingFromData,
  InputChips,
  Chip,
  Label,
  LocationCard,
};
