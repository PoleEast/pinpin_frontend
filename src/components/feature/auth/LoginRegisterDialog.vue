<template>
  <v-dialog v-model="showDialog" max-width="460px">
    <!-- Dialog區塊 -->
    <v-card class="rounded-xl">
      <v-card-title class="text-center pt-8">
        <span class="text-h4 font-weight-bold text-primary d-flex align-center justify-center">
          <font-awesome-icon icon="right-to-bracket" class="mr-3" />
          {{ isLogin ? "登入" : "加入" }} PinPin
        </span>
      </v-card-title>
      <v-card-subtitle class="text-center pt-3">
        <span class="font-weight-bold">{{
          isLogin ? "歡迎來到PinPin，準備規劃您的旅程了嗎?" : "加入PinPin，開始你的旅程規劃吧！"
        }}</span></v-card-subtitle
      >
      <v-card-text>
        <!-- 登入表單 -->
        <v-form v-if="isLogin" @submit.prevent="login" v-model="valid" ref="loginForm">
          <v-container>
            <v-text-field
              v-model="loginFormData.account"
              :rules="rules.account"
              :error-messages="loginErrorMessage"
              label="帳號"
              required
              class="mb-4"
              ><template v-slot:prepend><font-awesome-icon size="2x" icon="person-walking-luggage" /></template
            ></v-text-field>
            <v-text-field
              v-model="loginFormData.password"
              :rules="rules.password(true)"
              :error-messages="loginErrorMessage"
              label="密碼"
              required
              :type="showPassword ? 'text' : 'password'"
              class="mb-4"
              ><template v-slot:prepend><font-awesome-icon icon="key" size="2x" class="mx-1" /></template
              ><template v-slot:append-inner
                ><font-awesome-icon
                  :icon="showPassword ? 'eye' : 'eye-slash'"
                  @click="showPassword = !showPassword"
                  class="mx-1 cursor-pointer" /></template
            ></v-text-field>
            <v-btn color="primary" size="large" block :loading="loading" type="submit" class="mb-4" elevation="1"> 登入 </v-btn>
            <div class="d-flex align-center mb-4">
              <v-divider></v-divider>
              <span class="mx-3 text-grey">或</span>
              <v-divider></v-divider>
            </div>

            <div class="text-center justify-center align-center d-flex">
              <span class="text-primary">竟然還沒加入我們？</span>
              <v-btn color="secondary" class="px-3 mx-2" @click="isLogin = false"> 立即加入!! </v-btn>
            </div>
          </v-container>
        </v-form>
        <!-- 註冊表單 -->
        <v-form v-else @submit.prevent="register" v-model="valid" ref="registerForm">
          <v-container>
            <v-text-field
              v-model="registerFormData.account"
              label="帳號"
              :rules="rules.account"
              required
              class="mb-4"
              :error-messages="registerErrorMessage">
              <template v-slot:prepend><font-awesome-icon size="2x" icon="person-walking-luggage" /></template>
            </v-text-field>
            <v-text-field v-model="registerFormData.nickname" label="暱稱" :rules="rules.nickname" required class="mb-4"
              ><template v-slot:prepend><font-awesome-icon size="2x" icon="id-card-clip" /></template>
            </v-text-field>
            <v-text-field
              :rules="rules.password(true)"
              v-model="registerFormData.password"
              label="密碼"
              :type="showPassword ? 'text' : 'password'"
              class="mb-4"
              ><template v-slot:prepend><font-awesome-icon icon="key" size="2x" class="mx-1" /></template
              ><template v-slot:append-inner
                ><font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" @click="showPassword = !showPassword" class="mx-1 cursor-pointer"
              /></template>
            </v-text-field>
            <v-text-field
              v-model="registerFormData.confirmPassword"
              label="確認密碼"
              :rules="confirmPasswordRules"
              :type="showPassword ? 'text' : 'password'"
              class="mb-4"
              ><template v-slot:prepend><font-awesome-icon icon="square-check" size="2x" class="mx-1" /></template
            ></v-text-field>
            <v-btn color="primary" size="large" block :loading="loading" class="mb-4" elevation="1" type="submit"> 加入 </v-btn>
            <div class="d-flex align-center mb-4">
              <v-divider></v-divider>
              <span class="mx-3 text-grey">或</span>
              <v-divider></v-divider>
            </div>

            <div class="text-center justify-center align-center d-flex">
              <span class="text-primary">What!?已經有帳號了？</span>
              <v-btn color="secondary" class="px-3 mx-2" @click="isLogin = true"> 立即登入!! </v-btn>
            </div>
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  //#region import
  import { reactive, ref, useTemplateRef, watch } from "vue";
  import { AxiosError, HttpStatusCode } from "axios";

  //services
  import { authService, ValidationService } from "@/services";
  import { useAuthStore } from "@/stores";

  //types
  import type { VForm } from "vuetify/components";
  import type { IRegisterFormData, Isnackbar } from "@/interfaces";
  import { type ApiResponseDTO, type LoginRequestDTO, type RegisterRequestDTO } from "pinpin_library";
  //#endregion;

  //#region variable
  const registerFormRef = useTemplateRef<VForm>("registerForm");
  const loginFormRef = useTemplateRef<VForm>("loginForm");
  const showPassword = ref<boolean>(false);
  const valid = ref<boolean>(false);
  const loading = ref<boolean>(false);
  const isLogin = ref<boolean>(true);
  const registerErrorMessage = ref<string>("");
  const loginErrorMessage = ref<string>("");

  const authStore = useAuthStore();
  const showDialog = defineModel<boolean>("showDialog");
  const emit = defineEmits<{ showSnackbar: [snackbar: Isnackbar] }>();

  defineExpose({
    handleLoginStatus: () => {
      isLogin.value = true;
    },
  });

  const registerFormData = reactive<IRegisterFormData>({
    account: "",
    nickname: "",
    password: "",
    confirmPassword: "",
  });

  const loginFormData = reactive<LoginRequestDTO>({
    account: "",
    password: "",
  });

  //#region 驗證規則

  const rules = ValidationService.createRules();
  const confirmPasswordRules = [(v: string) => v.length > 0 || "請輸入確認密碼", (v: string) => v === registerFormData.password || "密碼不相同"];

  //#endregion 驗證規則

  //#endregion

  //#region function
  //TODO : 實作第三方登入
  const login = async () => {
    //清空錯誤訊息
    loginErrorMessage.value = "";

    const isValid = await loginFormRef.value?.validate();

    if (!isValid?.valid) return;
    loading.value = true;
    try {
      const loginRequest: LoginRequestDTO = {
        account: loginFormData.account,
        password: loginFormData.password,
      };

      const response = await authService.Login(loginRequest);
      authStore.SetUser(response.data?.data?.nickname || "", response.data?.data?.avatar_public_id || "");
      const snackbar = {
        timeout: 2000,
        message: response.data.message,
        color: "success",
      };
      emit("showSnackbar", snackbar);
      clearFromData();
      showDialog.value = false;
    } catch (error) {
      const apiError = error as AxiosError<ApiResponseDTO>;
      loginErrorMessage.value = apiError.status == HttpStatusCode.Unauthorized ? (apiError.response?.data.message ?? "") : "";
    } finally {
      loading.value = false;
    }
  };

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
    registerErrorMessage.value = "";

    const isValid = await registerFormRef.value?.validate();

    if (!isValid?.valid) return;

    loading.value = true;

    try {
      const registerRequest: RegisterRequestDTO = {
        account: registerFormData.account,
        nickname: registerFormData.nickname,
        password: registerFormData.password,
      };

      const response = await authService.Register(registerRequest);
      authStore.SetUser(response.data.data?.nickname ?? "", response.data.data?.avatar_public_id ?? "");
      const snackbar = {
        timeout: 2000,
        message: response.data.message,
        color: "success",
      };
      clearFromData();
      emit("showSnackbar", snackbar);
      showDialog.value = false;
    } catch (error) {
      const apiError = error as AxiosError<ApiResponseDTO>;
      loginErrorMessage.value = apiError.status == HttpStatusCode.Unauthorized ? (apiError.response?.data.message ?? "") : "";
    } finally {
      loading.value = false;
    }
  };

  const clearFromData = () => {
    registerFormData.account = "";
    registerFormData.nickname = "";
    registerFormData.password = "";
    registerFormData.confirmPassword = "";
    loginFormData.account = "";
    loginFormData.password = "";
    registerErrorMessage.value = "";
    loginErrorMessage.value = "";
  };

  //#endregion

  //當dialog切換時清空輸入欄位
  watch(isLogin, () => {
    clearFromData();
  });
</script>
