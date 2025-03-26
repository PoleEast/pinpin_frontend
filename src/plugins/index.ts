import type { App } from "vue";
import router from "@/router";
import { createPinia } from "pinia";
import vuetify from "./vuetify";
import FontAwesomeIcon from "./fontawesome";
import "./axios";
import iconify from "./iconify";

export function registerPlugins(app: App) {
  app.use(createPinia()).use(router).use(vuetify).use(iconify).component("font-awesome-icon", FontAwesomeIcon);
}
