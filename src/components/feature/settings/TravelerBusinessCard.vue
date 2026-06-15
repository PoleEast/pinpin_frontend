<template>
  <v-card class="text-white" hover image="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
    <template v-slot:prepend>
      <v-hover v-slot="{ isHovering, props: hoverProps }">
        <div v-bind="hoverProps" class="position-relative mr-1">
          <v-avatar size="100" :image="imageUrl"></v-avatar>
          <v-overlay
            :model-value="!!isHovering"
            class="align-center justify-center rounded-circle"
            scrim="#000000"
            contained
            @click="$emit('avatarClick')">
            <font-awesome-icon icon="pen" size="lg" fixed-width class="text-white" />
          </v-overlay>
        </div>
      </v-hover>
    </template>
    <template v-slot:title>
      <v-text-field
        ref="nicknameFieldRef"
        :variant="nicknameTextIsFocus ? 'filled' : 'plain'"
        @update:model-value="check()"
        type="title"
        class="text-no-wrap pa-0 mb-1 user-card-title-input"
        density="compact"
        base-color="transparent"
        :rules="nicknameRules"
        @update:focused="nicknameTextIsFocus = $event"
        v-model="nickname"
        placeholder="你的暱稱"></v-text-field>
    </template>
    <template v-slot:subtitle>
      <v-text-field
        ref="mottoFieldRef"
        v-model="motto"
        base-color="transparent"
        :variant="mottoTextIsFocus ? 'filled' : 'plain'"
        class="text-no-wrap user-card-subtitle-input zero-padding-input"
        auto-grow
        :rules="mottoRules"
        density="compact"
        @update:focused="mottoTextIsFocus = $event"
        @update:model-value="check()"></v-text-field>
    </template>
    <v-card-text>
      <v-textarea
        ref="bioFieldRef"
        label="讓大家更了解你~"
        class="text-white"
        variant="filled"
        base-color="transparent"
        counter="200"
        :rules="bioRules"
        auto-grow
        v-model="bio"
        @update:model-value="check()"></v-textarea>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";
  import { VTextarea, type VTextField } from "vuetify/components";

  defineProps<{
    imageUrl: string;
    nicknameRules: ((v: string) => boolean | string)[];
    mottoRules: ((v: string) => boolean | string)[];
    bioRules: ((v: string) => boolean | string)[];
  }>();

  defineEmits<{
    (e: "avatarClick"): void;
  }>();

  const nickname = defineModel<string>("nickname");
  const motto = defineModel<string>("motto");
  const bio = defineModel<string>("bio");
  const valid = defineModel<boolean>("valid");

  const nicknameTextIsFocus = ref(false);
  const mottoTextIsFocus = ref(false);

  const nicknameFieldRef = ref<VTextField>();
  const mottoFieldRef = ref<VTextField>();
  const bioFieldRef = ref<VTextarea>();

  const check = () => {
    const result = [
      nicknameFieldRef.value?.isValid,
      mottoFieldRef.value?.isValid,
      bioFieldRef.value?.isValid,
    ];

    valid.value = result.every((r) => r === true);
  };

  onMounted(() => {
    check();
  });
</script>
<style scoped>
  .user-card-title-input :deep(input) {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0;
  }

  .user-card-subtitle-input :deep(input) {
    font-style: italic;
  }

  .zero-padding-input :deep(input) {
    padding: 0;
  }
</style>
