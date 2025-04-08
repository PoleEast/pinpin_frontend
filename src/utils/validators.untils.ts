/**
 * 產生文字欄位的驗證規則
 * @param {string} fieldName 欄位名稱
 * @param {number} minLength 最小字數
 * @param {number} [maxLength=0] 最大字數
 * @param {boolean} [required=false] 是否為必填
 * @param {RegExp} [pattern] 驗證的正規表達式
 * @returns {((v: string) => boolean | string)[]} 驗證規則
 */
export const createTextFieldRules = (
  fieldName: string,
  minLength: number = 0,
  maxLength: number,
  required: boolean = false,
  pattern?: RegExp,
): ((v: string) => boolean | string)[] => {
  return [
    (v: string) => !required || !!v || `${fieldName}一定要填寫`,
    (v: string) => !v || v.length <= maxLength || `${fieldName}不能超過${maxLength}個字`,
    (v: string) => !v || v.length >= minLength || `${fieldName}至少${minLength}個字`,
    (v: string) => !v || !pattern || pattern.test(v) || `${fieldName}格式不正確`,
  ];
};

/**
 * 產生日期欄位的驗證規則
 * @param {string} fieldName 欄位名稱
 * @param {boolean} [isBeforeToday=false] 是否必須在今天之前
 * @param {boolean} [required=false] 是否為必填
 * @returns {((v: string) => boolean | string)[]} 驗證規則
 */
export const createDateFieldRules = (
  fieldName: string,
  isBeforeToday: boolean = false,
  required: boolean = false,
): ((v: string) => boolean | string)[] => {
  return [
    (v: string) => !required || !!v || `${fieldName}一定要填寫`,
    (v: string) => !v || !isNaN(new Date(v).getTime()) || `${fieldName}格式不正確`,
    (v: string) => !v || !isBeforeToday || new Date(v) < new Date() || `${fieldName}必須在今天之前`,
  ];
};

/**
 * 建立陣列欄位的驗證規則。
 *
 * @template T - 陣列中元素的類型。
 * @param fieldName - 欄位名稱。
 * @param minLength - 陣列的最小長度，預設為 0。
 * @param maxLength - 陣列的最大長度。
 * @param souceArray - 用於驗證的來源陣列，預設為空陣列。
 * @param required - 是否為必填欄位，預設為 `false`。
 * @returns 一組驗證函式陣列，檢查以下條件：
 * - 如果欄位為必填，則不得為空。
 * - 陣列長度不得超過指定的 `maxLength`。
 * - 陣列長度必須至少為指定的 `minLength`。
 * - 陣列中的所有元素必須存在於 `souceArray` 中。
 */
const createArrayFieldRules = <T>(fieldName: string, minLength: number = 0, maxLength: number, sourceArray: T[] = [], required: boolean = false) => {
  return [
    (v: T[]) => !required || !!v || `${fieldName}一定要填寫`,
    (v: T[]) => !v || v.length <= maxLength || `${fieldName}不能超過${maxLength}個選項`,
    (v: T[]) => !v || v.length >= minLength || `${fieldName}至少選擇${minLength}個選項`,
    (v: T[]) => !v || v.every((item) => sourceArray.includes(item)) || `${fieldName}包含無效選項`,
    (v: T[]) => !v || v.length === new Set(v).size || `${fieldName}不能有重複的選項`,
  ];
};

/**
 * 根據指定的規則驗證陣列欄位，若驗證失敗則返回錯誤訊息。
 *
 * @template T - 陣列中元素的類型。
 * @param value - 要驗證的陣列。
 * @param fieldName - 欄位名稱，用於錯誤訊息。
 * @param minLength - 陣列的最小長度。
 * @param maxLength - 陣列的最大長度。
 * @param source - 可選的有效值陣列，預設為空陣列。
 * @param required - 是否為必填欄位，預設為 `false`。
 * @returns 如果驗證失敗，返回包含錯誤訊息的字串；如果驗證通過，返回 `undefined`。
 */
export const validateArrayField = <T>(value: T[], fieldName: string, minLength: number, maxLength: number, source: T[] = [], required = false) => {
  const rules = createArrayFieldRules(fieldName, minLength, maxLength, source, required);

  const error = rules.map((rule) => rule(value)).find((result) => typeof result === "string");

  return typeof error === "string" ? error : undefined;
};
