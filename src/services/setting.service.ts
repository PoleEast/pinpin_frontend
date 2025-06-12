import type { AxiosResponse } from "axios";
import axios from "axios";
import { axiosLockManager } from "../utils/AxiosLockManager.utils";
import type {
  AccountRequestDTO,
  ApiResponseDTO,
  AvatarChangeHistoryResponseDTO,
  AvatarResponseDTO,
  SettingResponseDTO,
  UserProfileRequestDTO,
  UserProfileResponseDTO,
} from "pinpin_library";

export const settingService = {
  /**
   * 獲取系統設定資料
   * @returns {Promise<AxiosResponse<ApiResponseDTO<SettingResponseDTO>>>} 設定資料
   */
  async GetSettingData(): Promise<AxiosResponse<ApiResponseDTO<SettingResponseDTO>>> {
    const response = await axios.get("/category/getSettingData");
    return response;
  },

  /**
   * 獲取用戶資料
   * @returns {Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>>} 用戶資料
   */
  async GetUserProfile(): Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>> {
    const response: AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>> = await axios.get("/userProfile/getUserProfile");

    if (response.data.data?.user?.createAt && typeof response.data.data?.user?.createAt === "string") {
      response.data.data.user.createAt = new Date(response.data.data?.user?.createAt);
    }
    return response;
  },

  /**
   * 獲取預設頭像
   * @returns {Promise<AxiosResponse<ApiResponseDTO<AvatarResponseDTO[]>>>} 預設頭像資料
   */

  async GetDefaultAvatar(): Promise<AxiosResponse<ApiResponseDTO<AvatarResponseDTO[]>>> {
    const response: AxiosResponse<ApiResponseDTO<AvatarResponseDTO[]>> = await axios.get("/avatar/getDefaultAvatar");

    response.data.data = response.data.data?.map((avatar: AvatarResponseDTO) => {
      avatar.create_at = new Date(avatar.create_at);
      return avatar;
    });

    return response;
  },

  /**
   * 獲取用戶頭像變更歷史
   * @returns {Promise<AxiosResponse<ApiResponseDTO<AvatarChangeHistoryResponseDTO[]>>>} 用戶頭像變更歷史資料
   */

  async GetChangeHistoryAvatar(): Promise<AxiosResponse<ApiResponseDTO<AvatarChangeHistoryResponseDTO[]>>> {
    const response = await axios.get("/userProfile/getChangeHistoryAvatar");

    response.data.data = response.data.data?.map((avatar: AvatarChangeHistoryResponseDTO) => {
      avatar.change_date = new Date(avatar.change_date);
      return avatar;
    });

    return response;
  },

  /**
   * 獲取上傳過的用戶頭像
   * @returns {Promise<AxiosResponse<ApiResponseDTO<AvatarResponseDTO[]>>>} 用戶頭像資料
   */
  async GetUserAvatar(): Promise<AxiosResponse<ApiResponseDTO<AvatarResponseDTO[]>>> {
    const response = await axios.get("/avatar/getUserAvatar");

    response.data.data = response.data.data?.map((avatar: AvatarResponseDTO) => {
      avatar.create_at = new Date(avatar.create_at);
      return avatar;
    });

    return response;
  },

  /**
   * 更新帳號設定
   * @param {AccountRequestDTO} accountRequestDTO - 帳號設定資料
   * @returns {Promise<AxiosResponse<ApiResponseDTO<AccountRequestDTO>>>} 更新結果
   */
  async UpdateAccountSetting(accountRequestDTO: AccountRequestDTO): Promise<AxiosResponse<ApiResponseDTO<AccountRequestDTO>>> {
    return await axiosLockManager.withLock("UpdateAccountSetting", async () => {
      const response = await axios.patch("/user/updateUser", accountRequestDTO);
      return response;
    });
  },

  /**
   * 更新用戶資料
   * @param {UserProfileRequestDTO} userProfileRequestDTO - 用戶資料
   * @returns {Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>>} 更新結果
   */
  async UpdateUserProfileSetting(userProfileRequestDTO: UserProfileRequestDTO): Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>> {
    return await axiosLockManager.withLock("UpdateUserProfileSetting", async () => {
      const response = await axios.patch("/userProfile/updateUserProfile", userProfileRequestDTO);
      return response;
    });
  },

  /**
   * 上傳用戶頭像
   * @param {FormData} avatar - 帶有頭像檔案的FormData
   * @returns {Promise<AxiosResponse<ApiResponseDTO<AvatarResponseDTO>>>} 上傳結果
   */
  async UploadAvatar(avatar: FormData): Promise<AxiosResponse<ApiResponseDTO<AvatarResponseDTO>>> {
    return await axiosLockManager.withLock("UploadAvatar", async () => {
      const response = await axios.post("/avatar/upload", avatar, { headers: { "Content-Type": "multipart/form-data" } });
      return response;
    });
  },

  async UpdateUserProfileAvatar(avatarId: number): Promise<AxiosResponse<ApiResponseDTO<AvatarResponseDTO>>> {
    return await axiosLockManager.withLock("UpdateUserProfileAvatar", async () => {
      const response = await axios.patch("/userProfile/updateAvatar", {
        avatar_id: avatarId,
      });
      return response;
    });
  },
};
