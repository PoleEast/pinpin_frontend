<template>
  <v-snackbar v-model="isVisible" :timeout="currentSnackbar?.timeout" :color="currentSnackbar?.color" @update:model-value="handleVisibilityChange">
    {{ currentSnackbar?.message }}
    <template v-slot:actions>
      <v-btn variant="text" @click="closeSnackbar"> 關閉 </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from "vue";
  import { useSnackbarStore } from "@/stores/snackbar.store";

  const snackbarStore = useSnackbarStore();
  const isVisible = ref(false);

  const currentSnackbar = computed(() => (snackbarStore.queue.length > 0 ? snackbarStore.queue[0] : null));

  // 當隊列中有新項目時，顯示snackbar
  watch(
    () => snackbarStore.queue.length,
    (newLength, oldLength) => {
      if (newLength > 0 && oldLength === 0) {
        isVisible.value = true;
      }
    },
    { immediate: true },
  );

  function handleVisibilityChange(value: boolean) {
    if (!value && currentSnackbar.value) {
      snackbarStore.ShiftSnackbar();

      // 如果隊列中還有項目，繼續顯示下一個
      if (snackbarStore.queue.length > 0) {
        setTimeout(() => {
          isVisible.value = true;
        }, 300);
      }
    }
  }

  function closeSnackbar() {
    isVisible.value = false;
  }
</script>
