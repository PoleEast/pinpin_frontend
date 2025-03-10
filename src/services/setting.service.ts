import type { AxiosError, AxiosResponse } from "axios";
import axios, { HttpStatusCode } from "axios";
import type { ApiErrorResponseDTO, ApiResponseDTO, SettingResponseDTO, UserProfileResponseDTO } from "pinpin_library";

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

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * 獲取用戶個人資料
   * @returns  Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>> 回傳用戶個人資料
   * @throws {ApiError} 如果回傳狀態碼不是200，則拋出ApiError
   */
  /******  8b902a09-77b8-4e30-a740-ef810d866f2c  *******/
  async GetUserProfile(): Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>> {
    try {
      const response = await axios.get("/userProfile/getUserProfile");
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponseDTO>;
      throw {
        message: axiosError.response?.data?.message || "用戶資料獲取失敗，請稍後再試",
        HttpStatusCode: axiosError.response?.status || HttpStatusCode.InternalServerError,
      };
    }
  },
};
