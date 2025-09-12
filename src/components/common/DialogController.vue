<template>
  <v-dialog v-model="isShowDialog">
    <keep-alive>
      <component
        :is="components[currentComponentIndex].component"
        v-bind="components[currentComponentIndex].props" />
    </keep-alive>

    <!-- 組件小於2時顯示切換按鈕 -->
    <v-fab
      v-if="isExactlyTwoComponents"
      location="bottom right"
      app
      :icon="nextComponentIcon"
      :color="components[currentComponentIndex].color ?? 'info'"
      size="large"
      @click="switchDialog()"></v-fab>

    <!-- 組件大於2時顯示撥號選單 -->
    <v-speed-dial v-else>
      <template #activator="{ props: activatorProps }">
        <v-fab
          v-bind="activatorProps"
          position="relative"
          app
          color="info"
          :icon="createPredefinedIcon('threePoints')"
          size="large"></v-fab>
      </template>

      <!-- 每個組件對應的按鈕 -->
      <v-btn
        v-for="(component, index) in components"
        :key="index"
        :icon="component.icon"
        :color="component.color ?? 'info'"
        @click="switchDialog(index)"></v-btn>
    </v-speed-dial>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { computed, ref, watchEffect } from "vue";
  import { createPredefinedIcon } from "@/utils";
  import type { DialogComponent } from "@/interfaces";

  const currentComponentIndex = ref(0);

  const isExactlyTwoComponents = computed(() => {
    return props.components.length === 2;
  });

  const nextComponentIcon = computed(
    () => props.components[(currentComponentIndex.value + 1) % props.components.length].icon,
  );

  const props = defineProps<{
    components: DialogComponent[];
  }>();

  const isShowDialog = defineModel<boolean>({ required: true });

  // 切換組件：可指定索引或循環切換
  const switchDialog = (index?: number) => {
    currentComponentIndex.value =
      index !== undefined ? index : (currentComponentIndex.value + 1) % props.components.length;
  };

  watchEffect(() => {
    if (props.components.length < 1) {
      console.warn("DialogSwitcher: 至少需要一個組件");
    }
  });
</script>
