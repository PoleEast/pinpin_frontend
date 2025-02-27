<template>
  <v-container>
    <v-form>
      <v-card
        v-for="group in inputList"
        :key="group.title"
        variant="flat"
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
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
  import type { IFromBlock } from "@/interfaces/form.interface";
  import { REGISTER_REQUSER_VALIDATION, type AccountRequestDTO } from "pinpin_library";
  import { ref, type Ref } from "vue";

  const passwordRules = [
    (v: string) => v.length > 0 || "請輸入密碼",
    (v: string) =>
      v.length >= REGISTER_REQUSER_VALIDATION.PASSWORD.MIN_LENGTH || `密碼至少需要${REGISTER_REQUSER_VALIDATION.PASSWORD.MIN_LENGTH}個字`,
    (v: string) =>
      v.length <= REGISTER_REQUSER_VALIDATION.PASSWORD.MAX_LENGTH || `密碼最多只能${REGISTER_REQUSER_VALIDATION.PASSWORD.MAX_LENGTH}個字`,
    (v: string) => v.match(REGISTER_REQUSER_VALIDATION.PASSWORD.PATTERN) !== null || REGISTER_REQUSER_VALIDATION.PASSWORD.PATTERN_MESSAGE,
  ];

  const accountDto: Ref<AccountRequestDTO> = ref({
    account: "",
    email: "",
    password: "",
  });

  const inputList: Ref<IFromBlock[]> = ref([
    {
      title: "帳號資訊",
      textFields: [
        {
          label: "帳號",
          model: accountDto.value.account,
          required: true,
          icon: "person-walking-luggage",
          readonly: true,
          hint: "帳號無法更改",
        },
        {
          label: "電子郵件",
          model: accountDto.value.email,
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
          model: accountDto.value.password,
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
