/**
 * 產生一個 UUID
 *
 * @returns {string}  UUID 字串
 *
 * @throws {Error} 如果瀏覽器不支援 UUID 產生功能
 */
const generateUUID = (): string => {
  if (!crypto.randomUUID()) {
    throw new Error(
      "本網站不支援無UUID功能的瀏覽器,請更新瀏覽器版本或更換瀏覽器",
    );
  }

  return crypto.randomUUID();
};

export { generateUUID };
