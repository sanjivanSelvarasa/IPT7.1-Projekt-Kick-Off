import {createI18n} from "vue-i18n";
import landingpageDe from "./landingpage/de.json"
import landingpageEn from "./landingpage/en.json"

import dashboardDe from "./dashboard/de.json"
import dashboardEn from "./dashboard/en.json"

import cardDashboardDe from "./carddashboard/de.json"
import cardDashboardEn from "./carddashboard/en.json"

import footerDe from "@/i18n/footer/de.json"
import footerEn from "@/i18n/footer/en.json"

import loginDe from "./loginpage/de.json"
import loginEn from "./loginpage/en.json"

import navDe from "@/i18n/nav/de.json"
import navEn from "@/i18n/nav/en.json"

import registerDe from "@/i18n/registerpage/de.json"
import registerEn from "@/i18n/registerpage/en.json"


const savedLang = localStorage.getItem("lang") ?? (navigator.language === ('de' || 'en') ? navigator.language : "de");

export const i18n = createI18n({
  legacy: false,
  locale: savedLang,
  fallbackLocale: "de",
  messages: {
    de: {
      landingpage: landingpageDe,
      cardDashboard: cardDashboardDe,
      dashboard: dashboardDe,
      footer: footerDe,
      login: loginDe,
      navHome: navDe,
      register: registerDe,
    },
    en: {
      landingpage: landingpageEn,
      cardDashboard: cardDashboardEn,
      dashboard: dashboardEn,
      footer: footerEn,
      login: loginEn,
      navHome: navEn,
      register: registerEn,
    },
  }
});
