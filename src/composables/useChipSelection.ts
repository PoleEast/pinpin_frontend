import type { Chip } from "@/interfaces";
import { computed, type Ref } from "vue";

/**
 * 將數據源分類為已選和可選的 chips，專用於 ChipSelector 組件
 *
 * 這個 composable 接收原始數據陣列和已選項目的 ID 陣列，
 * 自動將數據分類為兩組響應式的 chip 陣列：
 * - selected: 包含在 selectedIds 中的項目
 * - available: 不包含在 selectedIds 中的項目
 *
 * @template T - 原始數據項目的型別，必須包含 id 屬性
 * @param sourceData - 完整的原始數據陣列
 * @param selectedIds - 已選項目的 ID 陣列（響應式引用）
 * @param mapper - 將原始數據項目轉換為 Chip 格式的轉換函數
 * @returns 包含 selected 和 available 兩個響應式 computed 的物件
 */
export const useChipSelection = <T extends { id: number }>(
  sourceData: T[],
  selectedIds: Ref<number[]>,
  mapper: (item: T) => Chip,
) => {
  const selectionData = computed(() => {
    const allChips = sourceData.map(mapper);
    const selectedSet = new Set(selectedIds.value);

    const selected: Chip[] = [];
    const available: Chip[] = [];

    allChips.forEach((chip) => {
      if (selectedSet.has(chip.id!)) {
        selected.push(chip);
      } else {
        available.push(chip);
      }
    });

    return { selected, available };
  });

  return {
    selected: computed(() => selectionData.value.selected),
    available: computed(() => selectionData.value.available),
  };
};
