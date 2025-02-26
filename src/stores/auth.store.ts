import { authService } from "@/services/auth.service";
import type { LogoutResult } from "@/types/auth.type";
import { type AxiosResponse } from "axios";
import { defineStore } from "pinia";
import type { ApiErrorResponseDTO, ApiResponseDTO } from "pinpin_library";

const useAuthStore = defineStore("auth", {
  state: () => ({
    UserNickname: "",
    IsForcedNavigation: false,
  }),
  actions: {
    /**
     * 設定使用者 nickname
     * @param userNickname 使用者 nickname
     */
    SetUser(userNickname: string) {
      this.UserNickname = userNickname;
    },

    /**
     * 登出會員
     * @returns {Promise<LogoutResult>} - 登出結果
     * @throws {ApiError} - 登出失敗的錯誤訊息
     */
    async Logout(): Promise<LogoutResult> {
      try {
        const response: AxiosResponse<ApiResponseDTO> = await authService.Logout();
        this.UserNickname = "";
        return {
          message: response.data.message,
          result: true,
        };
      } catch (error) {
        const axiosError = error as ApiErrorResponseDTO;
        return {
          message: axiosError.message || "登出失敗，請稍後再試",
          result: false,
        };
      }
    },

    /**
     * 設定是否為強制導航
     * @param forcedNavigation - 是否強制導航
     */
    SetForcedNavigation(forcedNavigation: boolean) {
      this.IsForcedNavigation = forcedNavigation;
    },
  },
});

export { useAuthStore as useAuthStore };
