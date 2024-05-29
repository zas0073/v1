/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from "@/plugins/vuetify";
import axios from "@/plugins/axios";
import pinia from "@/stores";
import router from "@/router";

import i18n from "@/utils/i18n";

export function registerPlugins(app) {
  const axiosInstance = axios.create();
  app.config.globalProperties.$axios = { ...axiosInstance };
  app.use(vuetify).use(router).use(pinia).use(i18n);
}
