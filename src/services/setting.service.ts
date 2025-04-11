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

  /**
   * 更新用戶的帳戶設定，透過向伺服器發送 PATCH 請求。
   *
   * @param accountRequestDTO - 包含要更新的帳戶設定的資料傳輸物件。
   * @returns 一個 Promise，解析為包含更新後帳戶設定的 AxiosResponse，包裹在 ApiResponseDTO 中。
   * @throws 如果請求失敗，則拋出包含錯誤訊息和 HTTP 狀態碼的錯誤物件。
   *
   * 錯誤處理：
   * - 如果伺服器回應錯誤，則使用回應中的錯誤訊息。
   * - 如果伺服器未提供錯誤訊息，則使用預設訊息 "用戶資料更新失敗"。
   * - 拋出的錯誤中包含 HTTP 狀態碼，若無法取得則預設為 `HttpStatusCode.InternalServerError`。
   */
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

  /**
   * 更新用戶的個人資料設定，透過向伺服器發送 PATCH 請求。
   *
   * @param userProfileRequestDTO - 包含要更新的用戶個人資料設定的資料傳輸物件。
   * @returns 一個 Promise，解析為包含更新後用戶個人資料設定的 AxiosResponse，包裹在 ApiResponseDTO 中。
   * @throws 如果請求失敗，則拋出包含錯誤訊息和 HTTP 狀態碼的錯誤物件。
   *
   * 錯誤處理：
   * - 如果伺服器回應錯誤，則使用回應中的錯誤訊息。
   * - 如果伺服器未提供錯誤訊息，則使用預設訊息 "用戶資料更新失敗"。
   * - 拋出的錯誤中包含 HTTP 狀態碼，若無法取得則預設為 `HttpStatusCode.InternalServerError`。
   */
  async UpdateUserProfileSetting(userProfileRequestDTO: UserProfileResponseDTO): Promise<AxiosResponse<ApiResponseDTO<UserProfileResponseDTO>>> {
    try {
      const response = await axios.patch("/userProfile/updateUserProfile", userProfileRequestDTO);
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
