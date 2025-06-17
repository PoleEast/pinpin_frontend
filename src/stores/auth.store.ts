import { authService } from "@/services";
import { type AxiosResponse } from "axios";
import { defineStore } from "pinia";
import type { ApiErrorResponseDTO, ApiResponseDTO } from "pinpin_library";
import router from "@/router";

const useAuthStore = defineStore("auth", {
  state: () => ({
    UserNickname: "",
    AvatarPublicId: "",
    IsAuthChecked: false, // 是否已經檢查過驗證狀態
  }),
  actions: {
    SetUser(nickname: string, avatarPublicId: string) {
      this.UserNickname = nickname;
      this.AvatarPublicId = avatarPublicId;
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
        this.AvatarPublicId = "";
        router.push({ name: "home" });
        return {
          message: response.data.message,
          statusCode: response.status,
        };
      } catch (error) {
        return error as ApiErrorResponseDTO;
      }
    },

    /**
     * 檢查驗證狀態
     * - 如果已經登入，則將 nickname 和 avatar_public_id 設置到 store
     * - 如果未登入，則清除 nickname 和 avatar_public_id
     *
     * @returns {Promise<void>}
     */
    async CheckAuthStatus(): Promise<void> {
      if (this.IsAuthChecked) return;
      this.IsAuthChecked = true;

      try {
        const response = await authService.checkAuthStatus();
        this.SetUser(response?.nickname || "", response?.avatar_public_id || "");
      } catch {
        this.UserNickname = "";
        this.AvatarPublicId = "";
      }
    },
  },
});

export { useAuthStore };
