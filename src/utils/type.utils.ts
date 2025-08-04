/**
 * 檢查 value 中的所有元素是否都是 map 的 Key.
 *
 * @template T -  map 的型別
 * @param value - 要檢查的值，可能是 string 或 string[]
 * @param map - 來源物件
 * @returns 如果所有元素都是 map 的 Key，則返回 true，否則返回 false
 */
export function isValidKey<T extends Record<string, unknown>>(
  value: unknown,
  map: T,
): boolean {
  if (Array.isArray(value)) {
    return value.every((v) => typeof v === "string" && v in map);
  }

  return typeof value === "string" && value in map;
}
