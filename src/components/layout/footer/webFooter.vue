<template>
  <v-footer app color="gray-900" class="px-4 pa-0">
    <span class="text-white">© {{ currentYear }} by PinPinTeam</span>
    <v-spacer />
    <v-btn icon href="https://github.com/PoleEast" target="_blank" rel="noopener noreferrer" variant="plain">
      <font-awesome-icon icon="fa-brands fa-github" size="2x" />
    </v-btn>
  </v-footer>
</template>

<script setup lang="ts">
  const currentYear: number = new Date().getFullYear();
</script>
<style scoped></style>
