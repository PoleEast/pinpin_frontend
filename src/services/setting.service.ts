import type { AxiosError, AxiosResponse } from "axios";
import axios, { HttpStatusCode } from "axios";
import type { AccountRequestDTO, ApiErrorResponseDTO, ApiResponseDTO, SettingResponseDTO, UserProfileResponseDTO } from "pinpin_library";

export const settingService = {
  /**
   * 取得所有設定資料
   * @returns  Promise<AxiosResponse<ApiResponseDTO<SettingResponseDTO>>> 回傳設定資料
   * @throws {ApiError} 如果回傳狀態碼不是200，則拋出ApiError
   */
  async GetSettingData(): Promise<AxiosResponse<ApiResponseDTO<SettingResponseDTO>>> {
    try {
      const response = await axios.get("/category/getSettingData");
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponseDTO>;
      throw {
        message: axiosError.response?.data?.message || "設定資料獲取失敗，請稍後再試",
        HttpStatusCode: axiosError.response?.status || HttpStatusCode.InternalServerError,
      };
    }
  },

  /**
   * 獲取用戶個人資料
   * @returns  Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>> 回傳用戶個人資料
   * @throws {ApiError} 如果回傳狀態碼不是200，則拋出ApiError
   */
  async GetUserProfile(): Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>> {
    try {
      const response: AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>> = await axios.get("/userProfile/getUserProfile");

      if (response.data.data?.user?.createAt && typeof response.data.data?.user?.createAt === "string") {
        response.data.data.user.createAt = new Date(response.data.data?.user?.createAt);
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponseDTO>;
      throw {
        message: axiosError.response?.data?.message || "用戶資料獲取失敗，請稍後再試",
        HttpStatusCode: axiosError.response?.status || HttpStatusCode.InternalServerError,
      };
    }
  },

  async UpdateAccountSetting(accountRequestDTO: AccountRequestDTO): Promise<AxiosResponse<ApiResponseDTO<AccountRequestDTO>>> {
    try {
      const response = await axios.patch("/user/updateUser", accountRequestDTO);

      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponseDTO>;
      throw {
        message: axiosError.response?.data?.message || "用戶資料更新失敗",
        HttpStatusCode: axiosError.response?.status || HttpStatusCode.InternalServerError,
      };
    }
  },
};
