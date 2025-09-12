<template>
  <font-awesome-icon
    v-if="icons && icons.icon_type === 'fontawesome'"
    fixed-width
    :icon="icons.icon" />
  <icon-flag v-else-if="icons && icons.icon" :icon="icons.icon" />
</template>

<script setup lang="ts">
  defineProps<{
    icons: { icon_type?: string; icon?: string } | null;
  }>();
</script>
