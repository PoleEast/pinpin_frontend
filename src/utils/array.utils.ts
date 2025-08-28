import type { NumberKeys } from "./typeHelpers.utils";

/**
 * 根據指定的鍵將物件陣列進行分組
 * @template T - 陣列中物件的型別
 * @param {T[]} array - 要分組的陣列
 * @param {K} key - 用於分組的鍵
 * @param {(value: T[K]) => string} [process] - 可選的處理函數，用於在分組前處理鍵值（預設為字串轉換）
 * @returns {Record<string, T[]>} 回傳物件，鍵為處理後的鍵值，值為對應的物件陣列
 * @example
 * const users = [
 *   { name: 'Alice', age: 25 },
 *   { name: 'Bob', age: 25 },
 *   { name: 'Charlie', age: 30 }
 * ];
 * const grouped = groupBy(users, 'age');
 * // 結果: { '25': [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 25 }], '30': [{ name: 'Charlie', age: 30 }] }
 */
const groupBy = <T, K extends keyof T>(
  array: T[],
  key: K,
  process: (value: T[K]) => string = (value) => String(value),
): Record<string, T[]> => {
  return array.reduce(
    (acc, cur) => {
      const keyValue = cur[key];
      const processedKeyValue = process(keyValue);
      (acc[processedKeyValue] = acc[processedKeyValue] ?? []).push(cur);
      return acc;
    },
    {} as Record<string, T[]>,
  );
};

/**
 * 計算物件陣列中指定數值屬性的平均值
 * @template T - 陣列中物件的型別
 * @param {T[]} array - 要計算的物件陣列
 * @param {NumberKeys<T>} key - 要計算平均值的數值屬性鍵
 * @returns {number} 指定屬性的平均值
 * @example
 * const students = [
 *   { name: 'Alice', score: 85 },
 *   { name: 'Bob', score: 92 },
 *   { name: 'Charlie', score: 78 }
 * ];
 * const averageScore = calculateAverage(students, 'score');
 * // 結果: 85
 */
export const calculateAverage = <T>(array: T[], key: NumberKeys<T>): number => {
  return (
    array.reduce((acc, cur) => {
      const value = cur[key] as number;
      return acc + (value ?? 0);
    }, 0) / array.length
  );
};

export { groupBy };
