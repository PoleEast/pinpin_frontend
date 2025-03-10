<template>
  <v-container>
    <v-form>
      <v-card
        v-for="group in inputList"
        :key="group.title"
        variant="flat"
        :loading="props.isLoading"
        class="mb-4">
        <v-card-title class="px-1">{{ group.title }}</v-card-title>
        <v-card-text class="pa-0">
          <v-row>
            <v-col
              v-for="input in group.textFields"
              :key="input.label"
              cols="12">
              <v-text-field
                :label="input.label"
                :type="input.type"
                :required="input.required"
                :placeholder="input.placeholder"
                :rules="input.rule"
                :readonly="input.readonly"
                :hint="input.hint"
                outlined
                clearable
                color="primary"
                ><template v-slot:prepend
                  ><font-awesome-icon
                    :icon="input.icon"
                    size="2x"
                    class="mx-1 text-primary" /></template
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <p class="text-body-2">老碰友，您於{{ userProfile?.user?.createAt }}加入PinPin，我們已經認識{{ daysSinceJoining }}天了</p>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
  import type { IFromBlock } from "@/interfaces/form.interface";
  import { REGISTER_REQUSER_VALIDATION, type UserProfileResponseDTO } from "pinpin_library";
  import { computed } from "vue";

  const props = defineProps<{
    isLoading: boolean;
    userProfile: UserProfileResponseDTO;
  }>();

  const passwordRules = [
    (v: string) => v?.length > 0 || "請輸入密碼",
    (v: string) =>
      v?.length >= REGISTER_REQUSER_VALIDATION.PASSWORD.MIN_LENGTH || `密碼至少需要${REGISTER_REQUSER_VALIDATION.PASSWORD.MIN_LENGTH}個字`,
    (v: string) =>
      v?.length <= REGISTER_REQUSER_VALIDATION.PASSWORD.MAX_LENGTH || `密碼最多只能${REGISTER_REQUSER_VALIDATION.PASSWORD.MAX_LENGTH}個字`,
    (v: string) => v.match(REGISTER_REQUSER_VALIDATION.PASSWORD.PATTERN) !== null || REGISTER_REQUSER_VALIDATION.PASSWORD.PATTERN_MESSAGE,
  ];

  const daysSinceJoining = computed(() => {
    if (props.userProfile?.user?.createAt === undefined) return 0;

    const joinTime = new Date(props.userProfile?.user?.createAt).getTime();
    const currentTime = new Date().getTime();
    return Math.floor((currentTime - joinTime) / (1000 * 60 * 60 * 24));
  });

  const inputList = computed<IFromBlock[]>(() => [
    {
      title: "帳號資訊",
      textFields: [
        {
          label: "帳號",
          model: props.userProfile?.user?.account,
          required: true,
          icon: "person-walking-luggage",
          readonly: true,
          hint: "帳號無法更改",
        },
        {
          label: "電子郵件",
          model: props.userProfile?.user?.email,
          type: "email",
          placeholder: "superman@gmail.com",
          icon: "envelope",
        },
      ],
    },
    {
      title: "更改密碼",
      textFields: [
        {
          label: "新密碼",
          model: props.userProfile?.user?.password,
          type: "password",
          rule: passwordRules,
          icon: "key",
        },
        {
          label: "確認新密碼",
          model: "confirmPassword",
          type: "password",
          icon: "square-check",
        },
      ],
    },
  ]);
</script>
