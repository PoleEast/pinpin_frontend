<template>
  <v-container>
    <v-form @submit.prevent="save" v-model="valid" ref="accountSettingsForm">
      <v-card variant="flat">
        <v-card-item v-for="group in inputList" :key="group.title" variant="flat" :loading="props.isLoading" class="mb-4">
          <v-card-title class="px-1">{{ group.title }}</v-card-title>
          <v-card-text class="pa-0">
            <v-row>
              <v-col v-for="input in group.textFields" :key="input.label" cols="12">
                <v-text-field
                  :label="input.label"
                  :type="input.type"
                  :required="input.required"
                  :placeholder="input.placeholder"
                  :rules="input.rule"
                  :readonly="input.readonly"
                  :hint="input.hint"
                  v-model="accountSettingsFormData[input.model as keyof IAccountSettingFormData]"
                  outlined
                  clearable
                  color="primary"
                  ><template v-slot:prepend><font-awesome-icon :icon="input.icon" size="2x" class="mx-1 text-primary" /></template
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card-item>

        <v-card-item>
          <v-row>
            <v-col cols="12" md="8">
              <v-chip draggable color="primary" variant="outlined" class="mr-3 mb-3"> 老碰友，您於{{ formattedJoinDate }}加入PinPin </v-chip>
              <v-spacer />
              <v-chip draggable color="secondary" variant="outlined" class="mb-3"> 我們已經認識{{ daysSinceJoining }}天了 </v-chip>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-card-actions>
                <v-btn class="mr-3" color="secondary" size="large" variant="plain" @click="resetForm">復原</v-btn>
                <v-btn variant="elevated" color="primary" size="large" type="submit" :loading="isLoading">儲存</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-form>
  </v-container>
</template>
<script lang="ts" setup>
  import type { IAccountSettingFormData, IFromBlock } from "@/interfaces/form.interface";
  import { ValidationService } from "@/services/validation.service";
  import { type UserProfileResponseDTO } from "pinpin_library";
  import { computed, onMounted, reactive, ref, useTemplateRef, watch, type Ref } from "vue";
  import type { VForm } from "vuetify/components";

  //#region 變數

  const props = defineProps<{
    isLoading: boolean;
    userProfile: UserProfileResponseDTO;
  }>();
  const emits = defineEmits<{
    (e: "update", data: IAccountSettingFormData): void;
  }>();
  const accountSettingsFormData = reactive<IAccountSettingFormData>({
    account: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const show = ref(false);
  const rules = ValidationService.createRules();

  const createAt: Ref<Date | null> = ref(null);
  const confirmPasswordRules = [(v: string) => v === accountSettingsFormData.password || "密碼不一致"];
  const inputList: IFromBlock[] = [
    {
      title: "帳號資訊",
      textFields: [
        {
          label: "帳號",
          model: "account",
          type: "text",
          required: true,
          icon: "person-walking-luggage",
          readonly: true,
          hint: "帳號無法更改",
        },
        {
          label: "電子郵件",
          model: "email",
          type: "email",
          rule: rules.email,
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
          model: "password",
          type: "password",
          rule: rules.password,
          icon: "key",
        },
        {
          label: "確認新密碼",
          model: "confirmPassword",
          type: show.value ? "text" : "password",
          rule: confirmPasswordRules,
          icon: "square-check",
        },
      ],
    },
  ];
  const valid = ref(false);
  const accountSettingsFormRef = useTemplateRef<VForm>("accountSettingsForm");

  //#endregion

  //計算時間
  const formattedJoinDate = computed(() => {
    return createAt.value !== null && createAt.value !== undefined ? createAt.value.toLocaleDateString() : "未知日期";
  });

  const daysSinceJoining = computed(() => {
    if (createAt.value === null || createAt.value === undefined) return 0;

    const joinTime = new Date(createAt.value).getTime();
    const currentTime = new Date().getTime();
    return Math.floor((currentTime - joinTime) / (1000 * 60 * 60 * 24));
  });

  watch(
    () => props.userProfile,
    () => {
      resetForm();
    },
  );

  const resetForm = () => {
    accountSettingsFormData.account = props.userProfile?.user?.account ?? "";
    accountSettingsFormData.email = props.userProfile?.user?.email ?? "";
    accountSettingsFormData.password = "";
    accountSettingsFormData.confirmPassword = "";
    createAt.value = props.userProfile?.user?.createAt ?? null;
  };

  const save = () => {
    accountSettingsFormRef.value?.validate();
    if (!valid.value) return;

    emits("update", accountSettingsFormData);
  };

  onMounted(() => {
    resetForm();
  });
</script>
