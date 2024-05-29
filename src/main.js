/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

import mitt from "mitt";

import "@/scss/main.scss";

const progressBus = mitt();
const alertBus = mitt();

const app = createApp(App);
app.provide("alertBus", alertBus);
app.provide("progressBus", progressBus);

registerPlugins(app);

app.mount("#app");
