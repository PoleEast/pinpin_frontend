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
  bio?: string;
  fullname?: string;
  nickname?: string;
  isFullNameVisible?: boolean;
  avatar?: string;
  coverPhoto?: string;
  birthday?: Date;
  gender?: number;
  phone?: string;
  address?: string;
  originCountry?: number;
  visited_countries?: number[];
  language?: number[];
  currency?: number[];
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
  text: string;
  color?: string;
  icon?: string;
}

interface IInputChips {
  icon: string;
  label: ILabel;
  chips: IChip[];
}

export type { IRegisterFormData, ITextField, IFromBlock, IAccountSettingFormData, IUserProfileSettingFromData, IInputChips, IChip, ILabel };
