import { CLOUDINARY_CONFIG } from "pinpin_library";

/**
 * 生成 Cloudinary 圖片 URL
 * @param {string} public_id - 圖片的 public ID
 * @param {string} [transformString] - 可選的轉換字符串
 * @returns {string} 完整的 Cloudinary 圖片 URL
 */
const cloudinaryUrl = (public_id: string, transformString?: string) =>
  transformString
    ? `${CLOUDINARY_CONFIG.BASE_URL}/${CLOUDINARY_CONFIG.CLOUD_NAME}/${CLOUDINARY_CONFIG.RESOURCE_TYPE.IMAGE}/${CLOUDINARY_CONFIG.DELIVERY_TYPE.UPLOAD}/${transformString}/${public_id}`
    : `${CLOUDINARY_CONFIG.BASE_URL}/${CLOUDINARY_CONFIG.CLOUD_NAME}/${CLOUDINARY_CONFIG.RESOURCE_TYPE.IMAGE}/${CLOUDINARY_CONFIG.DELIVERY_TYPE.UPLOAD}/${public_id}`;

export { cloudinaryUrl };
