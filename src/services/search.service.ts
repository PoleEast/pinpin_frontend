import type { ITextSearchOption } from "@/interfaces";
import { axiosLockManager } from "@/utils";
import axios, { type AxiosResponse } from "axios";
import type { ApiResponseDTO, autoCompletResponseeDTO, IsearchLocationResponseDTO } from "pinpin_library";

export const searchService = {
  /**
   * 取得自動完成的結果(並不會有重複呼叫錯誤訊息但會擋)
   * @param keyword 關鍵字
   * @param sessionToken  Google Places API 的 session token
   * @param primaryTypes  地點類型
   * @returns  自動完成的結果
   */
  async GetAutoComplete(
    keyword: string,
    sessionToken?: string,
    primaryTypes?: string[],
  ): Promise<AxiosResponse<ApiResponseDTO<autoCompletResponseeDTO[]>>> {
    return await axiosLockManager.withLock(
      "GetAutoComplete",
      async () => {
        const response: AxiosResponse<ApiResponseDTO<autoCompletResponseeDTO[]>> = await axios.get(`/searchLocation/autoComplete/${keyword}`, {
          params: {
            sessionToken: sessionToken,
            primaryTypes: primaryTypes,
          },
        });
        return response;
      },
      false,
    );
  },

  async GetTextSearchLocation(options: ITextSearchOption): Promise<AxiosResponse<ApiResponseDTO<IsearchLocationResponseDTO>>> {
    return await axiosLockManager.withLock(
      "GetTextSearchLocation",
      async () => {
        const response: AxiosResponse<ApiResponseDTO<IsearchLocationResponseDTO>> = await axios.get(
          `/searchLocation/textSearchLocation/${options.keyword}`,
          {
            params: {
              priceLevel: options?.priceLevel || [],
              primaryType: options?.primaryType || "",
              nextPageToken: options?.nextPageToken || "",
              pageSize: options?.pageSize || 12,
              maxImageHeight: options?.maxImageHeight || 200,
            },
          },
        );
        return response;
      },
      false,
    );
  },
};
