import { authService } from "@/services/auth.service";
import { type AxiosResponse } from "axios";
import { defineStore } from "pinia";
import type { ApiErrorResponseDTO, ApiResponseDTO } from "pinpin_library";
import router from "@/router";

const useAuthStore = defineStore("auth", {
  state: () => ({
    UserNickname: "",
    IsAuthChecked: false, // 是否已經檢查過驗證狀態
  }),
  actions: {
    SetUser(nickname: string) {
      this.UserNickname = nickname;
      this.IsAuthChecked = true;
    },

    /**
     * 登出會員
     * @returns {Promise<ApiResponseDTO>} - 登出結果
     * @throws {ApiError} - 登出失敗的錯誤訊息
     */
    async Logout(): Promise<ApiResponseDTO> {
      try {
        const response: AxiosResponse<ApiResponseDTO> = await authService.Logout();
        this.UserNickname = "";
        router.push({ name: "home" });
        return {
          message: response.data.message,
          statusCode: response.status,
        };
      } catch (error) {
        return error as ApiErrorResponseDTO;
      }
    },

    async CheckAuthStatus(): Promise<void> {
      if (this.IsAuthChecked) return;
      this.IsAuthChecked = true;

      try {
        this.SetUser(await authService.checkAuthStatus());
      } catch {
        this.UserNickname = "";
      }
    },
  },
});

export { useAuthStore };
