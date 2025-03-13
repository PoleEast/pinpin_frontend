<template>
  <v-container>
    <v-form>
      <v-card variant="flat">
        <v-card-item>
          <v-card-title>你的旅遊名片</v-card-title>
          <v-card-subtitle>讓旅伴們認識真實的你!</v-card-subtitle>
          <!-- 暱稱、頭像、背景、簡介 -->
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
  import { reactive } from "vue";

  const visitedCountriesChipsData = reactive<IChip[]>([]);
  const travelInterestsChipsData = reactive<IChip[]>([]);
  const travelStylesChipsData = reactive<IChip[]>([]);
  const languageChipsData = reactive<IChip[]>([]);
  const currencyChipsData = reactive<IChip[]>([]);
  const inputChips = reactive<IInputChips[]>([
    {
      icon: "earth-asia",
      label: {
        text: "走過的國家",
      },
      chips: visitedCountriesChipsData,
    },
    {
      icon: "heart",
      label: {
        text: "偏好的旅遊方式",
      },
      chips: travelInterestsChipsData,
    },
    {
      icon: "suitcase",
      label: {
        text: "旅行的風格",
      },
      chips: travelStylesChipsData,
    },
    {
      icon: "language",
      label: {
        text: "使用的語言",
      },
      chips: languageChipsData,
    },
    {
      icon: "coins",
      label: {
        text: "使用的貨幣",
      },
      chips: currencyChipsData,
    },
  ]);

  const userProfileSettingFromData = reactive<IUserProfileSettingFromData>({});
</script>
