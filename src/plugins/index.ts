import type { App } from "vue";
import router from "@/router";
import { createPinia } from "pinia";
import vuetify from "./vuetify";
import FontAwesomeIcon from "./fontawesome";
import "./axios";

export function registerPlugins(app: App) {
  app.use(createPinia()).use(router).use(vuetify).component("font-awesome-icon", FontAwesomeIcon);
}
