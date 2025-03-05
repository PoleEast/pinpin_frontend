import { useSnackbarStore } from "@/stores/snackbar.store";
import axios from "axios";
import type { ApiErrorResponseDTO } from "pinpin_library";

axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

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
    let errorMessage = "發生未知錯誤";

    if (!error.response) {
      errorMessage = "網絡連接失敗，請檢查網絡設置";
    } else if (error.code === "ECONNABORTED") {
      errorMessage = "請求超時，請稍後再試";
    } else if (error.response.status >= 500) {
      errorMessage = "伺服器錯誤，請稍後再試";
    } else {
      const axiosError = error as { response: { data: ApiErrorResponseDTO } };
      errorMessage = axiosError.response.data.message;
    }

    const snackbar = {
      timeout: 2000,
      message: errorMessage,
      color: "error",
    };

    useSnackbarStore().PushSnackbar(snackbar);

    return Promise.reject(error);
  },
);
