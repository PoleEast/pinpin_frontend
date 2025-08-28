<template>
  <v-table striped="even">
    <thead>
      <tr>
        <th v-for="title in titleStringArray" :key="title">{{ title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, rowIndex) in props.items" :key="rowIndex">
        <td v-for="(value, colIndex) in Object.values(item)" :key="colIndex">{{ value ?? "" }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
<script setup lang="ts" generic="T extends Record<string, string | number>">
  import { computed } from "vue";

  const props = defineProps<{
    items: T[];
  }>();

  const titleStringArray = computed<string[]>(() => {
    if (props.items.length === 0) return [];

    return Object.keys(props.items[0]);
  });
</script>
