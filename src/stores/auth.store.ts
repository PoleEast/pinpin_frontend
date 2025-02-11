import { authService } from '@/services/auth.service'
import type { LogoutResult } from '@/types/auth.type'
import { type AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { ApiErrorResponseDTO, ApiResponseDTO } from 'pinpin_library'

const useAuthStore = defineStore('auth', {
  state: () => ({
    userNickname: '',
    isAuthenticated: false,
  }),
  actions: {
    setUser(userNickname: string) {
      this.userNickname = userNickname
      this.isAuthenticated = !!userNickname
    },

    async logout(): Promise<LogoutResult> {
      try {
        const response: AxiosResponse<ApiResponseDTO> = await authService.Logout()
        this.userNickname = ''
        this.isAuthenticated = false
        return {
          message: response.data.message,
          result: true,
        }
      } catch (error) {
        const axiosError = error as ApiErrorResponseDTO
        return {
          message: axiosError.message || '登出失敗，請稍後再試',
          result: false,
        }
      }
    },
  },
})

export { useAuthStore }
