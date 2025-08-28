/**
 * 檢查值是否為字串或字串陣列
 *
 * @param value - 要檢查的值
 * @returns 如果值是字串或字串陣列，則返回 `true`，否則返回 `false`。
 */
export const isStringOrStringArray = (value: unknown): value is string | string[] => {
  return (
    typeof value === "string" ||
    (Array.isArray(value) && value.every((item) => typeof item === "string"))
  );
};

/**
 * 檢查值是否為數值字串
 *
 * @param value - 要檢查的值
 * @returns 如果值是數值字串，則返回 `true`，否則返回 `false`。
 */
export function isNumericString(value: unknown): value is number {
  if (typeof value !== "string") return false;

  const trimmedValue = value.trim();
  if (trimmedValue === "") return false;

  return !isNaN(Number(trimmedValue)) && isFinite(Number(trimmedValue));
}

/**
 * 檢查 value 中的所有元素是否都是 map 的 Key.
 *
 * @template T -  map 的型別
 * @param value - 要檢查的值，可能是 string 或 string[]
 * @param map - 來源物件
 * @returns 如果所有元素都是 map 的 Key，則返回 true，否則返回 false
 */
export function isValidKey<T extends Record<string, unknown>>(value: unknown, map: T): boolean {
  if (Array.isArray(value)) {
    return value.every((v) => typeof v === "string" && v in map);
  }

  return typeof value === "string" && value in map;
}
