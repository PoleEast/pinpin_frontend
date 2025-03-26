// src/plugins/countryFlags.ts
import type { App } from "vue";
import { Icon } from "@iconify/vue";
import { addIcon } from "@iconify/vue";

import flagTw from "@iconify-icons/flag/tw-4x3"; // 台灣
import flagUs from "@iconify-icons/flag/us-4x3"; // 美國
import flagGb from "@iconify-icons/flag/gb-4x3"; // 英國
import flagCa from "@iconify-icons/flag/ca-4x3"; // 加拿大
import flagAu from "@iconify-icons/flag/au-4x3"; // 澳大利亞
import flagJp from "@iconify-icons/flag/jp-4x3"; // 日本
import flagCn from "@iconify-icons/flag/cn-4x3"; // 中國
import flagDe from "@iconify-icons/flag/de-4x3"; // 德國
import flagFr from "@iconify-icons/flag/fr-4x3"; // 法國
import flagIn from "@iconify-icons/flag/in-4x3"; // 印度

import climbling from "@iconify-icons/map/climbing"; //攀岩
import airballoon from "@iconify-icons/mdi/airballoon"; //熱氣球

//國旗
addIcon("flagTW", flagTw);
addIcon("flagUS", flagUs);
addIcon("flagGB", flagGb);
addIcon("flagCA", flagCa);
addIcon("flagAU", flagAu);
addIcon("flagJP", flagJp);
addIcon("flagCN", flagCn);
addIcon("flagDE", flagDe);
addIcon("flagFR", flagFr);
addIcon("flagIN", flagIn);

//興趣
addIcon("climbing", climbling);
addIcon("airballoon", airballoon);

export default {
  install: (app: App) => {
    app.component("IconFlag", Icon);
  },
};
