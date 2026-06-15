<template>
  <v-input>
    <template v-slot:prepend>
      <font-awesome-icon :icon="icon" fixed-width size="2x" class="text-primary mr-4" />
    </template>
    <template v-slot:default>
      <div>
        <v-label
          :text="label"
          class="mb-2 d-block"
          :class="errorMessage ? 'text-error font-weight-bold' : ''" />
        <div v-if="errorMessage" class="mt-1 d-flex align-center">
          <font-awesome-icon icon="xmark" class="text-error mr-1" />
          <span class="text-error text-body-2">
            {{ errorMessage }}
          </span>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <v-chip
            v-for="chip in selectedChips"
            v-ripple
            :text="chip.text"
            :key="chip.id"
            variant="tonal"
            :close-icon="createPredefinedIcon('close')"
            closable
            @click:close="$emit('remove', chip, chipGroupKey)"
            class="mr-1 mb-1 cursor-default">
            <template v-slot:prepend>
              <AppIconWrapper
                v-if="chip.icon"
                :icons="chip"
                class="mr-1"
                :class="chip.color ? 'text-' + chip.color : 'text-primary'" />
            </template>
          </v-chip>
          <v-chip variant="plain" class="mr-1" v-if="availableChips.length > 0">
            <template v-slot:append>
              <font-awesome-icon icon="plus" class="text-primary mr-1" />
            </template>
            <v-menu
              activator="parent"
              transition="scale-transition"
              offset-y
              location="right"
              max-height="400px"
              min-height="100px">
              <v-list density="compact" rounded>
                <v-list-item
                  v-for="(chip, index) in availableChips"
                  :key="index"
                  v-ripple
                  @click="$emit('add', chip, chipGroupKey)">
                  <template v-slot:prepend>
                    <AppIconWrapper
                      v-if="chip.icon"
                      :icons="chip"
                      class="mr-1"
                      :class="chip.color ? 'text-' + chip.color : 'text-primary'" />
                  </template>
                  <v-list-item-title>
                    {{ chip.text }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-chip>
        </div>
      </div>
    </template>
  </v-input>
</template>

<script lang="ts" generic="T" setup>
  import type { Chip } from "@/interfaces";
  import AppIconWrapper from "@/components/ui/AppIconWrapper.vue";
  import { createPredefinedIcon } from "@/utils/functionalComponent.utils";

  defineProps<{
    icon: string;
    label: string;
    selectedChips: Chip[];
    availableChips: Chip[];
    errorMessage: string | undefined;
    chipGroupKey: T;
  }>();

  defineEmits<{
    remove: [chip: Chip, chipGroupKey: T];
    add: [chip: Chip, chipGroupKey: T];
  }>();
</script>
