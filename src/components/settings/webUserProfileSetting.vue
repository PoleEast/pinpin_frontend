<template>
  <v-container>
    <v-form @submit.prevent="save" v-model="valid" ref="userProfileSettingForm">
      <v-card variant="flat">
        <v-card-item>
          <v-card-title>你的旅遊名片</v-card-title>
          <v-card-subtitle>讓旅伴們認識真實的你!</v-card-subtitle>
          <v-card-text class="px-0">
            <!-- TODO: 這裡要有上傳頭像和背景 -->
            <!-- TODO: 點擊卡片後可以觀看名片 -->
            <!-- TODO: 實作名片功能 -->
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
                      @click="openAvatarEditDialog">
                      <font-awesome-icon icon="pen" size="lg" fixed-width class="text-white" />
                    </v-overlay>
                  </div>
                </v-hover>
              </template>
              <template v-slot:title>
                <v-text-field
                  :variant="nicknameTextIsFocus ? 'filled' : 'plain'"
                  type="title"
                  class="text-no-wrap pa-0 mb-1 user-card-title-input"
                  density="compact"
                  base-color="transparent"
                  :rules="rules.nickname"
                  :hide-details="true"
                  @update:focused="nicknameTextIsFocus = $event"
                  v-model="userProfileSettingFromData.nickname"
                  placeholder="你的暱稱"></v-text-field>
              </template>
              <template v-slot:subtitle>
                <v-text-field
                  base-color="transparent"
                  :variant="bioTextIsFocus ? 'filled' : 'plain'"
                  class="text-no-wrap user-card-subtitle-input zero-padding-input"
                  label="寫下你的人生信條"
                  auto-grow
                  :rules="mottoRules"
                  density="compact"
                  @update:focused="bioTextIsFocus = $event"
                  v-model="userProfileSettingFromData.motto">
                </v-text-field>
              </template>
              <v-card-text>
                <v-textarea
                  label="讓大家更了解你~"
                  class="text-white"
                  variant="filled"
                  base-color="transparent"
                  counter="200"
                  auto-grow
                  @update:focused="mottoTextIsFocus = $event"
                  v-model="userProfileSettingFromData.bio"></v-textarea>
              </v-card-text>
            </v-card>
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
              <template v-slot:prepend><font-awesome-icon icon="signature" size="2x" fixed-width class="text-primary" /></template>
            </v-text-field>
            <v-date-input
              prepend-icon=""
              :rules="birthdayRules"
              v-model="userProfileSettingFromData.birthday"
              label="你的降臨日期"
              :mode-icon="InvertedTriangleIcon"
              :next-icon="RightTriangleIcon"
              :prev-icon="LeftTriangleIcon">
              <template v-slot:prepend><font-awesome-icon icon="calendar-days" size="2x" fixed-width class="text-primary" /></template>
            </v-date-input>
            <v-radio-group v-model="userProfileSettingFromData.gender" :rules="genderRules" label="性別" inline>
              <v-radio color="blue" :value="0" label="男" :false-icon="RadioFalseIcon" :true-icon="RadioTureIcon"></v-radio>
              <v-radio color="pink" :value="1" label="女" :false-icon="RadioFalseIcon" :true-icon="RadioTureIcon"></v-radio>
              <v-radio color="green" :value="2" label="不公開" :false-icon="RadioFalseIcon" :true-icon="RadioTureIcon"></v-radio>
              <template v-slot:prepend><font-awesome-icon icon="venus-mars" size="2x" fixed-width class="text-primary" /></template>
            </v-radio-group>
            <v-text-field
              label="如何連絡你?"
              type="tel"
              placeholder="+886 912-345-678"
              :rules="phoneRules"
              v-model="userProfileSettingFromData.phone">
              <template v-slot:prepend><font-awesome-icon icon="phone" size="2x" fixed-width class="text-primary" /></template>
            </v-text-field>
            <v-select
              label="你來自哪個國家?"
              placeholder="美國"
              v-model="userProfileSettingFromData.originCountry"
              :clear-icon="CloseIcon"
              :items="props.settingData.country"
              item-value="id"
              item-title="local_name">
              <template v-slot:item="{ item, props }">
                <v-list-item v-bind="props" v-ripple>
                  <template v-slot:prepend>
                    <webIconWrapper
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
              <template v-slot:prepend><font-awesome-icon icon="street-view" fixed-width size="2x" class="text-primary" /></template>
            </v-text-field>
          </v-card-text>
        </v-card-item>
        <v-card-item>
          <v-card-title>你的旅行DNA</v-card-title>
          <v-card-subtitle>旅途中的獨特色彩</v-card-subtitle>
          <v-card-text>
            <v-input v-for="(inputChip, index) in inputChips" :key="index">
              <template v-slot:prepend> <font-awesome-icon :icon="inputChip.icon" fixed-width size="2x" class="text-primary mr-4" /></template>
              <template v-slot:default>
                <div>
                  <v-label
                    :text="inputChip.label.text"
                    class="mb-2 d-block"
                    :class="chipGroupErrorMessages[inputChip.type] ? 'text-error font-weight-bold' : ''" />
                  <div v-if="chipGroupErrorMessages[inputChip.type]" class="mt-1 d-flex align-center">
                    <font-awesome-icon icon="xmark" class="text-error mr-1" />
                    <span class="text-error text-body-2">{{ chipGroupErrorMessages[inputChip.type] }}</span>
                  </div>
                  <div class="d-flex flex-wrap gap-2">
                    <v-chip-group column>
                      <v-chip
                        v-for="(chip, index) in inputChip.choosechips"
                        v-ripple
                        :text="chip.text"
                        :key="index"
                        variant="tonal"
                        :close-icon="CloseIcon"
                        closable
                        @click:close="removeUserProfile(chip, inputChip.type)"
                        class="mr-1 mb-1 cursor-default"
                        ><template v-slot:prepend>
                          <webIconWrapper
                            v-if="chip.icon"
                            :icons="chip"
                            class="mr-1"
                            :class="chip.color ? 'text-' + chip.color : 'text-primary'" /></template
                      ></v-chip>
                      <v-chip variant="plain" class="mr-1" v-if="inputChip.nochooseData.length > 0">
                        <template v-slot:append> <font-awesome-icon icon="plus" class="text-primary mr-1" /></template>
                        <v-menu activator="parent" transition="scale-transition" offset-y location="right" max-height="400px" min-height="100px">
                          <v-list density="compact" rounded>
                            <v-list-item
                              v-for="(chip, index) in inputChip.nochooseData"
                              :key="index"
                              v-ripple
                              @click="addUserProfile(chip, inputChip.type)">
                              <template v-slot:prepend>
                                <webIconWrapper
                                  v-if="chip.icon"
                                  :icons="chip"
                                  class="mr-1"
                                  :class="chip.color ? 'text-' + chip.color : 'text-primary'"
                              /></template>
                              <v-list-item-title>{{ chip.text }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </v-chip>
                    </v-chip-group>
                  </div>
                </div>
              </template>
            </v-input>
          </v-card-text>
        </v-card-item>
      </v-card>
      <v-row>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn class="mr-3" color="secondary" size="large" variant="plain">復原</v-btn>
          <v-btn variant="elevated" color="primary" size="large" type="submit">儲存</v-btn>
        </v-col>
      </v-row>
    </v-form>
    <DialogAvatarEdit v-model:show-dialog="showDialog"></DialogAvatarEdit>
  </v-container>
</template>

<script lang="ts" setup>
  import type { IChip, IInputChips, IUserProfileSettingFromData } from "@/interfaces/form.interface";
  import {
    RadioFalseIcon,
    RadioTureIcon,
    CloseIcon,
    InvertedTriangleIcon,
    RightTriangleIcon,
    LeftTriangleIcon,
  } from "@/utils/functionalComponent.utils";
  import { USERPROFILE_REQUSER_VALIDATION, type SettingResponseDTO, type UserProfileResponseDTO } from "pinpin_library";
  import { computed, onMounted, reactive, ref, unref, useTemplateRef, watch } from "vue";
  import webIconWrapper from "../common/webIconWrapper .vue";
  import type { VForm } from "vuetify/components";
  import { ValidationService } from "@/services/validation.service";
  import { createDateFieldRules, createTextFieldRules, validateArrayField } from "@/utils/validators.untils";
  import DialogAvatarEdit from "./dialogAvatarEdit.vue";
  import { useAuthStore } from "@/stores/auth.store";
  import { cloudinaryUrl } from "@/utils/utils.utils";

  //#region 變數

  const props = defineProps<{
    userProfile: UserProfileResponseDTO;
    settingData: SettingResponseDTO;
    isLoading: boolean;
  }>();

  const emits = defineEmits<{
    (e: "update", data: IUserProfileSettingFromData): void;
  }>();

  const userProfileSettingFormRef = useTemplateRef<VForm>("userProfileSettingForm");

  const valid = ref(false);

  const mottoTextIsFocus = ref(false);
  const nicknameTextIsFocus = ref(false);
  const bioTextIsFocus = ref(false);
  const showDialog = ref(false);

  const userProfileSettingFromData = reactive<IUserProfileSettingFromData>({
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

  //#endregion

  //#region 驗證

  const chipGroupErrorMessages = computed(() => ({
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

  const rules = ValidationService.createRules();

  const mottoRules = createTextFieldRules("座右銘", USERPROFILE_REQUSER_VALIDATION.MOTTO.MIN_LENGTH, USERPROFILE_REQUSER_VALIDATION.MOTTO.MAX_LENGTH);

  const reallNameRules = createTextFieldRules(
    "真實身份",
    USERPROFILE_REQUSER_VALIDATION.FULLNAME.MIN_LENGTH,
    USERPROFILE_REQUSER_VALIDATION.FULLNAME.MAX_LENGTH,
  );

  const birthdayRules = createDateFieldRules("降臨日", true);

  const genderRules = [(v: number) => USERPROFILE_REQUSER_VALIDATION.GENDER.VALUES.includes(v) || "請選擇性別"];

  const phoneRules = createTextFieldRules("電話", USERPROFILE_REQUSER_VALIDATION.PHONE.MIN_LENGTH, USERPROFILE_REQUSER_VALIDATION.PHONE.MAX_LENGTH);

  const addressRules = createTextFieldRules(
    "地址",
    USERPROFILE_REQUSER_VALIDATION.ADDRESS.MIN_LENGTH,
    USERPROFILE_REQUSER_VALIDATION.ADDRESS.MAX_LENGTH,
  );

  //#endregion

  //#region 計算屬性

  const visitedCountriesChipsData = computed<IChip[]>(() => {
    return props.settingData.country
      .filter((country) => userProfileSettingFromData.visitedCountries?.includes(country.id))
      .map<IChip>((country) => ({
        id: country.id,
        text: country.local_name,
        icon: country.icon,
        icon_type: country.icon_type,
      }));
  });

  const travelInterestsChipsData = computed<IChip[]>(() => {
    return props.settingData.travelInterest
      .filter((interest) => userProfileSettingFromData.travelInterests?.includes(interest.id))
      .map<IChip>((interest) => ({
        id: interest.id,
        text: interest.name,
        icon: interest.icon,
        icon_type: interest.icon_type,
        color: props.settingData.travelInterestType.find((type) => type.travel_interests.some((i) => i === interest.id))?.color,
      }));
  });

  const travelStylesChipsData = computed<IChip[]>(() => {
    return props.settingData.travelStyle
      .filter((style) => userProfileSettingFromData.travelStyles?.includes(style.id))
      .map<IChip>((style) => ({
        id: style.id,
        text: style.name,
        icon: style.icon,
        icon_type: style.icon_type,
      }));
  });

  const languageChipsData = computed<IChip[]>(() => {
    return props.settingData.language
      .filter((language) => userProfileSettingFromData.languages?.includes(language.id))
      .map<IChip>((language) => ({
        id: language.id,
        text: language.local_name,
      }));
  });

  const currencyChipsData = computed<IChip[]>(() => {
    return props.settingData.currency
      .filter((currency) => userProfileSettingFromData.currencies?.includes(currency.id))
      .map<IChip>((currency) => ({
        id: currency.id,
        text: currency.code,
        icon: currency.icon,
        icon_type: currency.icon_type,
      }));
  });

  const noChooseCountry = computed<IChip[]>(() => {
    return props.settingData.country
      .filter((country) => !userProfileSettingFromData.visitedCountries?.includes(country.id))
      .map<IChip>((country) => ({
        id: country.id,
        text: country.local_name,
        icon: country.icon,
        icon_type: country.icon_type,
      }));
  });

  const noChooseTravelInterest = computed<IChip[]>(() => {
    return props.settingData.travelInterest
      .filter((interest) => !userProfileSettingFromData.travelInterests?.includes(interest.id))
      .map<IChip>((interest) => ({
        id: interest.id,
        text: interest.name,
        icon: interest.icon,
        icon_type: interest.icon_type,
        color: props.settingData.travelInterestType.find((type) => type.travel_interests.some((i) => i === interest.id))?.color,
      }));
  });

  const noChooseTravelStyle = computed<IChip[]>(() => {
    return props.settingData.travelStyle
      .filter((style) => !userProfileSettingFromData.travelStyles?.includes(style.id))
      .map<IChip>((style) => ({
        id: style.id,
        text: style.name,
        icon: style.icon,
        icon_type: style.icon_type,
      }));
  });

  const noChooseLanguage = computed<IChip[]>(() => {
    return props.settingData.language
      .filter((language) => !userProfileSettingFromData.languages?.includes(language.id))
      .map<IChip>((language) => ({
        id: language.id,
        text: language.local_name,
      }));
  });

  const noChooseCurrency = computed<IChip[]>(() => {
    return props.settingData.currency
      .filter((currency) => !userProfileSettingFromData.currencies?.includes(currency.id))
      .map<IChip>((currency) => ({
        id: currency.id,
        text: currency.code,
        icon: currency.icon,
        icon_type: currency.icon_type,
      }));
  });

  const inputChips = computed((): IInputChips[] => [
    {
      icon: "earth-asia",
      label: {
        text: "走過的國家",
      },
      choosechips: unref(visitedCountriesChipsData),
      nochooseData: unref(noChooseCountry),
      type: "visitedCountries",
    },
    {
      icon: "heart",
      label: {
        text: "偏好的旅遊方式",
      },
      choosechips: unref(travelInterestsChipsData),
      nochooseData: unref(noChooseTravelInterest),
      type: "travelInterests",
    },
    {
      icon: "suitcase",
      label: {
        text: "旅行的風格",
      },
      choosechips: unref(travelStylesChipsData),
      nochooseData: unref(noChooseTravelStyle),
      type: "travelStyles",
    },
    {
      icon: "language",
      label: {
        text: "使用的語言",
      },
      choosechips: unref(languageChipsData),
      nochooseData: unref(noChooseLanguage),
      type: "languages",
    },
    {
      icon: "coins",
      label: {
        text: "使用的貨幣",
      },
      choosechips: unref(currencyChipsData),
      nochooseData: unref(noChooseCurrency),
      type: "currencies",
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
    userProfileSettingFromData.motto = props.userProfile.motto;
    userProfileSettingFromData.bio = props.userProfile.bio;
    userProfileSettingFromData.fullname = props.userProfile.fullname;
    userProfileSettingFromData.nickname = props.userProfile.nickname;
    userProfileSettingFromData.isFullNameVisible = props.userProfile.isFullNameVisible;
    userProfileSettingFromData.avatar_public_id = props.userProfile.avatar;
    userProfileSettingFromData.coverPhoto = props.userProfile.coverPhoto;
    userProfileSettingFromData.birthday = props.userProfile.birthday;
    userProfileSettingFromData.gender = props.userProfile.gender;
    userProfileSettingFromData.phone = props.userProfile.phone;
    userProfileSettingFromData.address = props.userProfile.address;
    userProfileSettingFromData.originCountry = props.userProfile.originCountry;
    userProfileSettingFromData.visitedCountries = props.userProfile.visitedCountries;
    userProfileSettingFromData.travelInterests = props.userProfile.travelInterests;
    userProfileSettingFromData.travelStyles = props.userProfile.travelStyles;
    userProfileSettingFromData.languages = props.userProfile.languages;
    userProfileSettingFromData.currencies = props.userProfile.currencies;
  };

  /**
   * 將一個Chip加入IInputChips的choosechips中。
   *
   * @param {IChip} chip - 要加入的Chip。
   * @param {IInputChips} inputChipType - IInputChips物件。
   */
  const addUserProfile = (
    chip: IChip,
    inputChipType: keyof Pick<
      typeof userProfileSettingFromData,
      "visitedCountries" | "languages" | "currencies" | "travelInterests" | "travelStyles"
    >,
  ) => {
    if (chip.id === undefined || !userProfileSettingFromData[inputChipType]) return;
    userProfileSettingFromData[inputChipType]?.push(chip.id);
  };

  /**
   * 刪除用戶個人資料中的一個選擇。
   *
   * @param {IChip} chip - 要刪除的Chip。
   * @param {IInputChips} inputChipType - IInputChips物件。
   */
  const removeUserProfile = (
    chip: IChip,
    inputChipType: keyof Pick<
      typeof userProfileSettingFromData,
      "visitedCountries" | "languages" | "currencies" | "travelInterests" | "travelStyles"
    >,
  ) => {
    if (chip.id === undefined || !userProfileSettingFromData[inputChipType]) return;
    userProfileSettingFromData[inputChipType] = userProfileSettingFromData[inputChipType]?.filter((id) => id !== chip.id);
  };

  /**
   * 儲存用戶個人資料設置。
   *
   * 此函數在用戶提交表單時被調用，首先驗證表單數據，
   * 如果驗證成功，則觸發 "update" 事件並傳遞用戶個人資料設置數據。
   */
  const save = () => {
    userProfileSettingFormRef.value?.validate();
    const chipValidation = Object.values(chipGroupErrorMessages.value).every((error) => error === undefined);
    if (!valid.value || !chipValidation) return;

    emits("update", userProfileSettingFromData);
  };

  const openAvatarEditDialog = () => {
    showDialog.value = true;
  };

  //#endregion

  onMounted(() => {
    resetForm();
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
