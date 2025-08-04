import { createTextFieldRules } from "@/utils";
import { USER_VALIDATION, USERPROFILE_REQUSER_VALIDATION } from "pinpin_library";

export const ValidationService = {
  /**
   * 為各種使用者輸入欄位建立驗證規則。
   *
   * @returns 一個包含以下欄位驗證規則的物件：
   * - `account`: 帳號欄位的驗證規則，包括最小和最大長度、必填狀態，以及有效輸入的格式。
   * - `password`: 密碼欄位的驗證規則，包括最小和最大長度、必填狀態，以及有效輸入的格式。
   * - `nickname`: 暱稱欄位的驗證規則，包括最小和最大長度，以及必填狀態。
   * - `email`: 電子郵件欄位的驗證規則，包括最小和最大長度、選填狀態，以及有效輸入的格式。
   */
  createRules() {
    return {
      account: createTextFieldRules(
        "帳號",
        USER_VALIDATION.ACCOUNT.MIN_LENGTH,
        USER_VALIDATION.ACCOUNT.MAX_LENGTH,
        true,
        USER_VALIDATION.ACCOUNT.PATTERN,
      ),
      password: (request: boolean) =>
        createTextFieldRules(
          "密碼",
          USER_VALIDATION.PASSWORD.MIN_LENGTH,
          USER_VALIDATION.PASSWORD.MAX_LENGTH,
          request,
          USER_VALIDATION.PASSWORD.PATTERN,
        ),
      nickname: createTextFieldRules(
        "暱稱",
        USERPROFILE_REQUSER_VALIDATION.NICKNAME.MIN_LENGTH,
        USERPROFILE_REQUSER_VALIDATION.NICKNAME.MAX_LENGTH,
        true,
      ),
      email: createTextFieldRules(
        "電子郵件",
        USERPROFILE_REQUSER_VALIDATION.EMAIL.MIN_LENGTH,
        USERPROFILE_REQUSER_VALIDATION.EMAIL.MAX_LENGTH,
        false,
        USERPROFILE_REQUSER_VALIDATION.EMAIL.PATTERN,
      ),
    };
  },
};
