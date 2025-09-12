import type { AxiosResponse } from "axios";
import axios from "axios";
import { axiosLockManager } from "../utils";
import type {
  AccountRequest,
  ApiResponse,
  AvatarChangeHistoryResponse,
  AvatarResponse,
  SettingResponse,
  UserProfileRequest,
  UserProfileResponse,
} from "pinpin_library";

export const settingService = {
  /**
   * 獲取系統設定資料
   * @returns {Promise<AxiosResponse<ApiResponse<SettingResponse>>>} 設定資料
   */
  async GetSettingData(): Promise<AxiosResponse<ApiResponse<SettingResponse>>> {
    const response = await axios.get("/category/getSettingData");
    return response;
  },

  /**
   * 獲取用戶資料
   * @returns {Promise<AxiosResponse<ApiResponse<UserProfileResponse>>>} 用戶資料
   */
  async GetUserProfile(): Promise<AxiosResponse<ApiResponse<UserProfileResponse>>> {
    const response: AxiosResponse<ApiResponse<UserProfileResponse>> = await axios.get(
      "/userProfile/getUserProfile",
    );

    if (
      response.data.data?.user?.createAt &&
      typeof response.data.data?.user?.createAt === "string"
    ) {
      response.data.data.user.createAt = new Date(response.data.data?.user?.createAt);
    }
    return response;
  },

  /**
   * 獲取預設頭像
   * @returns {Promise<AxiosResponse<ApiResponse<AvatarResponse[]>>>} 預設頭像資料
   */

  async GetDefaultAvatar(): Promise<AxiosResponse<ApiResponse<AvatarResponse[]>>> {
    const response: AxiosResponse<ApiResponse<AvatarResponse[]>> = await axios.get(
      "/avatar/getDefaultAvatar",
    );

    response.data.data = response.data.data?.map((avatar: AvatarResponse) => {
      avatar.create_at = new Date(avatar.create_at);
      return avatar;
    });

    return response;
  },

  /**
   * 獲取用戶頭像變更歷史
   * @returns {Promise<AxiosResponse<ApiResponse<AvatarChangeHistoryResponse[]>>>} 用戶頭像變更歷史資料
   */

  async GetChangeHistoryAvatar(): Promise<
    AxiosResponse<ApiResponse<AvatarChangeHistoryResponse[]>>
  > {
    const response = await axios.get("/userProfile/getChangeHistoryAvatar");

    response.data.data = response.data.data?.map((avatar: AvatarChangeHistoryResponse) => {
      avatar.change_date = new Date(avatar.change_date);
      return avatar;
    });

    return response;
  },

  /**
   * 獲取上傳過的用戶頭像
   * @returns {Promise<AxiosResponse<ApiResponse<AvatarResponse[]>>>} 用戶頭像資料
   */
  async GetUserAvatar(): Promise<AxiosResponse<ApiResponse<AvatarResponse[]>>> {
    const response = await axios.get("/avatar/getUserAvatar");

    response.data.data = response.data.data?.map((avatar: AvatarResponse) => {
      avatar.create_at = new Date(avatar.create_at);
      return avatar;
    });

    return response;
  },

  /**
   * 更新帳號設定
   * @param {AccountRequest} accountRequest - 帳號設定資料
   * @returns {Promise<AxiosResponse<ApiResponse<AccountRequest>>>} 更新結果
   */
  async UpdateAccountSetting(
    accountRequest: AccountRequest,
  ): Promise<AxiosResponse<ApiResponse<AccountRequest>>> {
    return await axiosLockManager.withLock("UpdateAccountSetting", async () => {
      const response = await axios.patch("/user/updateUser", accountRequest);
      return response;
    });
  },

  /**
   * 更新用戶資料
   * @param {UserProfileRequest} userProfileRequest - 用戶資料
   * @returns {Promise<AxiosResponse<ApiResponse<UserProfileResponse>>>} 更新結果
   */
  async UpdateUserProfileSetting(
    userProfileRequest: UserProfileRequest,
  ): Promise<AxiosResponse<ApiResponse<UserProfileResponse>>> {
    return await axiosLockManager.withLock("UpdateUserProfileSetting", async () => {
      const response = await axios.patch("/userProfile/updateUserProfile", userProfileRequest);
      return response;
    });
  },

  /**
   * 上傳用戶頭像
   * @param {FormData} avatar - 帶有頭像檔案的FormData
   * @returns {Promise<AxiosResponse<ApiResponse<AvatarResponse>>>} 上傳結果
   */
  async UploadAvatar(avatar: FormData): Promise<AxiosResponse<ApiResponse<AvatarResponse>>> {
    return await axiosLockManager.withLock("UploadAvatar", async () => {
      const response = await axios.post("/avatar/upload", avatar, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response;
    });
  },

  async UpdateUserProfileAvatar(
    avatarId: number,
  ): Promise<AxiosResponse<ApiResponse<AvatarResponse>>> {
    return await axiosLockManager.withLock("UpdateUserProfileAvatar", async () => {
      const response = await axios.patch("/userProfile/updateAvatar", {
        avatar_id: avatarId,
      });
      return response;
    });
  },
};
