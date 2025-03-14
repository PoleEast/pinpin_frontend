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
                    <v-chip v-for="(chip, index) in inputChip.chips" :text="chip.text" :key="index" closable
                      ><template v-slot:prepend> <font-awesome-icon :icon="chip.icon" fixed-width class="text-primary mr-1" /> </template
                    ></v-chip>
                    <v-chip text="新增" class="mr-1">
                      <template v-slot:prepend> <font-awesome-icon icon="plus" class="text-primary mr-1" /></template>
                    </v-chip>
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
  import { RadioFalseIcon, RadioTureIcon } from "@/utils/functionalComponent.utils";
  import type { SettingResponseDTO, UserProfileResponseDTO } from "pinpin_library";
  import { computed, onMounted, reactive, ref, watch } from "vue";

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
    language: [],
    currency: [],
    travelInterests: [],
    travelStyles: [],
  });

  const visitedCountriesChipsData = computed<IChip[]>(() => {
    return props.settingData.country
      .filter((country) => userProfileSettingFromData.visitedCountries?.includes(country.id))
      .map<IChip>((country) => ({
        text: country.english_name,
        icon: country.icon,
      }));
  });

  const travelInterestsChipsData = computed<IChip[]>(() => {
    return props.settingData.travelInterest
      .filter((interest) => userProfileSettingFromData.travelInterests?.includes(interest.id))
      .map<IChip>((interest) => ({
        text: interest.name,
        icon: interest.icon,
      }));
  });

  const travelStylesChipsData = computed<IChip[]>(() => {
    return props.settingData.travelStyle
      .filter((style) => userProfileSettingFromData.travelStyles?.includes(style.id))
      .map<IChip>((style) => ({
        text: style.name,
        icon: style.icon,
      }));
  });

  const languageChipsData = computed<IChip[]>(() => {
    return props.settingData.language
      .filter((language) => userProfileSettingFromData.language?.includes(language.id))
      .map<IChip>((language) => ({
        text: language.local_name,
      }));
  });

  const currencyChipsData = computed<IChip[]>(() => {
    return props.settingData.currency
      .filter((currency) => userProfileSettingFromData.currency?.includes(currency.id))
      .map<IChip>((currency) => ({
        text: currency.code,
        icon: "coins",
      }));
  });

  const inputChips = reactive<IInputChips[]>([
    {
      icon: "earth-asia",
      label: {
        text: "走過的國家",
      },
      chips: visitedCountriesChipsData.value,
    },
    {
      icon: "heart",
      label: {
        text: "偏好的旅遊方式",
      },
      chips: travelInterestsChipsData.value,
    },
    {
      icon: "suitcase",
      label: {
        text: "旅行的風格",
      },
      chips: travelStylesChipsData.value,
    },
    {
      icon: "language",
      label: {
        text: "使用的語言",
      },
      chips: languageChipsData.value,
    },
    {
      icon: "coins",
      label: {
        text: "使用的貨幣",
      },
      chips: currencyChipsData.value,
    },
  ]);

  const resetForm = () => {
    console.log(props.userProfile);
    console.log(props.userProfile.travelInterests);
    console.log(userProfileSettingFromData);

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
    userProfileSettingFromData.language = props.userProfile.language;
    userProfileSettingFromData.currency = props.userProfile.currency;
  };

  watch(
    () => props.userProfile,
    () => {
      resetForm();
    },
  );

  onMounted(() => {
    resetForm();
  });
</script>
