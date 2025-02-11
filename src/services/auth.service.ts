import axios, { AxiosError, HttpStatusCode, type AxiosResponse } from 'axios'
import type {
  ApiErrorResponseDTO,
  ApiResponseDTO,
  AuthResponseDTO,
  LoginRequestDTO,
  RegisterRequestDTO,
} from 'pinpin_library'

export const authService = {
  /**
   * 註冊會員
   * @param {RegisterUser} data - 註冊資料
   * @returns {Promise<ApiResponse<RegisterUserResponse>>} - 註冊結果
   * @throws {ApiError} - 註冊失敗的錯誤訊息
   */
  async Register(
    data: RegisterRequestDTO,
  ): Promise<AxiosResponse<ApiResponseDTO<AuthResponseDTO>>> {
    try {
      const response = await axios.post('/auth/register', data)
      return response
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponseDTO>
      throw {
        message: axiosError.response?.data?.message || '註冊失敗，請稍後再試',
        HttpStatusCode: axiosError.response?.status || HttpStatusCode.InternalServerError,
      }
    }
  },

  /**
   * 登入會員
   * @param {LoginUser} data - 登入資料
   * @returns {Promise<ApiResponse<LoginUserResponse>>} - 登入結果
   * @throws {ApiError} - 登入失敗的錯誤訊息
   */
  async Login(data: LoginRequestDTO): Promise<AxiosResponse<ApiResponseDTO<AuthResponseDTO>>> {
    try {
      const response = await axios.post('/auth/login', data)
      return response
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponseDTO>
      throw {
        message: axiosError.response?.data?.message || '登入失敗，請稍後再試',
        HttpStatusCode: axiosError.response?.status || HttpStatusCode.InternalServerError,
      }
    }
  },

  async Logout(): Promise<AxiosResponse<ApiResponseDTO>> {
    try {
      const response = await axios.get('/auth/logout')
      return response
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponseDTO>
      throw {
        message: axiosError.response?.data?.message || '登出失敗，請稍後再試',
        HttpStatusCode: axiosError.response?.status || HttpStatusCode.InternalServerError,
      }
    }
  },
}
