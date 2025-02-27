interface RegisterFormData {
  account: string;
  nickname: string;
  password: string;
  confirmPassword: string;
}

interface ITextField {
  label?: string;
  model?: unknown;
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
export type { RegisterFormData, ITextField, IFromBlock };
