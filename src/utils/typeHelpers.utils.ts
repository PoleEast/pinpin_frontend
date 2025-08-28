/**
 * 從類型 T 中提取值為 number 或 undefined 的鍵名
 * 用於過濾物件屬性，只保留數值類型的屬性鍵
 *
 * @template T - 要提取數值鍵的物件類型
 * @example
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 *   email?: string;
 *   score?: number;
 * }
 *
 * type UserNumberKeys = NumberKeys<User>; // 'id' | 'score'
 * ```
 */
export type NumberKeys<T> = {
  [K in keyof Required<T>]: T[K] extends number | undefined ? K : never;
}[keyof T];
