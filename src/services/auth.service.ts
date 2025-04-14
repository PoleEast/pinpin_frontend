import axios, { type AxiosResponse } from "axios";
import type { ApiResponseDTO, LoginResponseDTO, LoginRequestDTO, RegisterRequestDTO } from "pinpin_library";

export const authService = {
  /**
   * 用戶註冊
   * @param {RegisterRequestDTO} data - 註冊資料
   * @returns {Promise<AxiosResponse>} API響應結果
   */
  async Register(data: RegisterRequestDTO): Promise<AxiosResponse> {
    const response = await axios.post("/user/register", data);
    return response;
  },

  /**
   * 用戶登入
   * @param {LoginRequestDTO} data - 登入資料
   * @returns {Promise<AxiosResponse<ApiResponseDTO<LoginResponseDTO>>>} 登入回應結果
   */
  async Login(data: LoginRequestDTO): Promise<AxiosResponse<ApiResponseDTO<LoginResponseDTO>>> {
    const response = await axios.post("/user/login", data);
    return response;
  },

  /**
   * 用戶登出
   * @returns {Promise<AxiosResponse<ApiResponseDTO>>} 登出回應結果
   */
  async Logout(): Promise<AxiosResponse<ApiResponseDTO>> {
    const response = await axios.get("/user/logout");
    return response;
  },

  /**
   * 檢查用戶認證狀態
   * @returns {Promise<string>} 用戶暱稱，未登入則返回空字串
   */
  async checkAuthStatus(): Promise<string> {
    const response: AxiosResponse<ApiResponseDTO<LoginResponseDTO>> = await axios("/user/check-auth");
    return response.data?.data?.nickname || "";
  },
};
