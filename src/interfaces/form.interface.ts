interface IRegisterFormData {
  account: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

interface IAccountSettingFormData {
  account: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IUserProfileSettingFromData {
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

interface ITextField {
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

interface IFromBlock {
  title: string;
  textFields?: ITextField[];
}

interface ILabel {
  text: string;
}
interface IChip {
  id?: number;
  text: string;
  color?: string;
  icon?: string;
  icon_type?: string;
  value?: string | string[] | number | number[];
}

interface IInputChips {
  icon: string;
  label: ILabel;
  choosechips: IChip[];
  nochooseData: IChip[];
  type: "visitedCountries" | "languages" | "currencies" | "travelInterests" | "travelStyles";
}

export type { IRegisterFormData, ITextField, IFromBlock, IAccountSettingFormData, IUserProfileSettingFromData, IInputChips, IChip, ILabel };
