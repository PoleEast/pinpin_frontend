/**
 * 將物件映射轉換為只讀的選項陣列，每個選項物件包含一個 `value` 屬性（原始映射的鍵）以及對應值物件的所有屬性。
 *
 * 每個選項物件都會被深度凍結以確保不可變性。
 *
 * @typeParam TMap - 輸入映射的型別，每個鍵對應一個屬性物件。
 * @param map - 要轉換為選項陣列的物件映射。
 * @returns 一個只讀的選項物件陣列，每個物件包含 `value` 屬性和映射值的所有屬性。
 *
 * @example
 * const colorMap = {
 *   red: { label: '紅色', hex: '#FF0000' },
 *   blue: { label: '藍色', hex: '#0000FF' }
 * };
 * const options = objectToOptions(colorMap);
 * options 為:
 *  [
 *    { value: 'red', label: '紅色', hex: '#FF0000' },
 *    { value: 'blue', label: '藍色', hex: '#0000FF' }
 *  ]
 */
const objectToOptions = <TMap extends Record<string, Record<string, unknown>>>(
  map: TMap,
): ReadonlyArray<Readonly<{ value: keyof TMap } & TMap[keyof TMap]>> => {
  return Object.freeze(
    (Object.entries(map) as Array<[keyof TMap, TMap[keyof TMap]]>).map(([key, info]) =>
      Object.freeze({
        value: key,
        ...info,
      }),
    ),
  );
};

export { objectToOptions };
