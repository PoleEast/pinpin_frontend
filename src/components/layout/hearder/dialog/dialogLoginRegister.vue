<template>
  <v-dialog v-model="showDialog" max-width="460px">
    <!-- Dialog區塊 -->
    <v-card class="rounded-xl">
      <v-card-title class="text-center pt-8">
        <span class="text-h4 font-weight-bold text-primary d-flex align-center justify-center">
          <font-awesome-icon icon="right-to-bracket" class="mr-3" />
          {{ isLogin ? '登入' : '加入' }} PinPin
        </span>
      </v-card-title>
      <v-card-subtitle class="text-center pt-3">
        <span class="font-weight-bold">{{
          isLogin ? '歡迎來到PinPin，準備規劃您的旅程了嗎?' : '加入PinPin，開始你的旅程規劃吧！'
        }}</span></v-card-subtitle
      >
      <v-card-text>
        <!-- 登入表單 -->
        <v-form v-if="isLogin" @submit.prevent="login" v-model="valid" ref="loginForm">
          <v-container>
            <v-text-field
              v-model="loginFormData.account"
              :rules="accountRules"
              :error-messages="loginErrorMessage"
              label="帳號"
              required
              class="mb-4"
              ><template v-slot:prepend
                ><font-awesome-icon size="2x" icon="person-walking-luggage" /></template
            ></v-text-field>
            <v-text-field
              v-model="loginFormData.password"
              :rules="passwordRules"
              :error-messages="loginErrorMessage"
              label="密碼"
              required
              :type="showPassword ? 'text' : 'password'"
              class="mb-4"
              ><template v-slot:prepend
                ><font-awesome-icon icon="key" size="2x" class="mx-1" /></template
              ><template v-slot:append-inner
                ><font-awesome-icon
                  :icon="showPassword ? 'eye' : 'eye-slash'"
                  @click="showPassword = !showPassword"
                  class="mx-1 cursor-pointer" /></template
            ></v-text-field>
            <v-btn
              color="primary"
              size="large"
              block
              :loading="loading"
              @click="login"
              class="mb-4"
              elevation="1"
            >
              登入
            </v-btn>
            <div class="d-flex align-center mb-4">
              <v-divider></v-divider>
              <span class="mx-3 text-grey">或</span>
              <v-divider></v-divider>
            </div>

            <div class="text-center justify-center align-center d-flex">
              <span class="text-primary">竟然還沒加入我們？</span>
              <v-btn color="secondary" class="px-3 mx-2" @click="isLogin = false">
                立即加入!!
              </v-btn>
            </div>
          </v-container>
        </v-form>
        <!-- 註冊表單 -->
        <v-form v-else @submit.prevent="register" v-model="valid" ref="registerForm">
          <v-container>
            <v-text-field
              v-model="registerFormData.account"
              label="帳號"
              :rules="accountRules"
              required
              class="mb-4"
              :error-messages="registerErrorMessage"
              ><template v-slot:prepend
                ><font-awesome-icon size="2x" icon="person-walking-luggage"
              /></template>
            </v-text-field>
            <v-text-field
              v-model="registerFormData.nickname"
              label="暱稱"
              :rules="nicknameRules"
              required
              class="mb-4"
              ><template v-slot:prepend
                ><font-awesome-icon size="2x" icon="id-card-clip"
              /></template>
            </v-text-field>
            <v-text-field
              :rules="passwordRules"
              v-model="registerFormData.password"
              label="密碼"
              :type="showPassword ? 'text' : 'password'"
              class="mb-4"
              ><template v-slot:prepend
                ><font-awesome-icon icon="key" size="2x" class="mx-1" /></template
              ><template v-slot:append-inner
                ><font-awesome-icon
                  :icon="showPassword ? 'eye' : 'eye-slash'"
                  @click="showPassword = !showPassword"
                  class="mx-1 cursor-pointer"
              /></template>
            </v-text-field>
            <v-text-field
              v-model="registerFormData.confirmPassword"
              label="確認密碼"
              :rules="confirmPasswordRules"
              :type="showPassword ? 'text' : 'password'"
              class="mb-4"
              ><template v-slot:prepend
                ><font-awesome-icon icon="square-check" size="2x" class="mx-1" /></template
            ></v-text-field>
            <v-btn
              color="primary"
              size="large"
              block
              :loading="loading"
              class="mb-4"
              elevation="1"
              type="submit"
            >
              加入
            </v-btn>
            <div class="d-flex align-center mb-4">
              <v-divider></v-divider>
              <span class="mx-3 text-grey">或</span>
              <v-divider></v-divider>
            </div>

            <div class="text-center justify-center align-center d-flex">
              <span class="text-primary">What!?已經有帳號了？</span>
              <v-btn color="secondary" class="px-3 mx-2" @click="isLogin = true">
                立即登入!!
              </v-btn>
            </div>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { authService } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth.store'
import type { RegisterFormData } from '@/types/form.type'
import { HttpStatusCode } from 'axios'
import {
  REGISTER_REQUSER_VALIDATION,
  type ApiErrorResponseDTO,
  type LoginRequestDTO,
  type RegisterRequestDTO,
} from 'pinpin_library'
import { ref, useTemplateRef, watch } from 'vue'

//變數
const registerFormRef = useTemplateRef('registerForm')
const loginFormRef = useTemplateRef('loginForm')
const showPassword = ref<boolean>(false)
const valid = ref<boolean>(false)
const loading = ref<boolean>(false)
const isLogin = ref<boolean>(true)
const registerErrorMessage = ref<string>('')
const loginErrorMessage = ref<string>('')

//獲取狀態的引用
const authStore = useAuthStore()

const showDialog = defineModel<boolean>('showDialog')

defineExpose({
  handleLoginStatus: () => {
    isLogin.value = true
  },
})

const registerFormData = ref<RegisterFormData>({
  account: '',
  nickname: '',
  password: '',
  confirmPassword: '',
})

const loginFormData = ref<LoginRequestDTO>({
  account: '',
  password: '',
})

//驗證規則
const accountRules = [
  (v: string) => v.length > 0 || '請輸入帳號',
  (v: string) =>
    v.length >= REGISTER_REQUSER_VALIDATION.ACCOUNT.MIN_LENGTH ||
    `帳號至少需要${REGISTER_REQUSER_VALIDATION.ACCOUNT.MIN_LENGTH}個字`,
  (v: string) =>
    v.length <= REGISTER_REQUSER_VALIDATION.ACCOUNT.MAX_LENGTH ||
    `帳號最多只能${REGISTER_REQUSER_VALIDATION.ACCOUNT.MAX_LENGTH}個字`,
  (v: string) =>
    v.match(REGISTER_REQUSER_VALIDATION.ACCOUNT.PATTERN) !== null ||
    REGISTER_REQUSER_VALIDATION.ACCOUNT.PATTERN_MESSAGE,
]
const passwordRules = [
  (v: string) => v.length > 0 || '請輸入密碼',
  (v: string) =>
    v.length >= REGISTER_REQUSER_VALIDATION.PASSWORD.MIN_LENGTH ||
    `密碼至少需要${REGISTER_REQUSER_VALIDATION.PASSWORD.MIN_LENGTH}個字`,
  (v: string) =>
    v.length <= REGISTER_REQUSER_VALIDATION.PASSWORD.MAX_LENGTH ||
    `密碼最多只能${REGISTER_REQUSER_VALIDATION.PASSWORD.MAX_LENGTH}個字`,
  (v: string) =>
    v.match(REGISTER_REQUSER_VALIDATION.PASSWORD.PATTERN) !== null ||
    REGISTER_REQUSER_VALIDATION.PASSWORD.PATTERN_MESSAGE,
]
const nicknameRules = [
  (v: string) => v.length > 0 || '請輸入暱稱',
  (v: string) =>
    v.length >= REGISTER_REQUSER_VALIDATION.NICKNAME.MIN_LENGTH ||
    `暱稱至少需要${REGISTER_REQUSER_VALIDATION.NICKNAME.MIN_LENGTH}個字`,
  (v: string) =>
    v.length <= REGISTER_REQUSER_VALIDATION.NICKNAME.MAX_LENGTH ||
    `暱稱最多只能${REGISTER_REQUSER_VALIDATION.NICKNAME.MAX_LENGTH}個字`,
]
const confirmPasswordRules = [
  (v: string) => v.length > 0 || '請輸入確認密碼',
  (v: string) => v === registerFormData.value.password || '密碼不相同',
]

const emit = defineEmits<{ showSnackbar: [message: string, color: string] }>()

//當dialog切換時清空輸入欄位
watch(isLogin, () => {
  registerFormData.value.account = ''
  registerFormData.value.nickname = ''
  registerFormData.value.password = ''
  registerFormData.value.confirmPassword = ''
  loginFormData.value.account = ''
  loginFormData.value.password = ''
  registerErrorMessage.value = ''
  loginErrorMessage.value = ''
})

//方法
//TODO : 實作第三方登入
const login = async () => {
  //清空錯誤訊息
  loginErrorMessage.value = ''

  const isValid = await loginFormRef.value?.validate()

  if (!isValid?.valid) return
  loading.value = true
  try {
    const loginRequest: LoginRequestDTO = {
      account: loginFormData.value.account,
      password: loginFormData.value.password,
    }

    const response = await authService.Login(loginRequest)
    authStore.setUser(response.data?.data?.nickname || '')
    emit('showSnackbar', response.data.message, 'success')
    showDialog.value = false
  } catch (error) {
    const axiosError = error as ApiErrorResponseDTO
    loginErrorMessage.value =
      axiosError.statusCode == HttpStatusCode.Unauthorized ? axiosError.message : ''
    emit('showSnackbar', axiosError.message, 'error')
  } finally {
    loading.value = false
  }
}

//TODO : 實作第三方註冊
/**
 * 註冊
 * @remarks
 * 1. 清空錯誤訊息
 * 2. 檢查form是否通過驗證
 * 3. 如果驗證失敗則return
 * 4. 呼叫authService的register方法
 * 5. 如果註冊成功則showSnackbar
 * 6. 如果註冊失敗則showSnackbar
 * 7. 最後關閉loading
 */
const register = async () => {
  //清空錯誤訊息
  registerErrorMessage.value = ''

  const isValid = await registerFormRef.value?.validate()

  if (!isValid?.valid) return

  loading.value = true

  try {
    const registerRequest: RegisterRequestDTO = {
      account: registerFormData.value.account,
      nickname: registerFormData.value.nickname,
      password: registerFormData.value.password,
    }

    const response = await authService.Register(registerRequest)
    authStore.setUser(response.data.data?.nickname ?? '')
    emit('showSnackbar', response.data.message, 'success')
    showDialog.value = false
  } catch (error) {
    const axiosError = error as ApiErrorResponseDTO
    registerErrorMessage.value =
      axiosError.statusCode == HttpStatusCode.Conflict ? axiosError.message : ''
    emit('showSnackbar', axiosError.message, 'error')
  } finally {
    loading.value = false
  }
}
</script>
