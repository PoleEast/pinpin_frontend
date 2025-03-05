import type { AxiosError, AxiosResponse } from "axios";
import axios, { HttpStatusCode } from "axios";
import type { ApiErrorResponseDTO, ApiResponseDTO, SettingResponseDTO } from "pinpin_library";

export const settingService = {
  async GetSettingData(): Promise<AxiosResponse<ApiResponseDTO<SettingResponseDTO>>> {
    try {
      const response = await axios.get("/api/userProfile/getSetting");
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponseDTO>;
      throw {
        message: axiosError.response?.data?.message || "設定資料獲取失敗，請稍後再試",
        HttpStatusCode: axiosError.response?.status || HttpStatusCode.InternalServerError,
      };
    }
  },
};
