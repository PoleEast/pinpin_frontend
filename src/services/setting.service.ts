import type { AxiosResponse } from "axios";
import axios from "axios";
import type { AccountRequestDTO, ApiResponseDTO, SettingResponseDTO, UserProfileResponseDTO } from "pinpin_library";

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
   * 更新帳號設定
   * @param {AccountRequestDTO} accountRequestDTO - 帳號設定資料
   * @returns {Promise<AxiosResponse<ApiResponseDTO<AccountRequestDTO>>>} 更新結果
   */
  async UpdateAccountSetting(accountRequestDTO: AccountRequestDTO): Promise<AxiosResponse<ApiResponseDTO<AccountRequestDTO>>> {
    const response = await axios.patch("/user/updateUser", accountRequestDTO);

    return response;
  },

  /**
   * 更新用戶資料
   * @param {UserProfileResponseDTO} userProfileRequestDTO - 用戶資料
   * @returns {Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>>} 更新結果
   */
  async UpdateUserProfileSetting(userProfileRequestDTO: UserProfileResponseDTO): Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>> {
    const response = await axios.patch("/userProfile/updateUserProfile", userProfileRequestDTO);
    return response;
  },

  /**
   * 上傳用戶頭像
   * @param {FormData} avatar - 新頭像的FormData
   * @returns {Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>>} 更新結果
   */
  async UpdateUserProfileAvatar(avatar: FormData): Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>> {
    const response = await axios.post("/userProfile/updateAvatar", avatar, { headers: { "Content-Type": "multipart/form-data" } });
    return response;
  },
};
