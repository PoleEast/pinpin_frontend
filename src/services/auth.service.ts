import axios, { type AxiosResponse } from "axios";
import { axiosLockManager } from "../utils";
import type { ApiResponse, LoginResponse, LoginRequest, RegisterRequest } from "pinpin_library";

export const authService = {
  /**
   * 用戶註冊
   * @param {RegisterRequest} data - 註冊資料
   * @returns {Promise<AxiosResponse>} API響應結果
   */
  async Register(data: RegisterRequest): Promise<AxiosResponse> {
    return await axiosLockManager.withLock("Register", async () => {
      const response = await axios.post("/user/register", data);
      return response;
    });
  },

  /**
   * 用戶登入
   * @param {LoginRequest} data - 登入資料
   * @returns {Promise<AxiosResponse<ApiResponse<LoginResponse>>>} 登入回應結果
   */
  async Login(data: LoginRequest): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
    return await axiosLockManager.withLock("Login", async () => {
      const response = await axios.post("/user/login", data);
      return response;
    });
  },

  /**
   * 用戶登出
   * @returns {Promise<AxiosResponse<ApiResponse>>} 登出回應結果
   */
  async Logout(): Promise<AxiosResponse<ApiResponse>> {
    return await axiosLockManager.withLock("Logout", async () => {
      const response = await axios.get("/user/logout");
      return response;
    });
  },

  /**
   * 檢查用戶授權狀態
   * @returns {Promise<LoginResponse | undefined>} 用戶登入回應資料或未定義
   */

  async checkAuthStatus(): Promise<LoginResponse | undefined> {
    const response: AxiosResponse<ApiResponse<LoginResponse>> = await axios("/user/check-auth");
    return response?.data?.data;
  },
};
