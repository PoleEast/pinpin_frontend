<template>
  <v-container>
    <v-form @submit.prevent="save" v-model="valid" ref="userProfileSettingForm">
      <v-card variant="flat">
        <v-card-item>
          <v-card-title>你的旅遊名片</v-card-title>
          <v-card-subtitle>讓旅伴們認識真實的你!</v-card-subtitle>
          <v-card-text class="px-0">
            <!-- TODO: 這裡要有上傳背景 -->
            <!-- TODO: 點擊卡片後可以觀看名片 -->
            <!-- TODO: 實作名片功能 -->
            <TravelerBusinessCard
              :image-url="imageUrl"
              v-model:nickname="userProfileSettingFromData.nickname"
              v-model:motto="userProfileSettingFromData.motto"
              v-model:bio="userProfileSettingFromData.bio"
              :nickname-rules="nicknameRules"
              :motto-rules="mottoRules"
              :bio-rules="bioRules"
              v-model:valid="TravelerBusinessCardValid"
              @avatarClick="openAvatarEditDialog" />
          </v-card-text>
          <!-- 暱稱、頭像、背景、簡介、座右銘 -->
        </v-card-item>
        <v-card-item>
          <v-card-title>旅人基本資料</v-card-title>
          <v-card-subtitle>與你同行前的必知小事</v-card-subtitle>
          <v-card-text>
            <v-text-field
              label="真實身份"
              :rules="reallNameRules"
              type="text"
              placeholder="克拉克·肯特"
              v-model="userProfileSettingFromData.fullname">
              <template v-slot:prepend>
                <font-awesome-icon icon="signature" size="2x" fixed-width class="text-primary" />
              </template>
            </v-text-field>
            <v-date-input
              prepend-icon=""
              :rules="birthdayRules"
              v-model="userProfileSettingFromData.birthday"
              label="你的降臨日期"
              :mode-icon="createTriangleIcon('down')"
              :next-icon="createTriangleIcon('right')"
              :prev-icon="createTriangleIcon('left')">
              <template v-slot:prepend>
                <font-awesome-icon
                  icon="calendar-days"
                  size="2x"
                  fixed-width
                  class="text-primary" />
              </template>
            </v-date-input>
            <v-radio-group
              v-model="userProfileSettingFromData.gender"
              :rules="genderRules"
              label="性別"
              inline>
              <v-radio
                v-for="option in genderOptions"
                :key="option.value"
                :color="option.color"
                :value="option.value"
                :label="option.label"
                :false-icon="createRadioIcon('false')"
                :true-icon="createRadioIcon('true')"></v-radio>
              <template v-slot:prepend>
                <font-awesome-icon icon="venus-mars" size="2x" fixed-width class="text-primary" />
              </template>
            </v-radio-group>
            <v-text-field
              label="如何連絡你?"
              type="tel"
              placeholder="+886 912-345-678"
              :rules="phoneRules"
              v-model="userProfileSettingFromData.phone">
              <template v-slot:prepend>
                <font-awesome-icon icon="phone" size="2x" fixed-width class="text-primary" />
              </template>
            </v-text-field>
            <v-select
              label="你來自哪個國家?"
              placeholder="美國"
              v-model="userProfileSettingFromData.originCountry"
              :clear-icon="createPredefinedIcon('close')"
              :items="props.settingData.country"
              item-value="id"
              item-title="local_name">
              <template v-slot:item="{ item, props }">
                <v-list-item v-bind="props" v-ripple>
                  <template v-slot:prepend>
                    <AppIconWrapper
                      :icons="{
                        icon_type: item.raw.icon_type || 'flag',
                        icon: item.raw.icon || '',
                      }"
                      class="text-primary mr-1" />
                  </template>
                </v-list-item>
              </template>
              <template v-slot:prepend>
                <font-awesome-icon icon="location-dot" size="2x" fixed-width class="text-primary" />
              </template>
            </v-select>
            <v-text-field
              label="哪裡能夠找到你?"
              type="text"
              placeholder="最大的公園"
              :rules="addressRules"
              v-model="userProfileSettingFromData.address">
              <template v-slot:prepend>
                <font-awesome-icon icon="street-view" fixed-width size="2x" class="text-primary" />
              </template>
            </v-text-field>
          </v-card-text>
        </v-card-item>
        <v-card-item>
          <v-card-title>你的旅行DNA</v-card-title>
          <v-card-subtitle>旅途中的獨特色彩</v-card-subtitle>
          <v-card-text>
            <ChipSelector
              v-for="chipSelector in ChipSelectors"
              :key="chipSelector.type"
              :chip-group-key="chipSelector.type"
              :icon="chipSelector.icon"
              :label="chipSelector.label.text"
              :selected-chips="chipSelector.choosechips"
              :available-chips="chipSelector.nochooseData"
              :error-message="chipSelector.errorMessage"
              @add="addUserProfile"
              @remove="removeUserProfile"></ChipSelector>
          </v-card-text>
        </v-card-item>
      </v-card>
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <!-- TODO:實作復原btn -->
          <v-btn class="mr-3" color="secondary" size="large" variant="plain">復原</v-btn>
          <v-btn variant="elevated" color="primary" size="large" :loading="isLoading" type="submit">
            儲存
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <AvatarEditDialog v-model:show-dialog="showDialog"></AvatarEditDialog>
  </v-container>
</template>

<script lang="ts" setup>
  //#region import

  import { computed, onMounted, reactive, ref, toRef, useTemplateRef, watch } from "vue";

  //components
  import AppIconWrapper from "@/components/ui/AppIconWrapper.vue";
  import AvatarEditDialog from "./AvatarEditDialog.vue";
  import ChipSelector from "@/components/ui/ChipSelector.vue";
  import TravelerBusinessCard from "./TravelerBusinessCard.vue";

  //validation
  import { profileValidationRules } from "./profileValidationRules.js";

  //services
  import {
    cloudinaryUrl,
    createTriangleIcon,
    createRadioIcon,
    createPredefinedIcon,
    validateArrayField,
  } from "@/utils";
  import { useAuthStore } from "@/stores";
  import { useChipSelection } from "@/composables/useChipSelection.js";

  //types
  import type { VForm } from "vuetify/components";
  import {
    USERPROFILE_REQUSER_VALIDATION,
    type SettingResponse,
    type UserProfileResponse,
  } from "pinpin_library";
  import type { Chip, InputChips, UserProfileSettingFromData } from "@/interfaces";

  //#endregion

  //#region 變數

  const props = defineProps<{
    userProfile: UserProfileResponse;
    settingData: SettingResponse;
    isLoading: boolean;
  }>();

  const emits = defineEmits<{
    (e: "update", data: UserProfileSettingFromData): void;
  }>();

  type chipGroupKey = keyof Pick<
    typeof userProfileSettingFromData,
    "visitedCountries" | "languages" | "currencies" | "travelInterests" | "travelStyles"
  >;

  const valid = ref(false);
  const TravelerBusinessCardValid = ref(false);
  const showDialog = ref(false);

  const userProfileSettingFormRef = useTemplateRef<VForm>("userProfileSettingForm");
  const userProfileSettingFromData = reactive<UserProfileSettingFromData>({
    motto: "",
    bio: "",
    fullname: "",
    nickname: "",
    isFullNameVisible: false,
    avatar_public_id: "",
    coverPhoto: "",
    birthday: undefined,
    gender: undefined,
    phone: "",
    address: "",
    originCountry: undefined,
    visitedCountries: [],
    languages: [],
    currencies: [],
    travelInterests: [],
    travelStyles: [],
  });

  const genderOptions = [
    { value: 0, label: "男", color: "blue" },
    { value: 1, label: "女", color: "pink" },
    { value: 2, label: "不公開", color: "green" },
  ];

  //#region 驗證

  const inputChipErrorMessage = computed(() => ({
    visitedCountries: validateArrayField(
      userProfileSettingFromData.visitedCountries ?? [],
      "走過的國家",
      USERPROFILE_REQUSER_VALIDATION.VISITEDCOUNTRIES.MIN_LENGTH,
      USERPROFILE_REQUSER_VALIDATION.VISITEDCOUNTRIES.MAX_LENGTH,
      props.settingData.country.map((country) => country.id),
    ),
    languages: validateArrayField(
      userProfileSettingFromData.languages ?? [],
      "使用的語言",
      USERPROFILE_REQUSER_VALIDATION.LANGUAGES.MIN_LENGTH,
      USERPROFILE_REQUSER_VALIDATION.LANGUAGES.MAX_LENGTH,
      props.settingData.language.map((language) => language.id),
    ),
    travelStyles: validateArrayField(
      userProfileSettingFromData.travelStyles ?? [],
      "旅行的風格",
      USERPROFILE_REQUSER_VALIDATION.TRAVELSTYLES.MIN_LENGTH,
      USERPROFILE_REQUSER_VALIDATION.TRAVELSTYLES.MAX_LENGTH,
      props.settingData.travelStyle.map((style) => style.id),
    ),
    travelInterests: validateArrayField(
      userProfileSettingFromData.travelInterests ?? [],
      "偏好的旅遊方式",
      USERPROFILE_REQUSER_VALIDATION.TRAVELINTERESTS.MIN_LENGTH,
      USERPROFILE_REQUSER_VALIDATION.TRAVELINTERESTS.MAX_LENGTH,
      props.settingData.travelInterest.map((interest) => interest.id),
    ),
    currencies: validateArrayField(
      userProfileSettingFromData.currencies ?? [],
      "使用的貨幣",
      USERPROFILE_REQUSER_VALIDATION.CURRENCIES.MIN_LENGTH,
      USERPROFILE_REQUSER_VALIDATION.CURRENCIES.MAX_LENGTH,
      props.settingData.currency.map((currency) => currency.id),
    ),
  }));

  const mottoRules = profileValidationRules.motto;
  const reallNameRules = profileValidationRules.realName;
  const birthdayRules = profileValidationRules.birthday;
  const genderRules = profileValidationRules.gender;
  const phoneRules = profileValidationRules.phone;
  const addressRules = profileValidationRules.address;
  const nicknameRules = profileValidationRules.nickname;
  const bioRules = profileValidationRules.bio;

  //#endregion

  //#region 計算屬性

  const { selected: visitedCountriesChipsData, available: noChooseCountry } = useChipSelection(
    props.settingData.country,
    toRef(() => userProfileSettingFromData.visitedCountries ?? []),
    (country) => ({
      id: country.id,
      text: country.local_name,
      icon: country.icon,
      icon_type: country.icon_type,
    }),
  );

  const { selected: travelInterestsChipsData, available: noChooseTravelInterest } =
    useChipSelection(
      props.settingData.travelInterest,
      toRef(() => userProfileSettingFromData.travelInterests ?? []),
      (interest) => ({
        id: interest.id,
        text: interest.name,
        icon: interest.icon,
        icon_type: interest.icon_type,
        color: props.settingData.travelInterestType.find((type) =>
          type.travel_interests.some((i) => i === interest.id),
        )?.color,
      }),
    );

  const { selected: travelStylesChipsData, available: noChooseTravelStyle } = useChipSelection(
    props.settingData.travelStyle,
    toRef(() => userProfileSettingFromData.travelStyles ?? []),
    (style) => ({
      id: style.id,
      text: style.name,
      icon: style.icon,
      icon_type: style.icon_type,
    }),
  );

  const { selected: languageChipsData, available: noChooseLanguage } = useChipSelection(
    props.settingData.language,
    toRef(() => userProfileSettingFromData.languages ?? []),
    (language) => ({
      id: language.id,
      text: language.local_name,
    }),
  );

  const { selected: currencyChipsData, available: noChooseCurrency } = useChipSelection(
    props.settingData.currency,
    toRef(() => userProfileSettingFromData.currencies ?? []),
    (currency) => ({
      id: currency.id,
      text: currency.code,
      icon: currency.icon,
      icon_type: currency.icon_type,
    }),
  );

  //TODO:新增旅遊風格詳細資料
  const ChipSelectors = computed((): InputChips<chipGroupKey>[] => [
    {
      icon: "earth-asia",
      label: {
        text: "走過的國家",
      },
      choosechips: visitedCountriesChipsData.value,
      nochooseData: noChooseCountry.value,
      type: "visitedCountries",
      errorMessage: inputChipErrorMessage.value.visitedCountries,
    },
    {
      icon: "heart",
      label: {
        text: "偏好的旅遊方式",
      },
      choosechips: travelInterestsChipsData.value,
      nochooseData: noChooseTravelInterest.value,
      type: "travelInterests",
      errorMessage: inputChipErrorMessage.value.travelInterests,
    },
    {
      icon: "suitcase",
      label: {
        text: "旅行的風格",
      },
      choosechips: travelStylesChipsData.value,
      nochooseData: noChooseTravelStyle.value,
      type: "travelStyles",
      errorMessage: inputChipErrorMessage.value.travelStyles,
    },
    {
      icon: "language",
      label: {
        text: "使用的語言",
      },
      choosechips: languageChipsData.value,
      nochooseData: noChooseLanguage.value,
      type: "languages",
      errorMessage: inputChipErrorMessage.value.languages,
    },
    {
      icon: "coins",
      label: {
        text: "使用的貨幣",
      },
      choosechips: currencyChipsData.value,
      nochooseData: noChooseCurrency.value,
      type: "currencies",
      errorMessage: inputChipErrorMessage.value.currencies,
    },
  ]);

  const imageUrl = computed(() => {
    const avatarPublicId = `${useAuthStore().AvatarPublicId}`;
    const transformString = "h_100,w_100";

    return cloudinaryUrl(avatarPublicId, transformString);
  });

  watch(
    () => props.userProfile,
    () => {
      resetForm();
    },
  );

  //#endregion

  //#region 函數

  /**
   * 重置用戶個人資料表單數據。
   *
   * 此函數將用戶個人資料表單的數據重置為當前屬性中提供的用戶資料。
   * 它會將 `userProfileSettingFromData` 的每個屬性設置為 `props.userProfile` 中對應的值。
   */

  const resetForm = () => {
    const { avatar, ...profileData } = props.userProfile;
    Object.assign(userProfileSettingFromData, profileData);
    userProfileSettingFromData.avatar_public_id = avatar?.public_id;
  };

  /**
   * 將一個Chip加入IInputChips的choosechips中。
   *
   * @param {Chip} chip - 要加入的Chip。
   * @param {InputChips} inputChipType - IInputChips物件。
   */
  const addUserProfile = (chip: Chip, inputChipType: chipGroupKey) => {
    if (chip.id === undefined || !userProfileSettingFromData[inputChipType]) return;
    userProfileSettingFromData[inputChipType]?.push(chip.id);
  };

  /**
   * 刪除用戶個人資料中的一個選擇。
   *
   * @param {Chip} chip - 要刪除的Chip。
   * @param {InputChips} inputChipType - IInputChips物件。
   */
  const removeUserProfile = (chip: Chip, inputChipType: chipGroupKey) => {
    if (chip.id === undefined || !userProfileSettingFromData[inputChipType]) return;
    userProfileSettingFromData[inputChipType] = userProfileSettingFromData[inputChipType]?.filter(
      (id) => id !== chip.id,
    );
  };

  /**
   * 儲存用戶個人資料設置。
   *
   * 此函數在用戶提交表單時被調用，首先驗證表單數據，
   * 如果驗證成功，則觸發 "update" 事件並傳遞用戶個人資料設置數據。
   */
  const save = () => {
    userProfileSettingFormRef.value?.validate();
    const chipValidation = Object.values(inputChipErrorMessage.value).every(
      (msg) => msg === undefined,
    );

    if (!valid.value || !chipValidation || !TravelerBusinessCardValid.value) return;

    emits("update", userProfileSettingFromData);
  };

  /**
   * 開啟頭像編輯Dialog。
   */
  const openAvatarEditDialog = () => {
    showDialog.value = true;
  };

  //#endregion

  onMounted(() => {
    resetForm();
  });
</script>
