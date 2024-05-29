/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

import { VTreeview } from "vuetify/labs/VTreeview";
import { VDateInput } from "vuetify/labs/VDateInput";

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

import { themes } from "./vuetify/theme";
import defaults from "./vuetify/defaults";
import { VBtn } from "vuetify/components/VBtn";

import { en, tr } from "vuetify/locale";

import DateFnsAdapter from "@date-io/date-fns";
import enUS from "date-fns/locale/en-US";
import trKo from "date-fns/locale/ko";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VTreeview,
    VDateInput,
  },
  date: {
    adapter: DateFnsAdapter,
    locale: {
      en: enUS,
      tr: trKo,
    },
  },
  locale: {
    locale: "tr",
    fallback: "en",
    messages: { tr, en },
  },
  theme: {
    defaultTheme: "light",
    themes,
  },
  aliases: {
    VBtnPrimary: VBtn,
  },
  defaults,
});
