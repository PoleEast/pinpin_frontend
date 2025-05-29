import { CLOUDINARY_CONFIG } from "pinpin_library";

const cloudinaryUrl = (public_id: string, transformString: string) =>
  `${CLOUDINARY_CONFIG.BASE_URL}/${CLOUDINARY_CONFIG.CLOUD_NAME}/${CLOUDINARY_CONFIG.RESOURCE_TYPE.IMAGE}/${CLOUDINARY_CONFIG.DELIVERY_TYPE.UPLOAD}/${transformString}/${public_id}`;

export { cloudinaryUrl };
