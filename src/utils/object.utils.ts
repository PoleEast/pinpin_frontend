/**
 * 將巢狀物件轉換為包含 value 屬性的不可變陣列
 *
 * @template TMap - 繼承自 Record<string, Record<string, unknown>> 的泛型類型
 * @param {TMap} map - 要轉換的巢狀物件，鍵為字串，值為物件
 * @returns {ReadonlyArray<Readonly<{value: keyof TMap} & TMap[keyof TMap]>>}
 *          返回凍結的陣列，每個元素包含原始鍵作為 value 屬性，並展開原始值的所有屬性
 *
 * 此函數將物件的每個鍵值對轉換為陣列元素，其中：
 * - 原始物件的鍵成為新物件的 value 屬性
 * - 原始物件的值（必須為物件）的所有屬性被展開到新物件中
 * - 返回的陣列和其中的物件都是不可變的（使用 Object.freeze）
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
