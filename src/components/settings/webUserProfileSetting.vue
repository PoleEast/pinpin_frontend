<template>
  <v-container>
    <v-form>
      <v-card variant="flat">
        <v-card-item>
          <v-card-title>你的旅遊名片</v-card-title>
          <v-card-subtitle>讓旅伴們認識真實的你!</v-card-subtitle>
          <v-card-text class="px-0">
            <v-card title="超人" class="text-white" hover image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg">
              <template v-slot:prepend>
                <v-avatar size="100" image="https://randomuser.me/api/portraits/women/85.jpg"></v-avatar>
              </template>
              <template v-slot:subtitle
                ><v-text-field variant="plain" class="text-no-wrap pa-0" density="compact" model-value="我每天都在工作，不然就是躺平"> </v-text-field
              ></template>
              <v-card-text>
                <v-textarea
                  label="關於你"
                  class="text-white"
                  variant="filled"
                  base-color="transparent"
                  counter="200"
                  auto-grow
                  @update:focused="mottoTextIsFocus = $event"
                  model-value="熱愛探索未知角落的冒險家，擅長結交各地朋友，喜歡體驗在地文化與美食。無論城市或鄉村，總能找到獨特風景，記錄每段旅途的美好回憶。"></v-textarea>
              </v-card-text>
            </v-card>
          </v-card-text>
          <!-- 暱稱、頭像、背景、簡介、座右銘 -->
        </v-card-item>
        <v-card-item>
          <v-card-title>旅人基本資料</v-card-title>
          <v-card-subtitle>與你同行前的必知小事</v-card-subtitle>
          <v-card-text>
            <v-text-field label="真實身份" type="text" placeholder="克拉克·肯特" v-model="userProfileSettingFromData.fullname">
              <template v-slot:prepend><font-awesome-icon icon="signature" size="2x" fixed-width class="text-primary" /></template>
            </v-text-field>
            <v-date-input prepend-icon="" label="你的降臨日期"
              ><template v-slot:prepend><font-awesome-icon icon="calendar-days" size="2x" fixed-width class="text-primary" /></template
            ></v-date-input>
            <v-radio-group v-model="userProfileSettingFromData.gender" label="性別" inline>
              <v-radio color="blue" value="0" label="男" :false-icon="RadioFalseIcon" :true-icon="RadioTureIcon"></v-radio>
              <v-radio color="pink" value="1" label="女" :false-icon="RadioFalseIcon" :true-icon="RadioTureIcon"></v-radio>
              <v-radio color="green" value="2" label="不公開" :false-icon="RadioFalseIcon" :true-icon="RadioTureIcon"></v-radio>
              <template v-slot:prepend><font-awesome-icon icon="venus-mars" size="2x" fixed-width class="text-primary" /></template>
            </v-radio-group>
            <v-text-field label="如何連絡你?" type="tel" placeholder="+886 912-345-678" v-model="userProfileSettingFromData.phone">
              <template v-slot:prepend><font-awesome-icon icon="phone" size="2x" fixed-width class="text-primary" /></template>
            </v-text-field>
            <v-text-field label="你來自哪個國家?" type="text" placeholder="美國" v-model="userProfileSettingFromData.originCountry">
              <template v-slot:prepend><font-awesome-icon icon="location-dot" size="2x" fixed-width class="text-primary" /></template
            ></v-text-field>
            <v-text-field label="你來自哪裡?" type="text" placeholder="克利普頓星" v-model="userProfileSettingFromData.address">
              <template v-slot:prepend><font-awesome-icon icon="location-dot" fixed-width size="2x" class="text-primary" /></template>
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
                  <v-label :text="inputChip.label.text" class="mb-2 d-block" />
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
                        ><template v-slot:prepend> <webIconWrapper v-if="chip.icon" :chip="chip" class="text-primary mr-1" /></template
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
                              <template v-slot:prepend> <webIconWrapper v-if="chip.icon" :chip="chip" class="text-primary mr-1" /></template>
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
  </v-container>
</template>

<script lang="ts" setup>
  import type { IChip, IInputChips, IUserProfileSettingFromData } from "@/interfaces/form.interface";
  import { RadioFalseIcon, RadioTureIcon, CloseIcon } from "@/utils/functionalComponent.utils";
  import type { SettingResponseDTO, UserProfileResponseDTO } from "pinpin_library";
  import { computed, onMounted, reactive, ref, unref, watch } from "vue";
  import webIconWrapper from "../common/webIconWrapper .vue";

  //#region 變數

  const props = defineProps<{
    userProfile: UserProfileResponseDTO;
    settingData: SettingResponseDTO;
    isLoading: boolean;
  }>();

  const mottoTextIsFocus = ref(false);

  const userProfileSettingFromData = reactive<IUserProfileSettingFromData>({
    motto: "",
    bio: "",
    fullname: "",
    nickname: "",
    isFullNameVisible: false,
    avatar: "",
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

  const inputChips = computed((): IInputChips[] => [
    {
      icon: "earth-asia",
      label: {
        text: "走過的國家",
      },
      choosechips: unref(visitedCountriesChipsData),
      nochooseData: unref(noChooseCountry),
      type: "country",
    },
    {
      icon: "heart",
      label: {
        text: "偏好的旅遊方式",
      },
      choosechips: unref(travelInterestsChipsData),
      nochooseData: unref(noChooseTravelInterest),
      type: "travelInterest",
    },
    {
      icon: "suitcase",
      label: {
        text: "旅行的風格",
      },
      choosechips: unref(travelStylesChipsData),
      nochooseData: unref(noChooseTravelStyle),
      type: "travelStyle",
    },
    {
      icon: "language",
      label: {
        text: "使用的語言",
      },
      choosechips: unref(languageChipsData),
      nochooseData: unref(noChooseLanguage),
      type: "language",
    },
    {
      icon: "coins",
      label: {
        text: "使用的貨幣",
      },
      choosechips: unref(currencyChipsData),
      nochooseData: unref(noChooseCurrency),
      type: "currency",
    },
  ]);

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
    userProfileSettingFromData.avatar = props.userProfile.avatar;
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
   * @param {IInputChips} inputChip - IInputChips物件。
   */
  const addUserProfile = (chip: IChip, inputChipType: string) => {
    switch (inputChipType) {
      case "country":
        if (chip.id !== undefined) {
          userProfileSettingFromData.visitedCountries?.push(chip.id);
        }
        break;
      case "language":
        if (chip.id !== undefined) {
          userProfileSettingFromData.languages?.push(chip.id);
        }
        break;
      case "country":
        if (chip.id !== undefined) {
          userProfileSettingFromData.visitedCountries?.push(chip.id);
        }
        break;
      case "currency":
        if (chip.id !== undefined) {
          userProfileSettingFromData.currencies?.push(chip.id);
        }
        break;
      case "travelInterest":
        if (chip.id !== undefined) {
          userProfileSettingFromData.travelInterests?.push(chip.id);
        }
        break;
      case "travelStyle":
        if (chip.id !== undefined) {
          userProfileSettingFromData.travelStyles?.push(chip.id);
        }
      default:
        break;
    }
  };

  /**
   * 刪除用戶個人資料中的一個選擇。
   *
   * @param {IChip} chip - 要刪除的Chip。
   * @param {IInputChips} inputChip - IInputChips物件。
   */
  const removeUserProfile = (chip: IChip, inputChipType: string) => {
    switch (inputChipType) {
      case "country":
        if (chip.id !== undefined) {
          userProfileSettingFromData.visitedCountries = userProfileSettingFromData.visitedCountries?.filter((countryId) => countryId !== chip.id);
        }
        break;
      case "language":
        if (chip.id !== undefined) {
          userProfileSettingFromData.languages = userProfileSettingFromData.languages?.filter((languageId) => languageId !== chip.id);
        }
        break;
      case "currency":
        if (chip.id !== undefined) {
          userProfileSettingFromData.currencies = userProfileSettingFromData.currencies?.filter((currencyId) => currencyId !== chip.id);
        }
        break;
      case "travelInterest":
        if (chip.id !== undefined) {
          userProfileSettingFromData.travelInterests = userProfileSettingFromData.travelInterests?.filter((interestId) => interestId !== chip.id);
        }
        break;
      case "travelStyle":
        if (chip.id !== undefined) {
          userProfileSettingFromData.travelStyles = userProfileSettingFromData.travelStyles?.filter((styleId) => styleId !== chip.id);
        }
      default:
        break;
    }
  };

  //#endregion

  onMounted(() => {
    resetForm();
  });
</script>
