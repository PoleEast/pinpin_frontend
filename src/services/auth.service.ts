import axios, { AxiosError, HttpStatusCode } from 'axios'
import type {
  ApiErrorResponseDTO,
  ApiResponseDTO,
  RegisterRequestDTO,
  RegisterResponseDTO,
} from 'pinpin_library'

export const authService = {
  /**
   * 註冊會員
   * @param {RegisterUser} data - 註冊資料
   * @returns {Promise<ApiResponse<RegisterUserResponse>>} - 註冊結果
   * @throws {ApiError} - 註冊失敗的錯誤訊息
   */
  async register(data: RegisterRequestDTO): Promise<ApiResponseDTO<RegisterResponseDTO>> {
    try {
      const response: ApiResponseDTO<RegisterResponseDTO> = await axios.post('/auth/register', data)
      return response
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponseDTO>
      throw {
        message: axiosError.response?.data?.message || '註冊失敗，請稍後再試',
        HttpStatusCode: axiosError.response?.status || HttpStatusCode.InternalServerError,
      }
    }
  },
}
