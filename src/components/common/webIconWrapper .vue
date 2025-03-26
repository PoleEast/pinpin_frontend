<template>
  <font-awesome-icon v-if="chip.icon_type == 'fontawesome'" :icon="chip.icon" />
  <icon-flag v-else :icon="chip.icon"></icon-flag>
</template>

<script setup lang="ts">
  import type { IChip } from "@/interfaces/form.interface";

  defineProps<{ chip: IChip }>();
</script>
