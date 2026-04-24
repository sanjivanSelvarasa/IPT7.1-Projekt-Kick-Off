import {createI18n} from "vue-i18n";
import de from "./de.json"
import en from "./en.json"


const savedLang = localStorage.getItem("lang") || "de";

export const i18n = createI18n({
  legacy: false,
  locale: savedLang,
  fallbackLocale: "de",
  messages: {
    de,
    en,
  }
});
