import { useAuthStore } from "@/stores/auth.store";
import { useSnackbarStore } from "@/stores/snackbar.store";
import axios from "axios";
import type { ApiErrorResponse } from "pinpin_library";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

// 在模組層級快取 store 實例，避免在攔截器中重複實例化
let authStore: ReturnType<typeof useAuthStore>;
let snackbarStore: ReturnType<typeof useSnackbarStore>;

//req攔截器
axios.interceptors.request.use(
  (config) => {
    //帶上Token
    config.withCredentials = true;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // 延遲初始化 store 實例，避免在模組載入時過早實例化
    if (!authStore) authStore = useAuthStore();
    if (!snackbarStore) snackbarStore = useSnackbarStore();

    let errorMessage = "發生未知錯誤";

    if (!error.response) {
      errorMessage = "網絡連接失敗，請檢查網絡設置";
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "請求超時，請稍後再試";
    } else if (error.response.status >= 500) {
      errorMessage = "伺服器錯誤，請稍後再試";
    } else if (error.response.status === 401) {
      if (authStore.UserNickname !== "") {
        authStore.Logout();
        errorMessage = "登入已經過期，請重新登入";
      } else {
        return Promise.reject(error);
      }
    } else {
      const axiosError = error as { response: { data: ApiErrorResponse } };
      errorMessage = axiosError.response.data.message;
    }

    const snackbar = {
      timeout: 2000,
      message: errorMessage,
      color: "error",
    };

    snackbarStore.PushSnackbar(snackbar);

    return Promise.reject(error);
  },
);
