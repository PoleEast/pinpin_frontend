import { createDateFieldRules, createTextFieldRules } from "@/utils";
import { USERPROFILE_REQUSER_VALIDATION } from "pinpin_library";

export const profileValidationRules = {
  motto: createTextFieldRules(
    "座右銘",
    USERPROFILE_REQUSER_VALIDATION.MOTTO.MIN_LENGTH,
    USERPROFILE_REQUSER_VALIDATION.MOTTO.MAX_LENGTH,
  ),

  realName: createTextFieldRules(
    "真實身份",
    USERPROFILE_REQUSER_VALIDATION.FULLNAME.MIN_LENGTH,
    USERPROFILE_REQUSER_VALIDATION.FULLNAME.MAX_LENGTH,
  ),

  birthday: createDateFieldRules("降臨日", true),

  gender: [(v: number) => USERPROFILE_REQUSER_VALIDATION.GENDER.VALUES.includes(v) || "請選擇性別"],

  phone: createTextFieldRules(
    "電話",
    USERPROFILE_REQUSER_VALIDATION.PHONE.MIN_LENGTH,
    USERPROFILE_REQUSER_VALIDATION.PHONE.MAX_LENGTH,
  ),

  address: createTextFieldRules(
    "地址",
    USERPROFILE_REQUSER_VALIDATION.ADDRESS.MIN_LENGTH,
    USERPROFILE_REQUSER_VALIDATION.ADDRESS.MAX_LENGTH,
  ),

  nickname: createTextFieldRules(
    "暱稱",
    USERPROFILE_REQUSER_VALIDATION.NICKNAME.MIN_LENGTH,
    USERPROFILE_REQUSER_VALIDATION.NICKNAME.MAX_LENGTH,
    true,
  ),

  bio: createTextFieldRules(
    "自我介紹",
    USERPROFILE_REQUSER_VALIDATION.BIO.MIN_LENGTH,
    USERPROFILE_REQUSER_VALIDATION.BIO.MAX_LENGTH,
  ),
};
