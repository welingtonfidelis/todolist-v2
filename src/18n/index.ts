import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "./locales/pt-br.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    // debug: true,

    resources: {
      pt: {
        common: pt,
      },
      // en: {
      //   common: en.en,
      // },
    },

    lng: "pt", // if you're using a language detector, do not define the lng option
    fallbackLng: "pt",

    ns: ["common"],

    defaultNS: "common",
  });

export default i18n;