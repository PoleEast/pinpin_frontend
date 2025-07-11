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

  async GetTextSearchLocation(
    keyword: string,
    priceLevel?: string[],
    primaryType: string = "",
    nextPageToken: string = "",
    pageSize: number = 12,
  ): Promise<AxiosResponse<ApiResponseDTO<IsearchLocationResponseDTO>>> {
    return await axiosLockManager.withLock(
      "GetTextSearchLocation",
      async () => {
        const response: AxiosResponse<ApiResponseDTO<IsearchLocationResponseDTO>> = await axios.get(`/searchLocation/textSearchLocation/${keyword}`, {
          params: {
            priceLevel: priceLevel,
            primaryType: primaryType,
            nextPageToken: nextPageToken,
            pageSize: pageSize,
          },
        });
        return response;
      },
      false,
    );
  },
};
